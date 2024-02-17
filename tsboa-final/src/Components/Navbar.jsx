import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoImage from './Images/logo.png';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  deleteUserFailure,
  signOutUserStart,
  deleteUserStart,
  deleteUserSuccess,
} from '../redux/user/userSlice';

const Navbar = () => {

  const dispatch = useDispatch(); 
  const { currentUser } = useSelector((state) => state.user);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const response = await axios.get('/api/auth/signout');
      const data = response.data;
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      
    } catch (error) {
      dispatch(deleteUserFailure(error.message));  // Fix: Use error.message instead of data.message
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close the menu when a link is clicked
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className='flex justify-between items-center h-16 md:h-92 max-w-[1512px] mx-auto px-4 text-[#475467] border-b'>
      <Link to="/">
        <img src={logoImage} alt="Logo" className="h-10 md:h-auto" />
      </Link>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-[#475467] focus:outline-none">
          <svg
            className="h-6 w-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>

      {/* Mobile Menu List */}
      {menuOpen && (
        <div className="md:hidden absolute top-16 right-0 w-full bg-white border rounded-md shadow-md">
          <ul className="flex flex-col items-center">
            <li className='p-4 border-b w-full text-center'>
              <Link to="/" onClick={closeMenu}>
                Home
              </Link>
            </li>
            <li className='p-4 border-b w-full text-center'>
              <Link to="/endorsments" onClick={closeMenu}>
                Endorsements
              </Link>
            </li>
            <li className='p-4 border-b w-full text-center'>
              <Link to="/" onClick={closeMenu}>
                Business-Directory
              </Link>
            </li>
            <li className='p-4 w-full text-center'>
              <Link to="/events" onClick={closeMenu}>
                Events
              </Link>
            </li>
            <li className='p-4 w-full text-center'>
              <Link to="/newspage" onClick={closeMenu}>
                News
              </Link>
            </li>
          </ul>

          {/* Buttons */}
          <div className='flex justify-center items-center gap-4 p-4'>
            {currentUser ? (
             <div>
             <img
               className='rounded-full h-7 w-7 object-cover cursor-pointer'
               src={currentUser.avatar}
               alt='profile'
             />
             <p className="text-[#475467] text-sm mt-1 cursor-pointer" onClick={handleSignOut}>
               Sign Out
             </p>
           </div>
            ) : (
            <div>
            <button className='min-w-[100px] mr-2 h-10 border border-[#0E214B] bg-white font-semibold rounded-md'>
            <Link to="/signin" onClick={closeMenu}>
              Login
            </Link>
            </button>
           
            </div>
            )}
          </div>
        </div>
      )}

      {/* Desktop Menu */}
      <ul className={`hidden md:flex justify-center items-center text-[#475467] font-semibold ${menuOpen ? 'flex' : 'hidden'}`}>
        <li className='p-4'>
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>
        </li>
        <li className='p-4'>
          <Link to="/endorsments" onClick={closeMenu}>
            Endorsements
          </Link>
        </li>
        <li className='p-4'>
          <Link to="/businessdirectory" onClick={closeMenu}>
            Business-Directory
          </Link>
        </li>
        <li className='p-4'>
          <Link to="/events" onClick={closeMenu}>
            Events
          </Link>
        </li>
        <li className='p-4'>
          <Link to="/newspage" onClick={closeMenu}>
            News
          </Link>
        </li>
      </ul>

      {/* Buttons */}
      <div className='hidden md:flex gap-4'>
        
      {currentUser ? (
         <div>
         <div className="flex items-center cursor-pointer" onClick={handleSignOut}>
           <img
             className='rounded-full h-10 w-10 mr-3 object-cover'
             src={currentUser.avatar}
             alt='profile'
           />
           <p className="text-[#475467] text-sm">Sign Out</p>
         </div>
       </div>
            ) : (
            <div>
        <button className='p-2 min-w-83 h-10 border mr-2 border-[#0E214B] bg-white font-semibold rounded-md'>
          <Link to="/signin" onClick={closeMenu}>
            Login
          </Link>
        </button>
        
        </div>
            )}
      </div>
    </div>
  );
};

export default Navbar;
