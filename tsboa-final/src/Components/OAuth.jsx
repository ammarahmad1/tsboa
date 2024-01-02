import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';


function OAuth() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  const handleGoogleClick = async () => {
    try{
        const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
     
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate('/');
    }  catch(error) {
        console.log('Could not sign in with google', error)
    }
  }

  return (
    <div>
              {/* Continue with Google */}
              <button onClick={handleGoogleClick} type='button' className="bg-[#4285F4] text-white px-3 py-1.5 rounded-md flex items-center space-x-2">
                <FaGoogle />
                <span>Google</span>
              </button>
    </div>
  )
}

export default OAuth
