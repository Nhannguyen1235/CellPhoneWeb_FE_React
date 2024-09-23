import React from "react";
import Header from "../../ShopWeb/header/Header";
import Footer from "../../ShopWeb/footer/Footer";
import ProductList from "../../ShopWeb/productList/ProductList";
import ScrollUp from "../../ShopWeb/scrollUp/ScrollUp";

export default function Products() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-fill">
        <ProductList />
      </main>
      <Footer />
      <ScrollUp />
    </div>
  );
}
