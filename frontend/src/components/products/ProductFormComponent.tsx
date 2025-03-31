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

  // reusable css format for form labels and input boxes
  const labelFormat = "block text-base font-medium mb-2 px-1 text-[#6B7280]"
  const inputBoxFormat = "w-full px-3 py-3 border text-base text-gray-600 border-gray-300 rounded-[0.2rem] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"

  return (
    <div className="px-4 py-4 sm:py-8 max-w-6xl mx-auto">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 sm:text-left text-center ">
        {isEditMode ? 'Edit Product' : 'Create Product'}
      </h1>
      
      <div className="bg-white w-full min-w-[310px] max-w-[660px] py-10 mx-auto sm:ml-0 p-4 sm:p-8 md:p-12 rounded-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label className={labelFormat}>
              Product name
            </label>
            <input
              {...register("name", { required: true })}
              className={inputBoxFormat}
            />
            {errors.name && <span className="text-red-500 text-sm">This field is required</span>}
          </div>
          
          <div className="mb-4 sm:mb-6">
            <label className={labelFormat}>
              Product Description
            </label>
            <textarea
              {...register("description")}
              rows={4}
              className={inputBoxFormat}            />
          </div>
          
          {/* On mobile, one column; on larger screens, use two columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={labelFormat}>
                Category
              </label>
              <select
                {...register("category")}
                className={`${inputBoxFormat} px-0.5`}            >
                <option value="category1">Category1</option>
                <option value="category2">Category2</option>
                <option value="category3">Category3</option>
                <option value="category4">Category4</option>
                <option value="category5">Category5</option>
                <option value="category6">Category6</option>
              </select>
            </div>
            
            <div className='mb-4 sm:mb-6'>
              <label className={labelFormat}>
                Price
              </label>
              <input
                type="number"
                {...register("price", { required: true })}
                className={inputBoxFormat}                />
              {errors.price && <span className="text-red-500 text-sm">This field is required</span>}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-7 gap-3 mb-6">
            <div className='sm:col-span-2'>
              <label className={`${labelFormat} p-0`}>
                In Stock Quantity
              </label>
              <input
                type="number"
                {...register("quantity", { required: true })}
                className={`${inputBoxFormat}`}/>
              {errors.quantity && <span className="text-red-500 text-sm">This field is required</span>}
            </div>
            <div className='sm:col-span-5'>
              <label className={labelFormat}>
                Add Image Link
              </label>
              <div className="relative flex">
                <input
                  {...register("imageUrl")}
                  placeholder="http://"
                  className={inputBoxFormat}/>
                <button
                  type="button"
                  className="absolute text-align text-xs font-medium px-3 top-1.5 bottom-1.5 right-3 bg-indigo-600 text-white rounded-full"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
          
          {/* Responsive image preview box */}
          <div className="border-2 border-dashed border-gray-300 p-6 rounded-md flex justify-center items-center mb-6 mx-auto w-full h-[200px] sm:w-[350px]">
            <div className="text-center">
              <svg className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="mt-1 text-sm text-gray-500">image preview!</p>
            </div>
          </div>
          
          <div className="flex justify-center sm:justify-start">
            <button
              type="submit"
              className="w-[130px] bg-indigo-600 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full sm:w-auto"
            >
              {isEditMode ? 'Edit Product' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormComponent;