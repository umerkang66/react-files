import 'bootstrap/dist/css/bootstrap.css';
import '@styles/globals.css';
import { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import { commonFetcher } from 'src/utils/api';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="p-3">
      <SWRConfig
        value={{
          fetcher: commonFetcher,
          // if our app gets the duplicated request before 10000 milliseconds, don't do the second request
          dedupingInterval: 10000,
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </div>
  );
}

export default MyApp;
