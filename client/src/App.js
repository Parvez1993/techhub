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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
