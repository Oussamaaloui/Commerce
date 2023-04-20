using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Commerce.Api.Migrations
{
    /// <inheritdoc />
    public partial class renametableentrepriseandinterlocuteurs : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RendezVous_Entreprise_EntrepriseId",
                table: "RendezVous");

            migrationBuilder.DropForeignKey(
                name: "FK_RendezVous_Interlocuteur_InterlocuteurId",
                table: "RendezVous");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Interlocuteur",
                table: "Interlocuteur");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Entreprise",
                table: "Entreprise");

            migrationBuilder.RenameTable(
                name: "Interlocuteur",
                newName: "Interlocuteurs");

            migrationBuilder.RenameTable(
                name: "Entreprise",
                newName: "Entreprises");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Interlocuteurs",
                table: "Interlocuteurs",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Entreprises",
                table: "Entreprises",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RendezVous_Entreprises_EntrepriseId",
                table: "RendezVous",
                column: "EntrepriseId",
                principalTable: "Entreprises",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RendezVous_Interlocuteurs_InterlocuteurId",
                table: "RendezVous",
                column: "InterlocuteurId",
                principalTable: "Interlocuteurs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RendezVous_Entreprises_EntrepriseId",
                table: "RendezVous");

            migrationBuilder.DropForeignKey(
                name: "FK_RendezVous_Interlocuteurs_InterlocuteurId",
                table: "RendezVous");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Interlocuteurs",
                table: "Interlocuteurs");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Entreprises",
                table: "Entreprises");

            migrationBuilder.RenameTable(
                name: "Interlocuteurs",
                newName: "Interlocuteur");

            migrationBuilder.RenameTable(
                name: "Entreprises",
                newName: "Entreprise");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Interlocuteur",
                table: "Interlocuteur",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Entreprise",
                table: "Entreprise",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RendezVous_Entreprise_EntrepriseId",
                table: "RendezVous",
                column: "EntrepriseId",
                principalTable: "Entreprise",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RendezVous_Interlocuteur_InterlocuteurId",
                table: "RendezVous",
                column: "InterlocuteurId",
                principalTable: "Interlocuteur",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
