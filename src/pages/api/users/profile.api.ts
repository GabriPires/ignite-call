import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { BuildNextAuthOptions } from '../auth/[...nextauth].api'

const updateProfileBodySchema = z.object({
  bio: z.string(),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'PUT') {
    return res.status(405).end()
  }

  const session = await getServerSession(
    req,
    res,
    BuildNextAuthOptions(req, res),
  )

  if (!session) {
    return res.status(401).end()
  }

  console.log(req.body)

  const { bio } = updateProfileBodySchema.parse(req.body)

  // await prisma.userTimeInterval.createMany()

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      bio,
    },
  })

  return res.status(204).end()
}
