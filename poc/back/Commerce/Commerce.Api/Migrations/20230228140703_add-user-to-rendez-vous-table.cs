using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Commerce.Api.Migrations
{
    /// <inheritdoc />
    public partial class addusertorendezvoustable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "RendezVous",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_RendezVous_UserId",
                table: "RendezVous",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_RendezVous_AspNetUsers_UserId",
                table: "RendezVous",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RendezVous_AspNetUsers_UserId",
                table: "RendezVous");

            migrationBuilder.DropIndex(
                name: "IX_RendezVous_UserId",
                table: "RendezVous");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "RendezVous");
        }
    }
}
