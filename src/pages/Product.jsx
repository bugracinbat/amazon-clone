import styled from "styled-components";
import { useParams, Link, useNavigate } from "react-router-dom";
import products from "../assets/products";
import { useCart } from "../components/CartContext";
import { useState } from "react";
import ProductCard from "../components/ProductCard";

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
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [userReviews, setUserReviews] = useState([]);
  const navigate = useNavigate();

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
    ...userReviews,
  ];

  // Related products: show 4 random others
  const related = products.filter((p) => p.id !== product.id).slice(0, 4);

  // Placeholder details
  const brand = "Acme";
  const category = "Electronics";
  const sku = product.id.slice(0, 8).toUpperCase();
  const stock = 12;

  function handleBuyNow() {
    addToCart({ ...product, qty });
    navigate("/cart");
  }

  function handleReviewSubmit(e) {
    e.preventDefault();
    if (!reviewText) return;
    setUserReviews([
      ...userReviews,
      { name: "You", text: reviewText, rating: reviewRating },
    ]);
    setReviewText("");
    setReviewRating(5);
  }

  return (
    <div style={{ width: "100%" }}>
      {/* Breadcrumb */}
      <div style={{ margin: "1rem 0", fontSize: "0.98rem" }}>
        <Link to="/">Home</Link> &gt; <Link to="/products">Products</Link> &gt;{" "}
        {product.title}
      </div>
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
          {/* More product details */}
          <div
            style={{ marginBottom: "1rem", color: "#444", fontSize: "1.02rem" }}
          >
            <div>
              <b>Brand:</b> {brand}
            </div>
            <div>
              <b>Category:</b> {category}
            </div>
            <div>
              <b>SKU:</b> {sku}
            </div>
            <div>
              <b>Stock:</b> {stock > 0 ? stock : "Out of stock"}
            </div>
          </div>
          <Price>${product.price}</Price>
          <Rating>
            {"★".repeat(product.rating)}
            {"☆".repeat(5 - product.rating)}
          </Rating>
          <Description>{product.description}</Description>
          <QuantityWrap>
            <span style={{ fontWeight: 600 }}>Quantity:</span>
            <QtyButton onClick={() => setQty(qty > 1 ? qty - 1 : 1)}>
              -
            </QtyButton>
            {qty}
            <QtyButton onClick={() => setQty(qty + 1)}>+</QtyButton>
          </QuantityWrap>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              width: "100%",
              marginBottom: "1.5rem",
            }}
          >
            <Button
              onClick={() => addToCart({ ...product, qty })}
              style={{ flex: 1 }}
            >
              Add to Cart
            </Button>
            <Button
              onClick={handleBuyNow}
              style={{ flex: 1, background: "#ffa41c" }}
            >
              Buy Now
            </Button>
          </div>
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
            {/* Review form */}
            <form
              onSubmit={handleReviewSubmit}
              style={{ marginTop: "1.5rem", width: "100%" }}
            >
              <div style={{ fontWeight: 600, marginBottom: 4 }}>
                Add a Review
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 8,
                }}
              >
                <span>Rating:</span>
                <select
                  value={reviewRating}
                  onChange={(e) => setReviewRating(Number(e.target.value))}
                  style={{ fontSize: "1rem" }}
                >
                  {[5, 4, 3, 2, 1].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows={3}
                placeholder="Write your review..."
                style={{
                  width: "100%",
                  marginBottom: 8,
                  padding: 8,
                  borderRadius: 4,
                  border: "1px solid #eaeaea",
                }}
                required
              />
              <Button type="submit" style={{ width: 160 }}>
                Submit Review
              </Button>
            </form>
          </ReviewsSection>
        </Details>
      </Container>
      {/* Related products */}
      <div style={{ maxWidth: 900, margin: "3rem auto 0 auto", width: "100%" }}>
        <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: 16 }}>
          Related Products
        </h3>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {related.map((p) => (
            <div
              key={p.id}
              style={{ flex: "1 1 180px", minWidth: 180, maxWidth: 220 }}
            >
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Product;
