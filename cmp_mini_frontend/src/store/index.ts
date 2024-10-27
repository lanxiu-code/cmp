import { configureStore } from "@reduxjs/toolkit";
import user from "./user";
import shopCart from "./shopCart";
import goods from "./goods";
import order from "./order";
import address from "./address";
import category from "./category";
const store = configureStore({
  reducer: { user, shopCart, goods, order, address, category },
});

export default store;
