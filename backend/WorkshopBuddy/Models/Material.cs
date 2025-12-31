namespace WorkshopBuddy.Models;

public class Material
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public string? Description { get; set; }
    public int Quantity { get; set; }
    public int MinimumQuantity { get; set; }
    public string? Unit { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    
    public int UserId { get; set; }
    public User User { get; set; } = null!;
    
    public ICollection<ItemMaterial> ItemMaterials { get; set; } = new List<ItemMaterial>();
}
