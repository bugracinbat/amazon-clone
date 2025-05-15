import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const HomeLink = styled(Link)`
  margin-top: 2rem;
  color: #0070f3;
  font-weight: 700;
  font-size: 1.2rem;
  text-decoration: underline;
`;

function NotFound() {
  return (
    <Container>
      <Title>404 – Page Not Found</Title>
      <p>Sorry, we couldn't find what you were looking for.</p>
      <HomeLink to="/">Go to Home</HomeLink>
    </Container>
  );
}

export default NotFound;
