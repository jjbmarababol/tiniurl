import { NextApiRequest, NextApiResponse } from 'next';
import { clear } from '../../../lib/shortlinks';

export const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const a = await clear();
  res.status(200).json({ message: 'Successfully cleared' });
};

export default handle;
