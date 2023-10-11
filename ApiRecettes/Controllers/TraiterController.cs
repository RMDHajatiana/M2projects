﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using Recettes.Models;

namespace Recettes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]


    public class TraiterController : Controller
    {
        [HttpGet]
        public async Task <IActionResult> AffichageTraitement() 
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                string select = "SELECT * FROM traiter";

                var DBC = new AppDbContext();

                var connexionBase = new NpgsqlConnection(DBC.Database.GetConnectionString());

                connexionBase.Open();

                using var commmandSql = new NpgsqlCommand(select, connexionBase);

                var reader = await commmandSql.ExecuteReaderAsync();

                var ListR = new List<Traiter>();

                while (await reader.ReadAsync())
                {
                    int IdR = reader.GetInt32(reader.GetOrdinal("num_reservation"));

                    int IdPerso = reader.GetInt32(reader.GetOrdinal("id_perso"));

                    DateTime DateTraitement = reader.GetDateTime(reader.GetOrdinal("date_traitement"));

                    double Recette = reader.GetInt32(reader.GetOrdinal("recettes"));

                    var Traitement = new Traiter
                    {
                        Num_reservation = IdR,

                        Id_perso = IdPerso,

                        Date_traitement = DateTraitement,

                        Recettes = Recette,
                    };

                    ListR.Add(Traitement);

                    continue;

                }

                return Ok(ListR);

            }
            catch(Npgsql.NpgsqlException e)
            {
                return Ok("Erreur" + e.Message);
            }
        }
    }
}
