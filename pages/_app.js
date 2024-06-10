import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { set } from "mongoose";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import LoadingBar from "react-top-loading-bar";

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setProgress(40)
    })
    router.events.on('routeChangeComplete', () => {
      setProgress(100)
    })
    router.events.on('routeChangeError', () => {
      setProgress(100)
    })


    return () => {
      router.events.off('routeChangeStart')
      router.events.off('routeChangeComplete')
      router.events.off('routeChangeError')
    }

  }, [
    router.events
  ])

  return (<>
    <LoadingBar
      color='#f11946'
      progress={progress}
      onLoaderFinished={() => setProgress(0)}
    />
    <Navbar />
    <Toaster
      position='top-center'
      reverseOrder={false}
    />
    < Component {...pageProps} />;
  </>)
}
