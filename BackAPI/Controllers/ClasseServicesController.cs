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
    public class ClasseServicesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ClasseServicesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/ClasseServices
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClasseService>>> GetClasseService()
        {
          if (_context.ClasseService == null)
          {
              return NotFound();
          }
            return await _context.ClasseService.Include(a=>a.Avion).Include(t=>t.Tarifs).Include(r=>r.Reservations).OrderBy(c=>c.Id_classe).ToListAsync();
        }

        // GET: api/ClasseServices/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ClasseService>> GetClasseService(int id)
        {
          if (_context.ClasseService == null)
          {
              return NotFound();
          }
            var classeService = await _context.ClasseService.FindAsync(id);

            if (classeService == null)
            {
                return NotFound();
            }

            return classeService;
        }

        // PUT: api/ClasseServices/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutClasseService(int id, ClasseService classeService)
        {
            if (id != classeService.Id_classe)
            {
                return BadRequest();
            }

            _context.Entry(classeService).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClasseServiceExists(id))
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

        // POST: api/ClasseServices
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ClasseService>> PostClasseService(ClasseService classeService)
        {
          if (_context.ClasseService == null)
          {
              return Problem("Entity set 'AppDbContext.ClasseService'  is null.");
          }
            _context.ClasseService.Add(classeService);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetClasseService", new { id = classeService.Id_classe }, classeService);
        }

        // DELETE: api/ClasseServices/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClasseService(int id)
        {
            if (_context.ClasseService == null)
            {
                return NotFound();
            }
            var classeService = await _context.ClasseService.FindAsync(id);
            if (classeService == null)
            {
                return NotFound();
            }

            _context.ClasseService.Remove(classeService);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ClasseServiceExists(int id)
        {
            return (_context.ClasseService?.Any(e => e.Id_classe == id)).GetValueOrDefault();
        }
    }
}
