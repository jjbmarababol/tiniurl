import { NextApiRequest, NextApiResponse } from 'next';
import { add, format } from '../../../lib/shortlinks';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    body: { destination },
    headers: { host },
  } = req;
  try {
    const { id } = await add(destination);
    res.status(200).json(format(id, destination, host));
  } catch (e) {
    throw Error(e);
  }
};
