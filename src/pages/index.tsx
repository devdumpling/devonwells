import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';
import { HomeProps } from 'src/types/home';

import About from 'components/About';
import Posts from 'components/Posts';
import { Card, Container } from 'styles/styled';
import { postFilePaths, POSTS_PATH } from '../utils/mdxUtils';

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

export function getStaticProps() {
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
