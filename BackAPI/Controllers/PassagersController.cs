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
    public class PassagersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PassagersController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Passagers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Passager>>> GetPassager()
        {
          if (_context.Passager == null)
          {
              return NotFound();
          }
            return await _context.Passager.ToListAsync();
        }

        // GET: api/Passagers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Passager>> GetPassager(int id)
        {
          if (_context.Passager == null)
          {
              return NotFound();
          }
            var passager = await _context.Passager.FindAsync(id);

            if (passager == null)
            {
                return NotFound();
            }

            return passager;
        }

        // PUT: api/Passagers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPassager(int id, Passager passager)
        {
            if (id != passager.Id_passager)
            {
                return BadRequest();
            }

            _context.Entry(passager).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PassagerExists(id))
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

        // POST: api/Passagers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Passager>> PostPassager(Passager passager)
        {
          if (_context.Passager == null)
          {
              return Problem("Entity set 'AppDbContext.Passager'  is null.");
          }
            _context.Passager.Add(passager);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPassager", new { id = passager.Id_passager }, passager);
        }

        // DELETE: api/Passagers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePassager(int id)
        {
            if (_context.Passager == null)
            {
                return NotFound();
            }
            var passager = await _context.Passager.FindAsync(id);
            if (passager == null)
            {
                return NotFound();
            }

            _context.Passager.Remove(passager);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PassagerExists(int id)
        {
            return (_context.Passager?.Any(e => e.Id_passager == id)).GetValueOrDefault();
        }
    }
}
