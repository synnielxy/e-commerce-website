import React from "react";
import { useNavigate, useParams } from "react-router-dom";
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

const ProductFormComponent: React.FC<ProductFormProps> = ({productId, isEditMode}) => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState("");
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(false);

  const {register,handleSubmit,formState: { errors },watch,setValue,} = useForm<FormValues>({defaultValues: {
      name: "",
      description: "",
      category: "category1",
      price: "",
      stock: "",
      imageUrl: "",
    },
  });

  {
    /* fetch product data for edit mode */
  }
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

  {
    /* submit form data for create mode */
  }
  const onSubmit = async (data: FormValues) => {
    try {
      console.log("Product data:", data);
      const productData = {
        name: data.name,
        description: data.description,
        category: data.category,
        imageUrl: data.imageUrl,
        price: parseFloat(data.price),
        stock: parseInt(data.stock),
      };

      if (isEditMode && productId) {
        console.log(`Updating product with ID: ${productId}`);
        await axios.put(
          `http://localhost:3000/api/products/${productId}`,
          productData,
          { withCredentials: true }
        );
      } else {
        console.log("Creating new product");
        const response = await axios.post(
          "http://localhost:3000/api/products",
          productData,
          { withCredentials: true }
        );
        console.log("Product created successfully:", response.data);
      }
      navigate("/products");
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product. Please try again.");
    }
  };

  {
    /* handle 'upload' button click by setting image preview state*/
  }
  const handleImageUpload = () => {
    const imageUrl = watch("imageUrl");
    if (imageUrl) {
      setImagePreview(imageUrl);
      setImageError(false);
    } else {
      setImagePreview("");
    }
  };

  // reusable css format for form labels and input boxes
  const labelFormat = "block text-base font-medium mb-2 px-1 text-[#6B7280]";
  const inputBoxFormat =
    "w-full px-3 py-3 border text-base text-gray-600 border-gray-300 rounded-[0.2rem] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500";

  return (
    <div className="px-4 py-4 sm:py-8 max-w-6xl mx-auto">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 sm:text-left text-center">
        {isEditMode ? "Edit Product" : "Create Product"}
      </h1>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <p>Loading product data...</p>
        </div>
      ) : (
        <div className="bg-white w-full min-w-[310px] max-w-[660px] py-10 mx-auto sm:ml-0 p-4 sm:p-8 md:p-12 rounded-md">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Product name */}
            <div className="mb-6">
              <label className={labelFormat}>Product name</label>

              <input
                {...register("name", { required: true })}
                className={inputBoxFormat}
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>

            {/* Product description */}
            <div className="mb-4 sm:mb-6">
              <label className={labelFormat}>Product Description</label>

              <textarea
                {...register("description")}
                rows={4}
                className={inputBoxFormat}
              />
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
                <label className={labelFormat}>Price</label>
                <input
                  type="number"
                  {...register("price", { required: true })}
                  className={inputBoxFormat}
                />

                {errors.price && (
                  <span className="text-red-500 text-sm">
                    This field is required
                  </span>
                )}
              </div>
            </div>

            {/* In stock quantity and image link */}
            <div className="grid grid-cols-1 sm:grid-cols-7 gap-3 mb-6">
              <div className="sm:col-span-2">
                <label className={`${labelFormat} p-0`}>
                  In Stock Quantity
                </label>

                <input
                  type="number"
                  {...register("stock", { required: true })}
                  className={`${inputBoxFormat}`}
                />

                {errors.stock && (
                  <span className="text-red-500 text-sm">
                    This field is required
                  </span>
                )}
              </div>
              <div className="sm:col-span-5">
                <label className={labelFormat}>Add Image Link</label>
                <div className="relative flex">
                  <input
                    {...register("imageUrl")}
                    placeholder="http://"
                    className={inputBoxFormat}
                  />
                  <button
                    type="button"
                    onClick={handleImageUpload}
                    className="absolute text-align text-xs font-medium px-3 top-1.5 bottom-1.5 right-3 bg-indigo-600 text-white rounded-full"
                  >
                    Upload
                  </button>
                </div>
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
                        image is not valid!
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
                        image preview!
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="flex justify-center sm:justify-start">
              <button
                type="submit"
                className="w-[130px] bg-indigo-600 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full sm:w-auto"
              >
                {isEditMode ? "Edit Product" : "Add Product"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProductFormComponent;
