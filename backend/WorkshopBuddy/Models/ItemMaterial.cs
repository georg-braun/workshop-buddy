namespace WorkshopBuddy.Models;

public class ItemMaterial
{
    public int ItemId { get; set; }
    public Item Item { get; set; } = null!;
    
    public int MaterialId { get; set; }
    public Material Material { get; set; } = null!;
    
    public int RequiredQuantity { get; set; }
}
