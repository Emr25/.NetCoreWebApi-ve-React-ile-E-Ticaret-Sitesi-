import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { addToBasket } from '../redux/BasketSlice';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [order, setOrder] = useState(false);

  const getProductById = async () => {
    const response = await axios.get(`http://localhost:5020/api/Products/${id}`);
    setProduct(response.data);
  };

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  useEffect(() => {
    getProductById().then(() => setLoading(false));
  }, [id]);

  const sepeteEkle = () => {
    const payload = {
      id,
      Name: product.name,
      Price: product.price,
      ImageUrl: product.imageUrl,
      count,
    };
    dispatch(addToBasket(payload));
    setOrder(true);
  };

  return (
    <div className="mt-12">
      <div className="container mx-auto px-4">
        {order && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
            Siparişiniz başarıyla tamamlandı!
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg className="fill-current h-6 w-6 text-green-500" role="button" viewBox="0 0 20 20">
                <path d="M14.348 14.849l-4.849-4.849-4.849 4.849-1.414-1.414 4.849-4.849-4.849-4.849 1.414-1.414 4.849 4.849 4.849-4.849 1.414 1.414-4.849 4.849 4.849 4.849z" />
              </svg>
            </span>
          </div>
        )}
        {loading && (
          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mb-4" role="alert">
            Bilgiler Yükleniyor....
          </div>
        )}
        <h1 className="text-center text-4xl font-serif text-gray-900 mt-10">{product.name}</h1>
        <div className="flex flex-wrap mt-10">
          <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
            <img className="w-80 h-80 object-cover rounded-lg shadow-lg" src={product.imageUrl} alt={product.name} />
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start px-4">
            <h3 className="text-2xl text-yellow-300">
              Fiyat: <span className="text-green-300">{product.price} TL</span>
            </h3>
            <div className="flex items-center mt-6">
              <button className="bg-yellow-500 text-white px-4 py-2 rounded-l-lg hover:bg-yellow-600" onClick={increment}>
                +
              </button>
              <span className="bg-white text-black px-4 py-2 border-t border-b">{count} Adet</span>
              <button className="bg-red-500 text-white px-4 py-2 rounded-r-lg hover:bg-red-600" onClick={decrement}>
                -
              </button>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-8 rounded mt-6"
              onClick={sepeteEkle}
            >
              Satın Al
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default ProductDetails;
