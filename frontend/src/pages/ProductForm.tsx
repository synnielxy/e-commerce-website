import { useParams } from 'react-router-dom';
import ProductForm from '../components/products/ProductFormComponent';

const ProductManagement = () => {
  const { productId } = useParams();
  const isEditMode = !!productId;

  return (
    <div>
      <h1>{isEditMode ? 'Edit Product' : 'Create New Product'}</h1>
      <ProductForm 
        productId={productId} 
        isEditMode={isEditMode} 
      />
    </div>
  );
};

export default ProductManagement;