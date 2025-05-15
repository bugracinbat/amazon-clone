import styled from "styled-components";
import { useParams } from "react-router-dom";
import products from "../assets/products";
import { useCart } from "../components/CartContext";

const Container = styled.div`
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
`;

const Price = styled.div`
  color: #b12704;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const Rating = styled.div`
  color: #ffa41c;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  margin-bottom: 2rem;
  text-align: center;
`;

const Button = styled.button`
  background: #ffd814;
  color: #111;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 2rem;
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #f7ca00;
  }
`;

function Product() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <Container>
        <h2>Product Not Found</h2>
      </Container>
    );
  }

  return (
    <Container>
      <Image src={product.image} alt={product.title} />
      <Title>{product.title}</Title>
      <Price>${product.price}</Price>
      <Rating>
        {"★".repeat(product.rating)}
        {"☆".repeat(5 - product.rating)}
      </Rating>
      <Description>{product.description}</Description>
      <Button onClick={() => addToCart(product)}>Add to Cart</Button>
    </Container>
  );
}

export default Product;
