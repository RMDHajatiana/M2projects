using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackAPI.Context;
using BackAPI.Models;
using System.Text.Json.Serialization;
using System.Text.Json;

namespace BackAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VolsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public VolsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Vols
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Vol>>> GetVol()
        {
            if (_context.Vol == null)
            {
                return NotFound();
            }
            return await _context.Vol.Include(v => v.Avion).Include(r => r.Reservations).Include(t => t.Tarifs).Include(v => v.Itineraire).OrderBy(a=>a.Date_depart).ToListAsync();
        }

        // selectionner avion, classe, tarif associé au vol

        [HttpGet("/tarif")]
        public ActionResult<IEnumerable<object>> GetVolComplete()
        {
            var vols = _context.Vol.Include(v => v.Avion).Include(v => v.Tarifs).ToList();

            var result = vols.Select(vol => new
            {
                NuméroVol = vol.Num_vol,

                Avion = vol.Avion != null ? vol.Avion.Type_aeronef : null,

                Tarifs = vol.Tarifs.Select(tarif => new

                {
                    ClasseService = tarif.ClasseService != null ? tarif.ClasseService.Type_classe : null,

                    MontantTarif = tarif.Montant_tarif

                }).ToList()

            }).ToList();

            return result;
        }




        // GET: api/Vols/5

        [HttpGet("{id}")]
        public async Task<ActionResult<Vol>> GetVol(int id)
        {
          if (_context.Vol == null)
          {
              return NotFound();
          }
            var vol = await _context.Vol.FindAsync(id);

            if (vol == null)
            {
                return NotFound();
            }

            return vol;
        }

        // PUT: api/Vols/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVol(int id, Vol vol)
        {
            if (id != vol.Id_vol)
            {
                return BadRequest();
            }

            _context.Entry(vol).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VolExists(id))
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

        // POST: api/Vols
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Vol>> PostVol(Vol vol)
        {
          if (_context.Vol == null)
          {
              return Problem("Entity set 'AppDbContext.Vol'  is null.");
          }
            _context.Vol.Add(vol);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetVol", new { id = vol.Id_vol }, vol);
        }

        // DELETE: api/Vols/5

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVol(int id)
        {
            if (_context.Vol == null)
            {
                return NotFound();
            }
            var vol = await _context.Vol.FindAsync(id);
            if (vol == null)
            {
                return NotFound();
            }

            _context.Vol.Remove(vol);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool VolExists(int id)
        {
            return (_context.Vol?.Any(e => e.Id_vol == id)).GetValueOrDefault();
        }
    }
}
