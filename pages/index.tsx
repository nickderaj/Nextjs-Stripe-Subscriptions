import StripeWrapper from 'components/stripe/wrapper/StripeWrapper';
import { PageWithLayout } from 'types/page';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';

export default function Home(_: PageWithLayout) {
  return <StripeWrapper />;
}

Home.getLayout = (page: React.ReactNode) => {
  return <PrimaryLayout title="Home Page">{page}</PrimaryLayout>;
};
