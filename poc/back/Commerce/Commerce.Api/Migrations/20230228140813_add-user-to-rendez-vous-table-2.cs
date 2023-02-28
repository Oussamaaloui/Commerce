using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Commerce.Api.Migrations
{
    /// <inheritdoc />
    public partial class addusertorendezvoustable2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RendezVous_AspNetUsers_UserId",
                table: "RendezVous");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "RendezVous",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_RendezVous_AspNetUsers_UserId",
                table: "RendezVous",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RendezVous_AspNetUsers_UserId",
                table: "RendezVous");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "RendezVous",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddForeignKey(
                name: "FK_RendezVous_AspNetUsers_UserId",
                table: "RendezVous",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
