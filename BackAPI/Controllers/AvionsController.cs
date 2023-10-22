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
    public class AvionsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AvionsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Avions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Avion>>> GetAvion()
        {
          if (_context.Avion == null)
          {
              return NotFound();
          }
            return await _context.Avion.Include(a => a.Vols).ToListAsync();
        }

        // GET: api/Avions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Avion>> GetAvion(int id)
        {
          if (_context.Avion == null)
          {
              return NotFound();
          }
            var avion = await _context.Avion.FindAsync(id);

            if (avion == null)
            {
                return NotFound();
            }

            return avion;
        }

        // PUT: api/Avions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAvion(int id, Avion avion)
        {
            if (id != avion.Id_aeronef)
            {
                return BadRequest();
            }

            _context.Entry(avion).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AvionExists(id))
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

        // POST: api/Avions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Avion>> PostAvion(Avion avion)
        {
          if (_context.Avion == null)
          {
              return Problem("Entity set 'AppDbContext.Avion'  is null.");
          }
            _context.Avion.Add(avion);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAvion", new { id = avion.Id_aeronef }, avion);
        }

        // DELETE: api/Avions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAvion(int id)
        {
            if (_context.Avion == null)
            {
                return NotFound();
            }
            var avion = await _context.Avion.FindAsync(id);
            if (avion == null)
            {
                return NotFound();
            }

            _context.Avion.Remove(avion);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AvionExists(int id)
        {
            return (_context.Avion?.Any(e => e.Id_aeronef == id)).GetValueOrDefault();
        }
    }
}
