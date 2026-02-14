import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { id } = req.query;
    if (!id) {
        return res.status(400).json({ error: 'Missing id' });
    }

    const data = await kv.get(`bouquet:${id}`);
    if (!data) {
        return res.status(404).json({ error: 'Bouquet not found' });
    }

    // data is already a string; parse it
    const bouquet = JSON.parse(data);
    res.status(200).json(bouquet);
}