import SignIn from '@/components/signin'
import { getServerSession } from 'next-auth'
import Head from 'next/head'
import { authOptions } from './api/auth/[...nextauth]'
import { FormEvent } from 'react';
import toast from 'react-hot-toast';

function onPost(event: FormEvent<HTMLElement>) {

  event.preventDefault();

  let input = document.getElementById('postText') as HTMLInputElement;
  let postText = input.value;
  
  if(postText.length != 0) {
    console.log("Posting: " + postText);

    input.value = '';
    
    toast.promise(fetch('/api/post', {
      method: 'POST',
      body: JSON.stringify({text: postText})
    }).then(async (res) => {
      const data = await res.json() as {text: string};

      if(res.status == 401) {
        toast.error(data.text);
        throw new Error("Not signed in.");
      }
    }), {
      loading: 'Posting...',
      success: 'Posted!',
      error: 'Failed to post.'
    });
  } else {
    toast.error("Post cannot be empty.");
  }
}

export default function Home({ session }) {
  return (
    <>
      <Head>
        <title>Simple Social</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        { !session ?
          <div className='grid h-screen place-items-center'>
            <div className='min-w-fit grid'>
              <h1 className='text-2xl'>Simple Social</h1>
                <div className='justify-self-center'>
                  <SignIn session={session}/>
                </div>
              </div>
          </div>
        : <div className='w-1/2 flex flex-col m-auto mt-6'>
            {/* This displays when the user is signed in */}
            <div>
              Welcome, <span className="text-accent">{session.user.name}</span>!
              <form className='flex flex-row gap-2' onSubmit={onPost}>
                <input id="postText" type="text" placeholder="Deep thoughts?" onSubmit={onPost}
                  className="input input-bordered input-primary w-full" />
                <button className='btn btn-primary' type='submit'>Post</button>
              </form>
              <div id="posts" className='flex flex-col'>
              </div>
            </div>
          </div>
        }
      </main>
    </>
  )
}

export async function getServerSideProps(ctx: any) {
  return {
    props: {
        session: await getServerSession(ctx.req, ctx.res, authOptions)
    }
  }
}