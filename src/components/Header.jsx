import styled from "styled-components";
import {
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaSearch,
  FaClock,
  FaArrowLeft,
} from "react-icons/fa";
import { useCart } from "./CartContext";
import { useSearch } from "./SearchContext";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
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

const Tagline = styled.span`
  display: block;
  font-size: 1.05rem;
  color: #0070f3;
  font-weight: 500;
  margin-top: 0.1rem;
  margin-left: 0.2rem;
  letter-spacing: 0.5px;
  @media (max-width: 768px) {
    font-size: 0.95rem;
    margin-top: 0.05rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2.5rem;
  margin-left: 2rem;
  @media (max-width: 768px) {
    display: none;
  }
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

const SearchContainer = styled.div`
  flex: 1;
  margin: 0 1rem;
  position: relative;
  display: flex;
  align-items: center;
  max-width: 400px;
  @media (max-width: 1024px) {
    max-width: 300px;
    margin: 0 0.5rem;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const SearchInputWrapper = styled.div`
  flex: 1;
  position: relative;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 0.7rem 1rem 0.7rem 2.5rem;
  border-radius: 8px 0 0 8px;
  border: 1px solid #eaeaea;
  border-right: none;
  font-size: 1rem;
  background: #fafafa;
  color: #111;
  transition: border 0.2s, box-shadow 0.2s;
  &:focus {
    border: 1px solid #0070f3;
    border-right: none;
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 112, 243, 0.1);
  }
  @media (max-width: 1024px) {
    padding: 0.6rem 0.8rem 0.6rem 2.2rem;
    font-size: 0.9rem;
  }
`;

const SearchButton = styled.button`
  padding: 0.7rem 0.6rem;
  border: 1px solid #eaeaea;
  border-left: none;
  border-radius: 0 8px 8px 0;
  background: #f8f9fa;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  &:hover {
    background: #0070f3;
    color: white;
    border-color: #0070f3;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 112, 243, 0.1);
  }
  @media (max-width: 1024px) {
    padding: 0.6rem 0.5rem;
    width: 36px;
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 0.8rem;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
  pointer-events: none;
  font-size: 0.9rem;
  @media (max-width: 1024px) {
    left: 0.6rem;
    font-size: 0.8rem;
  }
`;

const SearchDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #eaeaea;
  border-top: none;
  border-radius: 0 0 8px 8px;
  max-height: 400px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  display: ${({ $show }) => ($show ? "block" : "none")};
`;

const SearchSection = styled.div`
  padding: 0.5rem 0;
  border-bottom: 1px solid #f0f0f0;
  &:last-child {
    border-bottom: none;
  }
`;

const SearchSectionTitle = styled.div`
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const SearchItem = styled.div`
  padding: 0.7rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  transition: background 0.2s;
  background: ${({ $selected }) => ($selected ? "#e3f2fd" : "transparent")};
  &:hover {
    background: ${({ $selected }) => ($selected ? "#e3f2fd" : "#f8f9fa")};
  }
`;

const SearchItemIcon = styled.div`
  color: #888;
  font-size: 0.9rem;
`;

const SearchItemText = styled.div`
  flex: 1;
  color: #333;
`;

const ClearHistoryButton = styled.button`
  background: none;
  border: none;
  color: #0070f3;
  cursor: pointer;
  font-size: 0.85rem;
  padding: 0.5rem 1rem;
  text-align: left;
  width: 100%;
  &:hover {
    background: #f8f9fa;
  }
`;

const MobileSearchContainer = styled.div`
  margin: 1.5rem 0 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const MobileSearchInputWrapper = styled.div`
  flex: 1;
  position: relative;
`;

const MobileSearchBar = styled.input`
  width: 100%;
  padding: 0.7rem 1.2rem 0.7rem 3rem;
  border-radius: 8px;
  border: 1px solid #eaeaea;
  font-size: 1rem;
  background: #fafafa;
  color: #111;
  transition: border 0.2s, box-shadow 0.2s;
  &:focus {
    border: 1px solid #0070f3;
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 112, 243, 0.1);
  }
`;

const MobileSearchButton = styled.button`
  padding: 0.7rem;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  background: #f8f9fa;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  &:hover {
    background: #0070f3;
    color: white;
    border-color: #0070f3;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 112, 243, 0.1);
  }
`;

const MobileSearchIcon = styled(FaSearch)`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
  pointer-events: none;
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

