import 'bootstrap/dist/css/bootstrap.css';
import '@styles/globals.css';
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="p-3">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
