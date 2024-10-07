import { useEffect } from "react";
import { useProduct } from "../../context/ProductContext";
import { useAuth } from "../../context/AuthContext";
import ProductTable from "../../component/product-table";

function ProductDashboard() {
  const {
    products,
    categories,
    currentCategory,
    limit,
    sort,
    loading,
    error,
    fetchProducts,
    setCategory,
    setLimit,
    setSort,
  } = useProduct()!;
  const { logout } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, [currentCategory, limit, sort]);

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen w-screen'>
        Loading...
      </div>
    );
  }
  if (error) {
    return (
      <div className='flex justify-center items-center h-screen text-red-500'>
        Error: {error}
      </div>
    );
  }

  return (
    <div className='flex flex-col mx-12 py-8'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-3xl font-bold'>Product Dashboard</h2>
        <button
          onClick={logout}
          className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded'
        >
          Logout
        </button>
      </div>

      <div className='shadow-md rounded-lg p-6 mb-6'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div>
            <label className='block text-sm font-medium mb-2'>Category:</label>
            <select
              value={currentCategory}
              onChange={(e) => setCategory(e.target.value)}
              className='block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            >
              <option value=''>All</option>
              {categories.map((category: string) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className='block text-sm font-medium mb-2'>Limit:</label>
            <select
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className='block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
          <div>
            <label className='block text-sm font-medium mb-2'>Sort:</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as "asc" | "desc")}
              className='block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            >
              <option value='asc'>Ascending</option>
              <option value='desc'>Descending</option>
            </select>
          </div>
        </div>
      </div>

      <ProductTable products={products} />
    </div>
  );
}

export default ProductDashboard;
