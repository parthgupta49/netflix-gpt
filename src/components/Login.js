import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify';
import Header from './Header'
import { validate } from '../utils/validate';
import { auth } from '../utils/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/Redux/slices/userSlice';
import { MAIN_BG_IMAGE, MY_GITHUB_IMAGE } from '../utils/constants';
const Login = () => {

    const user = useSelector((store) => store.user);
    console.log(user);
    const dispatch = useDispatch();

    const [isLogin, setLogin] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const handleClick = () => {
        setLogin(!isLogin);
    }

    const handleFormSubmit = () => {
        const emailId = email.current.value;
        const userPassword = password.current.value;
        const userName = name?.current?.value;
        // const userName = 
        const message = validate(emailId, userPassword);
        setErrorMessage(message);

        if (message) return;

        // Signup / SignIn LOGIC
        if (!isLogin) {
            // SignUp Logic
            createUserWithEmailAndPassword(auth, emailId, userPassword)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: userName, photoURL: {MY_GITHUB_IMAGE}
                    }).then(() => {
                        const {uid,email,displayName,photoURL} = auth.currentUser;
                        // Profile updated!
                        dispatch(addUser({email : email,userId : uid,displayName : displayName,photoURL : photoURL}))
                        toast.info("Profile Updated with name and image");
                        // ...
                    }).catch((error) => {
                        // An error occurred
                        // ...
                        setErrorMessage(error.message);
                    });

                    console.log(user);
                    toast.success("Signed Up Successfully");
                    // dispatch(addUser(user));
                    
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    toast.error("couldn't signup");
                    setErrorMessage(errorCode + " " + errorMessage);
                    // ..
                });

        }
        else {
            // Login Logic
            signInWithEmailAndPassword(auth, emailId, userPassword)
                .then((userCredential) => {
                    // Signed In
                    const user = userCredential.user;
                    console.log(user);
                    toast.success("Logged In Successfully");
                })
                .catch((error) => {
                    // error while logging in
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + " " + errorMessage);
                    toast.error("Couldn't login");
                })
        }

    }

    return (
        <div className='w-screen h-screen overflow-x-hidden' >
            <div className='flex justify-center w-full h-full items-center relative'>
                <Header />
                <div className='relative w-screen' >
                    <div className='bg-black bg-opacity-60 w-full h-full absolute z-10'></div>
                    <img className='w-full' src={MAIN_BG_IMAGE} alt='background-image' />
                </div>

                <div className='z-20 flex flex-col absolute left-[50%] right-[50] -translate-x-[50%] bg-black bg-opacity-60 text-white w-3/12 px-[3.5%] pt-14 pb-[8%] gap-4'>
                    <p className='text-3xl font-semibold'>{isLogin ? "Sign In" : "Sign Up"}</p>
                    <form className='flex flex-col placeholder:text-[#8c8c8c] gap-4 mt-5' onSubmit={(e) => e.preventDefault()}>
                        {!isLogin && <input ref={name} type='text' placeholder='Full Name' className='border-[1px] border-[#888282] bg-transparent px-2 py-4 rounded-md' />}
                        <input ref={email} type='text' placeholder='Email or mobile number' className='border-[1px] border-[#888282] bg-transparent px-2 py-4 rounded-md' />
                        <input ref={password} type='password' placeholder='Password' className='border-[1px] border-[#888282] bg-transparent px-2 py-4 rounded-md' />
                        <p className='text-[#fa484e] text-xl text-center'>{errorMessage !== null && errorMessage}</p>
                        <button className=' bg-[#DC161D] py-2 font-semibold rounded-md' onClick={handleFormSubmit}>{isLogin ? "Sign In" : "Sign Up"}</button>
                    </form>
                    {isLogin &&
                        <div className='flex flex-col gap-4'>
                            <p className='text-[#888282] text-center'>OR</p>
                            <button className='bg-[#746e6e91] py-3 rounded-md'>Use a sign-in code</button>
                            <button>Forgot Password?</button>
                        </div>
                    }

                    {isLogin && <label className='flex gap-3 items-center'>
                        <span className='w-5 h-5 rounded-sm bg-black flex justify-center items-center border-[#888282] hover:border-white border-[1px] duration-100 transition-all'><input type='checkbox' name='RememberMe' className=' appearance-none' /></span> <span className='font-semibold'>Remember me </span>
                    </label>}

                    <p className='text-[#888282]'>{isLogin ? "New to Netflix" : "Already a User"}? <span className='font-semibold text-white cursor-pointer' onClick={handleClick}>{isLogin ? "Sign Up Now" : "Sign In Now."}</span></p>
                    <p className='text-[#888282] text-sm'>This page is protected by Google reCAPTCHA to ensure you're not a bot. <span className='text-blue-600'>Learn more.</span></p>
                </div>
            </div>
        </div>
    )
}

export default Login