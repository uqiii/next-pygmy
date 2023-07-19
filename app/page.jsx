"use client"

import { useSession } from "next-auth/react";

const Home = () => {
  const { data: session } = useSession();

  const renderGreeting = () => (
    <p className="text-center">
      {`Hi, ${session.user.name}!`}
    </p>
  );

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