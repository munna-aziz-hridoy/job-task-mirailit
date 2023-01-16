import React, { useContext, useState } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { SelectedProductContext } from "../App";

const TableCell = ({ product }) => {
  const [openEditField, setOpenEditField] = useState(false);
  const [errorText, setErrorText] = useState("");
  const { selectedProduct, setSelectedProduct } = useContext(
    SelectedProductContext
  );

  const handleInputChange = (e) => {
    const inputText = e.target.value;
    const regex = new RegExp("^[0-9]*$");

    if (regex.test(inputText) && inputText !== "") {
      setSelectedProduct((prev) => {
        const isExists = prev.find((item) => item.id === product.id);
        console.log(isExists);
        if (!isExists) {
          return [...prev, { id: product.id, price: inputText }];
        } else {
          const restItems = prev.filter((item) => item.id !== isExists.id);
          isExists.price = inputText;
          return [...restItems, isExists];
        }
      });
    } else if (regex.test(inputText) === false) {
      setErrorText("Please input numbers only");
    } else if (inputText === "") {
      setErrorText("Please provide a value");
    }
  };

  return (
    <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
      <td
        scope="col"
        className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap "
      >
        <div className="w-full flex justify-center items-center  flex-wrap">
          {product.images.map((image) => (
            <img
              key={image.id}
              src={image.src}
              alt={product.name}
              className="w-24 h-24 rounded shadow"
            />
          ))}
        </div>
      </td>

      <td className="  px-6 py-4 whitespace-nowrap text-center text-lg font-semibold capitalize">
        {product.name}
      </td>

      <td className="text-gray-500  px-6 py-4 whitespace-nowrap text-center text-lg font-semibold min-w-[200px]">
        {openEditField ? (
          <div className="flex flex-col justify-center items-center">
            <input
              onFocus={() => {
                setErrorText("");
              }}
              onBlur={handleInputChange}
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-700 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 max-w-[180px]"
              placeholder="New price"
              required
            />
            {errorText && <p className="text-sm text-red-500 ">{errorText}</p>}
          </div>
        ) : (
          <span className="text-center text-lg font-semibold text-gray-600 min-w-[200px]">
            ${product.price}
          </span>
        )}
      </td>

      <td className="text-gray-500  px-6 py-4 whitespace-nowrap text-center text-lg font-semibold min-w-[150px]">
        {!openEditField ? (
          <span onClick={() => setOpenEditField(true)}>
            <HiOutlinePencilAlt
              className="mx-auto cursor-pointer"
              fontSize={24}
            />
          </span>
        ) : (
          <span
            onClick={() => {
              setSelectedProduct((prev) =>
                prev.filter((item) => item.id !== product.id)
              );
              setOpenEditField(false);
            }}
            className="bg-red-500 text-white font-semibold text-sm rounded-md p-2 cursor-pointer"
          >
            cancel
          </span>
        )}
      </td>
    </tr>
  );
};

export default TableCell;
