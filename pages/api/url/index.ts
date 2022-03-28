import { NextApiRequest, NextApiResponse } from 'next'
import { add } from '../../../lib/shortlinks';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { destination } = req.body;
    const links = await add('https://firebase.google.com/docs/firestore/quickstart', 'tini.url/123814');
    res.send(links);
}
