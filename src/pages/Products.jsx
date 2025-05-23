import styled, { keyframes } from "styled-components";
import { useState, useEffect } from "react";
import products from "../assets/products";
import ProductCard from "../components/ProductCard";

const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2vw 2vw 4vw 2vw;
  box-sizing: border-box;
  @media (max-width: 600px) {
    padding: 4vw 1vw 8vw 1vw;
  }
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

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: none; }
`;

const GridBg = styled.div`
  background: linear-gradient(135deg, #f8fafc 60%, #eaf1fb 100%);
  border-radius: 24px;
  padding: 3vw 2vw;
  margin-top: 2vw;
  @media (max-width: 600px) {
    padding: 6vw 2vw;
    border-radius: 12px;
  }
`;

const MasonryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  column-gap: 2.5vw;
  row-gap: 2.5vw;
  width: 100%;
  animation: ${fadeIn} 0.5s;
`;

const EmptyState = styled.div`
  text-align: center;
  color: #888;
  font-size: 1.2rem;
  margin: 3rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EmptyEmoji = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const shimmer = keyframes`
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

const SkeletonCard = styled.div`
  background: #f4f4f4;
  border-radius: 18px;
  min-height: 370px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.07), 0 1.5px 4px rgba(0, 0, 0, 0.03);
  border: 1.5px solid #ececec;
  position: relative;
  overflow: hidden;
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, #f4f4f4 0%, #eaeaea 50%, #f4f4f4 100%);
    background-size: 400px 100%;
    animation: ${shimmer} 1.2s infinite;
    opacity: 0.7;
  }
`;

function Products() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);
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
          aria-label="Search products"
        />
      </SearchWrap>
      <GridBg>
        <MasonryGrid>
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} aria-label="Loading product" />
            ))
          ) : filtered.length === 0 ? (
            <EmptyState>
              <EmptyEmoji>🛒</EmptyEmoji>
              No products found.
            </EmptyState>
          ) : (
            filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </MasonryGrid>
      </GridBg>
    </Container>
  );
}

export default Products;
