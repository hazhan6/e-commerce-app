import React from "react";
import { useParams } from "react-router-dom";
import ProductsSection from "../components/productsSection";

const ProductsByCategory = () => {
  const { selectedCategory } = useParams();

  return (
    <div className="min-h-screen mb-10">
      <ProductsSection category={selectedCategory} isCategoryPage={true} />
    </div>
  );
};

export default ProductsByCategory;
