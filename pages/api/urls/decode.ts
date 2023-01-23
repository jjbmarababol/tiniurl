import { NextApiRequest, NextApiResponse } from 'next';
import { read } from '../../../lib/shortlinks';
import { Shortlink } from '../../../models';

export const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.body.destination.split('/')[1];
  const data = await read(id);
  if (data && data['hasError']) {
    return res.status(400).json({
      hasError: true,
      message: `${req.body.destination} is not a valid tiniURL`,
    });
  }
  const { destination: link } = data as Shortlink;
  const { hostname } = new URL(link);

  res.status(200).json({ id, link, hostname });
};

export default handle;
