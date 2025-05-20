import "./index.css";

import React, { useState, useEffect } from "react";

export default function App() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [products, setProducts] = useState([]);

  const fecthProducts = async () => {
    const res = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
    );
    const data = await res.json();

    console.log(data);

    if (data && data.products) {
      setProducts(data.products);
      setTotalPages(Math.ceil(data.total / 10));
    }
  };

  useEffect(() => {
    fecthProducts();
  }, [page]);

  const selectPageHandler = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage != page && selectedPage <= totalPages)
      setPage(selectedPage);
  };

  return (
    <div className="main">
      {products.length > 0 && (
        <div className="products">
          {products.map((prod) => {
            return (
              <span className="products__single" key={prod.id}>
                <img src={prod.thumbnail} alt={prod.title} />
                <span>{prod.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          <span
            className={page > 1 ? "" : "disable_page"}
            onClick={() => selectPageHandler(page - 1)}
          >
            ◀️
          </span>

          {[...Array(totalPages)].map((_, i) => {
            return (
              <span
                className={page === i + 1 ? "pagination__select" : ""}
                onClick={() => selectPageHandler(i + 1)}
                key={i}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            className={page < totalPages ? "" : "disable_page"}
            onClick={() => selectPageHandler(page + 1)}
            disabled
          >
            ▶️
          </span>
        </div>
      )}
    </div>
  );
}
