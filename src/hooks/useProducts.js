import { useEffect, useState } from "react";
import { getProducts } from "../api";

const useProducts = (productAmmount) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getProducts(productAmmount).then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, [productAmmount]);

  return { products, loading };
};

export default useProducts;
