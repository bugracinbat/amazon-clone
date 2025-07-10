import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import products from "../assets/products";

const SearchContext = createContext();

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [searchFilters, setSearchFilters] = useState({
    priceRange: { min: 0, max: 1000 },
    rating: 0,
    sortBy: "relevance", // relevance, price-low, price-high, rating
  });
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Load search history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem("amazon-clone-search-history");
    if (savedHistory) {
      try {
        setSearchHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error("Error loading search history:", error);
      }
    }
  }, []);

  // Save search history to localStorage
  useEffect(() => {
    if (searchHistory.length > 0) {
      localStorage.setItem(
        "amazon-clone-search-history",
        JSON.stringify(searchHistory)
      );
    }
  }, [searchHistory]);

  // Search function with advanced filtering
  const searchProducts = (query, filters = searchFilters) => {
    let results = [...products]; // Create a copy to avoid mutating original

    // Text search with improved matching
    if (query.trim()) {
      const searchTerms = query.toLowerCase().trim().split(/\s+/);
      results = products.filter((product) => {
        const searchText =
          `${product.title} ${product.description}`.toLowerCase();

        // Check for exact matches first (higher relevance)
        if (searchText.includes(query.toLowerCase())) {
          return true;
        }

        // Then check if all search terms are present
        return searchTerms.every((term) => searchText.includes(term));
      });

      // Sort by relevance when searching
      if (filters.sortBy === "relevance") {
        results.sort((a, b) => {
          const queryLower = query.toLowerCase();

          // Prioritize title matches over description matches
          const aTitleMatch = a.title.toLowerCase().includes(queryLower);
          const bTitleMatch = b.title.toLowerCase().includes(queryLower);

          if (aTitleMatch && !bTitleMatch) return -1;
          if (!aTitleMatch && bTitleMatch) return 1;

          // Then by exact match in title
          const aExactTitle = a.title.toLowerCase() === queryLower;
          const bExactTitle = b.title.toLowerCase() === queryLower;

          if (aExactTitle && !bExactTitle) return -1;
          if (!aExactTitle && bExactTitle) return 1;

          return 0;
        });
      }
    }

    // Apply filters
    results = results.filter((product) => {
      const price = parseFloat(product.price);
      const rating = product.rating;

      return (
        price >= filters.priceRange.min &&
        price <= filters.priceRange.max &&
        rating >= filters.rating
      );
    });

    // Apply sorting (if not already sorted by relevance)
    if (filters.sortBy !== "relevance" || !query.trim()) {
      switch (filters.sortBy) {
        case "price-low":
          results.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
          break;
        case "price-high":
          results.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
          break;
        case "rating":
          results.sort((a, b) => b.rating - a.rating);
          break;
        default:
          break;
      }
    }

    return results;
  };

  // Search suggestions based on product titles
  const getSearchSuggestions = (query) => {
    if (!query.trim() || query.length < 2) return [];

    const suggestions = new Set();
    const queryLower = query.toLowerCase();

    products.forEach((product) => {
      const words = product.title.toLowerCase().split(" ");
      words.forEach((word) => {
        if (word.startsWith(queryLower) && word.length > 2) {
          suggestions.add(word);
        }
      });

      // Also add full titles that contain the query
      if (product.title.toLowerCase().includes(queryLower)) {
        suggestions.add(product.title);
      }
    });

    return Array.from(suggestions).slice(0, 8);
  };

  // Add to search history
  const addToSearchHistory = (query) => {
    if (!query.trim()) return;

    setSearchHistory((prev) => {
      const filtered = prev.filter((item) => item.query !== query.trim());
      const newHistory = [
        {
          query: query.trim(),
          timestamp: new Date().toISOString(),
        },
        ...filtered,
      ];
      return newHistory.slice(0, 10); // Keep only last 10 searches
    });
  };

  // Perform search and navigate
  const performSearch = (query, filters = searchFilters) => {
    setIsSearching(true);
    setSearchQuery(query);

    if (query.trim()) {
      addToSearchHistory(query);
    }

    // Navigate to products page with search params
    const searchParams = new URLSearchParams();
    if (query.trim()) searchParams.set("q", query);
    if (filters.priceRange.min > 0)
      searchParams.set("minPrice", filters.priceRange.min);
    if (filters.priceRange.max < 1000)
      searchParams.set("maxPrice", filters.priceRange.max);
    if (filters.rating > 0) searchParams.set("rating", filters.rating);
    if (filters.sortBy !== "relevance")
      searchParams.set("sort", filters.sortBy);

    const queryString = searchParams.toString();
    const path = queryString ? `/products?${queryString}` : "/products";

    if (location.pathname !== "/products") {
      navigate(path);
    } else {
      // Update URL without navigation if already on products page
      window.history.replaceState(null, "", path);
    }

    setTimeout(() => setIsSearching(false), 500);
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
    setSearchFilters({
      priceRange: { min: 0, max: 1000 },
      rating: 0,
      sortBy: "relevance",
    });
    if (location.pathname === "/products") {
      navigate("/products");
    }
  };

  // Clear search history
  const clearSearchHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("amazon-clone-search-history");
  };

  // Update filters
  const updateFilters = (newFilters) => {
    setSearchFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const value = {
    searchQuery,
    setSearchQuery,
    searchHistory,
    searchFilters,
    isSearching,
    searchProducts,
    getSearchSuggestions,
    performSearch,
    clearSearch,
    clearSearchHistory,
    updateFilters,
    addToSearchHistory,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
