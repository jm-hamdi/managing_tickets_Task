using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        private readonly TicketContext _context;

        public TicketController(TicketContext context)
        {
            _context = context;
        }


[HttpGet]
public async Task<ActionResult<IEnumerable<Ticket>>> GetTickets(int page = 1, int pageSize = 8, string sortColumn = "ticketId", string sortOrder = "asc", string filter = "")
{
    var query = _context.Tickets.AsQueryable();

    // Apply filtering
    if (!string.IsNullOrWhiteSpace(filter))
    {
        query = query.Where(t => (t.Description != null && t.Description.Contains(filter)) || (t.Status != null && t.Status.Contains(filter)));
    }

    // Apply sorting
    switch (sortColumn.ToLower())
    {
        case "ticketid":
            query = sortOrder == "asc" ? query.OrderBy(t => t.TicketId) : query.OrderByDescending(t => t.TicketId);
            break;
        case "description":
            query = sortOrder == "asc" ? query.OrderBy(t => t.Description) : query.OrderByDescending(t => t.Description);
            break;
        case "status":
            query = sortOrder == "asc" ? query.OrderBy(t => t.Status) : query.OrderByDescending(t => t.Status);
            break;
        case "date":
            query = sortOrder == "asc" ? query.OrderBy(t => t.Date) : query.OrderByDescending(t => t.Date);
            break;
        default:
            break; 
    }

    var totalCount = await query.CountAsync(); 

    var tickets = await query
        .Skip((page - 1) * pageSize) 
        .Take(pageSize) 
        .ToListAsync();

    return Ok(new
    {
        TotalCount = totalCount,
        CurrentPage = page,
        PageSize = pageSize,
        TotalPages = (int)Math.Ceiling((double)totalCount / pageSize),
        Tickets = tickets
    });
}


       
        [HttpGet("{id}")]
        public async Task<ActionResult<Ticket>> GetTicket(int id)
        {
            var ticket = await _context.Tickets.FindAsync(id);
            if (ticket == null)
            {
                return NotFound();
            }
            return ticket;
        }

        
        [HttpPost]
        public async Task<ActionResult<Ticket>> PostTicket([FromBody] Ticket ticket)
        {
            _context.Tickets.Add(ticket);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTicket", new { id = ticket.TicketId }, ticket);
        }

        
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTicket(int id, Ticket ticket)
        {
            if (id != ticket.TicketId)
            {
                return BadRequest();
            }

            _context.Entry(ticket).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TicketExists(id))
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

        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTicket(int id)
        {
            var ticket = await _context.Tickets.FindAsync(id);
            if (ticket == null)
            {
                return NotFound();
            }

            _context.Tickets.Remove(ticket);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TicketExists(int id)
        {
            return _context.Tickets.Any(e => e.TicketId == id);
        }
    }
}
