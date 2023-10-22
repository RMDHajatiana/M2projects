using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace BackAPI.Migrations
{
    /// <inheritdoc />
    public partial class Donneescomplete : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "avion",
                columns: table => new
                {
                    id_aeronef = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    type_aeronef = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_avion", x => x.id_aeronef);
                });

            migrationBuilder.CreateTable(
                name: "classeservice",
                columns: table => new
                {
                    id_classe = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    num_siege = table.Column<int>(type: "integer", nullable: false),
                    type_classe = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_classeservice", x => x.id_classe);
                });

            migrationBuilder.CreateTable(
                name: "itineraire",
                columns: table => new
                {
                    id_itineraire = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    aeroport_depart = table.Column<string>(type: "text", nullable: true),
                    aeroport_arrive = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_itineraire", x => x.id_itineraire);
                });

            migrationBuilder.CreateTable(
                name: "passager",
                columns: table => new
                {
                    id_passager = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom_passager = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    prenom_passager = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    phone_passager = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: true),
                    email_passager = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    num_passeport = table.Column<string>(type: "character varying(9)", maxLength: 9, nullable: true),
                    adresse_passager = table.Column<string>(type: "character varying(25)", maxLength: 25, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_passager", x => x.id_passager);
                });

            migrationBuilder.CreateTable(
                name: "utilisateur",
                columns: table => new
                {
                    num_matricule = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom_user = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    prenom_user = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    phone_user = table.Column<long>(type: "bigint", nullable: false),
                    email_user = table.Column<string>(type: "character varying(25)", maxLength: 25, nullable: true),
                    mdp_user = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    adresse_user = table.Column<string>(type: "character varying(25)", maxLength: 25, nullable: true),
                    role_user = table.Column<string>(type: "character varying(25)", maxLength: 25, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_utilisateur", x => x.num_matricule);
                });

            migrationBuilder.CreateTable(
                name: "appartenir",
                columns: table => new
                {
                    id_apart = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    id_aeronef = table.Column<int>(type: "integer", nullable: false),
                    id_classe = table.Column<int>(type: "integer", nullable: false),
                    capacite = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_appartenir", x => x.id_apart);
                    table.ForeignKey(
                        name: "FK_appartenir_avion_id_aeronef",
                        column: x => x.id_aeronef,
                        principalTable: "avion",
                        principalColumn: "id_aeronef",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_appartenir_classeservice_id_classe",
                        column: x => x.id_classe,
                        principalTable: "classeservice",
                        principalColumn: "id_classe",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "vol",
                columns: table => new
                {
                    id_vol = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    num_vol = table.Column<string>(type: "character varying(15)", maxLength: 15, nullable: true),
                    id_aeronef = table.Column<int>(type: "integer", nullable: false),
                    id_itineraire = table.Column<int>(type: "integer", nullable: false),
                    date_depart = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    heure_depart = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_vol", x => x.id_vol);
                    table.ForeignKey(
                        name: "FK_vol_avion_id_aeronef",
                        column: x => x.id_aeronef,
                        principalTable: "avion",
                        principalColumn: "id_aeronef",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_vol_itineraire_id_itineraire",
                        column: x => x.id_itineraire,
                        principalTable: "itineraire",
                        principalColumn: "id_itineraire",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "reservation",
                columns: table => new
                {
                    num_reservation = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    id_vol = table.Column<int>(type: "integer", nullable: false),
                    id_classe = table.Column<int>(type: "integer", nullable: false),
                    remboursement = table.Column<double>(type: "double precision", nullable: false),
                    id_passager = table.Column<int>(type: "integer", nullable: false),
                    date_reservation = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_reservation", x => x.num_reservation);
                    table.ForeignKey(
                        name: "FK_reservation_classeservice_id_classe",
                        column: x => x.id_classe,
                        principalTable: "classeservice",
                        principalColumn: "id_classe",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_reservation_passager_id_passager",
                        column: x => x.id_passager,
                        principalTable: "passager",
                        principalColumn: "id_passager",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_reservation_vol_id_vol",
                        column: x => x.id_vol,
                        principalTable: "vol",
                        principalColumn: "id_vol",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tarif",
                columns: table => new
                {
                    id_tarif = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    id_classe = table.Column<int>(type: "integer", nullable: false),
                    id_vol = table.Column<int>(type: "integer", nullable: false),
                    montant_tarif = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tarif", x => x.id_tarif);
                    table.ForeignKey(
                        name: "FK_tarif_classeservice_id_classe",
                        column: x => x.id_classe,
                        principalTable: "classeservice",
                        principalColumn: "id_classe",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tarif_vol_id_vol",
                        column: x => x.id_vol,
                        principalTable: "vol",
                        principalColumn: "id_vol",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_appartenir_id_aeronef",
                table: "appartenir",
                column: "id_aeronef");

            migrationBuilder.CreateIndex(
                name: "IX_appartenir_id_classe",
                table: "appartenir",
                column: "id_classe");

            migrationBuilder.CreateIndex(
                name: "IX_reservation_id_classe",
                table: "reservation",
                column: "id_classe");

            migrationBuilder.CreateIndex(
                name: "IX_reservation_id_passager",
                table: "reservation",
                column: "id_passager");

            migrationBuilder.CreateIndex(
                name: "IX_reservation_id_vol",
                table: "reservation",
                column: "id_vol");

            migrationBuilder.CreateIndex(
                name: "IX_tarif_id_classe",
                table: "tarif",
                column: "id_classe");

            migrationBuilder.CreateIndex(
                name: "IX_tarif_id_vol",
                table: "tarif",
                column: "id_vol");

            migrationBuilder.CreateIndex(
                name: "IX_vol_id_aeronef",
                table: "vol",
                column: "id_aeronef");

            migrationBuilder.CreateIndex(
                name: "IX_vol_id_itineraire",
                table: "vol",
                column: "id_itineraire");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "appartenir");

            migrationBuilder.DropTable(
                name: "reservation");

            migrationBuilder.DropTable(
                name: "tarif");

            migrationBuilder.DropTable(
                name: "utilisateur");

            migrationBuilder.DropTable(
                name: "passager");

            migrationBuilder.DropTable(
                name: "classeservice");

            migrationBuilder.DropTable(
                name: "vol");

            migrationBuilder.DropTable(
                name: "avion");

            migrationBuilder.DropTable(
                name: "itineraire");
        }
    }
}
