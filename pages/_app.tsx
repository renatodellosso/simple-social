import Navbar from '@/components/navbar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  console.log(session);
  return <SessionProvider session={session}>
    <Navbar {...{session}}/>
    <Component {...{session, pageProps}} />
  </SessionProvider>
}
