"use client"
import React, { useState, useEffect } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';


const SignIn = () => {

    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [info, setInfo] = useState({ text: '', background: '' });
    const [isLogin, setIsLogin] = useState(false);

    const { data: session, status: sessionStatus } = useSession();

    useEffect(() => {
        if (sessionStatus === "authenticated") {
            setInfo({ text: "Redirecting...", background: 'bg-green-500' });
            setIsLogin(true)
            if (session?.user?.role == 1) {

                router.push('/dashboard')
            } else {
                router.push('/appt-interaction')
            }
        }
    }, [sessionStatus, router, session?.user?.role]);

    const formSubmitFunction = async (e) => {

        e.preventDefault();

        if (!email || !password) {
            setInfo({ text: "All fields are necessary.", background: 'bg-red-500' })
            return false;
        }

        try {

            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });

            if (result.error) {
                setInfo({ text: "Error Email or Password", background: 'bg-red-500' });
            } else {
                setInfo({ text: "Redirecting...", background: 'bg-green-500' });
                setIsLogin(true)
                router.push('/admin');
            }
        } catch (error) {
            console.log("Error During Sign-In", error);
            setInfo({ text: "An unexpected error occurred.", background: 'bg-red-500' });
        }
    }

    return (
        <div className="flex items-center justify-center flex-col min-h-screen bg-cover bg-center " style={{
            backgroundImage: "url('/img/signup-background.jpg')",
        }}>


            <div className="w-full max-w-sm py-8 px-6 bg-white rounded-md shadow-sm">
                {info.text && (
                    <div className={`w-full p-4 ${info.background} text-white rounded-md`}>
                        {info.text}
                    </div>
                )}
                {!isLogin && (
                    <>

                    <h2 className="text-xl font-bold text-center text-gray-800 mb-0 uppercase">Welcome to APPT portal</h2>
                    <h2 className="text-sm font-bold text-center text-gray-800 mb-6 uppercase">( Accreditation Policy & Procedure Tool )</h2>
                    <h2 className="text-xl font-bold text-center text-gray-800 mb-6">SIGN IN</h2>

                    <form onSubmit={formSubmitFunction}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm  mb-4" htmlFor="username">
                                Username
                            </label>
                            <div className="flex items-center border-b-2  focus-within:ring-2 focus-within:ring-clirxColor">
                                <FaUser className="text-gray-500 mx-3" color='#336eb0' />
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
                                <FaLock className="text-gray-500 mx-3" color='#336eb0' />
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
                            className=" bg-clirxColor text-white py-2 px-4 rounded hover:bg-clirxLightColor w-full focus:outline-none focus:bg-clirxColor"
                        >
                            Sign In
                        </button>

                        {/* <Link href="/signup" className='flex items-center justify-center mt-3'>Don't have an account <span className='underline ml-2'> Register</span></Link> */}

                    </form>
                </>
            )}

            </div>
        </div>
    );
};

export default SignIn;
