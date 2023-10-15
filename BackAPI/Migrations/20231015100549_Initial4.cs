using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace BackAPI.Migrations
{
    /// <inheritdoc />
    public partial class Initial4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "passager",
                columns: table => new
                {
                    id_passager = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom_passager = table.Column<string>(type: "text", nullable: true),
                    prenom_passager = table.Column<string>(type: "text", nullable: true),
                    phone_passager = table.Column<long>(type: "bigint", nullable: false),
                    email_passager = table.Column<string>(type: "text", nullable: true),
                    num_passeport = table.Column<long>(type: "bigint", nullable: false),
                    adresse_passager = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_passager", x => x.id_passager);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "passager");
        }
    }
}
