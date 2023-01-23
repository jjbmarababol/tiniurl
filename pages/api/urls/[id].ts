import { NextApiRequest, NextApiResponse } from 'next';
import { read } from '../../../lib/shortlinks';
import { Shortlink } from '../../../models';

export const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const link = await read(id as string);
  if (!link || link['hasError']) {
    return res.redirect('/');
  }
  return res.redirect((link as Shortlink).destination);
};

export default handle;
