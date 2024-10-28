import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../utils/firebase';
import { toast } from 'react-toastify';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/Redux/slices/userSlice';
import { AVATAR_URL, NETFLIX_LOGO_URL } from '../utils/constants';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store?.user);
  const photoURL = user?.photoURL;

  const navigate = useNavigate();
  function handleSignOut() {
    signOut(auth).then(() => {
      // Sign-out successful.
      // dispatch(removeUser());
      toast.success("Signed Out sucessfully");
    }).catch((error) => {
      // An error happened.
      toast.error("Error while signing out");
    });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { email, uid, displayName } = user;
        const photoURL = user?.photoURL;
        dispatch(addUser({ email: email, userId: uid, displayName: displayName, photoURL: photoURL }));
        navigate("/browse");
        // ...
      } else {
        // User is signed out
        // ...
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [])

  return (
    <div className=''>
      <img className='absolute left-[18%] top-4 z-30' src={NETFLIX_LOGO_URL} alt='logo' width={200} height={80} />
      {
        user && <div className='absolute z-40 top-4 right-[10%] flex gap-4'>
          {
            photoURL ? <img src={photoURL} className='w-10 h-10 rounded-full'></img> : <img src={AVATAR_URL} className='w-10 h-10 rounded-full' />
          }

          <button className=' bg-gray-500 px-5 py-1  rounded-md text-2xl font-bold' onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      }
    </div>

  )
}

export default Header