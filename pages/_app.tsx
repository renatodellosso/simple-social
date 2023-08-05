import Navbar from '@/components/navbar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { ToastBar, Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    setTheme(localStorage.getItem('theme') || 'dark');
  }, []);

  return <SessionProvider session={session}>
    {/* None of the DaisyUI Toast styling seems to work, so toasts aren't affected by your theme*/}
    <Toaster containerClassName='toast toast-top toast-start' position="top-right" toastOptions={{
      className: "alert alert-info",
      success: {
        className: "alert alert-success",
      },
      error: {
        className: "alert alert-danger",
      },
    }}/>
    <div id="mainDiv" data-theme={theme}>
      {session ? <Navbar {...{session, theme}}/> : ""}
      <Component {...{session, pageProps}} />
    </div>
  </SessionProvider>
}
