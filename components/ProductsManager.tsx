import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, X, Save, AlertCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface Product {
  id: number;
  name: string;
  description: string;
  features: string[];
  status: string;
  icon: string;
}

export function ProductsManager() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'AI Agent',
      description: 'Intelligent automation for customer support',
      features: ['Natural language processing', 'Smart routing', 'Auto-responses', '24/7 availability'],
      status: 'Active',
      icon: '🤖',
    },
    {
      id: 2,
      name: 'Knowledge Base',
      description: 'Self-service support portal',
      features: ['Article management', 'Search functionality', 'Analytics', 'Multi-language'],
      status: 'Active',
      icon: '📚',
    },
    {
      id: 3,
      name: 'Ticketing System',
      description: 'Streamlined ticket management',
      features: ['Automated workflows', 'Priority queues', 'SLA management', 'Collaboration tools'],
      status: 'Active',
      icon: '🎫',
    },
    {
      id: 4,
      name: 'Analytics Dashboard',
      description: 'Real-time insights and reporting',
      features: ['Custom reports', 'Performance metrics', 'Team analytics', 'Export data'],
      status: 'Active',
      icon: '📊',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    description: '',
    features: [''],
    status: 'Active',
    icon: '📦',
  });

  const [productToDelete, setProductToDelete] = useState<number | null>(null);

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        description: product.description,
        features: product.features.length > 0 ? product.features : [''],
        status: product.status,
        icon: product.icon,
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        features: [''],
        status: 'Active',
        icon: '📦',
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const addFeatureField = () => {
    setFormData({ ...formData, features: [...formData.features, ''] });
  };

  const removeFeatureField = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures.length > 0 ? newFeatures : [''] });
  };

  const handleSave = () => {
    if (!formData.name.trim()) return;

    const cleanedFeatures = formData.features.filter(f => f.trim() !== '');

    if (editingProduct) {
      setProducts(products.map(p => 
        p.id === editingProduct.id ? { ...p, ...formData, features: cleanedFeatures } : p
      ));
    } else {
      const newProduct: Product = {
        ...formData,
        id: Date.now(),
        features: cleanedFeatures
      };
      setProducts([newProduct, ...products]);
    }
    handleCloseModal();
  };

  const confirmDelete = () => {
    if (productToDelete === null) return;
    setProducts(products.filter(p => p.id !== productToDelete));
    setProductToDelete(null);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 font-sans">Products Management</h2>
        <p className="text-gray-600 mt-1">Manage your product offerings and features</p>
      </div>

      <div className="mb-6">
        <Button onClick={() => handleOpenModal()} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white border-none transition-all">
          <Plus className="w-5 h-5" />
          Add New Product
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-lg flex items-center justify-center text-2xl">
                  {product.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{product.name}</h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>
                </div>
              </div>
              <span className={`inline-flex px-2.5 py-0.5 text-xs font-medium rounded-full ${
                product.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {product.status}
              </span>
            </div>

            <div className="mb-4">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Key Features:</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.features.slice(0, 4).map((feature, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0" />
                    <span className="truncate">{feature}</span>
                  </li>
                ))}
                {product.features.length > 4 && (
                  <li className="text-xs text-blue-500 font-medium">+ {product.features.length - 4} more features</li>
                )}
              </ul>
            </div>

            <div className="flex items-center gap-2 pt-4 border-t border-gray-50">
              <Button variant="outline" size="sm" className="flex-1 flex items-center gap-2" onClick={() => handleOpenModal(product)}>
                <Edit className="w-4 h-4" />
                Edit
              </Button>
              <Button variant="outline" size="sm" className="flex-1 flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Preview
              </Button>
              <Button variant="ghost" size="sm" className="px-3 text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => setProductToDelete(product.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation */}
      <AlertDialog open={productToDelete !== null} onOpenChange={() => setProductToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this product? This will remove all associated features and data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700 text-white">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input 
                    id="name" 
                    placeholder="e.g. AI Agent" 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="icon">Icon / Emoji</Label>
                  <Input 
                    id="icon" 
                    placeholder="e.g. 🤖" 
                    value={formData.icon} 
                    onChange={(e) => setFormData({...formData, icon: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(value) => setFormData({...formData, status: value})}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2 flex flex-col h-full">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe what this product does..." 
                  className="flex-1 min-h-[145px]"
                  value={formData.description} 
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
            </div>

            {/* Features List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Product Features</Label>
                <Button variant="ghost" size="sm" onClick={addFeatureField} className="text-blue-600 h-8">
                  <Plus className="w-4 h-4 mr-1" /> Add Feature
                </Button>
              </div>
              <div className="space-y-2">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <Input 
                      placeholder={`Feature #${index + 1}`} 
                      value={feature} 
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeFeatureField(index)}
                      className="text-gray-400 hover:text-red-500 flex-shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
              {formData.features.length === 0 && (
                <p className="text-sm text-gray-400 italic text-center py-2">No features added yet.</p>
              )}
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0 border-t pt-6">
            <Button variant="ghost" onClick={handleCloseModal}>Cancel</Button>
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white border-none">
              <Save className="w-4 h-4 mr-2" />
              {editingProduct ? 'Save Changes' : 'Create Product'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-blue-500" />
          Product Page Settings
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label className="mb-2 block font-medium">Global Page Title</Label>
              <Input
                type="text"
                defaultValue="Our Suite of Solutions"
                className="w-full"
              />
            </div>
            <div>
              <Label className="mb-2 block font-medium">Hero Headline</Label>
              <Input
                type="text"
                defaultValue="Decagon Product Offerings"
                className="w-full"
              />
            </div>
          </div>
          <div>
            <Label className="mb-2 block font-medium">SEO Meta Description</Label>
            <Textarea
              rows={4}
              defaultValue="Discover our suite of AI-powered customer support solutions including AI Agents, Knowledge Bases, and Advanced Analytics."
              className="w-full"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white border-none transition-all">
            Update Global Settings
          </Button>
        </div>
      </div>
    </div>
  );
}