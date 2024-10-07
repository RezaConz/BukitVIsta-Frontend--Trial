// src/pages/ProductDetail.jsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) throw new Error("Failed to fetch product details");
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [id]);

  if (loading)
    return (
      <div className='flex justify-center items-center h-screen w-screen'>
        <div className='animate-spin rounded-full h-32 w-32 border-b-2 '></div>
      </div>
    );

  if (error)
    return (
      <div className='flex justify-center items-center h-screen text-red-500'>
        Error: {error}
      </div>
    );
  if (!product)
    return (
      <div className='flex justify-center items-center h-screen text-gray-500'>
        Product not found
      </div>
    );

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mx-auto shadow-lg rounded-lg overflow-hidden'>
        <div className='md:flex'>
          <div className='md:flex-shrink-0'>
            <img
              className='h-64 w-full object-cover md:w-64'
              src={product.image}
              alt={product.title}
            />
          </div>
          <div className='p-8'>
            <div className='uppercase tracking-wide text-sm text-indigo-500 font-semibold'>
              {product.category}
            </div>
            <h2 className='mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl'>
              {product.title}
            </h2>
            <p className='mt-4 text-xl text-gray-500'>
              ${product.price.toFixed(2)}
            </p>
            <p className='mt-4 text-gray-600'>{product.description}</p>

            <div className='mt-6'>
              <div className='flex items-center'>
                <div className='flex items-center'>
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <svg
                      key={rating}
                      className={`h-5 w-5 flex-shrink-0 ${
                        rating < Math.round(product.rating.rate)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                      aria-hidden='true'
                    >
                      <path
                        fillRule='evenodd'
                        d='M10 1l2.928 6.882 6.072.524-4.72 4.518 1.368 6.676L10 16.219l-5.648 3.381 1.368-6.676L1 8.406l6.072-.524L10 1z'
                        clipRule='evenodd'
                      />
                    </svg>
                  ))}
                </div>
                <p className='ml-2 text-sm text-gray-600'>
                  {product.rating.rate} ({product.rating.count} reviews)
                </p>
              </div>
            </div>

            <div className='mt-8 flex justify-between items-center'>
              <button className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                Add to Cart
              </button>
              <Link
                to='/products'
                className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
