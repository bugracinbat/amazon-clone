import styled from "styled-components";
import { useCart } from "../components/CartContext";

const Container = styled.div`
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 1rem;
`;

const Image = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
`;

const Info = styled.div`
  flex: 1;
`;

const Title = styled.h4`
  margin: 0 0 0.5rem 0;
`;

const Price = styled.div`
  color: #b12704;
  font-weight: bold;
`;

const Qty = styled.div`
  font-size: 1rem;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
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

const Remove = styled.button`
  background: #ff4d4f;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #d9363e;
  }
`;

const Total = styled.div`
  text-align: right;
  font-size: 1.3rem;
  font-weight: bold;
  margin-top: 2rem;
`;

function Cart() {
  const { cart, removeFromCart, addToCart, setQty } = useCart();
  const total = cart
    .reduce((sum, item) => sum + Number(item.price) * item.qty, 0)
    .toFixed(2);

  function decreaseQty(item) {
    if (item.qty === 1) {
      removeFromCart(item.id);
    } else {
      setQty(item.id, item.qty - 1);
    }
  }

  function increaseQty(item) {
    setQty(item.id, item.qty + 1);
  }

  return (
    <Container>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your shopping cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <Item key={item.id}>
              <Image src={item.image} alt={item.title} />
              <Info>
                <Title>{item.title}</Title>
                <Price>${item.price}</Price>
                <Qty>
                  <QtyButton onClick={() => decreaseQty(item)}>-</QtyButton>
                  {item.qty}
                  <QtyButton onClick={() => increaseQty(item)}>+</QtyButton>
                </Qty>
              </Info>
              <Remove onClick={() => removeFromCart(item.id)}>Remove</Remove>
            </Item>
          ))}
          <Total>Total: ${total}</Total>
        </div>
      )}
    </Container>
  );
}

export default Cart;
