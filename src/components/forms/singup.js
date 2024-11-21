"use client"
import React, {useState, useEffect} from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import Link from 'next/link';
import { MdAttachEmail } from "react-icons/md";
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { redirect } from 'next/navigation';

const SignUp = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState(3);

    const [error, setError] = useState("");
    const router = useRouter();

    const {data: session, status: sessionStatus } = useSession();
    useEffect(()=> {
      if(sessionStatus === "authenticated"){
        redirect('/dashboard')
      }
    }, [sessionStatus, router]);

    const formSubmitFunction = async (e) => {

        e.preventDefault();
        if(!email || !name ){
            setError("All fields are necessary.")
            return false;
        }  

        try {

          const res = await fetch('/api/auth/signup', {
                method: "POST",
                header: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    name, email, password, role
                })
            })

            if(res.ok){

                const data = await res.json();
                const form = e.target;
                // form.reset();
            } else {
                console.log("User registration failed")
            }

            
        } catch (error) {
            console.log("Error During Registration", error);
        }

    
    }

  return (
   

    <div className="flex items-center justify-center flex-col min-h-screen bg-gradient-to-bl from-blue-100 via-cyan-300 via-55% to-sky-700">
  

      <div className="w-full max-w-sm py-8 px-6 bg-white rounded-md shadow-sm">

        <div>
            {error}
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Register</h2>
        <form onSubmit={formSubmitFunction}>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm  mb-4" htmlFor="Full Name">
                Full Name
              </label>
              <div className="flex items-center border focus-within:ring-2 focus-within:ring-clirxColor">
                <FaUser className="text-gray-500 mx-3" />
                <input
                  type="text"
                  id="Full Name"
                  placeholder="Enter your Full Name"
                  className="w-full px-3 py-2 text-gray-700 focus:outline-none"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm  mb-4" htmlFor="Email">
                Email
              </label>
              <div className="flex items-center border  focus-within:ring-2 focus-within:ring-clirxColor">
                <MdAttachEmail size={20} className="text-gray-500 mx-3" />
                <input
                  type="email"
                  id="Email"
                  placeholder="Enter your Email"
                  className="w-full px-3 py-2 text-gray-700 focus:outline-none"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-4" htmlFor="password">
                Password
              </label>
              <div className="flex items-center border focus-within:ring-2 focus-within:ring-clirxColor">
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
              className="w-full mt-6 bg-clirxColor text-white py-2 px-4 rounded-md hover:bg-clirxLightColor focus:outline-none focus:ring-2 focus:ring-clirxColor"
            >
              Register
            </button>

                <Link href="/login" className='flex items-center justify-center mt-3'>Already have an account <span className='underline ml-2'> Login</span></Link>

          </form>

        
      </div>

    </div>
  );
};

export default SignUp;
