import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { itemsApi, materialsApi } from '../api';
import type { Item, CreateItemRequest, LinkMaterialRequest } from '../types';

export default function Items() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [linkingItemId, setLinkingItemId] = useState<number | null>(null);
  const [formData, setFormData] = useState<CreateItemRequest>({
    name: '',
    description: '',
    notes: '',
  });
  const [linkFormData, setLinkFormData] = useState<LinkMaterialRequest>({
    materialId: 0,
    requiredQuantity: 0,
  });

  const queryClient = useQueryClient();

  const { data: items, isLoading } = useQuery({
    queryKey: ['items'],
    queryFn: itemsApi.getAll,
  });

  const { data: materials } = useQuery({
    queryKey: ['materials'],
    queryFn: materialsApi.getAll,
  });

  const createMutation = useMutation({
    mutationFn: itemsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
      resetForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: CreateItemRequest }) =>
      itemsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: itemsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });

  const linkMaterialMutation = useMutation({
    mutationFn: ({ itemId, data }: { itemId: number; data: LinkMaterialRequest }) =>
      itemsApi.linkMaterial(itemId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
      setLinkingItemId(null);
      setLinkFormData({ materialId: 0, requiredQuantity: 0 });
    },
  });

  const unlinkMaterialMutation = useMutation({
    mutationFn: ({ itemId, materialId }: { itemId: number; materialId: number }) =>
      itemsApi.unlinkMaterial(itemId, materialId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      notes: '',
    });
    setIsCreating(false);
    setEditingId(null);
  };

  const handleEdit = (item: Item) => {
    setFormData({
      name: item.name,
      description: item.description || '',
      notes: item.notes || '',
    });
    setEditingId(item.id);
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

  const handleLinkMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    if (linkingItemId) {
      linkMaterialMutation.mutate({ itemId: linkingItemId, data: linkFormData });
    }
  };

  if (isLoading) return <div className="loading">Loading...</div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Items</h1>
        {!isCreating && (
          <button onClick={() => setIsCreating(true)} className="btn-primary">
            Add Item
          </button>
        )}
      </div>

      {isCreating && (
        <div className="form-card">
          <h2>{editingId ? 'Edit Item' : 'Create Item'}</h2>
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
            <div className="form-group">
              <label htmlFor="notes">Notes</label>
              <textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
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
        {items?.map((item) => (
          <div key={item.id} className="item-card item-card-large">
            <div className="item-header">
              <h3>{item.name}</h3>
            </div>
            {item.description && <p className="item-description">{item.description}</p>}
            {item.notes && (
              <div className="item-notes">
                <strong>Notes:</strong> {item.notes}
              </div>
            )}
            
            <div className="item-materials">
              <h4>Required Materials</h4>
              {item.materials.length === 0 ? (
                <p className="text-muted">No materials linked</p>
              ) : (
                <ul className="materials-list">
                  {item.materials.map((mat) => (
                    <li key={mat.materialId} className={!mat.isSufficient ? 'insufficient' : ''}>
                      <div>
                        <strong>{mat.materialName}</strong>
                        <span>
                          Required: {mat.requiredQuantity} | Available: {mat.availableQuantity}
                        </span>
                        {!mat.isSufficient && <span className="badge-danger">Insufficient</span>}
                      </div>
                      <button
                        onClick={() =>
                          unlinkMaterialMutation.mutate({
                            itemId: item.id,
                            materialId: mat.materialId,
                          })
                        }
                        className="btn-small btn-danger"
                        disabled={unlinkMaterialMutation.isPending}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              
              {linkingItemId === item.id ? (
                <form onSubmit={handleLinkMaterial} className="link-material-form">
                  <select
                    value={linkFormData.materialId}
                    onChange={(e) =>
                      setLinkFormData({ ...linkFormData, materialId: Number(e.target.value) })
                    }
                    required
                  >
                    <option value="">Select Material</option>
                    {materials?.map((mat) => (
                      <option key={mat.id} value={mat.id}>
                        {mat.name} (Available: {mat.quantity})
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    placeholder="Required Quantity"
                    value={linkFormData.requiredQuantity}
                    onChange={(e) =>
                      setLinkFormData({ ...linkFormData, requiredQuantity: Number(e.target.value) })
                    }
                    required
                    min="1"
                  />
                  <button type="submit" className="btn-small btn-primary" disabled={linkMaterialMutation.isPending}>
                    Link
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLinkingItemId(null);
                      setLinkFormData({ materialId: 0, requiredQuantity: 0 });
                    }}
                    className="btn-small btn-secondary"
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setLinkingItemId(item.id)}
                  className="btn-small btn-secondary"
                >
                  Link Material
                </button>
              )}
            </div>

            <div className="item-actions">
              <button onClick={() => handleEdit(item)} className="btn-small">
                Edit
              </button>
              <button
                onClick={() => deleteMutation.mutate(item.id)}
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
