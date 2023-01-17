import React, { useContext } from "react";
import { ProductContext } from "../App";

import TableCell from "./TableCell";

const TableBody = () => {
  const { products, loading, searchedProductItems } =
    useContext(ProductContext);

  return (
    <tbody>
      {products.length === 0 || loading ? (
        <tr>
          <td>
            <p className="text-gray-500 text-lg my-10 ml-5">Loading...</p>
          </td>
        </tr>
      ) : (
        searchedProductItems.map((product) => (
          <TableCell key={product.id} product={product} />
        ))
      )}
    </tbody>
  );
};

export default TableBody;
