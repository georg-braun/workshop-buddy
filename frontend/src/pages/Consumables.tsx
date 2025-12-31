import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { consumablesApi } from '../api';
import type { Consumable, CreateConsumableRequest } from '../types';

export default function Consumables() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<CreateConsumableRequest>({
    name: '',
    description: '',
    quantity: 0,
    minimumQuantity: 0,
    unit: '',
  });

  const queryClient = useQueryClient();

  const { data: consumables, isLoading } = useQuery({
    queryKey: ['consumables'],
    queryFn: consumablesApi.getAll,
  });

  const createMutation = useMutation({
    mutationFn: consumablesApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['consumables'] });
      resetForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: CreateConsumableRequest }) =>
      consumablesApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['consumables'] });
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: consumablesApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['consumables'] });
    },
  });

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      quantity: 0,
      minimumQuantity: 0,
      unit: '',
    });
    setIsCreating(false);
    setEditingId(null);
  };

  const handleEdit = (consumable: Consumable) => {
    setFormData({
      name: consumable.name,
      description: consumable.description || '',
      quantity: consumable.quantity,
      minimumQuantity: consumable.minimumQuantity,
      unit: consumable.unit || '',
    });
    setEditingId(consumable.id);
    setIsCreating(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateMutation.mutate({ id: editingId, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  if (isLoading) return <div className="loading">Loading...</div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Consumables</h1>
        {!isCreating && (
          <button onClick={() => setIsCreating(true)} className="btn-primary">
            Add Consumable
          </button>
        )}
      </div>

      {isCreating && (
        <div className="form-card">
          <h2>{editingId ? 'Edit Consumable' : 'Create Consumable'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="quantity">Quantity *</label>
                <input
                  id="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="minimumQuantity">Minimum Quantity *</label>
                <input
                  id="minimumQuantity"
                  type="number"
                  value={formData.minimumQuantity}
                  onChange={(e) =>
                    setFormData({ ...formData, minimumQuantity: Number(e.target.value) })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="unit">Unit</label>
                <input
                  id="unit"
                  type="text"
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                />
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-primary" disabled={createMutation.isPending || updateMutation.isPending}>
                {editingId ? 'Update' : 'Create'}
              </button>
              <button type="button" onClick={resetForm} className="btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="items-grid">
        {consumables?.map((consumable) => (
          <div key={consumable.id} className={`item-card ${consumable.isLowStock ? 'low-stock' : ''}`}>
            <div className="item-header">
              <h3>{consumable.name}</h3>
              {consumable.isLowStock && <span className="badge-warning">Low Stock</span>}
            </div>
            {consumable.description && <p className="item-description">{consumable.description}</p>}
            <div className="item-details">
              <div>
                <strong>Quantity:</strong> {consumable.quantity} {consumable.unit}
              </div>
              <div>
                <strong>Minimum:</strong> {consumable.minimumQuantity} {consumable.unit}
              </div>
            </div>
            <div className="item-actions">
              <button onClick={() => handleEdit(consumable)} className="btn-small">
                Edit
              </button>
              <button
                onClick={() => deleteMutation.mutate(consumable.id)}
                className="btn-small btn-danger"
                disabled={deleteMutation.isPending}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
