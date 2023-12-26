"use client"
import Link from "next/link";
import Image from "next/image";

import CustomButton from "./CustomButton";
import { useState } from "react";
import LoginDialog from "./LoginDialog";
import SignUpDialog from "./SignUpDialog";

const NavBar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  function openModal() {
    setIsLoginOpen(true)
  }
  return (
  <header className='w-full  absolute z-10'>
    <nav className='max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4 bg-transparent'>
      <Link href='/' className='flex justify-center items-center'>
        <Image
          src='/logo.svg'
          alt='logo'
          width={118}
          height={18}
          className='object-contain'
        />
      </Link>
      <div className="flex items-center gap-2">
        <CustomButton
          title='Sign in'
          btnType='button'
          containerStyles='text-primary-blue rounded-full bg-white min-w-[130px] hover:bg-[#000] hover:text-white'
          handleClick={() => setIsSignupOpen(true)}
        />
        <CustomButton
          title='Login'
          btnType='button'
          containerStyles='text-primary-blue rounded-full bg-white min-w-[130px] hover:bg-[#000] hover:text-white'
          handleClick={() => setIsLoginOpen(true)}
        />
      </div>
      <LoginDialog isLoginOpen={isLoginOpen} setIsLoginOpen={setIsLoginOpen} />
      <SignUpDialog isSignupOpen={isSignupOpen} setIsSignupOpen={setIsSignupOpen} />
    </nav>
  </header>
  )
};

export default NavBar;
