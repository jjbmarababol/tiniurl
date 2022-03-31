import { NextApiRequest, NextApiResponse } from 'next';
import { read } from '../../../lib/shortlinks';

export const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.body.destination.split('/')[1];
  const data = await read(id);
  if (!data) {
    return res.status(200);
  }
  const { destination: link } = data;
  const { hostname } = new URL(link);

  res.status(200).json({ id, link, hostname });
};

export default handle;
