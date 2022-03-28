import { NextApiRequest, NextApiResponse } from 'next'
import { addShortlink } from '../../../lib/shortlinks';

export default async (_: NextApiRequest, res: NextApiResponse) => {
  const links = await addShortlink('https://firebase.google.com/docs/firestore/quickstart', 'tini.url/123814');
  res.send(links);
}
