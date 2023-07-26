"use client"

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Spinner from "~components/Spinner";

const Home = () => {
  const router = useRouter();
  const [journals, setJournals] = useState([]);
  const [loadingJournals, setLoadingJournals] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoadingJournals(true);
        const response = await fetch(`/api/journals/${session?.user.id}`);
        console.log('==== res', response);
        const data = await response.json();
        
        setJournals(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingJournals(false);
      }
    };

    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  if (status === "loading") {
    return <Spinner />
  }

  const renderJournalCard = ({ createdAt, thought }) => (
    <div className="border rounded-lg p-2 mb-2 w-[250px]">
      <p className="text-sm text-gray-400">
        {new Date(createdAt).toDateString()}
      </p>
      <p className="">
        {thought}
      </p>
    </div>
  )

  return (
    <div>
    <div className="w-full flex-center justify-center flex-col mb-4 ">
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
    {loadingJournals
      ? <div className="flex-center"> <Spinner /> </div>
      : <div className="p-4 flex-col flex-center">
          {journals.map(renderJournalCard)}
        </div>
    }
    </div>
  )
}

export default Home