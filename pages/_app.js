import "@/styles/globals.css";
import "../components/header/header.css";
import "../components/banner/banner.css";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
