// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import type { ResponseData } from 'types/api/ResponseTypes';

const stripe = require('stripe')(process.env.STRIPE_SK);

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method === 'POST') {
    let { subscriptionItem } = req.body;

    try {
      const usageRecord = await stripe.subscriptionItems.createUsageRecord(subscriptionItem, { quantity: 1 });

      res.status(200).json({
        id: usageRecord.id,
        type: 'Subscription Item',
        data: { ...usageRecord },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
