import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';
import Link from 'next/link';
import { HomeProps } from 'src/types/home';

import { postFilePaths, POSTS_PATH } from '../utils/mdxUtils';

const Home = ({ posts }: HomeProps): JSX.Element => (
  <div>
    <h1>Home</h1>

    <ul>
      {posts.map((post) => (
        <li key={post.filePath}>
          <Link
            as={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}
            href={'/posts/[slug]'}
          >
            {post.data.title}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Home;

export function getStaticProps(): { props: HomeProps } {
  const posts = postFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
    const { content, data } = matter(source);

    return {
      content,
      data,
      filePath,
    };
  });

  return { props: { posts } };
}
