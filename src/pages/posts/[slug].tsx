import fs from 'fs';
import path from 'path';

import styled from 'styled-components';

import matter from 'gray-matter';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { PostPageProps } from 'src/types/posts';
import { postFilePaths, POSTS_PATH } from 'utils/mdxUtils';

import { SubText } from 'styles/styled';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  margin: 2rem 0;
`;

const PostBody = styled.section`
  margin: 2rem 0;
`;

const PostPage = ({ source, frontMatter }: PostPageProps): JSX.Element => {
  return (
    <Container>
      <Header>
        <nav>
          <Link href="/">Home</Link>
        </nav>
      </Header>

      <h1>{frontMatter.title}</h1>
      {frontMatter.description && <SubText>{frontMatter.description}</SubText>}
      <PostBody>
        <MDXRemote {...source} />
      </PostBody>
    </Container>
  );
};

export const getStaticProps = async ({ params }) => {
  const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((_path) => _path.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

export default PostPage;
