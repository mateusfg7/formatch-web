import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import { promises as fs } from 'fs'

import articles from '../../../assets/articles.json'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug } = req.query

  const assetsDirectory = path.join(process.cwd(), 'assets')
  try {
    const articleContent = await fs.readFile(
      assetsDirectory + `/articles/${slug}.txt`,
      'utf-8'
    )

    const articleBySlug = articles.filter((article) => article.slug === slug)

    res.status(200).json({
      ...articleBySlug[0],
      content: articleContent,
    })
  } catch (err) {
    res.status(500).json(err)
  }
}
