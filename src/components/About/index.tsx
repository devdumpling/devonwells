import { BigText, Heading, Stack, SubHeading } from 'styles/styled';

const About = () => (
  <Stack>
    <Heading>hi, i'm devon.</Heading>
    <BigText>
      i'm a software engineer in columbus, OH.{' '}
      <span role="img" aria-label="wave">
        👋
      </span>
    </BigText>
    <SubHeading>
      mostly i'm doing the dad thing.
      <br />
      sometimes i do web stuff.
    </SubHeading>
    <h3>
      <a href="mailto:devon.wells@pm.me?subject=Hi Devon">devon.wells@pm.me</a>
    </h3>
  </Stack>
);

export default About;
