import styled, { keyframes } from "styled-components";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearch } from "../components/SearchContext";
import ProductCard from "../components/ProductCard";

const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2vw 2vw 4vw 2vw;
  box-sizing: border-box;
  @media (max-width: 600px) {
    padding: 4vw 1vw 8vw 1vw;
  }
`;

const SearchHeader = styled.div`
  margin-bottom: 2rem;
`;

const SearchInfo = styled.div`
  text-align: center;
  margin-bottom: 1rem;
  color: #666;
  font-size: 1rem;
`;

const SearchQuery = styled.span`
  font-weight: 600;
  color: #333;
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const FilterSelect = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid #eaeaea;
  border-radius: 6px;
  background: white;
  color: #333;
  font-size: 0.9rem;
  cursor: pointer;
  &:focus {
    border: 1px solid #0070f3;
    outline: none;
  }
`;

const ClearFiltersButton = styled.button`
  background: none;
  border: 1px solid #eaeaea;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  color: #666;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
  &:hover {
    border-color: #0070f3;
    color: #0070f3;
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: none; }
`;

const GridBg = styled.div`
  background: linear-gradient(135deg, #f8fafc 60%, #eaf1fb 100%);
  border-radius: 24px;
  padding: 3vw 2vw;
  margin-top: 2vw;
  @media (max-width: 600px) {
    padding: 6vw 2vw;
    border-radius: 12px;
  }
`;

const MasonryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  column-gap: 2.5vw;
  row-gap: 2.5vw;
  width: 100%;
  animation: ${fadeIn} 0.5s;
`;

const EmptyState = styled.div`
  text-align: center;
  color: #888;
  font-size: 1.2rem;
  margin: 3rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EmptyEmoji = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const shimmer = keyframes`
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

const SkeletonCard = styled.div`
  background: #f4f4f4;
  border-radius: 18px;
  min-height: 370px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.07), 0 1.5px 4px rgba(0, 0, 0, 0.03);
  border: 1.5px solid #ececec;
  position: relative;
  overflow: hidden;
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, #f4f4f4 0%, #eaeaea 50%, #f4f4f4 100%);
    background-size: 400px 100%;
    animation: ${shimmer} 1.2s infinite;
    opacity: 0.7;
  }
`;

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    searchQuery,
    setSearchQuery,
    searchProducts,
    performSearch,
    searchFilters,
    updateFilters,
    isSearching,
  } = useSearch();

  const [loading, setLoading] = useState(true);

  // Initialize from URL parameters
  useEffect(() => {
    const queryFromURL = searchParams.get("q") || "";
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const rating = searchParams.get("rating");
    const sort = searchParams.get("sort");

    // Update search context
    setSearchQuery(queryFromURL);

    // Update filters if they exist in URL
    if (minPrice || maxPrice || rating || sort) {
      updateFilters({
        priceRange: {
          min: minPrice ? parseInt(minPrice) : 0,
          max: maxPrice ? parseInt(maxPrice) : 1000,
        },
        rating: rating ? parseFloat(rating) : 0,
        sortBy: sort || "relevance",
      });
    }

    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [searchParams, setSearchQuery, updateFilters]);

  // Get filtered products
  const filteredProducts = searchProducts(searchQuery, searchFilters);

  const handleFilterChange = (filterType, value) => {
    let newFilters = { ...searchFilters };

    if (filterType === "sortBy") {
      newFilters.sortBy = value;
    } else if (filterType === "rating") {
      newFilters.rating = parseFloat(value);
    } else if (filterType === "priceRange") {
      newFilters.priceRange = value;
    }

    updateFilters(newFilters);
    performSearch(searchQuery, newFilters);
  };

  const handleClearFilters = () => {
    const defaultFilters = {
      priceRange: { min: 0, max: 1000 },
      rating: 0,
      sortBy: "relevance",
    };
    updateFilters(defaultFilters);
    performSearch(searchQuery, defaultFilters);
  };

  const hasActiveFilters =
    searchFilters.rating > 0 ||
    searchFilters.priceRange.min > 0 ||
    searchFilters.priceRange.max < 1000 ||
    searchFilters.sortBy !== "relevance";

  return (
    <Container>
      <SearchHeader>
        {searchQuery && (
          <SearchInfo>
            {filteredProducts.length} results for{" "}
            <SearchQuery>"{searchQuery}"</SearchQuery>
          </SearchInfo>
        )}

        <FiltersContainer>
          <FilterSelect
            value={searchFilters.sortBy}
            onChange={(e) => handleFilterChange("sortBy", e.target.value)}
            aria-label="Sort by"
          >
            <option value="relevance">Sort by Relevance</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Customer Rating</option>
          </FilterSelect>

          <FilterSelect
            value={searchFilters.rating}
            onChange={(e) => handleFilterChange("rating", e.target.value)}
            aria-label="Minimum rating"
          >
            <option value="0">Any Rating</option>
            <option value="4">4+ Stars</option>
            <option value="3">3+ Stars</option>
            <option value="2">2+ Stars</option>
          </FilterSelect>

          <FilterSelect
            value={`${searchFilters.priceRange.min}-${searchFilters.priceRange.max}`}
            onChange={(e) => {
              const [min, max] = e.target.value.split("-").map(Number);
              handleFilterChange("priceRange", { min, max });
            }}
            aria-label="Price range"
          >
            <option value="0-1000">Any Price</option>
            <option value="0-25">Under $25</option>
            <option value="25-50">$25 - $50</option>
            <option value="50-100">$50 - $100</option>
            <option value="100-1000">$100+</option>
          </FilterSelect>

          {hasActiveFilters && (
            <ClearFiltersButton onClick={handleClearFilters}>
              Clear Filters
            </ClearFiltersButton>
          )}
        </FiltersContainer>
      </SearchHeader>

      <GridBg>
        <MasonryGrid>
          {loading || isSearching ? (
            Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} aria-label="Loading product" />
            ))
          ) : filteredProducts.length === 0 ? (
            <EmptyState>
              <EmptyEmoji>🛒</EmptyEmoji>
              {searchQuery ? (
                <div>
                  <div>No products found for "{searchQuery}"</div>
                  <div
                    style={{
                      fontSize: "1rem",
                      marginTop: "0.5rem",
                      color: "#999",
                    }}
                  >
                    Try adjusting your search or filters
                  </div>
                </div>
              ) : (
                "No products found."
              )}
            </EmptyState>
          ) : (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </MasonryGrid>
      </GridBg>
    </Container>
  );
}

export default Products;
