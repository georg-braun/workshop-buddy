namespace WorkshopBuddy.Models;

public class User
{
    public int Id { get; set; }
    public required string Username { get; set; }
    public required string PasswordHash { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public ICollection<Material> Materials { get; set; } = new List<Material>();
    public ICollection<Consumable> Consumables { get; set; } = new List<Consumable>();
    public ICollection<Item> Items { get; set; } = new List<Item>();
}