const Burger = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 120;
  color: #0070f3;
  padding: 0;
  margin: 0;
  @media (max-width: 768px) {
    display: block;
    margin-left: 1.2rem;
  }
  &:hover,
  &:focus {
    background: none;
    box-shadow: none;
    outline: none;
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 70vw;
  max-width: 320px;
  background: #fff;
  box-shadow: -2px 0 16px rgba(0, 0, 0, 0.08);
  z-index: 110;
  display: flex;
  flex-direction: column;
  padding: 2.5rem 1.5rem 1.5rem 1.5rem;
  transform: translateX(${({ open }) => (open ? "0" : "100%")});
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

const MobileNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2rem;
`;

function Header() {
  const { cart, cartPopup, openCartPopup, closeCartPopup } = useCart();
  const {
    searchQuery,
    setSearchQuery,
    searchHistory,
    getSearchSuggestions,
    performSearch,
    clearSearchHistory,
    isSearching,
  } = useSearch();

  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [bouncing, setBouncing] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [mobileSearchQuery, setMobileSearchQuery] = useState(searchQuery);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const searchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  // Initialize local search queries from context on mount
  useEffect(() => {
    setLocalSearchQuery(searchQuery);
    setMobileSearchQuery(searchQuery);
  }, []); // Only run on mount

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

  const handleSearch = (query) => {
    if (query.trim()) {
      setSearchQuery(query); // Update context when search is performed
      performSearch(query);
      setShowSearchDropdown(false);
      setMobileOpen(false);
    }
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setLocalSearchQuery(value);
    setShowSearchDropdown(value.length > 0);
  };

  const handleMobileSearchInputChange = (e) => {
    const value = e.target.value;
    setMobileSearchQuery(value);
  };

  const handleSearchKeyPress = (e) => {
    const suggestions = getSearchSuggestions(localSearchQuery);
    const allItems = [
      ...suggestions,
      ...searchHistory.slice(0, 5).map((h) => h.query),
    ];

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedSuggestionIndex((prev) =>
        prev < allItems.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedSuggestionIndex((prev) => (prev > -1 ? prev - 1 : -1));
    } else if (e.key === "Enter") {
      if (selectedSuggestionIndex >= 0 && allItems[selectedSuggestionIndex]) {
        handleSearch(allItems[selectedSuggestionIndex]);
      } else {
        handleSearch(localSearchQuery);
      }
      setSelectedSuggestionIndex(-1);
    } else if (e.key === "Escape") {
      setShowSearchDropdown(false);
      setSelectedSuggestionIndex(-1);
    } else {
      setSelectedSuggestionIndex(-1);
    }
  };

  const handleMobileSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(mobileSearchQuery);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setLocalSearchQuery(suggestion);
    setMobileSearchQuery(suggestion);
    handleSearch(suggestion);
  };

  const handleHistoryClick = (historyItem) => {
    setLocalSearchQuery(historyItem.query);
    setMobileSearchQuery(historyItem.query);
    handleSearch(historyItem.query);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const suggestions = getSearchSuggestions(localSearchQuery);

  return (
    <HeaderContainer $scrolled={scrolled}>
      <LogoWrap to="/">
        <Triangle />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            lineHeight: 1.1,
          }}
        >
          <LogoText>Mercel Market</LogoText>
          <Tagline>
            Discover. Shop. Smile.{" "}
            <span role="img" aria-label="sparkles">
              ✨
            </span>
          </Tagline>
        </div>
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

      <SearchContainer ref={searchRef}>
        <SearchInputWrapper>
          <SearchIcon />
          <SearchBar
            type="text"
            placeholder="Search products..."
            value={localSearchQuery}
            onChange={handleSearchInputChange}
            onKeyPress={handleSearchKeyPress}
            onFocus={() => setShowSearchDropdown(localSearchQuery.length > 0)}
          />
          <SearchDropdown $show={showSearchDropdown}>
            {suggestions.length > 0 && (
              <SearchSection>
                <SearchSectionTitle>Suggestions</SearchSectionTitle>
                {suggestions.map((suggestion, index) => (
                  <SearchItem
                    key={index}
                    $selected={selectedSuggestionIndex === index}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <SearchItemIcon>
                      <FaSearch />
                    </SearchItemIcon>
                    <SearchItemText>{suggestion}</SearchItemText>
                  </SearchItem>
                ))}
              </SearchSection>
            )}

            {searchHistory.length > 0 && (
              <SearchSection>
                <SearchSectionTitle>Recent Searches</SearchSectionTitle>
                {searchHistory.slice(0, 5).map((historyItem, index) => (
                  <SearchItem
                    key={index}
                    $selected={
                      selectedSuggestionIndex === suggestions.length + index
                    }
                    onClick={() => handleHistoryClick(historyItem)}
                  >
                    <SearchItemIcon>
                      <FaClock />
                    </SearchItemIcon>
                    <SearchItemText>{historyItem.query}</SearchItemText>
                  </SearchItem>
                ))}
                <ClearHistoryButton onClick={clearSearchHistory}>
                  Clear search history
                </ClearHistoryButton>
              </SearchSection>
            )}
          </SearchDropdown>
        </SearchInputWrapper>
        <SearchButton
          onClick={() => handleSearch(localSearchQuery)}
          aria-label="Search"
        >
          <FaSearch />
        </SearchButton>
      </SearchContainer>

      <div
        style={{ display: "flex", alignItems: "center", position: "relative" }}
      >
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
        {!mobileOpen && (
          <Burger
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <FaBars size={28} color="#0070f3" />
          </Burger>
        )}
        <CartPopup open={cartPopup} onClose={closeCartPopup} />
      </div>
      <MobileMenu open={mobileOpen}>
        <Burger
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
          style={{ alignSelf: "flex-end", marginBottom: "1.5rem" }}
        >
          <FaTimes size={28} color="#0070f3" />
        </Burger>
        <MobileSearchContainer>
          <MobileSearchInputWrapper ref={mobileSearchRef}>
            <MobileSearchIcon />
            <MobileSearchBar
              type="text"
              placeholder="Search products..."
              value={mobileSearchQuery}
              onChange={handleMobileSearchInputChange}
              onKeyPress={handleMobileSearchKeyPress}
            />
          </MobileSearchInputWrapper>
          <MobileSearchButton
            onClick={() => handleSearch(mobileSearchQuery)}
            aria-label="Search"
          >
            <FaSearch />
          </MobileSearchButton>
        </MobileSearchContainer>
        <MobileNav>
          <NavLink
            to="/"
            onClick={() => setMobileOpen(false)}
            className={location.pathname === "/" ? "active" : ""}
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            onClick={() => setMobileOpen(false)}
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
            onClick={() => setMobileOpen(false)}
            className={location.pathname === "/cart" ? "active" : ""}
          >
            Cart
          </NavLink>
        </MobileNav>
      </MobileMenu>
    </HeaderContainer>
  );
}

export default Header;
