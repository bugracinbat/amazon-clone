import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import { useState } from "react";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: none; }
`;

const cardBounce = keyframes`
  0% { transform: scale(1); }
  20% { transform: scale(1.08); }
  40% { transform: scale(0.96); }
  60% { transform: scale(1.04); }
  80% { transform: scale(0.98); }
  100% { transform: scale(1); }
`;

const Card = styled.div`
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.07), 0 1.5px 4px rgba(0, 0, 0, 0.03);
  padding: 1.5rem 1.2rem 1.2rem 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: box-shadow 0.2s, transform 0.2s;
  color: #111;
  height: 420px;
  position: relative;
  animation: ${fadeIn} 0.5s;
  &:hover,
  &:focus-within {
    box-shadow: 0 12px 36px rgba(0, 0, 0, 0.13);
    transform: translateY(-3px) scale(1.025);
  }
`;

const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  width: 100%;
  display: block;
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
  width: 100%;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
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

const AddButton = styled.button`
  background: #ffd814;
  color: #111;
  border: none;
  border-radius: 6px;
  padding: 0.7em 1.2em;
  font-weight: 700;
  font-size: 1.05rem;
  margin-top: auto;
  width: 100%;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  &:hover,
  &:focus {
    background: #f7ca00;
    color: #222;
  }
`;

function ProductCard({ product }) {
  const { addToCart, openCartPopup } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd(e) {
    e.preventDefault();
    addToCart(product);
    setAdded(true);
    openCartPopup();
    window.dispatchEvent(new CustomEvent("cart-bounce"));
    setTimeout(() => setAdded(false), 1000);
  }

  return (
    <Card tabIndex={0} aria-label={`View details for ${product.title}`}>
      <CardLink to={`/product/${product.id}`}>
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
      </CardLink>
      <AddButton
        onClick={handleAdd}
        aria-label={`Add ${product.title} to cart`}
        disabled={added}
      >
        {added ? "Added!" : "Add to Cart"}
      </AddButton>
    </Card>
  );
}

export default ProductCard;
