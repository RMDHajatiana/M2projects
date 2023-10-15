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
    public class AppartenirsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AppartenirsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Appartenirs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Appartenir>>> GetAppartenir()
        {
          if (_context.Appartenir == null)
          {
              return NotFound();
          }
            return await _context.Appartenir.ToListAsync();
        }

        // GET: api/Appartenirs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Appartenir>> GetAppartenir(int id)
        {
          if (_context.Appartenir == null)
          {
              return NotFound();
          }
            var appartenir = await _context.Appartenir.FindAsync(id);

            if (appartenir == null)
            {
                return NotFound();
            }

            return appartenir;
        }

        // PUT: api/Appartenirs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAppartenir(int id, Appartenir appartenir)
        {
            if (id != appartenir.Id_apart)
            {
                return BadRequest();
            }

            _context.Entry(appartenir).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AppartenirExists(id))
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

        // POST: api/Appartenirs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Appartenir>> PostAppartenir(Appartenir appartenir)
        {
          if (_context.Appartenir == null)
          {
              return Problem("Entity set 'AppDbContext.Appartenir'  is null.");
          }
            _context.Appartenir.Add(appartenir);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAppartenir", new { id = appartenir.Id_apart }, appartenir);
        }

        // DELETE: api/Appartenirs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAppartenir(int id)
        {
            if (_context.Appartenir == null)
            {
                return NotFound();
            }
            var appartenir = await _context.Appartenir.FindAsync(id);
            if (appartenir == null)
            {
                return NotFound();
            }

            _context.Appartenir.Remove(appartenir);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AppartenirExists(int id)
        {
            return (_context.Appartenir?.Any(e => e.Id_apart == id)).GetValueOrDefault();
        }
    }
}
