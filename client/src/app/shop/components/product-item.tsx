import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAddToCart } from '@/hooks/shop/use-add-to-cart';
import { PlusIcon } from 'lucide-react';
import { vietnamCurrency } from '@/utils';

interface Product {
    _id: string;
    title: string;
    description: string;
    currentQuantity: number;
    price: number;
    category: string;
    quantity: number | 0;
    cover: string;
    author: {
        name: string;
    }
  }

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const { handleAddToCart, isAdding } = useAddToCart();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleAddToCart(1, {
        _id: product._id,
        description: product.description,
        title: product.title,
        currentQuantity: product.currentQuantity,
        price: product.price,
        category: product.category,
        cover: product.cover,
        author: product.author,
    });
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md flex">
        <Link href={`/product/${product._id}`} className="block">
        <div className="relative overflow-hidden">
          <Image
            src={product.cover}
            alt={product.title}
            width={300}
            height={200}
            className="w-full h-20 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300"></div>
        </div>
        <div className="p-2">
          <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-200 line-clamp-1 mb-1">{product.title}</h3>
        </div>
      </Link>
      <div className="px-2  pb-3 flex items-center justify-between">
        <div>
        <div className="text-sm font-bold text-primary-600 dark:text-primary-400 whitespace-nowrap">
          {vietnamCurrency(product.price)}
        </div>
        </div>
        <button 
          onClick={handleClick}
          disabled={isAdding}
          className={`p-2 rounded-full transition-all duration-300
            ${isAdding
              ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed' 
              : 'bg-green-300 hover:bg-green-400 shadow-sm hover:shadow-md'}`}
        >
          {isAdding ? (
            <span className="w-3 h-3 block rounded-full border-2 border-gray-500 border-t-transparent animate-spin"></span>
          ) : (
            <PlusIcon className="w-3 h-3 text-green-800" />
          )}
        </button>
      </div>
    </div>
  );
};

export default React.memo(ProductItem);