import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Appbar from "./components/Appbar";
import Homepages from "./pages/Homepages";
import CartPage from "./pages/CartPage";
import ProductDetail from "./pages/ProductDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

//toastify
import "react-toastify/dist/ReactToastify.css";
import Shipping from "./pages/Shipping";
import Profile from "./pages/Profile";
import PaymentScreen from "./pages/PaymentScreen";
import PlaceOrder from "./pages/PlaceOrder";
import OrderScreen from "./pages/OrderScreen";
import UserList from "./pages/UserList";
import AdminUpdateUser from "./pages/AdminUpdateUser";
import ProductList from "./pages/ProductList";
import CreateProducts from "./pages/CreateProducts";
import AdminUpdateProduct from "./pages/AdminUpdateProduct";

function App() {
  return (
    <>
      <BrowserRouter>
        <Appbar />
        <Routes>
          <Route path="/" element={<Homepages />}></Route>
          <Route path="/products/:id" element={<ProductDetail />}></Route>
          <Route path="/cart/:id" element={<CartPage />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/shipping" element={<Shipping />}></Route>
          <Route path="/profile/:id" element={<Profile />}></Route>
          <Route path="/payment" element={<PaymentScreen />}></Route>
          <Route path="/placeOrder" element={<PlaceOrder />}></Route>
          <Route path="/orders/:id" element={<OrderScreen />}></Route>
          <Route path="/admin/userlist" element={<UserList />}></Route>
          <Route path="/admin/productlist" element={<ProductList />}></Route>
          <Route
            path="/admin/createProducts"
            element={<CreateProducts />}
          ></Route>
          <Route
            path="/admin/user/:id/update"
            element={<AdminUpdateUser />}
          ></Route>
          <Route
            path="/admin/product/:id/update"
            element={<AdminUpdateProduct />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
