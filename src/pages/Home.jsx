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

function Home() {
  return (
    <Container>
      <h2>Welcome to Amazon Clone</h2>
      <p>Browse our products and enjoy shopping!</p>
      <Grid>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>
    </Container>
  );
}

export default Home;
