import { NextApiRequest, NextApiResponse } from 'next';
import { read } from '../../../lib/shortlinks';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const link = await read(id as string);
  if (!link) {
    return res.redirect('/');
  }
  return res.redirect(link.destination);
};
