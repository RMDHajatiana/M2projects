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
    public class TarifsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TarifsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Tarifs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tarif>>> GetTarif()
        {
          if (_context.Tarif == null)
          {
              return NotFound();
          }
            return await _context.Tarif.ToListAsync();
        }

        // GET: api/Tarifs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Tarif>> GetTarif(int id)
        {
          if (_context.Tarif == null)
          {
              return NotFound();
          }
            var tarif = await _context.Tarif.FindAsync(id);

            if (tarif == null)
            {
                return NotFound();
            }

            return tarif;
        }

        // PUT: api/Tarifs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTarif(int id, Tarif tarif)
        {
            if (id != tarif.Id_tarif)
            {
                return BadRequest();
            }

            _context.Entry(tarif).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TarifExists(id))
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

        // POST: api/Tarifs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Tarif>> PostTarif(Tarif tarif)
        {
          if (_context.Tarif == null)
          {
              return Problem("Entity set 'AppDbContext.Tarif'  is null.");
          }
            _context.Tarif.Add(tarif);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTarif", new { id = tarif.Id_tarif }, tarif);
        }

        // DELETE: api/Tarifs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTarif(int id)
        {
            if (_context.Tarif == null)
            {
                return NotFound();
            }
            var tarif = await _context.Tarif.FindAsync(id);
            if (tarif == null)
            {
                return NotFound();
            }

            _context.Tarif.Remove(tarif);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TarifExists(int id)
        {
            return (_context.Tarif?.Any(e => e.Id_tarif == id)).GetValueOrDefault();
        }
    }
}
