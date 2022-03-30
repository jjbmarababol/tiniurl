import { NextApiRequest, NextApiResponse } from 'next';
import { browse, format } from '../../../lib/shortlinks';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    headers: { host },
  } = req;
  const shortlinks = await browse();
  const data = shortlinks.map(({ id, destination }) =>
    format(id, destination, host),
  );
  res.status(200).json({ data });
};
