import '../styles/globals.css'; // Import the global Tailwind CSS file
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;