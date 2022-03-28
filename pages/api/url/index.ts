import { NextApiRequest, NextApiResponse } from 'next'
import { add } from '../../../lib/shortlinks';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { destination } = req.body;
    const links = await add('http://young-stalin.com/hair.php?tag=Short');
    res.send(links);
}
