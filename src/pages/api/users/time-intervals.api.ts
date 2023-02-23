import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { BuildNextAuthOptions } from '../auth/[...nextauth].api'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const session = await getServerSession(
    req,
    res,
    BuildNextAuthOptions(req, res),
  )

  return res.json({ session })
}
