import styled from "styled-components";
import { Link } from "react-router-dom";

const Card = styled(Link)`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: box-shadow 0.2s;
  text-decoration: none;
  color: inherit;
  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const Title = styled.h3`
  font-size: 1.1rem;
  margin: 0.5rem 0;
  text-align: center;
`;

const Price = styled.div`
  color: #b12704;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Rating = styled.div`
  color: #ffa41c;
  margin-bottom: 0.5rem;
`;

function ProductCard({ product }) {
  return (
    <Card to={`/product/${product.id}`}>
      <Image src={product.image} alt={product.title} />
      <Title>{product.title}</Title>
      <Price>${product.price}</Price>
      <Rating>
        {"★".repeat(product.rating)}
        {"☆".repeat(5 - product.rating)}
      </Rating>
    </Card>
  );
}

export default ProductCard;
