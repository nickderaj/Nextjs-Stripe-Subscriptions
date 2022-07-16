// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import type { ResponseData } from 'types/api/ResponseTypes';

const stripe = require('stripe')(process.env.STRIPE_SK);

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method === 'GET') {
    let email = 'loki@example.com';

    const customer = await stripe!.customers.search({
      query: `email: '${email}'`,
      expand: ['data.subscriptions'],
    });
    if (customer.data.length === 0) res.status(200).json({ error: 'Nothing found.' });

    res.status(200).json({ id: customer.data[0].id, type: 'Customer', data: customer.data[0] });
  }

  if (req.method === 'POST') {
    let { customer, paymentMethod } = req.body;
    console.log(customer, paymentMethod);

    const updatedCard = await stripe.paymentMethods.attach(paymentMethod, { customer });
    if (updatedCard.id === paymentMethod && updatedCard.customer === customer) {
      res.status(200).json({ id: updatedCard.id, type: 'Payment Method', data: updatedCard });
    } else res.status(404).json({ error: 'Failed to attach card to customer.' });
  }
}
