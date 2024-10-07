"use client"
import React, {useState, useEffect} from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import Link from 'next/link';
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';


const SignIn = () => {
  
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [info, setInfo] = useState({text: '', background:''});
    const [isLogin, setIsLogin] = useState(false);

    const {data: session, status: sessionStatus } = useSession();
    useEffect(()=> {
      if(sessionStatus === "authenticated"){
        setInfo({text: "Redirecting...", background: 'bg-green-500'});
        setIsLogin(true)
        if(session?.user?.role == 1){
        
          router.push('/dashboard')
        } else {
          router.push('/appt')
        }
       
      }
    }, [sessionStatus, router]);

    const formSubmitFunction = async (e) => {

        e.preventDefault();
        if(!email || !password ){
            setInfo({text:"All fields are necessary.", background: 'bg-red-500'})
            return false;
        }  

        try {
          const result = await signIn('credentials', {
              redirect: false,
              email,
              password,
          });

          if (result.error) {
              setInfo({text:"Error Email or Password", background: 'bg-red-500'});
          } else {
            setInfo({text: "Redirecting...", background: 'bg-green-500'});
            setIsLogin(true)
              router.push('/admin');
          }
      } catch (error) {
          console.log("Error During Sign-In", error);
          setInfo({text:"An unexpected error occurred." , background: 'bg-red-500'});
      }
    
    }

  return (
   

    <div className="flex items-center justify-center flex-col min-h-screen bg-gradient-to-bl from-blue-100 via-cyan-300 via-55% to-sky-700">
  

      <div className="w-full max-w-sm py-8 px-6 bg-white rounded-md shadow-md">

        {info.text && (
          <div className={`w-full p-4 ${info.background} text-white rounded-md`}>
            {info.text}
          </div>
        )}
        

      { !isLogin && (   <>

 
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Log In</h2>
        
        <form onSubmit={formSubmitFunction}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm  mb-4" htmlFor="username">
                Username
              </label>
              <div className="flex items-center border-b-2  focus-within:ring-2 focus-within:ring-clirxColor">
                <FaUser className="text-gray-500 mx-3" />
                <input
                  type="text"
                  id="username"
                  placeholder="Enter your username"
                  className="w-full px-3 py-2 text-gray-700 focus:outline-none"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-8">
              <label className="block text-gray-700 text-sm mb-4" htmlFor="password">
                Password
              </label>
              <div className="flex items-center border-b focus-within:ring-2 focus-within:ring-clirxColor">
                <FaLock className="text-gray-500 mx-3" />
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 text-gray-700 focus:outline-none"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              className=" bg-clirxColor text-white py-2 px-4 rounded hover:bg-clirxLightColor focus:outline-none focus:bg-clirxColor"
            >
              Sign In
            </button>

                <Link href="/signup" className='flex items-center justify-center mt-3'>Don't have an account <span className='underline ml-2'> Register</span></Link>

          </form>
          </>  )}

      </div>

      <div className="flex items-center justify-center mt-5">
        <FaFacebook onClick={() => signIn("facebook")} size={40} className='p-2  mx-1'/>
        <FaGoogle size={40} className='p-2  mx-1'/>
        <FaLinkedin size={40} className='p-2  mx-1'/>
      </div>
    </div>

  );
};

export default SignIn;
