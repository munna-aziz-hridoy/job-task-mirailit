import React from "react";
import useProducts from "../hooks/useProducts";
import TableCell from "./TableCell";

const TableBody = ({ productAmmount }) => {
  const { products, loading } = useProducts(productAmmount);

  return (
    <tbody>
      {products.length === 0 || loading ? (
        <tr>
          <td>
            <p className="text-gray-500 text-lg my-10 ml-5">Loading...</p>
          </td>
        </tr>
      ) : (
        products.map((product) => (
          <TableCell key={product.id} product={product} />
        ))
      )}
    </tbody>
  );
};

export default TableBody;
