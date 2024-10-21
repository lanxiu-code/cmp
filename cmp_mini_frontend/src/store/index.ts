import { configureStore } from "@reduxjs/toolkit";
import user from "./user";
import shopCart from "./shopCart";
import goods from "./goods";
import order from "./order";
import address from "./address";

const store = configureStore({
  reducer: { user, shopCart, goods, order, address },
});

export default store;
