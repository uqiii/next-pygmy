"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Spinner from "~components/Spinner";

const Nav = () => {
  const { data: session, status } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  const renderDropdown = () => (
    <div className='dropdown'>
      <Link
        href='/'
        className='dropdown_link'
        onClick={() => {
          signOut();
          setToggleDropdown(false);
        }}
      >
        Sign Out
      </Link>
    </div>
  );

  const renderLoggedInMenu = () => (
    <div className='flex'>
      <Image
        src={session?.user.image}
        width={37}
        height={37}
        className='rounded-full'
        alt='profile'
        onClick={() => setToggleDropdown(!toggleDropdown)}
      />
        {toggleDropdown && renderDropdown()}
    </div>
  );

  const renderLoggedOutMenu = () => providers && (
    Object.values(providers).map((provider) => (
      <button
        type='button'
        key={provider.name}
        onClick={() => {
          signIn(provider.id);
        }}
        className='black_btn'
      >
        Sign in
      </button>
    ))
  );

  const renderSpinner = () => (
    <Spinner size="sm" />
  )

  return (
    <nav className='flex-between w-full mb-16 bg-[white] mx-auto sm:px-36 px-8 py-2 border-b'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/assets/images/logo.png'
          alt='logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>Pygmy</p>
      </Link>

      <div className='flex relative'>
        {status === "loading"
          ? renderSpinner()
          : session?.user
          ? renderLoggedInMenu()
          : renderLoggedOutMenu()}
      </div>
    </nav>
  );
};

export default Nav;