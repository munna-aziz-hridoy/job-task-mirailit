import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { saveNewPrices } from "../api";
import { SelectedProductContext } from "../App";

const Table = ({ children }) => {
  const [isInputValidate, setIsInputValidate] = useState(false);
  const { selectedProduct, setSelectedProduct } = useContext(
    SelectedProductContext
  );

  useEffect(() => {
    if (selectedProduct.length > 0) {
      for (let i = 0; i < selectedProduct.length; i++) {
        const product = selectedProduct[i];
        const regex = new RegExp("^[0-9]*$");
        if (regex.test(product.price) === false) {
          setIsInputValidate(false);
        } else if (product.price === "") {
          setIsInputValidate(false);
        } else {
          setIsInputValidate(true);
        }
      }
    }
  }, [selectedProduct]);

  const handleSavePrice = async () => {
    if (isInputValidate) {
      await saveNewPrices(selectedProduct);
    } else if (selectedProduct.length === 0) {
      return toast.error("Nothing to save");
    } else {
      return toast.error("Some price are not valid");
    }
  };

  return (
    <div className="flex flex-col shadow-xl mb-56 relative">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-white border-b shadow-xl mb-32">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4"
                  >
                    Image
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-green-900 px-6 py-4"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              {children}
            </table>
          </div>
        </div>
      </div>
      <button
        onClick={handleSavePrice}
        className={`bg-green-700 text-white p-3 rounded text-lg w-28 h-10 fixed right-2 bottom-[10%] flex justify-center items-center ${
          selectedProduct?.length === 0 ? "opacity-40" : "opacity-100"
        }`}
      >
        {selectedProduct.length <= 1 ? "Save" : "Save All"}
      </button>
    </div>
  );
};

export default Table;
