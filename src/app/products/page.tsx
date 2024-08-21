import React from "react";
import ProductCatalog from "../component/ProductCatalog";
import { Suspense } from "react";
const CatalogPage = () => {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <ProductCatalog />
    </Suspense>
  );
};

export default CatalogPage;
