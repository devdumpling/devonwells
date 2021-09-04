import Head from 'next/head'
import fs from 'fs'
import matter from 'gray-matter'
import Link from 'next/link'
import path from 'path'
import { postFilePaths, POSTS_PATH } from '../utils/mdxUtils'


export const Home = ({ posts }): JSX.Element => (
  <div>
    <Head>
      <title>Devon Wells</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <h1>Home</h1>
    <p>
      Click the link below to navigate to a page generated by{' '}
      <code>next-mdx-remote</code>.
    </p>
    <ul>
      {posts.map((post) => (
        <li key={post.filePath}>
          <Link
            as={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}
            href={`/posts/[slug]`}
          >
            <a>{post.data.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  </div>
)

export default Home

export function getStaticProps() {
  const posts = postFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath))
    const { content, data } = matter(source)

    return {
      content,
      data,
      filePath,
    }
  })

  return { props: { posts } }
}
