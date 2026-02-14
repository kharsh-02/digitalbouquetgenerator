import { kv } from '@vercel/kv';
import { randomUUID } from 'crypto';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { flowers, message } = req.body;
    if (!flowers || !Array.isArray(flowers) || flowers.length === 0) {
        return res.status(400).json({ error: 'Invalid bouquet data' });
    }

    const id = randomUUID();
    const bouquet = {
        id,
        flowers,
        message: message || 'For you 💕',
        createdAt: new Date().toISOString()
    };

    // Store in KV with 7-day expiration (optional)
    await kv.set(`bouquet:${id}`, JSON.stringify(bouquet), { ex: 60 * 60 * 24 * 7 });

    res.status(200).json({ id, url: `/bouquet.html?id=${id}` });
}