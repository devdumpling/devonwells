import { MDXRemoteSerializeResult } from 'next-mdx-remote'

export interface Post {
  content: string
  data: {
    [key: string]: any
  }
  filePath: string
}

export interface PostPageProps {
  source: MDXRemoteSerializeResult
  frontMatter: { [key: string]: any }
}