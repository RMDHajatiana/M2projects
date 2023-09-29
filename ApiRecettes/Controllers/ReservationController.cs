using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using Recettes.Models;

namespace Recettes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> AfficherReservation()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try

            {
                string Select = "select * FROM reservation";

                using var DBC = new AppDbContext();

                var ConnexionBase = new Npgsql.NpgsqlConnection(DBC.Database.GetConnectionString());

                ConnexionBase.Open();

                using var CommandSql = new NpgsqlCommand(Select, ConnexionBase);

                var reader = await CommandSql.ExecuteReaderAsync();

                var ListReservation = new List<Reservation>();

                while (await reader.ReadAsync())
                {
                    int NumR = reader.GetInt32(reader.GetOrdinal("num_reservation"));
                    int NumT = reader.GetInt32(reader.GetOrdinal("code_tarif"));
                    int NumP = reader.GetInt32(reader.GetOrdinal("id_perso"));
                    int NumC = reader.GetInt32(reader.GetOrdinal("code_classe"));
                    int NumV = reader.GetInt32(reader.GetOrdinal("num_vol"));
                    DateTime Date = reader.GetDateTime(reader.GetOrdinal("date_reservation"));

                    var reservations = new Reservation
                    {
                        Num_reservation = NumR,
                        Code_tarif = NumT,
                        Id_perso = NumP,
                        Code_classe = NumC,
                        Num_vol = NumV,
                        Date_reservation = Date,
                    };

                    ListReservation.Add(reservations);
                    continue;
                }

                return Ok(ListReservation);

            }

            catch (Npgsql.NpgsqlException e)
            {
                return Ok("Ereur" + e.Message);
            }

        }


        // Ajouter Reservation Au base 

        [HttpPost]
        public async Task<IActionResult> AjouterReservation([FromBody] Reservation Reserve)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try

            {
                using (var DB = new AppDbContext() ) 
                {
                    DB.Reservation.Add(Reserve);

                    await DB.SaveChangesAsync();

                    return CreatedAtAction("GetReservation", new {

                        id = Reserve.Num_reservation,
                        codeTarif = Reserve.Code_tarif,
                        codeClasse =Reserve.Code_classe,
                        Idperso = Reserve.Id_perso,
                        Numvol= Reserve.Num_vol,
                        Date = Reserve.Date_reservation,
                        
                        Reserve});
                }

            }

            catch (Npgsql.NpgsqlException e)
            {
                return Ok("Erreur d'ajout" + e.Message);
            }

        }

    }

}
