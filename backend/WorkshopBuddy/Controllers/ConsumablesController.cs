using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WorkshopBuddy.Data;
using WorkshopBuddy.DTOs;
using WorkshopBuddy.Models;
using WorkshopBuddy.Services;

namespace WorkshopBuddy.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ConsumablesController : ControllerBase
{
    private readonly WorkshopBuddyContext _context;
    private readonly AuthService _authService;
    
    public ConsumablesController(WorkshopBuddyContext context, AuthService authService)
    {
        _context = context;
        _authService = authService;
    }
    
    private int GetUserId() => _authService.GetUserIdFromClaims(User) ?? throw new UnauthorizedAccessException();
    
    [HttpGet]
    public async Task<ActionResult<List<ConsumableDto>>> GetConsumables()
    {
        var userId = GetUserId();
        var consumables = await _context.Consumables
            .Where(c => c.UserId == userId)
            .Select(c => new ConsumableDto(c.Id, c.Name, c.Description, c.Quantity, c.MinimumQuantity, c.Unit, c.Quantity < c.MinimumQuantity))
            .ToListAsync();
        return Ok(consumables);
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<ConsumableDto>> GetConsumable(int id)
    {
        var userId = GetUserId();
        var consumable = await _context.Consumables.FirstOrDefaultAsync(c => c.Id == id && c.UserId == userId);
        
        if (consumable == null) return NotFound();
        
        return Ok(new ConsumableDto(consumable.Id, consumable.Name, consumable.Description, consumable.Quantity, consumable.MinimumQuantity, consumable.Unit, consumable.Quantity < consumable.MinimumQuantity));
    }
    
    [HttpPost]
    public async Task<ActionResult<ConsumableDto>> CreateConsumable(CreateConsumableRequest request)
    {
        var userId = GetUserId();
        var consumable = new Consumable
        {
            Name = request.Name,
            Description = request.Description,
            Quantity = request.Quantity,
            MinimumQuantity = request.MinimumQuantity,
            Unit = request.Unit,
            UserId = userId
        };
        
        _context.Consumables.Add(consumable);
        await _context.SaveChangesAsync();
        
        return CreatedAtAction(nameof(GetConsumable), new { id = consumable.Id },
            new ConsumableDto(consumable.Id, consumable.Name, consumable.Description, consumable.Quantity, consumable.MinimumQuantity, consumable.Unit, consumable.Quantity < consumable.MinimumQuantity));
    }
    
    [HttpPut("{id}")]
    public async Task<ActionResult<ConsumableDto>> UpdateConsumable(int id, UpdateConsumableRequest request)
    {
        var userId = GetUserId();
        var consumable = await _context.Consumables.FirstOrDefaultAsync(c => c.Id == id && c.UserId == userId);
        
        if (consumable == null) return NotFound();
        
        if (request.Name != null) consumable.Name = request.Name;
        if (request.Description != null) consumable.Description = request.Description;
        if (request.Quantity.HasValue) consumable.Quantity = request.Quantity.Value;
        if (request.MinimumQuantity.HasValue) consumable.MinimumQuantity = request.MinimumQuantity.Value;
        if (request.Unit != null) consumable.Unit = request.Unit;
        consumable.UpdatedAt = DateTime.UtcNow;
        
        await _context.SaveChangesAsync();
        
        return Ok(new ConsumableDto(consumable.Id, consumable.Name, consumable.Description, consumable.Quantity, consumable.MinimumQuantity, consumable.Unit, consumable.Quantity < consumable.MinimumQuantity));
    }
    
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteConsumable(int id)
    {
        var userId = GetUserId();
        var consumable = await _context.Consumables.FirstOrDefaultAsync(c => c.Id == id && c.UserId == userId);
        
        if (consumable == null) return NotFound();
        
        _context.Consumables.Remove(consumable);
        await _context.SaveChangesAsync();
        
        return NoContent();
    }
}
