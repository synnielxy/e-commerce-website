// In /frontend/src/components/products/ProductFormComponent.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

interface ProductFormProps {
  productId?: string;
  isEditMode: boolean;
}

interface FormValues {
  name: string;
  description: string;
  category: string;
  price: string;
  quantity: string;
  imageUrl: string;
}

const ProductFormComponent: React.FC<ProductFormProps> = ({ productId, isEditMode }) => {
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      name: '',
      description: '',
      category: 'category1',
      price: '',
      quantity: '',
      imageUrl: ''
    }
  });

  const onSubmit = (data: FormValues) => {
    console.log('Product data:', data);
    
    if (isEditMode) {
      console.log(`Updating product with ID: ${productId}`);
      // update logic
    } else {
      console.log('Creating new product');
      // create logic
    }
    navigate('/products');
  };

  return (
    <div style={{ maxWidth: '500px', margin: '20px auto', padding: '20px', border: '1px solid #ddd' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Name:
          </label>
          <input
            {...register("name", { required: true })}
            className="w-full px-8 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.name && <span className="text-red-500">This field is required</span>}
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Description:
          </label>
          <input
            {...register("description")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category:
          </label>
          <select
            {...register("category")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="category1">Category 1</option>
            <option value="category2">Category 2</option>
            <option value="category3">Category 3</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price:
          </label>
          <input
            type="number"
            {...register("price", { required: true })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.price && <span className="text-red-500">This field is required</span>}
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            In Stock Quantity:
          </label>
          <input
            type="number"
            {...register("quantity", { required: true })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.quantity && <span className="text-red-500">This field is required</span>}
        </div>
        
        <button
          type="submit"
          style={{
            backgroundColor: "#5048E5",
            color: "white",
            borderRadius: "4px",
            padding: "10px 16px",
            border: "none",
            fontWeight: 500
          }}
        >
          {isEditMode ? 'Edit Product' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default ProductFormComponent;