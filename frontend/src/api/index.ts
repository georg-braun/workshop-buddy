import api from './client';
import type {
  LoginRequest,
  LoginResponse,
  Material,
  CreateMaterialRequest,
  UpdateMaterialRequest,
  Consumable,
  CreateConsumableRequest,
  UpdateConsumableRequest,
  Item,
  CreateItemRequest,
  UpdateItemRequest,
  LinkMaterialRequest,
} from '../types';

export const authApi = {
  login: async (data: LoginRequest) => {
    const response = await api.post<LoginResponse>('/auth/login', data);
    return response.data;
  },
  register: async (data: LoginRequest) => {
    const response = await api.post<LoginResponse>('/auth/register', data);
    return response.data;
  },
};

export const materialsApi = {
  getAll: async () => {
    const response = await api.get<Material[]>('/materials');
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get<Material>(`/materials/${id}`);
    return response.data;
  },
  create: async (data: CreateMaterialRequest) => {
    const response = await api.post<Material>('/materials', data);
    return response.data;
  },
  update: async (id: number, data: UpdateMaterialRequest) => {
    const response = await api.put<Material>(`/materials/${id}`, data);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/materials/${id}`);
    return response.data;
  },
};

export const consumablesApi = {
  getAll: async () => {
    const response = await api.get<Consumable[]>('/consumables');
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get<Consumable>(`/consumables/${id}`);
    return response.data;
  },
  create: async (data: CreateConsumableRequest) => {
    const response = await api.post<Consumable>('/consumables', data);
    return response.data;
  },
  update: async (id: number, data: UpdateConsumableRequest) => {
    const response = await api.put<Consumable>(`/consumables/${id}`, data);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/consumables/${id}`);
    return response.data;
  },
};

export const itemsApi = {
  getAll: async () => {
    const response = await api.get<Item[]>('/items');
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get<Item>(`/items/${id}`);
    return response.data;
  },
  create: async (data: CreateItemRequest) => {
    const response = await api.post<Item>('/items', data);
    return response.data;
  },
  update: async (id: number, data: UpdateItemRequest) => {
    const response = await api.put<Item>(`/items/${id}`, data);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/items/${id}`);
    return response.data;
  },
  linkMaterial: async (itemId: number, data: LinkMaterialRequest) => {
    const response = await api.post(`/items/${itemId}/materials`, data);
    return response.data;
  },
  unlinkMaterial: async (itemId: number, materialId: number) => {
    const response = await api.delete(`/items/${itemId}/materials/${materialId}`);
    return response.data;
  },
};
