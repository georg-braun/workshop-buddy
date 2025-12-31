using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WorkshopBuddy.Data;
using WorkshopBuddy.DTOs;
using WorkshopBuddy.Models;
using WorkshopBuddy.Services;

namespace WorkshopBuddy.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly WorkshopBuddyContext _context;
    private readonly AuthService _authService;
    
    public AuthController(WorkshopBuddyContext context, AuthService authService)
    {
        _context = context;
        _authService = authService;
    }
    
    [HttpPost("register")]
    public async Task<ActionResult<LoginResponse>> Register(RegisterRequest request)
    {
        if (await _context.Users.AnyAsync(u => u.Username == request.Username))
        {
            return BadRequest(new { message = "Username already exists" });
        }
        
        var user = new User
        {
            Username = request.Username,
            PasswordHash = _authService.HashPassword(request.Password)
        };
        
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        
        var token = _authService.GenerateJwtToken(user);
        return Ok(new LoginResponse(token, user.Username));
    }
    
    [HttpPost("login")]
    public async Task<ActionResult<LoginResponse>> Login(LoginRequest request)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == request.Username);
        
        if (user == null || !_authService.VerifyPassword(request.Password, user.PasswordHash))
        {
            return Unauthorized(new { message = "Invalid username or password" });
        }
        
        var token = _authService.GenerateJwtToken(user);
        return Ok(new LoginResponse(token, user.Username));
    }
}
