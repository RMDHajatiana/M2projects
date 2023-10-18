using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackAPI.Migrations
{
    /// <inheritdoc />
    public partial class Initial9 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "phone_passager",
                table: "passager",
                type: "text",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AlterColumn<string>(
                name: "num_passeport",
                table: "passager",
                type: "text",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
                name: "phone_passager",
                table: "passager",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "num_passeport",
                table: "passager",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);
        }
    }
}
