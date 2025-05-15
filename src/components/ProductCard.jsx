import styled from "styled-components";
import { Link } from "react-router-dom";

const Card = styled(Link)`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.07), 0 1.5px 4px rgba(0, 0, 0, 0.03);
  padding: 1.5rem 1.2rem 1.2rem 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: box-shadow 0.2s, transform 0.2s;
  text-decoration: none;
  color: #111;
  min-height: 370px;
  position: relative;
  &:hover {
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px) scale(1.01);
  }
`;

const Image = styled.img`
  width: 100%;
  max-width: 180px;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  margin: 0 auto 1.2rem auto;
  display: block;
  background: #f4f4f4;
`;

const Title = styled.h3`
  font-size: 1.13rem;
  margin: 0 0 0.5rem 0;
  font-weight: 700;
  color: #111;
  text-align: left;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Description = styled.p`
  font-size: 0.97rem;
  color: #444;
  margin: 0 0 0.7rem 0;
  max-height: 2.7em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`;

const Price = styled.div`
  color: #0070f3;
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 0.4rem;
`;

const Rating = styled.div`
  color: #ffa41c;
  margin-bottom: 0.5rem;
  font-size: 1.05rem;
`;

function ProductCard({ product }) {
  return (
    <Card to={`/product/${product.id}`}>
      <Image src={product.image} alt={product.title} />
      <Title title={product.title}>{product.title}</Title>
      <Description title={product.description}>
        {product.description}
      </Description>
      <Price>${product.price}</Price>
      <Rating>
        {"★".repeat(product.rating)}
        {"☆".repeat(5 - product.rating)}
      </Rating>
    </Card>
  );
}

export default ProductCard;
