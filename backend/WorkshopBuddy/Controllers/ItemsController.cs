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
public class ItemsController : ControllerBase
{
    private readonly WorkshopBuddyContext _context;
    private readonly AuthService _authService;
    
    public ItemsController(WorkshopBuddyContext context, AuthService authService)
    {
        _context = context;
        _authService = authService;
    }
    
    private int GetUserId() => _authService.GetUserIdFromClaims(User) ?? throw new UnauthorizedAccessException();
    
    [HttpGet]
    public async Task<ActionResult<List<ItemDto>>> GetItems()
    {
        var userId = GetUserId();
        var items = await _context.Items
            .Where(i => i.UserId == userId)
            .Include(i => i.ItemMaterials)
            .ThenInclude(im => im.Material)
            .ToListAsync();
        
        var itemDtos = items.Select(i => new ItemDto(
            i.Id,
            i.Name,
            i.Description,
            i.Notes,
            i.ItemMaterials.Select(im => new ItemMaterialDto(
                im.MaterialId,
                im.Material.Name,
                im.RequiredQuantity,
                im.Material.Quantity,
                im.Material.Quantity >= im.RequiredQuantity
            )).ToList()
        )).ToList();
        
        return Ok(itemDtos);
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<ItemDto>> GetItem(int id)
    {
        var userId = GetUserId();
        var item = await _context.Items
            .Include(i => i.ItemMaterials)
            .ThenInclude(im => im.Material)
            .FirstOrDefaultAsync(i => i.Id == id && i.UserId == userId);
        
        if (item == null) return NotFound();
        
        var itemDto = new ItemDto(
            item.Id,
            item.Name,
            item.Description,
            item.Notes,
            item.ItemMaterials.Select(im => new ItemMaterialDto(
                im.MaterialId,
                im.Material.Name,
                im.RequiredQuantity,
                im.Material.Quantity,
                im.Material.Quantity >= im.RequiredQuantity
            )).ToList()
        );
        
        return Ok(itemDto);
    }
    
    [HttpPost]
    public async Task<ActionResult<ItemDto>> CreateItem(CreateItemRequest request)
    {
        var userId = GetUserId();
        var item = new Item
        {
            Name = request.Name,
            Description = request.Description,
            Notes = request.Notes,
            UserId = userId
        };
        
        _context.Items.Add(item);
        await _context.SaveChangesAsync();
        
        return CreatedAtAction(nameof(GetItem), new { id = item.Id },
            new ItemDto(item.Id, item.Name, item.Description, item.Notes, new List<ItemMaterialDto>()));
    }
    
    [HttpPut("{id}")]
    public async Task<ActionResult<ItemDto>> UpdateItem(int id, UpdateItemRequest request)
    {
        var userId = GetUserId();
        var item = await _context.Items
            .Include(i => i.ItemMaterials)
            .ThenInclude(im => im.Material)
            .FirstOrDefaultAsync(i => i.Id == id && i.UserId == userId);
        
        if (item == null) return NotFound();
        
        if (request.Name != null) item.Name = request.Name;
        if (request.Description != null) item.Description = request.Description;
        if (request.Notes != null) item.Notes = request.Notes;
        item.UpdatedAt = DateTime.UtcNow;
        
        await _context.SaveChangesAsync();
        
        var itemDto = new ItemDto(
            item.Id,
            item.Name,
            item.Description,
            item.Notes,
            item.ItemMaterials.Select(im => new ItemMaterialDto(
                im.MaterialId,
                im.Material.Name,
                im.RequiredQuantity,
                im.Material.Quantity,
                im.Material.Quantity >= im.RequiredQuantity
            )).ToList()
        );
        
        return Ok(itemDto);
    }
    
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteItem(int id)
    {
        var userId = GetUserId();
        var item = await _context.Items.FirstOrDefaultAsync(i => i.Id == id && i.UserId == userId);
        
        if (item == null) return NotFound();
        
        _context.Items.Remove(item);
        await _context.SaveChangesAsync();
        
        return NoContent();
    }
    
    [HttpPost("{id}/materials")]
    public async Task<ActionResult> LinkMaterial(int id, LinkMaterialRequest request)
    {
        var userId = GetUserId();
        var item = await _context.Items.FirstOrDefaultAsync(i => i.Id == id && i.UserId == userId);
        if (item == null) return NotFound("Item not found");
        
        var material = await _context.Materials.FirstOrDefaultAsync(m => m.Id == request.MaterialId && m.UserId == userId);
        if (material == null) return NotFound("Material not found");
        
        var existingLink = await _context.ItemMaterials.FirstOrDefaultAsync(im => im.ItemId == id && im.MaterialId == request.MaterialId);
        if (existingLink != null) return BadRequest("Material already linked to this item");
        
        var itemMaterial = new ItemMaterial
        {
            ItemId = id,
            MaterialId = request.MaterialId,
            RequiredQuantity = request.RequiredQuantity
        };
        
        _context.ItemMaterials.Add(itemMaterial);
        await _context.SaveChangesAsync();
        
        return Ok();
    }
    
    [HttpDelete("{id}/materials/{materialId}")]
    public async Task<IActionResult> UnlinkMaterial(int id, int materialId)
    {
        var userId = GetUserId();
        var item = await _context.Items.FirstOrDefaultAsync(i => i.Id == id && i.UserId == userId);
        if (item == null) return NotFound();
        
        var itemMaterial = await _context.ItemMaterials.FirstOrDefaultAsync(im => im.ItemId == id && im.MaterialId == materialId);
        if (itemMaterial == null) return NotFound();
        
        _context.ItemMaterials.Remove(itemMaterial);
        await _context.SaveChangesAsync();
        
        return NoContent();
    }
}
