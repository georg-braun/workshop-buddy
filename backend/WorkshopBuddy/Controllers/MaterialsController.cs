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
public class MaterialsController : ControllerBase
{
    private readonly WorkshopBuddyContext _context;
    private readonly AuthService _authService;
    
    public MaterialsController(WorkshopBuddyContext context, AuthService authService)
    {
        _context = context;
        _authService = authService;
    }
    
    private int GetUserId() => _authService.GetUserIdFromClaims(User) ?? throw new UnauthorizedAccessException();
    
    [HttpGet]
    public async Task<ActionResult<List<MaterialDto>>> GetMaterials()
    {
        var userId = GetUserId();
        var materials = await _context.Materials
            .Where(m => m.UserId == userId)
            .Select(m => new MaterialDto(m.Id, m.Name, m.Description, m.Quantity, m.MinimumQuantity, m.Unit, m.Quantity < m.MinimumQuantity))
            .ToListAsync();
        return Ok(materials);
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<MaterialDto>> GetMaterial(int id)
    {
        var userId = GetUserId();
        var material = await _context.Materials.FirstOrDefaultAsync(m => m.Id == id && m.UserId == userId);
        
        if (material == null) return NotFound();
        
        return Ok(new MaterialDto(material.Id, material.Name, material.Description, material.Quantity, material.MinimumQuantity, material.Unit, material.Quantity < material.MinimumQuantity));
    }
    
    [HttpPost]
    public async Task<ActionResult<MaterialDto>> CreateMaterial(CreateMaterialRequest request)
    {
        var userId = GetUserId();
        var material = new Material
        {
            Name = request.Name,
            Description = request.Description,
            Quantity = request.Quantity,
            MinimumQuantity = request.MinimumQuantity,
            Unit = request.Unit,
            UserId = userId
        };
        
        _context.Materials.Add(material);
        await _context.SaveChangesAsync();
        
        return CreatedAtAction(nameof(GetMaterial), new { id = material.Id }, 
            new MaterialDto(material.Id, material.Name, material.Description, material.Quantity, material.MinimumQuantity, material.Unit, material.Quantity < material.MinimumQuantity));
    }
    
    [HttpPut("{id}")]
    public async Task<ActionResult<MaterialDto>> UpdateMaterial(int id, UpdateMaterialRequest request)
    {
        var userId = GetUserId();
        var material = await _context.Materials.FirstOrDefaultAsync(m => m.Id == id && m.UserId == userId);
        
        if (material == null) return NotFound();
        
        if (request.Name != null) material.Name = request.Name;
        if (request.Description != null) material.Description = request.Description;
        if (request.Quantity.HasValue) material.Quantity = request.Quantity.Value;
        if (request.MinimumQuantity.HasValue) material.MinimumQuantity = request.MinimumQuantity.Value;
        if (request.Unit != null) material.Unit = request.Unit;
        material.UpdatedAt = DateTime.UtcNow;
        
        await _context.SaveChangesAsync();
        
        return Ok(new MaterialDto(material.Id, material.Name, material.Description, material.Quantity, material.MinimumQuantity, material.Unit, material.Quantity < material.MinimumQuantity));
    }
    
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMaterial(int id)
    {
        var userId = GetUserId();
        var material = await _context.Materials.FirstOrDefaultAsync(m => m.Id == id && m.UserId == userId);
        
        if (material == null) return NotFound();
        
        _context.Materials.Remove(material);
        await _context.SaveChangesAsync();
        
        return NoContent();
    }
}
