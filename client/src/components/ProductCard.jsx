import React from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom';

function ProductCard({ product }) {
  const { currency, addToCart, removeFromCart, cartItems } = useAppContext();
  const navigate = useNavigate();

  if (!product) return null;

  return (
    <div
      onClick={() => {
        navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
        window.scrollTo(0, 0);
      }}
      className="border border-gray-200 rounded-lg px-3 py-3 bg-white shadow-sm hover:shadow-lg transition-all duration-300 w-full sm:w-56 hover:-translate-y-1"
    >
      <div className="group cursor-pointer flex items-center justify-center px-2">
        <img
          className="group-hover:scale-105 transition-transform duration-300 w-24 sm:w-32"
          src={product?.image?.[0] || ''}
          alt={product?.name || ''}
        />
      </div>

      <div className="text-gray-500 text-xs sm:text-sm mt-2">
        <p>{product?.category || ''}</p>
        <p className="text-gray-800 font-semibold text-sm sm:text-lg truncate">{product?.name || ''}</p>

        <div className="flex items-center gap-0.5 mt-1">
          {Array(5)
            .fill('')
            .map((_, i) => (
              <img
                key={i}
                className="w-3 sm:w-3.5"
                src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                alt="rating star"
              />
            ))}
          <p className="text-gray-500 text-xs">(4)</p>
        </div>

        <div className="flex items-end justify-between mt-3">
          <p className="text-base sm:text-xl font-bold text-primary-600">
            {currency} {product?.offerPrice || 0}{' '}
            <span className="text-gray-400 text-xs sm:text-sm line-through font-normal">
              {currency} {product?.price || 0}
            </span>
          </p>

          <div onClick={(e) => e.stopPropagation()} className="text-primary">
            {!cartItems?.[product?._id] ? (
              <button
                className="flex items-center justify-center gap-1 bg-primary-100 border border-primary-300 w-[60px] sm:w-[80px] h-[30px] sm:h-[34px] rounded-md text-primary-700 font-medium hover:bg-primary-200 transition-colors text-xs sm:text-sm"
                onClick={() => addToCart(product._id)}
              >
                <img src={assets.cart_icon} alt="cart icon" className="w-3 sm:w-4" />
                Add
              </button>
            ) : (
              <div className="flex items-center justify-center gap-2 w-[60px] sm:w-20 h-[30px] sm:h-[34px] bg-primary/20 rounded-md select-none">
                <button
                  onClick={() => removeFromCart(product._id)}
                  className="cursor-pointer text-md px-2 h-full hover:text-primary-800"
                >
                  -
                </button>
                <span className="w-4 sm:w-5 text-center text-xs sm:text-sm">
                  {cartItems?.[product?._id]}
                </span>
                <button
                  onClick={() => addToCart(product._id)}
                  className="cursor-pointer text-md px-2 h-full hover:text-primary-800"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
