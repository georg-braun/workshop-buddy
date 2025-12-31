import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { materialsApi } from '../api';
import type { Material, CreateMaterialRequest } from '../types';

export default function Materials() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<CreateMaterialRequest>({
    name: '',
    description: '',
    quantity: 0,
    minimumQuantity: 0,
    unit: '',
  });

  const queryClient = useQueryClient();

  const { data: materials, isLoading } = useQuery({
    queryKey: ['materials'],
    queryFn: materialsApi.getAll,
  });

  const createMutation = useMutation({
    mutationFn: materialsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['materials'] });
      resetForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: CreateMaterialRequest }) =>
      materialsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['materials'] });
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: materialsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['materials'] });
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

  const handleEdit = (material: Material) => {
    setFormData({
      name: material.name,
      description: material.description || '',
      quantity: material.quantity,
      minimumQuantity: material.minimumQuantity,
      unit: material.unit || '',
    });
    setEditingId(material.id);
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
        <h1>Materials</h1>
        {!isCreating && (
          <button onClick={() => setIsCreating(true)} className="btn-primary">
            Add Material
          </button>
        )}
      </div>

      {isCreating && (
        <div className="form-card">
          <h2>{editingId ? 'Edit Material' : 'Create Material'}</h2>
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
        {materials?.map((material) => (
          <div key={material.id} className={`item-card ${material.isLowStock ? 'low-stock' : ''}`}>
            <div className="item-header">
              <h3>{material.name}</h3>
              {material.isLowStock && <span className="badge-warning">Low Stock</span>}
            </div>
            {material.description && <p className="item-description">{material.description}</p>}
            <div className="item-details">
              <div>
                <strong>Quantity:</strong> {material.quantity} {material.unit}
              </div>
              <div>
                <strong>Minimum:</strong> {material.minimumQuantity} {material.unit}
              </div>
            </div>
            <div className="item-actions">
              <button onClick={() => handleEdit(material)} className="btn-small">
                Edit
              </button>
              <button
                onClick={() => deleteMutation.mutate(material.id)}
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
