import WoocommerceRestApi from "@woocommerce/woocommerce-rest-api";

const api = new WoocommerceRestApi({
  url: "https://demostore.mirailit.com",
  consumerKey: "ck_35f64c79ebe2cfd6979b6f81c103ff01135ae1b8",
  consumerSecret: "cs_1dd3842d9bdc656ace99007faef0bb09a4d34400",
  version: "wc/v3",
});

export const getProducts = async (productAmmount) => {
  const response = await api.get("products", {
    per_page: productAmmount,
  });

  if (response.status === 200) {
    return response.data;
  } else {
    return [];
  }
};

export const saveNewPrices = async (selectedProduct) => {
  console.log(selectedProduct);
  const data = {
    update: selectedProduct,
  };

  api
    .post("products/batch", data)
    .then((res) => {
      console.log(res);
      window.location.reload();
    })
    .catch((e) => console.log(e));
};
