import fs from 'fs';
import path from 'path';

import styled from 'styled-components';

import matter from 'gray-matter';
import Link from 'next/link';
import { HomeProps } from 'src/types/home';

import { postFilePaths, POSTS_PATH } from '../utils/mdxUtils';

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: space-around;
  padding: 0 1rem;
  margin: 2rem 0;
  max-width: 800px;
`;

const Heading = styled.h1`
  font-size: 6rem;
  font-weight: 700;
  margin: 0;
  color: #333;
`;

const SubHeading = styled.h2`
  font-size: 3rem;
  font-weight: 400;
  margin: 0;
  color: #999;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: left;
  justify-content: space-around;
  margin: 0 auto;
  padding: 0 1rem;
  max-width: 800px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  max-width: 800px;
  border-radius: 0.5rem;
  padding: 1rem;
  border: 5px solid #333;
  background-color: papayawhip;
`;

const BigText = styled.h2`
  font-size: 3rem;
  font-weight: 400;
  margin: 0;
  color: #333;
`;

const PostList = styled.ul`
  list-style: none;

  li {
    margin: 0.5rem 0;
    text-decoration: none;
  }
`;

const Posts = ({ posts }: HomeProps) => (
  <div>
    <Heading>Posts</Heading>
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

const About = () => (
  <Stack>
    <Heading>Hi, I'm Devon.</Heading>
    <BigText>
      i'm a software engineer in columbus, OH.{' '}
      <span role="img" aria-label="wave">
        👋
      </span>
    </BigText>
    <SubHeading>
      mostly i'm doing the dad thing.
      <br />
      sometimes i do web stuff
    </SubHeading>
    <h3>
      <a href="mailto:devon.wells@pm.me?subject=Hi Devon">devon.wells@pm.me</a>
    </h3>
  </Stack>
);

const Home = ({ posts }: HomeProps): JSX.Element => {
  return (
    <Container>
      <About />
      <Card>
        <Posts posts={posts} />
      </Card>
    </Container>
  );
};

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
