using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackAPI.Migrations
{
    /// <inheritdoc />
    public partial class Initial7 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_appartenir_avion_AvionId_aeronef",
                table: "appartenir");

            migrationBuilder.DropForeignKey(
                name: "FK_appartenir_classeservice_ClasseServiceId_classe",
                table: "appartenir");

            migrationBuilder.DropForeignKey(
                name: "FK_reservation_classeservice_ClasseServiceId_classe",
                table: "reservation");

            migrationBuilder.DropForeignKey(
                name: "FK_reservation_passager_PassagerId_passager",
                table: "reservation");

            migrationBuilder.DropForeignKey(
                name: "FK_reservation_vol_VolId_vol",
                table: "reservation");

            migrationBuilder.DropForeignKey(
                name: "FK_tarif_classeservice_ClasseServiceId_classe",
                table: "tarif");

            migrationBuilder.DropForeignKey(
                name: "FK_tarif_vol_VolId_vol",
                table: "tarif");

            migrationBuilder.DropForeignKey(
                name: "FK_vol_avion_AvionId_aeronef",
                table: "vol");

            migrationBuilder.DropForeignKey(
                name: "FK_vol_itineraire_ItineraireId_itineraire",
                table: "vol");

            migrationBuilder.DropIndex(
                name: "IX_vol_AvionId_aeronef",
                table: "vol");

            migrationBuilder.DropIndex(
                name: "IX_vol_ItineraireId_itineraire",
                table: "vol");

            migrationBuilder.DropIndex(
                name: "IX_tarif_ClasseServiceId_classe",
                table: "tarif");

            migrationBuilder.DropIndex(
                name: "IX_tarif_VolId_vol",
                table: "tarif");

            migrationBuilder.DropIndex(
                name: "IX_reservation_ClasseServiceId_classe",
                table: "reservation");

            migrationBuilder.DropIndex(
                name: "IX_reservation_PassagerId_passager",
                table: "reservation");

            migrationBuilder.DropIndex(
                name: "IX_reservation_VolId_vol",
                table: "reservation");

            migrationBuilder.DropIndex(
                name: "IX_appartenir_AvionId_aeronef",
                table: "appartenir");

            migrationBuilder.DropIndex(
                name: "IX_appartenir_ClasseServiceId_classe",
                table: "appartenir");

            migrationBuilder.DropColumn(
                name: "AvionId_aeronef",
                table: "vol");

            migrationBuilder.DropColumn(
                name: "ItineraireId_itineraire",
                table: "vol");

            migrationBuilder.DropColumn(
                name: "ClasseServiceId_classe",
                table: "tarif");

            migrationBuilder.DropColumn(
                name: "VolId_vol",
                table: "tarif");

            migrationBuilder.DropColumn(
                name: "ClasseServiceId_classe",
                table: "reservation");

            migrationBuilder.DropColumn(
                name: "PassagerId_passager",
                table: "reservation");

            migrationBuilder.DropColumn(
                name: "VolId_vol",
                table: "reservation");

            migrationBuilder.DropColumn(
                name: "AvionId_aeronef",
                table: "appartenir");

            migrationBuilder.DropColumn(
                name: "ClasseServiceId_classe",
                table: "appartenir");

            migrationBuilder.AlterColumn<string>(
                name: "role_user",
                table: "utilisateur",
                type: "text",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.CreateIndex(
                name: "IX_vol_id_aeronef",
                table: "vol",
                column: "id_aeronef");

            migrationBuilder.CreateIndex(
                name: "IX_vol_id_itineraire",
                table: "vol",
                column: "id_itineraire");

            migrationBuilder.CreateIndex(
                name: "IX_tarif_id_classe",
                table: "tarif",
                column: "id_classe");

            migrationBuilder.CreateIndex(
                name: "IX_tarif_id_vol",
                table: "tarif",
                column: "id_vol");

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
                name: "IX_appartenir_id_aeronef",
                table: "appartenir",
                column: "id_aeronef");

            migrationBuilder.CreateIndex(
                name: "IX_appartenir_id_classe",
                table: "appartenir",
                column: "id_classe");

            migrationBuilder.AddForeignKey(
                name: "FK_appartenir_avion_id_aeronef",
                table: "appartenir",
                column: "id_aeronef",
                principalTable: "avion",
                principalColumn: "id_aeronef",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_appartenir_classeservice_id_classe",
                table: "appartenir",
                column: "id_classe",
                principalTable: "classeservice",
                principalColumn: "id_classe",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_reservation_classeservice_id_classe",
                table: "reservation",
                column: "id_classe",
                principalTable: "classeservice",
                principalColumn: "id_classe",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_reservation_passager_id_passager",
                table: "reservation",
                column: "id_passager",
                principalTable: "passager",
                principalColumn: "id_passager",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_reservation_vol_id_vol",
                table: "reservation",
                column: "id_vol",
                principalTable: "vol",
                principalColumn: "id_vol",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_tarif_classeservice_id_classe",
                table: "tarif",
                column: "id_classe",
                principalTable: "classeservice",
                principalColumn: "id_classe",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_tarif_vol_id_vol",
                table: "tarif",
                column: "id_vol",
                principalTable: "vol",
                principalColumn: "id_vol",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_vol_avion_id_aeronef",
                table: "vol",
                column: "id_aeronef",
                principalTable: "avion",
                principalColumn: "id_aeronef",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_vol_itineraire_id_itineraire",
                table: "vol",
                column: "id_itineraire",
                principalTable: "itineraire",
                principalColumn: "id_itineraire",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_appartenir_avion_id_aeronef",
                table: "appartenir");

            migrationBuilder.DropForeignKey(
                name: "FK_appartenir_classeservice_id_classe",
                table: "appartenir");

            migrationBuilder.DropForeignKey(
                name: "FK_reservation_classeservice_id_classe",
                table: "reservation");

            migrationBuilder.DropForeignKey(
                name: "FK_reservation_passager_id_passager",
                table: "reservation");

            migrationBuilder.DropForeignKey(
                name: "FK_reservation_vol_id_vol",
                table: "reservation");

            migrationBuilder.DropForeignKey(
                name: "FK_tarif_classeservice_id_classe",
                table: "tarif");

            migrationBuilder.DropForeignKey(
                name: "FK_tarif_vol_id_vol",
                table: "tarif");

            migrationBuilder.DropForeignKey(
                name: "FK_vol_avion_id_aeronef",
                table: "vol");

            migrationBuilder.DropForeignKey(
                name: "FK_vol_itineraire_id_itineraire",
                table: "vol");

            migrationBuilder.DropIndex(
                name: "IX_vol_id_aeronef",
                table: "vol");

            migrationBuilder.DropIndex(
                name: "IX_vol_id_itineraire",
                table: "vol");

            migrationBuilder.DropIndex(
                name: "IX_tarif_id_classe",
                table: "tarif");

            migrationBuilder.DropIndex(
                name: "IX_tarif_id_vol",
                table: "tarif");

            migrationBuilder.DropIndex(
                name: "IX_reservation_id_classe",
                table: "reservation");

            migrationBuilder.DropIndex(
                name: "IX_reservation_id_passager",
                table: "reservation");

            migrationBuilder.DropIndex(
                name: "IX_reservation_id_vol",
                table: "reservation");

            migrationBuilder.DropIndex(
                name: "IX_appartenir_id_aeronef",
                table: "appartenir");

            migrationBuilder.DropIndex(
                name: "IX_appartenir_id_classe",
                table: "appartenir");

            migrationBuilder.AddColumn<int>(
                name: "AvionId_aeronef",
                table: "vol",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ItineraireId_itineraire",
                table: "vol",
                type: "integer",
                nullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "role_user",
                table: "utilisateur",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ClasseServiceId_classe",
                table: "tarif",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "VolId_vol",
                table: "tarif",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ClasseServiceId_classe",
                table: "reservation",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PassagerId_passager",
                table: "reservation",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "VolId_vol",
                table: "reservation",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "AvionId_aeronef",
                table: "appartenir",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ClasseServiceId_classe",
                table: "appartenir",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_vol_AvionId_aeronef",
                table: "vol",
                column: "AvionId_aeronef");

            migrationBuilder.CreateIndex(
                name: "IX_vol_ItineraireId_itineraire",
                table: "vol",
                column: "ItineraireId_itineraire");

            migrationBuilder.CreateIndex(
                name: "IX_tarif_ClasseServiceId_classe",
                table: "tarif",
                column: "ClasseServiceId_classe");

            migrationBuilder.CreateIndex(
                name: "IX_tarif_VolId_vol",
                table: "tarif",
                column: "VolId_vol");

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
                name: "IX_appartenir_AvionId_aeronef",
                table: "appartenir",
                column: "AvionId_aeronef");

            migrationBuilder.CreateIndex(
                name: "IX_appartenir_ClasseServiceId_classe",
                table: "appartenir",
                column: "ClasseServiceId_classe");

            migrationBuilder.AddForeignKey(
                name: "FK_appartenir_avion_AvionId_aeronef",
                table: "appartenir",
                column: "AvionId_aeronef",
                principalTable: "avion",
                principalColumn: "id_aeronef");

            migrationBuilder.AddForeignKey(
                name: "FK_appartenir_classeservice_ClasseServiceId_classe",
                table: "appartenir",
                column: "ClasseServiceId_classe",
                principalTable: "classeservice",
                principalColumn: "id_classe");

            migrationBuilder.AddForeignKey(
                name: "FK_reservation_classeservice_ClasseServiceId_classe",
                table: "reservation",
                column: "ClasseServiceId_classe",
                principalTable: "classeservice",
                principalColumn: "id_classe");

            migrationBuilder.AddForeignKey(
                name: "FK_reservation_passager_PassagerId_passager",
                table: "reservation",
                column: "PassagerId_passager",
                principalTable: "passager",
                principalColumn: "id_passager");

            migrationBuilder.AddForeignKey(
                name: "FK_reservation_vol_VolId_vol",
                table: "reservation",
                column: "VolId_vol",
                principalTable: "vol",
                principalColumn: "id_vol");

            migrationBuilder.AddForeignKey(
                name: "FK_tarif_classeservice_ClasseServiceId_classe",
                table: "tarif",
                column: "ClasseServiceId_classe",
                principalTable: "classeservice",
                principalColumn: "id_classe");

            migrationBuilder.AddForeignKey(
                name: "FK_tarif_vol_VolId_vol",
                table: "tarif",
                column: "VolId_vol",
                principalTable: "vol",
                principalColumn: "id_vol");

            migrationBuilder.AddForeignKey(
                name: "FK_vol_avion_AvionId_aeronef",
                table: "vol",
                column: "AvionId_aeronef",
                principalTable: "avion",
                principalColumn: "id_aeronef");

            migrationBuilder.AddForeignKey(
                name: "FK_vol_itineraire_ItineraireId_itineraire",
                table: "vol",
                column: "ItineraireId_itineraire",
                principalTable: "itineraire",
                principalColumn: "id_itineraire");
        }
    }
}
