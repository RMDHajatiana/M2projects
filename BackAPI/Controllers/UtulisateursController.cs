using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackAPI.Context;
using BackAPI.Models;

namespace BackAPI.Controllers
{
    [Route("api/[controller]")]

    [ApiController]
    public class UtulisateursController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UtulisateursController(AppDbContext context)
        {
            _context = context;
        }


        [HttpPost("login")]
        public IActionResult Login(Utulisateur model)
        {
            var user = _context.Utulisateur.FirstOrDefault(u => u.Email_user == model.Email_user && u.Mdp_user == model.Mdp_user);

            if (user != null)
            {
                return Ok(new { authentificated = true });
            }
            else
            {
                var response = new
                {
                    phone = false,
                    mdp = false,
                    authentificated = false
                };

                return BadRequest(response);
            }
        }



        /*      var user = _context.Utilisateurs.FirstOrDefault(u => u.Email_user == model.Email);

                if (user != null && user.Mdp_user == model.Password)
                {
                    return Ok(new { authentificated = true });
                }

                if (user != null)
                {
                    return BadRequest(new { phone = false, mdp = true, authentificated = false });
                }

                return BadRequest(new { phone = false, authentificated = false });*/


        // GET: api/Utulisateurs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Utulisateur>>> GetUtulisateur()
        {
            if (_context.Utulisateur == null)
            {
                return NotFound();
            }
            return await _context.Utulisateur.ToListAsync();
        }


        // GET: api/Utulisateurs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Utulisateur>> GetUtulisateur(int id)
        {
            if (_context.Utulisateur == null)
            {
                return NotFound();
            }
            var utulisateur = await _context.Utulisateur.FindAsync(id);

            if (utulisateur == null)
            {
                return NotFound();
            }

            return utulisateur;
        }

       /* // PUT: api/Utulisateurs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUtulisateur(int id, Utulisateur utulisateur)
        {
            if (id != utulisateur.Num_matricule)
            {
                return BadRequest();
            }

            _context.Entry(utulisateur).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UtulisateurExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Utulisateurs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Utulisateur>> PostUtulisateur(Utulisateur utulisateur)
        {
            if (_context.Utulisateur == null)
            {
                return Problem("Entity set 'AppDbContext.Utulisateur'  is null.");
            }
            _context.Utulisateur.Add(utulisateur);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUtulisateur", new { id = utulisateur.Num_matricule }, utulisateur);
        }

        // DELETE: api/Utulisateurs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUtulisateur(int id)
        {
            if (_context.Utulisateur == null)
            {
                return NotFound();
            }
            var utulisateur = await _context.Utulisateur.FindAsync(id);
            if (utulisateur == null)
            {
                return NotFound();
            }

            _context.Utulisateur.Remove(utulisateur);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        private bool UtulisateurExists(int id)
        {
            return (_context.Utulisateur?.Any(e => e.Num_matricule == id)).GetValueOrDefault();
        }
*/
    }
}
