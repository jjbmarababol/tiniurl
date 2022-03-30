import { NextApiRequest, NextApiResponse } from 'next';
import { read, format } from '../../../lib/shortlinks';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    body: { id },
    headers: { host },
  } = req;
  const link = await read(id);
  if (!link) {
    return res.status(200);
  }
  res.status(200).json(format(id, link.destination, host));
};
