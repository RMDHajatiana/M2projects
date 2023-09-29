using Microsoft.AspNetCore.Mvc;
using Recettes.Models;
using Npgsql;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace Recettes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AvionController : Controller
    {

        [HttpGet]
        public async Task<IActionResult> AfficherAvion()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            else
            {
                try
                {
                    string Select = "SELECT * FROM avion ORDER BY id_aeronef ASC";

                    using var dbc = new AppDbContext();

                    using var connexionBase = new NpgsqlConnection(dbc.Database.GetConnectionString());

                    connexionBase.Open();

                    using var command = new NpgsqlCommand(Select, connexionBase);

                    var reader = await command.ExecuteReaderAsync();

                    var listAvion = new List<Avion>();

                    while(await reader.ReadAsync())
                    {
                        int id = reader.GetInt32(reader.GetOrdinal("id_aeronef"));

                        string type = reader.GetString(reader.GetOrdinal("type_aeronef"));

                        var avions = new Avion
                        {
                            Id_aeronef = id,
                            Type_aeronef = type,
                        };

                        listAvion.Add(avions);

                        continue;
                    }
                    return Ok(listAvion);

                } 
                catch(Npgsql.NpgsqlException e)
                {
                    return Ok("erreur: " + e.Message);
                }
            }
        }


        [HttpGet("{id}")]

        public  IActionResult GetAvionByid( int id)
        {
            if(!ModelState.IsValid) 
            {
                return BadRequest(ModelState);
            }

            try
            {
                string Selectsql = "SELECT *FROM avion where @id = id_aeronef ";

                using (var DB = new AppDbContext())

                using (var connexion = new NpgsqlConnection(DB.Database.GetConnectionString()))

                using (var command = new NpgsqlCommand(Selectsql, connexion))
                {
                    connexion.Open();

                    command.Parameters.AddWithValue("id", id);

                    using (var reader = command.ExecuteReader())

                    {
                        if (reader.Read())
                        {

                            int AvionId = reader.GetInt32(reader.GetOrdinal("id_aeronef"));

                            string TypeAeronef = reader.GetString(reader.GetOrdinal("type_aeronef"));

                            var avion = new Avion
                            {
                                Id_aeronef = AvionId,
                                Type_aeronef = TypeAeronef,
                            };

                            return Ok(avion);

                        } return NotFound();

                    }
                }
            }

            catch (NpgsqlException e) 
            {
                return StatusCode(500, $"Erreur interne de serveur : {e.Message}");
            }
        }



        [HttpPost(("ajout"))]

        // [ActionName(nameof(AjouterAvion))]
        public async Task<IActionResult> AjouterAvion([FromBody] Avion avion)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try

            {
                string Insertsql = "INSERT INTO avion (type_aeronef) VALUES (@type_aeronef)" ;

                using (var DB = new AppDbContext())

                {

                    using (var Connexion = new NpgsqlConnection(DB.Database.GetConnectionString()) )

                    {
                        Connexion.Open();

                        using (var command = new NpgsqlCommand(Insertsql, Connexion))

                        {

                            command.Parameters.AddWithValue("type_aeronef", avion.Type_aeronef);

                            await command.ExecuteNonQueryAsync();

                        }
                    }
                }

                return Ok("Ajout avec succès");
            }

            catch (Npgsql.NpgsqlException e)

            {
                return StatusCode(500, $"Erreur interne du serveur : {e.Message}");
            }

        }


        [HttpPut("Modification/{id}")]

        //[ActionName(nameof(Modification))]
        public async Task <IActionResult> Modification ( int id,  [FromBody] Avion avion )
        {
            if(!ModelState.IsValid) 
            {
                return BadRequest(ModelState);
            }

            try 
            {
                string UpdateSql = " UPDATE  avion set type_aeronef = @type_aeronef where id_aeronef=@id  "; 
                
                using ( var DB = new AppDbContext())

                using (var connexion = new NpgsqlConnection(DB.Database.GetConnectionString() ))

                using (var command = new NpgsqlCommand (UpdateSql, connexion ) )

                {
                    command.Parameters.AddWithValue("type_aeronef", avion.Type_aeronef);

                    command.Parameters.AddWithValue("id", id);

                    await connexion.OpenAsync();

                    var verificationID = await command.ExecuteNonQueryAsync();

                    if(verificationID == 0 )
                    {
                        return NotFound();
                    }

                return Ok("Modification réussie");

                }

            }
            catch (NpgsqlException e)
            {
                return Ok(e.Message);
            }

        }

        [HttpDelete("supprimer/{id}")]

        // [ActionName(nameof(SupprimerAvion))]

        public async Task<IActionResult> SupprimerAvion(int id)
        {
            try
            {
                const string DeleteSql = "DELETE FROM avion where id_aeronef = @id ";

                using (var DB = new AppDbContext())

                using (var connection = new NpgsqlConnection(DB.Database.GetConnectionString()))

                using (var command = new NpgsqlCommand(DeleteSql, connection))

                {
                    command.Parameters.AddWithValue("id", id);

                    await connection.OpenAsync();

                    int verificationID = await command.ExecuteNonQueryAsync();

                    if (verificationID == 0)
                    {
                        return NotFound();
                    }

                    return Ok("Suppression réussie");
                }
            }
            catch (NpgsqlException e)
            {
                return StatusCode(500, $"Erreur interne du serveur : {e.Message}");
            }
        }


    }
}
