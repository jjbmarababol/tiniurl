import { NextApiRequest, NextApiResponse } from 'next';
import { remove } from '../../../lib/shortlinks';

export const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    body: { id },
  } = req;
  await remove(id as string);
  res.status(200).json({ message: 'Successfully deleted' });
};

export default handle;
