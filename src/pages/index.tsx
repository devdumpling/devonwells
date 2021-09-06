import fs from 'fs';
import path from 'path';

import { useRef, useState } from 'react';
import styled from 'styled-components';

import { a, config, useSpring } from '@react-spring/three';
import { Sky, Stars } from '@react-three/drei';
import { Canvas, MeshProps, useFrame } from '@react-three/fiber';
import matter from 'gray-matter';
import { HomeProps } from 'src/types/home';

import About from 'components/About';
import Posts from 'components/Posts';
import { Card, Container } from 'styles/styled';
import { postFilePaths, POSTS_PATH } from '../utils/mdxUtils';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
`;

const BaseCanvas = () => {
  return (
    <Canvas>
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
      />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.0, 0, 0]} />
      <Box position={[1.0, 0, 0]} />
      <Sky
        distance={45000}
        sunPosition={[2, 1, 1]}
        inclination={0}
        azimuth={0.25}
      />
    </Canvas>
  );
};

const Box = (props) => {
  // This reference will give us direct access to the mesh
  const mesh: MeshProps = useRef();

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  const { scale } = useSpring({
    scale: hovered ? 1.5 : 1,
    config: config.wobbly,
  });

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame(() => {
    if (mesh && mesh.current) mesh.current.rotation.y += 0.02;
  });

  // Return view, these are regular three.js elements expressed in JSX
  return (
    <a.mesh
      {...props}
      ref={mesh}
      scale={scale}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshPhongMaterial color={hovered ? 'salmon' : 'orange'} />
    </a.mesh>
  );
};

const Home = ({ posts }: HomeProps): JSX.Element => {
  return (
    <>
      <Wrapper>
        <Container>
          <About />
          <Card>
            <Posts posts={posts} />
          </Card>
        </Container>
      </Wrapper>
      <BaseCanvas />
    </>
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
