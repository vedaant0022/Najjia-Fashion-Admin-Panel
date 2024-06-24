// pages/_app.js
import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <main >
      <SessionProvider session={session}>
        <Header />
        <Component {...pageProps} />
        
        <Footer />
    
      </SessionProvider>
    </main>
  );
}

export default MyApp;
