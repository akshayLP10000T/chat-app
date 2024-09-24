import React from 'react'
import { useNavigate } from 'react-router-dom';
import AuthenticationBlueprint from '../AuthenticationBlueprint';

const Welcome = () => {
    const navigate = useNavigate();
    const navigateHandler = () => {
        const welcome = document.querySelector(".welcomeAnimation");
        const animationPart = document.querySelector(".animationPart");

        welcome.classList.remove("-top-[100%]");
        welcome.classList.add("top-[100%]")

        animationPart.classList.remove("-top-[100%]");
        animationPart.classList.add("top-0");

        setTimeout(() => {
            navigate("/login", {replace: true})
        }, 1000);
    }

    return (
        <>
            <div className='flex-1 bg-gradient-to-b welcome from-red-400 to-red-500 flex flex-col items-center justify-center text-center p-8'>
                <h2 className='text-white font-extrabold text-3xl md:text-4xl lg:text-5xl mb-6'>
                    We are excited to invite you
                </h2>
                <p className='text-white text-lg md:text-xl mb-4 font-semibold'>
                    Join us today and be part of an amazing community! Connect with your friends, meet new people, and enjoy seamless conversations.
                </p>
                <p className='text-white text-lg md:text-xl font-semibold mb-8'>
                    Register now to start chatting and never miss a moment!
                </p>
                <button onClick={navigateHandler} className='rounded-xl bg-red-600 px-6 py-3 text-white text-lg font-bold hover:bg-red-700 transition'>
                    Already have an account? <span className='underline'>Login</span>
                </button>
            </div>
            <div className='welcomeAnimation z-50 absolute transition-all duration-1000 ease-in-out -top-[100%] left-0 w-full h-screen bg-red-500'>

            </div>
            <div className='animationPart transition-all duration-1000 ease-in-out absolute -top-[100%] left-0 z-10 w-full h-screen'>
                <AuthenticationBlueprint redWhere={"right"} />
            </div>
        </>
    )
}

export default Welcome