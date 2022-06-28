import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from 'react-query';
import { theme } from '../../styles/theme';
import { SidebarDrawerProvider } from '../context/SidebarDrawerContext';
// import { makeServer } from '../services/mirage';
import { queryClient } from '../services/queryClient';
import { AuthContextProvider } from '../context/AuthContext';

// if (process.env.NODE_ENV === 'development') {
//   makeServer();
// }

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <SidebarDrawerProvider>
          <AuthContextProvider>
            <Component {...pageProps} />
          </AuthContextProvider>
        </SidebarDrawerProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
