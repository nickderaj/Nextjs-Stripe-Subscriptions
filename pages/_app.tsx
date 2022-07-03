import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import type { AppProps } from 'next/app';
import { PageWithLayout } from 'types/page';
import '../styles/globals.css';
interface AppPropsWithLayout extends AppProps {
  Component: PageWithLayout;
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK ?? '');

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <Elements stripe={stripePromise}>
      <Component {...pageProps} />
    </Elements>
  );
}
