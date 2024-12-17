import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../redux/AuthSlice';
import { FaShoppingCart } from 'react-icons/fa';

const Header = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-yellow-500">
          MyAwesomeSite
        </Link>
        <div className="md:hidden">
          <button className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="hover:text-yellow-500">Home</Link>
          <Link to="/about" className="hover:text-yellow-500">About</Link>
          <Link to="/contact" className="hover:text-yellow-500">Contact</Link>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/card" className="hover:text-yellow-500">
            <FaShoppingCart size={24} />
          </Link>
          {user ? (
            <>
              <Link to="/profile" className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-2 rounded-md">Profile</Link>
              <button onClick={logout} className="bg-red-700 hover:bg-red-800 text-white px-3 py-2 rounded-md">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-2 rounded-md">Giriş Yap</Link>
              <Link to="/register" className="bg-yellow-700 hover:bg-yellow-800 text-white px-3 py-2 rounded-md">Üye Ol</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
