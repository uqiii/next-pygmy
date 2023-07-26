"use client"

import { useSession } from "next-auth/react";

import Spinner from "~components/Spinner";

const Home = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Spinner />
  }

  return (
    <div className="w-full flex-center flex-col">
      <p className="text-center">
        new
      </p>
      <p className="head_text text-center">
        Journal
      </p>
      
    </div>
  )
}

export default Home