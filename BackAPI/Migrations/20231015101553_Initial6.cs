using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace BackAPI.Migrations
{
    /// <inheritdoc />
    public partial class Initial6 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tarif",
                columns: table => new
                {
                    id_tarif = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    id_classe = table.Column<int>(type: "integer", nullable: false),
                    ClasseServiceId_classe = table.Column<int>(type: "integer", nullable: true),
                    id_vol = table.Column<int>(type: "integer", nullable: false),
                    VolId_vol = table.Column<int>(type: "integer", nullable: true),
                    montant_tarif = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tarif", x => x.id_tarif);
                    table.ForeignKey(
                        name: "FK_tarif_classeservice_ClasseServiceId_classe",
                        column: x => x.ClasseServiceId_classe,
                        principalTable: "classeservice",
                        principalColumn: "id_classe");
                    table.ForeignKey(
                        name: "FK_tarif_vol_VolId_vol",
                        column: x => x.VolId_vol,
                        principalTable: "vol",
                        principalColumn: "id_vol");
                });

            migrationBuilder.CreateTable(
                name: "utilisateur",
                columns: table => new
                {
                    num_matricule = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom_user = table.Column<string>(type: "text", nullable: true),
                    prenom_user = table.Column<string>(type: "text", nullable: true),
                    phone_user = table.Column<long>(type: "bigint", nullable: false),
                    email_user = table.Column<string>(type: "text", nullable: true),
                    mdp_user = table.Column<string>(type: "text", nullable: true),
                    adresse_user = table.Column<string>(type: "text", nullable: true),
                    role_user = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_utilisateur", x => x.num_matricule);
                });

            migrationBuilder.CreateIndex(
                name: "IX_tarif_ClasseServiceId_classe",
                table: "tarif",
                column: "ClasseServiceId_classe");

            migrationBuilder.CreateIndex(
                name: "IX_tarif_VolId_vol",
                table: "tarif",
                column: "VolId_vol");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tarif");

            migrationBuilder.DropTable(
                name: "utilisateur");
        }
    }
}
