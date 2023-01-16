import { createContext, useState } from "react";
import { ToastContainer } from "react-toastify";

import Table from "./components/Table";
import TableBody from "./components/TableBody";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

export const SelectedProductContext = createContext();

function App() {
  const [productAmmount, setProductAmmount] = useState(10);
  const [selectedProduct, setSelectedProduct] = useState([]);

  return (
    <SelectedProductContext.Provider
      value={{ selectedProduct, setSelectedProduct }}
    >
      <div className="container mx-auto">
        <h2 className="text-center font-semibold text-3xl my-5 text-gray-700">
          All Products
        </h2>

        <div className="flex justify-between items-center my-5">
          <div>
            <p className="text-gray-600 text-xl">Show Products</p>
          </div>
          <div>
            <select
              id="products"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={(e) => {
                setProductAmmount(parseInt(e.target.value));
              }}
              defaultValue={productAmmount}
            >
              <option disabled>Product Ammount</option>
              {[10, 20, 30, 40, 50].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        <Table>
          <TableBody productAmmount={productAmmount} />
        </Table>
      </div>
      <ToastContainer />
    </SelectedProductContext.Provider>
  );
}

export default App;
