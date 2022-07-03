import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import SubscriptionCard from '../subCard/SubscriptionCard';

export type IStripeWrapper = {};

export default function StripeWrapper(_: IStripeWrapper) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [plan, setPlan] = useState<string>('basic');

  const billingDetails = {
    name: 'Test User',
    email: 'adam@example.com',
    address: {
      city: 'Kuala Lumpur',
      line1: 'Address Example',
      state: 'Kuala Lumpur',
      postal_code: '50480',
    },
  };

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    const cardElement = elements!.getElement(CardElement);
    if (!cardElement) return setIsSubmitting(false);

    try {
      setIsSubmitting(true);

      // 1) Get the customer if it exists, or create it
      console.log('creating/getting customer...');
      const customerReq = await fetch('/api/customer');
      const customer = await customerReq.json();
      console.log('customer: ', customer);
      if (customer.error) return setIsSubmitting(false);

      // 2) Subscribe to service
      console.log('subscribing to service...');
      const subscriptionReq = await fetch('/api/subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer: customer.id,
          priceId: plan === 'basic' ? 'price_1LHPEsLib5uNABz1BuOSSB6K' : 'price_1LHPHdLib5uNABz19F1N8Jo0',
        }),
      });
      const subscription = await subscriptionReq.json();
      console.log('subscription: ', subscription);
      if (subscription.error) return setIsSubmitting(false);

      // 3) Pay original bill
      console.log('paying the original invoice...');
      const cardPaymentReq = await stripe!.confirmCardPayment(subscription.data.latest_invoice.payment_intent.client_secret, {
        payment_method: {
          card: cardElement,
          billing_details: billingDetails,
        },
      });
      if (cardPaymentReq.error) setIsSubmitting(false);
      console.log('invoice paid: ', cardPaymentReq);

      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  return (
    <form className="flex flex-col justify-center items-center w-96 mx-auto h-screen text-center" onSubmit={handleSubmit}>
      <h1 className="text-xl pb-6">Subscribe</h1>
      <div className="flex">
        <SubscriptionCard title="Basic" flatPrice={10} sessionPrice={50} active={plan === 'basic'} setActive={setPlan} />
        <SubscriptionCard title="Premium" flatPrice={25} sessionPrice={50} active={plan === 'premium'} setActive={setPlan} />
      </div>
      <div className="w-full bg-pink-100 p-2 mt-6 rounded-xl">
        <CardElement
          options={{
            hidePostalCode: true,
            style: {
              base: {
                color: 'black',
                '::placeholder': {
                  color: 'black',
                },
              },
              invalid: {
                color: 'red',
              },
            },
          }}
        />
      </div>
      <button
        className="py-2 px-6 mt-4 bg-purple-100 rounded-xl disabled:bg-neutral-50 disabled:cursor-not-allowed"
        disabled={isSubmitting}
        type="submit">
        Sign Up
      </button>
    </form>
  );
}
