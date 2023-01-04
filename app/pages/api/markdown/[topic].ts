import fs from "fs";
import { join } from "path";
import { remark } from "remark";
import html from "remark-html";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  html: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { topic } = req.query;

  const markdownDirectory = join(process.cwd(), "markdown");
  const fullPath = join(markdownDirectory, `${topic}.md`);
  const fileContent = fs.readFileSync(fullPath, "utf8");

  const result = await remark().use(html).process(fileContent);
  res.status(200).json({ html: result.toString() });
}
