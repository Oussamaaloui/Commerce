using Commerce.Api.Data;
using Commerce.Api.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Newtonsoft;
using Newtonsoft.Json.Serialization;
using System.Security.Claims;

namespace Commerce.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            var configuration = builder.Configuration;
            // For Entity Framework
            builder.Services.AddDbContext<ApplicationDbContext>(options => options
                .UseSqlServer(configuration.GetConnectionString("ConnStr"))
                .UseLazyLoadingProxies());

            // For Identity
            builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            // Adding Authentication
            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })

            // Adding Jwt Bearer
            .AddJwtBearer(options =>
            {
                options.SaveToken = true;
                options.RequireHttpsMetadata = false;
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidAudience = configuration["JWT:ValidAudience"],
                    ValidIssuer = configuration["JWT:ValidIssuer"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]))
                };
                options.Events = new JwtBearerEvents
                {
                    OnTokenValidated = async ctx =>
                    {
                        var userManager = ctx.HttpContext.RequestServices.GetService<UserManager<ApplicationUser>>();

                        var user = await userManager.FindByEmailAsync(ctx.Principal.Claims.Where(i => ClaimTypes.Email == i.Type).FirstOrDefault()?.Value);

                        if (user is null || !user.Active)
                        {
                            // user was deleted or deactivated! 

                            ctx.Fail("401 unauthorized");

                            return;
                        }

                        await userManager.Users
                            .Where(u => u.Id == user.Id)
                            .ExecuteUpdateAsync(u => u.SetProperty(u => u.LastActivity, DateTime.Now));

                    }
                };

            });

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("EnableCORS", builder =>
                {
                    builder.AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod();
                });
            });

            builder.Services.AddControllers().AddNewtonsoftJson(setup =>
            {
                //setup.SerializerSettings.ContractResolver = new DefaultContractResolver();
                //setup.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                setup.SerializerSettings.DateTimeZoneHandling = Newtonsoft.Json.DateTimeZoneHandling.Local;
                setup.SerializerSettings.Converters.Add(new Newtonsoft.Json.Converters.StringEnumConverter());
            }); ;
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // ensuring the db is created
            using (var scope = app.Services.CreateScope())
            {
                using (var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>())
                {
                    dbContext.Database.Migrate();

                    // creating a default admin user.
                    var adminEmail = "admin@finsecur.com";
                    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
                    var adminUser = userManager.FindByEmailAsync(adminEmail)
                        .GetAwaiter()
                        .GetResult();

                    var users = dbContext.Users.Count();

                    if (adminUser is null && users == 0)
                    {
                        var defaultAdminUser = new ApplicationUser
                        {
                            FirstName = "Admin",
                            LastName = "Admin",
                            Email = adminEmail,
                            UserName = adminEmail,
                            CreatedAt = DateTime.Now,
                            Id = Guid.NewGuid().ToString(),
                            Active= true
                        };

                        userManager.CreateAsync(defaultAdminUser, "P@ssword1")
                            .Wait();

                        var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
                        roleManager.CreateAsync(new()
                        {
                            Name = "Administrator",
                            Id = Guid.NewGuid().ToString(),
                            ConcurrencyStamp = Guid.NewGuid().ToString()
                        })
                            .Wait();

                        userManager.AddToRoleAsync(defaultAdminUser, "Administrator")
                            .Wait();
                    }
                }
            }

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            //app.UseHttpsRedirection();

            app.UseCors("EnableCORS");

            // Authentication & Authorization
            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}