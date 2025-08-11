import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/appContext';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import ProductCard from '../components/ProductCard';

function ProductDetails() {
  const { products, currency, addToCart } = useAppContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [thumbnail, setThumbnail] = useState('');

  // Find the product by ID
  const product = products.find((item) => item._id === id);

  // Set related products when product or products change
  useEffect(() => {
    if (products.length > 0 && product) {
      const related = products.filter(
        (p) => p.category === product.category && p._id !== product._id
      );
      setRelatedProducts(related.slice(0, 5));
    }
  }, [products, product]);

  // Set default thumbnail
  useEffect(() => {
    if (product?.image?.[0]) {
      setThumbnail(product.image[0]);
    }
  }, [product]);

  // If product not found, return nothing
  if (!product) return null;

  return (
    <div className="mt-12">
      {/* Breadcrumb */}
      <p>
        <Link to="/">Home</Link> /
        <Link to="/products">Products</Link> /
        <Link to={`/products/${product.category.toLowerCase()}`}>{product.category}</Link> /
        <span className="text-primary">{product.name}</span>
      </p>

      <div className="flex flex-col md:flex-row gap-16 mt-4">
        {/* Left - Images */}
        <div className="flex gap-3">
          <div className="flex flex-col gap-3">
            {product.image.map((image, index) => (
              <div
                key={index}
                onClick={() => setThumbnail(image)}
                className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer"
              >
                <img src={image} alt={`Thumbnail ${index + 1}`} />
              </div>
            ))}
          </div>

          <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
            <img src={thumbnail} alt="Selected product" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Right - Details */}
        <div className="text-sm w-full md:w-1/2">
          <h1 className="text-3xl font-medium">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-0.5 mt-1">
            {Array(5)
              .fill('')
              .map((_, i) => (
                <img
                  key={i}
                  className="md:w-4 w-3.5"
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  alt="star"
                />
              ))}
            <p className="text-base ml-2">(4)</p>
          </div>

          {/* Price */}
          <div className="mt-6">
            <p className="text-gray-500/70 line-through">
              MRP: {currency} {product.price}
            </p>
            <p className="text-2xl font-medium">
              Offer Price: {currency} {product.offerPrice}
            </p>
            <span className="text-gray-500/70">(inclusive of all taxes)</span>
          </div>

          {/* Description */}
          <p className="text-base font-medium mt-6">About Product</p>
          <ul className="list-disc ml-4 text-gray-500/70">
            {Array.isArray(product.description) &&
              product.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
          </ul>

          {/* Buttons */}
          <div className="flex items-center mt-10 gap-4 text-base">
            <button
              onClick={() => addToCart(product._id)}
              className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={() => {
                addToCart(product._id);
                navigate('/cart');
              }}
              className="w-full py-3.5 cursor-pointer font-medium bg-primary text-white hover:bg-primary transition"
            >
              Buy now
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="flex flex-col items-center mt-20">
        <div className="flex flex-col items-center w-max">
          <p className="text-3xl font-medium">Related Products</p>
          <div className="w-20 h-0.5 bg-primary rounded-full mt-2"></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6 w-full">
          {relatedProducts
            .filter((p) => p.inStock)
            .map((p, index) => (
              <ProductCard key={index} product={p} />
            ))}
        </div>
        <button
          onClick={() => {
            navigate('/products');
            scrollTo(0, 0);
          }}
          className="mx-auto cursor-pointer px-12 my-16 py-2.5 border rounded text-primary hover:bg-primary/10 transition"
        >
          See more
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;
