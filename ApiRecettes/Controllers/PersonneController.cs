using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using Recettes.Models;
using static System.Net.Mime.MediaTypeNames;

namespace Recettes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonneController : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> AfficherPassager () 
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                string Select = "select * FROM personne";

                var DBC = new AppDbContext ();

                var ConnexionBase = new Npgsql.NpgsqlConnection(DBC.Database.GetConnectionString());

                ConnexionBase.Open();

                using var CommandSql = new NpgsqlCommand(Select, ConnexionBase);

                var reader = await CommandSql.ExecuteReaderAsync();

                var ListPAssagers = new List<Personne>() ;

                while (await reader.ReadAsync())
                {
                    int IdPerso = reader.GetInt32(reader.GetOrdinal("id_perso"));
                    string Nom = reader.GetString(reader.GetOrdinal("nom_perso"));
                    string Prenom = reader.GetString(reader.GetOrdinal("prenom_perso"));
                    long Phone = reader.GetInt64(reader.GetOrdinal("phone_perso"));
                    string Email = reader.GetString(reader.GetOrdinal("E_mail_perso"));
                    string Adresse = reader.GetString(reader.GetOrdinal("adresse_perso"));
                    long Passeport = reader.GetInt64(reader.GetOrdinal("num_passeport_perso"));
                    string Type = reader.GetString(reader.GetOrdinal("type_perso"));

                    var Passager = new Personne
                    {
                        Id_perso = IdPerso,
                        Nom_perso = Nom,
                        Prenom_perso = Prenom,
                        Phone_perso = Phone,
                        E_mail_perso = Email,
                        Adresse_perso = Adresse,
                        Num_passeport_perso = Passeport,
                        Type_perso = Type,
                    };


                    ListPAssagers.Add(Passager);
                   
                    continue;
                }

            return Ok(ListPAssagers);

            }
            catch (Npgsql.NpgsqlException e)
            {
                return Ok("Ereur" + e.Message);
            }

        } 
    }
}
