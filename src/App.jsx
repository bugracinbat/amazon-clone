import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Products from "./pages/Products";
import { CartProvider } from "./components/CartContext";
import { SearchProvider } from "./components/SearchContext";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <CartProvider>
      <Router>
        <SearchProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SearchProvider>
      </Router>
    </CartProvider>
  );
}

export default App;
