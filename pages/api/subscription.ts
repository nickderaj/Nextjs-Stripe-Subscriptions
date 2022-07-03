// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import type { ResponseData } from 'types/api/ResponseTypes';

const stripe = require('stripe')(process.env.STRIPE_SK);

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method === 'POST') {
    let { customer, priceId } = req.body;

    try {
      const subscription = await stripe.subscriptions.create({
        customer,
        items: [
          { price: priceId, quantity: 1 },
          {
            price: 'price_1LHPGfLib5uNABz1XGKPELRc', // per unit
          },
        ],
        payment_behavior: 'default_incomplete',
        payment_settings: { save_default_payment_method: 'on_subscription' },
        expand: ['latest_invoice.payment_intent'],
      });
      if (
        !subscription ||
        !subscription.latest_invoice ||
        !subscription.latest_invoice.payment_intent ||
        !subscription.latest_invoice.payment_intent.client_secret
      ) {
        return res.json({ error: 'no_payment_intent' });
      }
      res.status(200).json({
        id: subscription.id,
        type: 'Subscription',
        data: { ...subscription },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
