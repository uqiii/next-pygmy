"use client"

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Spinner from "~components/Spinner";

const Home = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Spinner />
  }

  return (
    <div className="w-full flex-center flex-col">
      <p className="text-center">
        This is your
      </p>
      <p className="head_text text-center mb-2">
        Journal
      </p>
      <button
        type='button'
        onClick={() => router.push("/journals/new")}
        className='black_btn'
      >
        New
      </button>
    </div>
  )
}

export default Home