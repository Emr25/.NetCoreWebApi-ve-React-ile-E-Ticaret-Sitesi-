import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllProducts } from '../redux/productSlice';
import Footer from './Footer';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store.product);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllProducts()).then(() => setLoading(false));
  }, [dispatch]);

  return (
    <div className="mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-center text-4xl font-serif text-gray-900 mt-10">Teknoloji Ürünlerimiz</h1>
        <hr className="my-6 border-gray-300" />
        {loading && (
          <div className="flex justify-center">
            <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative" role="alert">
              Ürünler Yükleniyor....
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg className="fill-current h-6 w-6 text-blue-500" role="button" viewBox="0 0 20 20">
                  <path d="M14.348 14.849l-4.849-4.849-4.849 4.849-1.414-1.414 4.849-4.849-4.849-4.849 1.414-1.414 4.849 4.849 4.849-4.849 1.414 1.414-4.849 4.849 4.849 4.849z" />
                </svg>
              </span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center">
          {products.map((product, index) => (
            <div key={index} className="bg-gray-800 shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl max-w-xs mt-20">
              <img className="w-full h-40 object-cover" src={product.imageUrl} alt={product.name} />
              <div className="p-4 bg-gray-900 text-white text-center">
                <h2 className="text-xl font-bold text-yellow-300 mb-2">{product.name}</h2>
                <p className="text-lg text-gray-300 mb-4">Fiyat: <span className="text-green-300">{product.price} TL</span></p>
                <button
                  className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded w-full"
                  onClick={() => navigate(`/product-details/${product.id}`)}
                >
                  Satın Al
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
       <Footer/>
    </div>
  );
};

export default ProductList;
