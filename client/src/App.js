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
import AdminOrderList from "./pages/AdminOrderList";
import "swiper/css/bundle";
import CategoryEdit from "./pages/CategoryEdit";
import CategoryList from "./pages/CategoryList";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Appbar />
        <Routes>
          <Route path="/" exact element={<Homepages />}></Route>
          {/* <Route path="/page/:pageNo" element={<Homepages />} exact></Route>
          <Route
            path="/search/:keyword/page/:pageNo"
            element={<Homepages />}
            exact
          ></Route> */}
          <Route path="/products" exact element={<ProductPage />}></Route>
          <Route
            path="/products/page/:pageNo"
            element={<ProductPage />}
            exact
          ></Route>
          <Route
            path="/products/page/:pageNo/sort/:sort"
            element={<ProductPage />}
            exact
          ></Route>
          <Route
            path="/products/search/:keyword/page/:pageNo"
            element={<ProductPage />}
            exact
          ></Route>

          {/* <Route path="/search/:keyword" element={<Homepages />} exact></Route> */}
          <Route
            path="/products/search/:keyword"
            element={<ProductPage />}
            exact
          ></Route>
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
          <Route path="/admin/categoryList" element={<CategoryList />}></Route>
          <Route
            path="/admin/category/:id/update"
            element={<CategoryEdit />}
          ></Route>
          {/* <Route
            path="/admin/createProducts"
            element={<CreateProducts />}
          ></Route> */}
          <Route
            path="/admin/user/:id/update"
            element={<AdminUpdateUser />}
          ></Route>
          <Route
            path="/admin/product/:id/update"
            element={<AdminUpdateProduct />}
          ></Route>
          <Route path="/admin/orderlist" element={<AdminOrderList />}></Route>

          <Route
            path="/admin/productlist/:pageNo"
            element={<ProductList />}
            exact
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
