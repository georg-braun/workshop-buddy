export interface User {
  username: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  username: string;
}

export interface Material {
  id: number;
  name: string;
  description?: string;
  quantity: number;
  minimumQuantity: number;
  unit?: string;
  isLowStock: boolean;
}

export interface CreateMaterialRequest {
  name: string;
  description?: string;
  quantity: number;
  minimumQuantity: number;
  unit?: string;
}

export interface UpdateMaterialRequest {
  name?: string;
  description?: string;
  quantity?: number;
  minimumQuantity?: number;
  unit?: string;
}

export interface Consumable {
  id: number;
  name: string;
  description?: string;
  quantity: number;
  minimumQuantity: number;
  unit?: string;
  isLowStock: boolean;
}

export interface CreateConsumableRequest {
  name: string;
  description?: string;
  quantity: number;
  minimumQuantity: number;
  unit?: string;
}

export interface UpdateConsumableRequest {
  name?: string;
  description?: string;
  quantity?: number;
  minimumQuantity?: number;
  unit?: string;
}

export interface Item {
  id: number;
  name: string;
  description?: string;
  notes?: string;
  materials: ItemMaterial[];
}

export interface ItemMaterial {
  materialId: number;
  materialName: string;
  requiredQuantity: number;
  availableQuantity: number;
  isSufficient: boolean;
}

export interface CreateItemRequest {
  name: string;
  description?: string;
  notes?: string;
}

export interface UpdateItemRequest {
  name?: string;
  description?: string;
  notes?: string;
}

export interface LinkMaterialRequest {
  materialId: number;
  requiredQuantity: number;
}
