using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace BackAPI.Migrations
{
    /// <inheritdoc />
    public partial class Initial2 : Migration
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
                    type_aeronef = table.Column<string>(type: "text", nullable: true)
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
                    type_classe = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_classeservice", x => x.id_classe);
                });

            migrationBuilder.CreateTable(
                name: "appartenir",
                columns: table => new
                {
                    id_apart = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    id_aeronef = table.Column<int>(type: "integer", nullable: false),
                    AvionId_aeronef = table.Column<int>(type: "integer", nullable: true),
                    id_classe = table.Column<int>(type: "integer", nullable: false),
                    ClasseServiceId_classe = table.Column<int>(type: "integer", nullable: true),
                    capacite = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_appartenir", x => x.id_apart);
                    table.ForeignKey(
                        name: "FK_appartenir_avion_AvionId_aeronef",
                        column: x => x.AvionId_aeronef,
                        principalTable: "avion",
                        principalColumn: "id_aeronef");
                    table.ForeignKey(
                        name: "FK_appartenir_classeservice_ClasseServiceId_classe",
                        column: x => x.ClasseServiceId_classe,
                        principalTable: "classeservice",
                        principalColumn: "id_classe");
                });

            migrationBuilder.CreateIndex(
                name: "IX_appartenir_AvionId_aeronef",
                table: "appartenir",
                column: "AvionId_aeronef");

            migrationBuilder.CreateIndex(
                name: "IX_appartenir_ClasseServiceId_classe",
                table: "appartenir",
                column: "ClasseServiceId_classe");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "appartenir");

            migrationBuilder.DropTable(
                name: "avion");

            migrationBuilder.DropTable(
                name: "classeservice");
        }
    }
}
