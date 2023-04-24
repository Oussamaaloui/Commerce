using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Commerce.Api.Migrations
{
    /// <inheritdoc />
    public partial class cleanuprelations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RendezVous_Entreprises_EntrepriseId",
                table: "RendezVous");

            migrationBuilder.DropIndex(
                name: "IX_RendezVous_EntrepriseId",
                table: "RendezVous");

            migrationBuilder.DropColumn(
                name: "EntrepriseId",
                table: "RendezVous");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "EntrepriseId",
                table: "RendezVous",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_RendezVous_EntrepriseId",
                table: "RendezVous",
                column: "EntrepriseId");

            migrationBuilder.AddForeignKey(
                name: "FK_RendezVous_Entreprises_EntrepriseId",
                table: "RendezVous",
                column: "EntrepriseId",
                principalTable: "Entreprises",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
