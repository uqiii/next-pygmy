"use client"

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Spinner from "~components/Spinner";

const Home = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [submitting, setIsSubmitting] = useState(false);
  const [thought, setThought] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/journals/new", {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user.id,
          thought: thought,
        }),
      });
      router.push("/journals");
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "loading") {
    return <Spinner />
  }

  return (
    <div>
      <div className="w-full flex-center flex-col">
        <p className="text-center">
          new
        </p>
        <p className="head_text text-center">
          Journal
        </p>
      </div>
      <section className='w-full max-w-full flex-start flex-col'>
      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        <label className="w-[350px]">
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            New Journal
          </span>
          <textarea
            value={thought.prompt}
            onChange={(e) => setThought(e.target.value)}
            placeholder='Share your thoughts...'
            required
            className='form_textarea '
          />
        </label>
        <div className='flex-end mx-3 mb-5 gap-4'>
          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          >
            {submitting ? `Submitting...` : 'Submit'}
          </button>
        </div>
      </form>
    </section>
    </div>
  )
}

export default Home