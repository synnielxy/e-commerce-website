import { useParams } from 'react-router-dom';
import ProductForm from '../components/products/ProductFormComponent';

const ProductManagement = () => {
  const { productId } = useParams();
  const isEditMode = !!productId;

  return (
    <div className='flex items-center justify-center' >
      <ProductForm 
        productId={productId} 
        isEditMode={isEditMode} 
      />
    </div>
  );
};

export default ProductManagement;