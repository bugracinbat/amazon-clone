import styled from "styled-components";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "./CartContext";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import CartPopup from "./CartPopup";
import { keyframes } from "styled-components";

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.85);
  border-bottom: 1px solid #eaeaea;
  padding: 1.5rem 3vw 1.5rem 3vw;
  color: #111;
  font-family: "Inter", system-ui, Avenir, Helvetica, Arial, sans-serif;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: ${({ $scrolled }) =>
    $scrolled ? "0 2px 16px rgba(0,0,0,0.07)" : "none"};
  transition: box-shadow 0.25s, background 0.25s;
  backdrop-filter: blur(12px) saturate(1.2);
  -webkit-backdrop-filter: blur(12px) saturate(1.2);
`;

const LogoWrap = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  text-decoration: none;
`;

const Triangle = styled.div`
  width: 28px;
  height: 28px;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  &::before {
    content: "";
    display: block;
    width: 0;
    height: 0;
    border-left: 18px solid transparent;
    border-right: 18px solid transparent;
    border-bottom: 28px solid #111;
  }
`;

const LogoText = styled.span`
  font-size: 1.7rem;
  font-weight: 700;
  color: #111;
  letter-spacing: 1px;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2.5rem;
  margin-left: 2rem;
`;

const NavLink = styled(Link)`
  color: #666;
  font-weight: 600;
  font-size: 1.05rem;
  text-decoration: none;
  padding-bottom: 2px;
  border-bottom: 2px solid transparent;
  transition: color 0.2s, border-bottom 0.2s;
  &.active {
    color: #0070f3;
    border-bottom: 2px solid #0070f3;
  }
  &:hover {
    color: #0070f3;
  }
`;

const SearchBar = styled.input`
  flex: 1;
  margin: 0 2rem;
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

const Cart = styled(Link)`
  display: flex;
  align-items: center;
  position: relative;
  color: inherit;
  text-decoration: none;
`;

const CartCount = styled.span`
  background: #0070f3;
  color: #fff;
  border-radius: 50%;
  padding: 0.2em 0.6em;
  font-size: 0.9em;
  position: absolute;
  top: -10px;
  right: -10px;
  font-weight: 700;
`;

const cartBounce = keyframes`
  0% { transform: scale(1); }
  20% { transform: scale(1.18); }
  40% { transform: scale(0.92); }
  60% { transform: scale(1.08); }
  80% { transform: scale(0.98); }
  100% { transform: scale(1); }
`;

const CartIconWrap = styled.span`
  display: inline-block;
  ${({ $bouncing }) => $bouncing && `animation: ${cartBounce} 0.6s;`}
`;

function Header() {
  const { cart, cartPopup, openCartPopup, closeCartPopup } = useCart();
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [bouncing, setBouncing] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    closeCartPopup();
  }, [location]);
  useEffect(() => {
    const bounce = () => {
      setBouncing(true);
      setTimeout(() => setBouncing(false), 600);
    };
    window.addEventListener("cart-bounce", bounce);
    return () => window.removeEventListener("cart-bounce", bounce);
  }, []);
  return (
    <HeaderContainer $scrolled={scrolled}>
      <LogoWrap to="/">
        <Triangle />
        <LogoText>Mercel</LogoText>
      </LogoWrap>
      <Nav>
        <NavLink to="/" className={location.pathname === "/" ? "active" : ""}>
          Home
        </NavLink>
        <NavLink
          to="/products"
          className={
            location.pathname.startsWith("/products") ||
            location.pathname.startsWith("/product")
              ? "active"
              : ""
          }
        >
          Products
        </NavLink>
        <NavLink
          to="/cart"
          className={location.pathname === "/cart" ? "active" : ""}
        >
          Cart
        </NavLink>
      </Nav>
      <SearchBar type="text" placeholder="Search products..." />
      <div style={{ position: "relative" }}>
        <Cart
          to="#"
          tabIndex={0}
          aria-label="Open cart popup"
          onClick={(e) => {
            e.preventDefault();
            cartPopup ? closeCartPopup() : openCartPopup();
          }}
        >
          <CartIconWrap $bouncing={bouncing}>
            <FaShoppingCart size={28} />
          </CartIconWrap>
          <CartCount>{count}</CartCount>
        </Cart>
        <CartPopup open={cartPopup} onClose={closeCartPopup} />
      </div>
    </HeaderContainer>
  );
}

export default Header;
