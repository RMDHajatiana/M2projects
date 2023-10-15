using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace BackAPI.Migrations
{
    /// <inheritdoc />
    public partial class Initial5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "vol",
                columns: table => new
                {
                    id_vol = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    num_vol = table.Column<string>(type: "text", nullable: true),
                    id_aeronef = table.Column<int>(type: "integer", nullable: false),
                    AvionId_aeronef = table.Column<int>(type: "integer", nullable: true),
                    id_itineraire = table.Column<int>(type: "integer", nullable: false),
                    ItineraireId_itineraire = table.Column<int>(type: "integer", nullable: true),
                    remboursement = table.Column<double>(type: "double precision", nullable: false),
                    date_depart = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    heure_depart = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_vol", x => x.id_vol);
                    table.ForeignKey(
                        name: "FK_vol_avion_AvionId_aeronef",
                        column: x => x.AvionId_aeronef,
                        principalTable: "avion",
                        principalColumn: "id_aeronef");
                    table.ForeignKey(
                        name: "FK_vol_itineraire_ItineraireId_itineraire",
                        column: x => x.ItineraireId_itineraire,
                        principalTable: "itineraire",
                        principalColumn: "id_itineraire");
                });

            migrationBuilder.CreateTable(
                name: "reservation",
                columns: table => new
                {
                    num_reservation = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    id_vol = table.Column<int>(type: "integer", nullable: false),
                    VolId_vol = table.Column<int>(type: "integer", nullable: true),
                    id_classe = table.Column<int>(type: "integer", nullable: false),
                    ClasseServiceId_classe = table.Column<int>(type: "integer", nullable: true),
                    id_passager = table.Column<int>(type: "integer", nullable: false),
                    PassagerId_passager = table.Column<int>(type: "integer", nullable: true),
                    date_reservation = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_reservation", x => x.num_reservation);
                    table.ForeignKey(
                        name: "FK_reservation_classeservice_ClasseServiceId_classe",
                        column: x => x.ClasseServiceId_classe,
                        principalTable: "classeservice",
                        principalColumn: "id_classe");
                    table.ForeignKey(
                        name: "FK_reservation_passager_PassagerId_passager",
                        column: x => x.PassagerId_passager,
                        principalTable: "passager",
                        principalColumn: "id_passager");
                    table.ForeignKey(
                        name: "FK_reservation_vol_VolId_vol",
                        column: x => x.VolId_vol,
                        principalTable: "vol",
                        principalColumn: "id_vol");
                });

            migrationBuilder.CreateIndex(
                name: "IX_reservation_ClasseServiceId_classe",
                table: "reservation",
                column: "ClasseServiceId_classe");

            migrationBuilder.CreateIndex(
                name: "IX_reservation_PassagerId_passager",
                table: "reservation",
                column: "PassagerId_passager");

            migrationBuilder.CreateIndex(
                name: "IX_reservation_VolId_vol",
                table: "reservation",
                column: "VolId_vol");

            migrationBuilder.CreateIndex(
                name: "IX_vol_AvionId_aeronef",
                table: "vol",
                column: "AvionId_aeronef");

            migrationBuilder.CreateIndex(
                name: "IX_vol_ItineraireId_itineraire",
                table: "vol",
                column: "ItineraireId_itineraire");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "reservation");

            migrationBuilder.DropTable(
                name: "vol");
        }
    }
}
