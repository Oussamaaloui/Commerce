using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Commerce.Api.Migrations
{
    /// <inheritdoc />
    public partial class addentreprisetointerlocuteur : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "EntrepriseId",
                table: "Interlocuteurs",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Interlocuteurs_EntrepriseId",
                table: "Interlocuteurs",
                column: "EntrepriseId");

            migrationBuilder.AddForeignKey(
                name: "FK_Interlocuteurs_Entreprises_EntrepriseId",
                table: "Interlocuteurs",
                column: "EntrepriseId",
                principalTable: "Entreprises",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Interlocuteurs_Entreprises_EntrepriseId",
                table: "Interlocuteurs");

            migrationBuilder.DropIndex(
                name: "IX_Interlocuteurs_EntrepriseId",
                table: "Interlocuteurs");

            migrationBuilder.DropColumn(
                name: "EntrepriseId",
                table: "Interlocuteurs");
        }
    }
}
