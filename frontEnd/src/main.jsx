import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import CartScreen from "./pages/CartScreen.jsx";
import ProductScreen from "./pages/ProductScreen.jsx";
import LoginScreen from "./pages/LoginScreen.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import RegisterScreen from "./pages/RegisterScreen.jsx";
import Home from "./pages/Home.jsx";
import { store } from "./store.js";
import { Provider } from "react-redux";
import ProfileScreen from "./pages/ProfileScreen.jsx";
import OrdersScreen from './pages/OrdersScreen.jsx'
import OrderDetailsPage from "./pages/OrderDetailsPage.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/profile" element={<ProfileScreen />} />
      <Route path="/orders" element={<OrdersScreen />} />
      <Route path="/order/:orderId" element={<OrderDetailsPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>
);
