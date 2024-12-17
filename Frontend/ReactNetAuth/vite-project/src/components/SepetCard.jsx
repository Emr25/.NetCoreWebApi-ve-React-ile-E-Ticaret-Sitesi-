import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { completeCard, removeFromCart } from '../redux/BasketSlice';

const SepetCard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store.basket);
  const [order, setOrder] = useState(false);

  const handleDelete = (id) => {
    dispatch(removeFromCart({ id }));
  };

  const complete = () => {
    dispatch(completeCard());
    setOrder(true);
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-center text-3xl font-bold mb-8">Sepetim</h1>
      {order && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mb-4" role="alert">
          Siparişler Oluşturuldu
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg className="fill-current h-6 w-6 text-blue-500" role="button" viewBox="0 0 20 20">
              <path d="M14.348 14.849l-4.849-4.849-4.849 4.849-1.414-1.414 4.849-4.849-4.849-4.849 1.414-1.414 4.849 4.849 4.849-4.849 1.414 1.414-4.849 4.849 4.849 4.849z" />
            </svg>
          </span>
        </div>
      )}
      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product, index) => (
            <div key={index} className="bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-105">
              <img className="w-full h-32 object-cover" src={product.ImageUrl} alt={product.name} />
              <div className="p-4">
                <h2 className="text-lg font-bold">{product.name}</h2>
                <p>Price: ${product.Price}</p>
                <p>Adet Sayısı: {product.count}</p>
                <p>Tutar: {product.count * product.Price} TL</p>
                <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mt-4" onClick={() => handleDelete(product.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Sepetinizde ürün yok.</p>
      )}
      {products && products.length > 0 && (
        <div className="mt-8 flex justify-between items-center">
          <h2 className="text-xl font-bold">
            Toplam: ${products.reduce((total, product) => total + product.count * product.Price, 0)}
          </h2>
          <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded text-lg" onClick={complete}>
            Sipariş Tamamla
          </button>
        </div>
      )}
    </div>
  );
};

export default SepetCard;
