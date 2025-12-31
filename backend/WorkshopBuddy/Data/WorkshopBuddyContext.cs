using Microsoft.EntityFrameworkCore;
using WorkshopBuddy.Models;

namespace WorkshopBuddy.Data;

public class WorkshopBuddyContext : DbContext
{
    public WorkshopBuddyContext(DbContextOptions<WorkshopBuddyContext> options) : base(options) { }
    
    public DbSet<User> Users { get; set; }
    public DbSet<Material> Materials { get; set; }
    public DbSet<Consumable> Consumables { get; set; }
    public DbSet<Item> Items { get; set; }
    public DbSet<ItemMaterial> ItemMaterials { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Username)
            .IsUnique();
        
        modelBuilder.Entity<ItemMaterial>()
            .HasKey(im => new { im.ItemId, im.MaterialId });
        
        modelBuilder.Entity<ItemMaterial>()
            .HasOne(im => im.Item)
            .WithMany(i => i.ItemMaterials)
            .HasForeignKey(im => im.ItemId);
        
        modelBuilder.Entity<ItemMaterial>()
            .HasOne(im => im.Material)
            .WithMany(m => m.ItemMaterials)
            .HasForeignKey(im => im.MaterialId);
    }
}
