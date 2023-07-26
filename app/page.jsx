"use client"

import { useSession } from "next-auth/react";

import Spinner from "~components/Spinner";

const Home = () => {
  const { data: session, status } = useSession();

  const renderGreeting = () => (
    <p className="text-center">
      {`Hi, ${session.user.name}!`}
    </p>
  );

  if (status === "loading") {
    return <Spinner />
  }

  return (
    <section className="w-full flex-center flex-col">
      {session?.user && renderGreeting()}
      <h1 className="head_text text-center">
        Pygmy
      </h1>
      <p className="text-center">
        A Website by Uqi
      </p>
    </section>
  )
}

export default Home