import styled from "styled-components";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

const Popup = styled.div`
  position: absolute;
  top: 48px;
  right: 0;
  width: 340px;
  max-height: 420px;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 20px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.18);
  border: 1.5px solid #e0e7ef;
  z-index: 9999;
  padding: 1.2rem 1.2rem 1rem 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  animation: fadeIn 0.2s;
  backdrop-filter: blur(16px) saturate(1.2);
  -webkit-backdrop-filter: blur(16px) saturate(1.2);
  @media (max-width: 600px) {
    width: 98vw;
    left: 1vw;
    right: 1vw;
    top: 60px;
    border-radius: 16px;
    padding: 1.2rem 0.5rem 1rem 0.5rem;
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const Items = styled.div`
  flex: 1;
  overflow-y: auto;
  max-height: 220px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin-bottom: 0.7rem;
`;

const Image = styled.img`
  width: 44px;
  height: 44px;
  object-fit: cover;
  border-radius: 6px;
  background: #f4f4f4;
`;

const Info = styled.div`
  flex: 1;
  min-width: 0;
`;

const ItemTitle = styled.div`
  font-size: 0.98rem;
  font-weight: 600;
  color: #222;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Qty = styled.div`
  font-size: 0.95rem;
  color: #888;
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: #0070f3;
`;

const Total = styled.div`
  text-align: right;
  font-size: 1.1rem;
  font-weight: 700;
  margin-top: 0.5rem;
`;

const GoToCart = styled.button`
  background: #0070f3;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.8rem 0;
  font-size: 1.08rem;
  font-weight: 700;
  margin-top: 0.7rem;
  width: 100%;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #0366d6;
  }
`;

const Empty = styled.div`
  text-align: center;
  color: #888;
  font-size: 1.1rem;
  margin: 2rem 0 1rem 0;
`;

function CartPopup({ open, onClose }) {
  const { cart } = useCart();
  const navigate = useNavigate();
  const ref = useRef();
  const total = cart
    .reduce((sum, item) => sum + Number(item.price) * item.qty, 0)
    .toFixed(2);

  useEffect(() => {
    if (!open) return;
    function handle(e) {
      if (e.type === "keydown" && e.key === "Escape") onClose();
      if (
        e.type === "mousedown" &&
        ref.current &&
        !ref.current.contains(e.target)
      )
        onClose();
    }
    document.addEventListener("mousedown", handle);
    document.addEventListener("keydown", handle);
    return () => {
      document.removeEventListener("mousedown", handle);
      document.removeEventListener("keydown", handle);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <Popup ref={ref} role="dialog" aria-label="Cart popup">
      <Title>Your Cart</Title>
      <Items>
        {cart.length === 0 ? (
          <Empty>🛒 Your cart is empty.</Empty>
        ) : (
          cart.map((item) => (
            <Item key={item.id}>
              <Image src={item.image} alt={item.title} />
              <Info>
                <ItemTitle title={item.title}>{item.title}</ItemTitle>
                <Qty>Qty: {item.qty}</Qty>
              </Info>
              <Price>${item.price}</Price>
            </Item>
          ))
        )}
      </Items>
      {cart.length > 0 && <Total>Total: ${total}</Total>}
      <GoToCart
        onClick={() => {
          onClose();
          navigate("/cart");
        }}
      >
        Go to Cart
      </GoToCart>
    </Popup>
  );
}

export default CartPopup;
