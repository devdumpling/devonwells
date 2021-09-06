import Link from 'next/link';

import { Heading, PostList } from 'styles/styled';
import { PostsProps } from 'types/posts';

const Posts = ({ posts }: PostsProps) => (
  <div>
    <Heading>posts</Heading>
    <PostList>
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
    </PostList>
  </div>
);

export default Posts;
