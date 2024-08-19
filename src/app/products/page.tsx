import React from "react";
import ProductCatalog from "../component/ProductCatalog";
import WithAuth from "../component/WithAuth";
import { GetServerSideProps } from "next";
import { Suspense } from "react";
const CatalogPage = () => {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <ProductCatalog />
    </Suspense>
  );
};

// export default WithAuth(CatalogPage);
export default CatalogPage;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { params, query, req } = context;
//   const res = await fetch(`https://api.example.com/data?id=${query.id}`);
//   const data = await res.json();
//   console.log("product list", data);
//   return {
//     props: {
//       productList: data,
//     },
//   };
// };
