import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";

interface ProductFormProps {
  productId?: string;
  isEditMode: boolean;
}

interface FormValues {
  name: string;
  description: string;
  category: string;
  price: string;
  stock: string;
  imageUrl: string;
}

const ProductFormComponent: React.FC<ProductFormProps> = ({ productId, isEditMode }) => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState("");
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      description: "",
      category: "category1",
      price: "",
      stock: "",
      imageUrl: "",
    },
    mode: "onBlur", // Only validate when focus leaves the field
  });

  // URL validation regex pattern - simpler version
  const urlPattern = /^(https?:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;

  useEffect(() => {
    if (isEditMode && productId) {
      setLoading(true);
      axios
        .get(`http://localhost:3000/api/products/${productId}`, {
          withCredentials: true,
        })
        .then((response) => {
          const product = response.data.product;
          console.log("Fetched product:", response.data);
          
          setValue("name", product.name);
          setValue("description", product.description);
          setValue("category", product.category);
          setValue("price", product.price.toString());
          setValue("stock", product.stock.toString());
          setValue("imageUrl", product.imageUrl);
          setImagePreview(product.imageUrl);
        })
        .catch((error) => {
          console.error("Error fetching product data:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [isEditMode, productId, setValue]);

  const onSubmit = async (data: FormValues) => {
    // Validate image URL before submission
    if (data.imageUrl && !validateImageUrl(data.imageUrl)) {
      alert("Please provide a valid image URL before submitting.");
      return;
    }
    
    setSubmitting(true);
    
    try {
      const productData = {
        name: data.name,
        description: data.description,
        category: data.category,
        imageUrl: data.imageUrl,
        price: parseFloat(data.price),
        stock: parseInt(data.stock),
      };

      if (isEditMode && productId) {
        await axios.put(
          `http://localhost:3000/api/products/${productId}`,
          productData,
          { withCredentials: true }
        );
      } else {
        await axios.post(
          "http://localhost:3000/api/products",
          productData,
          { withCredentials: true }
        );
      }
      
      // Success - navigate away
      navigate("/products");
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Separate function to validate URL to ensure consistency
  const validateImageUrl = (url: string): boolean => {
    if (!url) return false;
    return urlPattern.test(url);
  };

  const handleImageUpload = () => {
    const imageUrl = watch("imageUrl");
    
    // Reset error state
    setImageError(false);
    
    if (!imageUrl) {
      setImagePreview("");
      return;
    }
    
    // Validate URL format
    if (!validateImageUrl(imageUrl)) {
      setImageError(true);
      setImagePreview("");
      return;
    }
    
    // If URL format is valid, set preview
    setImagePreview(imageUrl);
  };

  // Reusable CSS formats
  const labelFormat = "block text-base font-medium mb-2 px-1 text-[#6B7280]";
  const inputBoxFormat = "w-full px-3 py-3 border text-base text-gray-600 border-gray-300 rounded-[0.2rem] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500";
  const errorInputBoxFormat = "w-full px-3 py-3 border text-base text-gray-600 border-red-500 rounded-[0.2rem] focus:outline-none focus:ring-red-500 focus:border-red-500";

  return (
    <div className="px-4 py-4 sm:py-8 max-w-6xl mx-auto">
      <h1 className="text-xl mt-10 sm:mt-5 sm:text-2xl font-bold mb-4 sm:mb-6 sm:text-left text-center">
        {isEditMode ? "Edit Product" : "Create Product"}
      </h1>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <p>Loading product data...</p>
        </div>
      ) : (
        <div className="bg-white w-full min-w-[310px] max-w-[660px] py-10 mx-auto sm:ml-0 p-4 sm:p-8 md:p-12 rounded-md">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Product name */}
            <div className="mb-6">
              <label className={labelFormat}>
                Product name
                <span className="text-red-500">*</span>
              </label>

              <input
                {...register("name", { 
                  required: "Product name is required",
                  minLength: { value: 3, message: "Name must be at least 3 characters" },
                  maxLength: { value: 100, message: "Name cannot exceed 100 characters" }
                })}
                className={errors.name ? errorInputBoxFormat : inputBoxFormat}
                aria-invalid={errors.name ? "true" : "false"}
              />
              {errors.name && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Product description */}
            <div className="mb-4 sm:mb-6">
              <label className={labelFormat}>Product Description</label>

              <textarea
                {...register("description", {
                  maxLength: { value: 500, message: "Description cannot exceed 500 characters" }
                })}
                rows={4}
                className={errors.description ? errorInputBoxFormat : inputBoxFormat}
              />
              {errors.description && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.description.message}
                </span>
              )}
            </div>

            {/* Category and price */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={labelFormat}>Category</label>

                <select
                  {...register("category")}
                  className={`${inputBoxFormat} px-0.5`}
                >
                  <option value="category1">Category1</option>
                  <option value="category2">Category2</option>
                  <option value="category3">Category3</option>
                  <option value="category4">Category4</option>
                  <option value="category5">Category5</option>
                  <option value="category6">Category6</option>
                </select>
              </div>

              <div className="mb-4 sm:mb-6">
                <label className={labelFormat}>
                  Price
                  <span className="text-red-500">*</span>
                </label>
                
                <input
                  type="number"
                  step="0.01"
                  {...register("price", { 
                    required: "Price is required",
                    min: { value: 0.01, message: "Price must be greater than 0" }
                  })}
                  className={errors.price ? errorInputBoxFormat : inputBoxFormat}
                />

                {errors.price && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {errors.price.message}
                  </span>
                )}
              </div>
            </div>

            {/* In stock quantity and image link */}
            <div className="grid grid-cols-1 sm:grid-cols-7 gap-3 mb-6">
              <div className="sm:col-span-2">
                <label className={`${labelFormat} p-0`}>
                  In Stock Quantity
                  <span className="text-red-500">*</span>
                </label>

                <input
                  type="number"
                  {...register("stock", { 
                    required: "Stock quantity is required",
                    min: { value: 0, message: "Stock cannot be negative" }
                  })}
                  className={errors.stock ? errorInputBoxFormat : inputBoxFormat}
                />

                {errors.stock && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {errors.stock.message}
                  </span>
                )}
              </div>
              
              <div className="sm:col-span-5">
                <label className={labelFormat}>
                  Add Image Link
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative flex">
                  <input
                    {...register("imageUrl", {
                      required: "Image URL is required"
                    })}
                    placeholder="http://"
                    className={errors.imageUrl || imageError ? errorInputBoxFormat : inputBoxFormat}
                  />
                  <button
                    type="button"
                    onClick={handleImageUpload}
                    className="absolute text-align text-xs font-medium px-3 top-1.5 bottom-1.5 right-3 bg-indigo-600 text-white rounded-full"
                  >
                    Upload
                  </button>
                </div>
                {errors.imageUrl && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {errors.imageUrl.message}
                  </span>
                )}
                {imageError && !errors.imageUrl && (
                  <span className="text-red-500 text-sm mt-1 block">
                    Please enter a valid URL (e.g., https://example.com/image.jpg)
                  </span>
                )}
              </div>
            </div>

            {/* Responsive image preview box */}
            <div className="border-2 border-dashed border-gray-300 p-6 rounded-md flex justify-center items-center mb-6 mx-auto w-full h-[200px] sm:w-[350px]">
              {imagePreview && !imageError ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-full max-w-full object-contain"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="text-center">
                  {imageError ? (
                    <>
                      <svg
                        className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-red-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                      <p className="mt-1 text-sm text-red-500">
                        Invalid image URL!
                      </p>
                    </>
                  ) : (
                    <>
                      <svg
                        className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="mt-1 text-sm text-gray-500">
                        Image preview!
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="flex justify-center sm:justify-start">
              <button
                type="submit"
                disabled={submitting}
                className={`w-[130px] font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full sm:w-auto ${
                  submitting 
                    ? "bg-indigo-400 cursor-not-allowed" 
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }`}
              >
                {submitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {isEditMode ? "Updating..." : "Creating..."}
                  </span>
                ) : (
                  isEditMode ? "Edit Product" : "Add Product"
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProductFormComponent;
