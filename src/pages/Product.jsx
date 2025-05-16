import styled from "styled-components";
import { useParams } from "react-router-dom";
import products from "../assets/products";
import { useCart } from "../components/CartContext";
import { useState } from "react";

const Container = styled.div`
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 700px) {
    flex-direction: row;
    align-items: flex-start;
    gap: 3rem;
  }
`;

const ImageWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const Details = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
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

const Badge = styled.span`
  display: inline-block;
  background: #e3f9e5;
  color: #1a7f37;
  font-size: 0.98rem;
  font-weight: 600;
  border-radius: 6px;
  padding: 0.2em 0.7em;
  margin-right: 0.7em;
  margin-bottom: 0.7em;
`;

const FreeShipping = styled(Badge)`
  background: #e6f0fd;
  color: #0070f3;
`;

const QuantityWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin-bottom: 1.5rem;
`;

const QtyButton = styled.button`
  background: #fafafa;
  color: #111;
  border: 1px solid #eaeaea;
  border-radius: 0;
  padding: 0.2em 0.7em;
  font-size: 1.1em;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s, border 0.2s;
  &:hover {
    background: #eaeaea;
    border: 1px solid #0070f3;
  }
`;

const ReviewsSection = styled.div`
  margin-top: 2.5rem;
  width: 100%;
`;

const ReviewTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const Review = styled.div`
  background: #f8fafc;
  border-radius: 8px;
  padding: 1rem 1.2rem;
  margin-bottom: 1.1rem;
`;

const Reviewer = styled.div`
  font-weight: 600;
  color: #0070f3;
  margin-bottom: 0.3rem;
`;

function Product() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <Container>
        <h2>Product Not Found</h2>
      </Container>
    );
  }

  // Example static reviews
  const reviews = [
    {
      name: "Jane Doe",
      text: "Great quality and fast shipping! Highly recommend.",
      rating: 5,
    },
    {
      name: "John Smith",
      text: "Product as described. Would buy again.",
      rating: 4,
    },
  ];

  return (
    <Container>
      <ImageWrap>
        <Image src={product.image} alt={product.title} />
      </ImageWrap>
      <Details>
        <div style={{ marginBottom: "0.5rem" }}>
          <Badge>In Stock</Badge>
          <FreeShipping>Free Shipping</FreeShipping>
        </div>
        <Title>{product.title}</Title>
        <Price>${product.price}</Price>
        <Rating>
          {"★".repeat(product.rating)}
          {"☆".repeat(5 - product.rating)}
        </Rating>
        <Description>{product.description}</Description>
        <QuantityWrap>
          <span style={{ fontWeight: 600 }}>Quantity:</span>
          <QtyButton onClick={() => setQty(qty > 1 ? qty - 1 : 1)}>-</QtyButton>
          {qty}
          <QtyButton onClick={() => setQty(qty + 1)}>+</QtyButton>
        </QuantityWrap>
        <Button onClick={() => addToCart({ ...product, qty })}>
          Add to Cart
        </Button>
        <ReviewsSection>
          <ReviewTitle>Customer Reviews</ReviewTitle>
          {reviews.map((r, i) => (
            <Review key={i}>
              <Reviewer>
                {r.name} {"★".repeat(r.rating)}
                {"☆".repeat(5 - r.rating)}
              </Reviewer>
              <div>{r.text}</div>
            </Review>
          ))}
        </ReviewsSection>
      </Details>
    </Container>
  );
}

export default Product;
