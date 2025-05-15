import styled from "styled-components";
import { useState } from "react";
import products from "../assets/products";
import ProductCard from "../components/ProductCard";

const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2vw 2vw 4vw 2vw;
  box-sizing: border-box;
`;

const SearchWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 0.7rem 1.2rem;
  border-radius: 0;
  border: 1px solid #eaeaea;
  font-size: 1rem;
  background: #fafafa;
  color: #111;
  transition: border 0.2s;
  &:focus {
    border: 1px solid #0070f3;
    outline: none;
  }
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

function Products() {
  const [search, setSearch] = useState("");
  const filtered = products.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <Container>
      <SearchWrap>
        <SearchInput
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </SearchWrap>
      <Grid>
        {filtered.length === 0 ? (
          <div>No products found.</div>
        ) : (
          filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </Grid>
    </Container>
  );
}

export default Products;
