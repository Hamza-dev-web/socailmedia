import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server'
import { CreateUsers } from '@/lib/action/user.action';

export async function POST(req: NextRequest) {
  try {
  const WEBHOOK_SECRET = process.env.WEBHOOKS_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Missing Clerk webhook secret');
  }

  const payload = await req.text();
  const header = headers();
  const svix_id = header.get('svix-id');
  const svix_timestamp = header.get('svix-timestamp');
  const svix_signature = header.get('svix-signature');

  const wh = new Webhook(WEBHOOK_SECRET);
    const evt = wh.verify(payload, {
      'svix-id': svix_id!,
      'svix-timestamp': svix_timestamp!,
      'svix-signature': svix_signature!,
    }) as WebhookEvent;
    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt.data
    const eventType = evt.type
    console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
    console.log('Webhook payload:', evt.data)

if (evt.type === 'user.created') {
    console.log(evt.type , "start")
      await CreateUsers({
            username: evt.data.first_name as string,
            email: evt.data.email_addresses[0].email_address as string,
            image: evt.data.image_url as string,
          }) 
  console.log('userId:', evt.data.id)
}
 return new Response('Webhook received', { status: 200 })
} catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
  }
}