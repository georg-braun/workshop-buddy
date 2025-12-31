namespace WorkshopBuddy.DTOs;

public record LoginRequest(string Username, string Password);
public record LoginResponse(string Token, string Username);
public record RegisterRequest(string Username, string Password);

public record MaterialDto(int Id, string Name, string? Description, int Quantity, int MinimumQuantity, string? Unit, bool IsLowStock);
public record CreateMaterialRequest(string Name, string? Description, int Quantity, int MinimumQuantity, string? Unit);
public record UpdateMaterialRequest(string? Name, string? Description, int? Quantity, int? MinimumQuantity, string? Unit);

public record ConsumableDto(int Id, string Name, string? Description, int Quantity, int MinimumQuantity, string? Unit, bool IsLowStock);
public record CreateConsumableRequest(string Name, string? Description, int Quantity, int MinimumQuantity, string? Unit);
public record UpdateConsumableRequest(string? Name, string? Description, int? Quantity, int? MinimumQuantity, string? Unit);

public record ItemDto(int Id, string Name, string? Description, string? Notes, List<ItemMaterialDto> Materials);
public record ItemMaterialDto(int MaterialId, string MaterialName, int RequiredQuantity, int AvailableQuantity, bool IsSufficient);
public record CreateItemRequest(string Name, string? Description, string? Notes);
public record UpdateItemRequest(string? Name, string? Description, string? Notes);
public record LinkMaterialRequest(int MaterialId, int RequiredQuantity);
