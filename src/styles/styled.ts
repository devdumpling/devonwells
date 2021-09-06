import styled from 'styled-components';

export const Stack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: space-around;
  padding: 0 1rem;
  margin: 2rem 0;
  max-width: 800px;
`;

export const Heading = styled.h1`
  font-size: 6rem;
  font-weight: 700;
  margin: 0;
  color: #333;
`;

export const SubHeading = styled.h2`
  font-size: 3rem;
  font-weight: 400;
  margin: 0;
  color: #999;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: left;
  justify-content: space-around;
  margin: 0 auto;
  padding: 0 1rem;
  max-width: 800px;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  max-width: 800px;
  border-radius: 0.5rem;
  padding: 1rem;
  border: 10px solid #333;
  background-color: papayawhip;
`;

export const BigText = styled.h2`
  font-size: 3rem;
  font-weight: 400;
  margin: 0;
  color: #333;
`;

export const PostList = styled.ul`
  list-style: none;

  li {
    margin: 0.5rem 0;
    text-decoration: none;
  }
`;

export const SubText = styled.p`
  font-size: 1.5rem;
  font-weight: 400;
  margin: 0;
  color: #999;
`;
