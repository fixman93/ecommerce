const getInitialProducts = () => {
  const storedProducts = localStorage.getItem("products");
  return storedProducts ? JSON.parse(storedProducts) : [];
};

const productsReducer = (state = getInitialProducts(), action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      localStorage.setItem("products", JSON.stringify(action.payload));
      return action.payload;

    default:
      return state;
  }
};

export default productsReducer;
