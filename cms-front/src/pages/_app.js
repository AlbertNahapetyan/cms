import "@/styles/globals.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getConfig } from "@/utils/getConfig";
import { MESSAGES } from "@/constants/wsMessages";
import RestartModal from "@/components/shared/RestartModal";

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const WS_PORT = getConfig("public.wsPort")
  const [isServerRestarting, setIsServerRestarting] = useState(false)

  useEffect(() => {
      const socket = new WebSocket(`ws://localhost:${WS_PORT}`)

      socket.addEventListener("message", (event) => {
         if(event.data === MESSAGES.restarting) {
             setIsServerRestarting(true)
         } else if(event.data === MESSAGES.ready) {
             router.reload()
             setIsServerRestarting(false)
         }
      })

      return () => {
          socket.close()
      }
  }, [router.pathname]);

  return (
      <>
          <Component {...pageProps} />;
          <RestartModal isOpen={isServerRestarting} />
      </>
  )
}
