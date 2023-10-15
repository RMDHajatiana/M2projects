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
    public class ItinerairesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ItinerairesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Itineraires
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Itineraire>>> GetItineraire()
        {
          if (_context.Itineraire == null)
          {
              return NotFound();
          }
            return await _context.Itineraire.ToListAsync();
        }

        // GET: api/Itineraires/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Itineraire>> GetItineraire(int id)
        {
          if (_context.Itineraire == null)
          {
              return NotFound();
          }
            var itineraire = await _context.Itineraire.FindAsync(id);

            if (itineraire == null)
            {
                return NotFound();
            }

            return itineraire;
        }

        // PUT: api/Itineraires/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutItineraire(int id, Itineraire itineraire)
        {
            if (id != itineraire.Id_itineraire)
            {
                return BadRequest();
            }

            _context.Entry(itineraire).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ItineraireExists(id))
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

        // POST: api/Itineraires
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Itineraire>> PostItineraire(Itineraire itineraire)
        {
          if (_context.Itineraire == null)
          {
              return Problem("Entity set 'AppDbContext.Itineraire'  is null.");
          }
            _context.Itineraire.Add(itineraire);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetItineraire", new { id = itineraire.Id_itineraire }, itineraire);
        }

        // DELETE: api/Itineraires/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItineraire(int id)
        {
            if (_context.Itineraire == null)
            {
                return NotFound();
            }
            var itineraire = await _context.Itineraire.FindAsync(id);
            if (itineraire == null)
            {
                return NotFound();
            }

            _context.Itineraire.Remove(itineraire);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ItineraireExists(int id)
        {
            return (_context.Itineraire?.Any(e => e.Id_itineraire == id)).GetValueOrDefault();
        }
    }
}
