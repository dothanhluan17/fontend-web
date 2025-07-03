import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './TabbedProductSection.css';

const TabbedProductSection = ({ allProducts }) => {
  return (
    <div className="tabbed-section">
      <h2 className="tabbed-title">SẢN PHẨM</h2>

      <div className="tabbed-product-list">
        {allProducts.map((product) => (
          <ProductCard key={product._id || product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default TabbedProductSection;
