import React, { useEffect, useState } from 'react';
import './Products.css';
import { useLocation, Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';

const Products = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const categorySlug = query.get('category');
  const searchQuery = query.get('search')?.toLowerCase() || '';

  // Danh sách danh mục từ backend
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/categories`)
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  // Danh sách sản phẩm từ backend
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/products`)
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  // Lọc theo danh mục
  const selectedCategory = categories.find(cat => {
    const slug = cat.name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .toLowerCase();
    return slug === categorySlug;
  });
  const selectedCategoryId = selectedCategory?._id;

  // Map slug -> name
  const categoryMap = {};
  categories.forEach(cat => {
    const slug = cat.name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .toLowerCase();
    categoryMap[slug] = cat.name;
  });

  const normalize = str =>
    str?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const [sortOption, setSortOption] = useState(''); // <-- thêm state sắp xếp

  // Lọc theo danh mục & tìm kiếm
  const filteredProducts = products.filter((p) => {
    const matchCategory = selectedCategoryId ? p.category === selectedCategoryId : true;
    const matchSearch = searchQuery
      ? normalize(p.name).includes(searchQuery)
      : true;
    return matchCategory && matchSearch;
  });

  // Sắp xếp theo giá
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'asc') return a.price - b.price;
    if (sortOption === 'desc') return b.price - a.price;
    return 0;
  });

  return (
    <div className="products-container">
      <h1>
        {categorySlug ? `Danh mục: ${categoryMap[categorySlug] || categorySlug}` : 'Tất cả sản phẩm'}
      </h1>

      {searchQuery && (
        <p style={{ marginBottom: '10px', fontStyle: 'italic' }}>
          Kết quả cho từ khóa: <strong>"{searchQuery}"</strong>
        </p>
      )}

      {/* Dropdown lọc giá */}
      <div style={{ marginBottom: '16px' }}>
        <label style={{ marginRight: '10px' }}>Sắp xếp theo giá:</label>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          style={{ padding: '6px', borderRadius: '4px' }}
        >
          <option value="">-- Không sắp xếp --</option>
          <option value="asc">Tăng dần</option>
          <option value="desc">Giảm dần</option>
        </select>
      </div>

      <div className="products-layout">
        {/* Sidebar */}
        <aside className="category-sidebar">
          <div className="sidebar-header">
            <span>DANH MỤC SẢN PHẨM</span>
            <i className="menu-icon">☰</i>
          </div>
          <ul className="category-list">
            {categories.map(cat => {
              const slug = cat.name
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/\s+/g, "-")
                .toLowerCase();
              return (
                <li key={cat._id}>
                  <Link to={`/products?category=${slug}`}><span>›</span> {cat.name}</Link>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Danh sách sản phẩm */}
        <section className="product-list">
          {sortedProducts.length > 0 ? (
            sortedProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))
          ) : (
            <p style={{ fontStyle: 'italic', color: 'gray' }}>
              Không tìm thấy sản phẩm phù hợp.
            </p>
          )}
        </section>
      </div>
    </div>
  );
};

export default Products;
