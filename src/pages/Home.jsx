import styled from "styled-components";
import products from "../assets/products";
import ProductCard from "../components/ProductCard";

const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2vw 2vw 4vw 2vw;
  box-sizing: border-box;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2vw;
  width: 100%;
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 4vw;
  }
`;

const CreativeTitle = styled.h2`
  font-size: 2.4rem;
  font-weight: 800;
  color: #0070f3;
  margin-bottom: 0.5rem;
  letter-spacing: 1px;
  @media (max-width: 600px) {
    font-size: 2rem;
  }
`;

const CreativeDesc = styled.p`
  font-size: 1.25rem;
  color: #333;
  margin-bottom: 2.5rem;
  font-weight: 500;
  @media (max-width: 600px) {
    font-size: 1.08rem;
  }
`;

function Home() {
  return (
    <Container>
      <CreativeTitle>
        Flow Into Your Next Great Find{" "}
        <span role="img" aria-label="water wave">
          🌊
        </span>
      </CreativeTitle>
      <CreativeDesc>
        Navigate through endless deals, discover amazing products, and let The Nile 
        carry you to shopping paradise!
      </CreativeDesc>
      <Grid>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>
    </Container>
  );
}

export default Home;
