import { Link } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
}

// Definisikan interface untuk props ProductTable
interface ProductTableProps {
  products: Product[];
}

const ProductTable = ({ products }: ProductTableProps) => {
  return (
    <div className='shadow-md rounded-lg overflow-hidden'>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead>
          <tr>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              ID
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Title
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Price
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Category
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Action
            </th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-200'>
          {products.map((product) => (
            <tr key={product.id} className='hover:bg-gray-900'>
              <td className='px-6 py-4 whitespace-nowrap text-sm'>
                {product.id}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                {product.title}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm'>
                ${product.price.toFixed(2)}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm'>
                {product.category}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                <Link
                  to={`/products/${product.id}`}
                  className='text-indigo-600 hover:text-indigo-900'
                >
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
