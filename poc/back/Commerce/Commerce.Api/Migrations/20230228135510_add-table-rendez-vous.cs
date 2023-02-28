using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Commerce.Api.Migrations
{
    /// <inheritdoc />
    public partial class addtablerendezvous : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Entreprise",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Addresse = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Ville = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CodePostal = table.Column<int>(type: "int", nullable: false),
                    TypeEntreprise = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Entreprise", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Interlocuteur",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Numero = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Interlocuteur", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RendezVous",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Titre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EntrepriseId = table.Column<int>(type: "int", nullable: false),
                    InterlocuteurId = table.Column<int>(type: "int", nullable: false),
                    TypeRendezVous = table.Column<int>(type: "int", nullable: false),
                    Motif = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RendezVous", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RendezVous_Entreprise_EntrepriseId",
                        column: x => x.EntrepriseId,
                        principalTable: "Entreprise",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RendezVous_Interlocuteur_InterlocuteurId",
                        column: x => x.InterlocuteurId,
                        principalTable: "Interlocuteur",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RendezVous_EntrepriseId",
                table: "RendezVous",
                column: "EntrepriseId");

            migrationBuilder.CreateIndex(
                name: "IX_RendezVous_InterlocuteurId",
                table: "RendezVous",
                column: "InterlocuteurId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RendezVous");

            migrationBuilder.DropTable(
                name: "Entreprise");

            migrationBuilder.DropTable(
                name: "Interlocuteur");
        }
    }
}
