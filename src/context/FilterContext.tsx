// src/context/FilterContext.tsx
import React, { createContext, useState, useContext } from "react";

interface FilterContextProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedCategories: string[];
  setSelectedCategories: (value: string[]) => void;
  priceRange: [number, number];
  setPriceRange: (value: [number, number]) => void;
  dimensions: string;
  setDimensions: (value: string) => void;
}

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

export const FilterProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [dimensions, setDimensions] = useState("");

  return (
    <FilterContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        selectedCategories,
        setSelectedCategories,
        priceRange,
        setPriceRange,
        dimensions,
        setDimensions,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilterContext must be used within a FilterProvider");
  }
  return context;
};
