import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Appbar from "./components/Appbar";
import Homepages from "./pages/Homepages";
import ProductDetail from "./pages/ProductDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <Appbar />
        <Routes>
          <Route path="/" element={<Homepages />}></Route>
          <Route path="/products/:id" element={<ProductDetail />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
