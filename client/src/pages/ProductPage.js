import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import Product from "../components/Product";
import SearchBar from "../components/SearchBar";
import { listProducts } from "../redux/actions/productActions";

function ProductPage() {
  const { keyword, pageNo, sort } = useParams();

  let pageNumber = pageNo ? pageNo : 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);

  const { loading, error, products, pages } = productList;

  //sorting
  const navigate = useNavigate();

  const sortOptions = ["latest", "oldest", "a-z", "z-a"];
  const [sorted, setSorted] = useState("");
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber, sort));
  }, [dispatch, keyword, pageNumber, sort]);

  const handleChange = (e) => {
    e.preventDefault();
    let x = e.target.value;
    setSorted(x);
    navigate(`/products/page/1/sort/${x}`);
  };
  return (
    <>
      <Container>
        <Row className="justify-content-between align-items-center">
          <Col lg={9}>
            <div className="my-5">
              <SearchBar />
            </div>
          </Col>
          <Col lg={3}>
            <select
              class="custom-select custom-select-lg py-2 sort"
              onChange={handleChange}
            >
              {sortOptions.map((i, k) => {
                return (
                  <option value={i} name={i}>
                    {i}
                  </option>
                );
              })}
            </select>
          </Col>
        </Row>

        <Row>
          <Col lg={12}></Col>
          <Col lg={12}>
            {" "}
            <div className="text_deco">
              <h2 data-text="Products">Products</h2>
            </div>
            <Row className="justify-content-around flex-wrap gap-1">
              {products &&
                products.map((item, k) => {
                  return (
                    <Col key={k} className="my-1" sm={12} md={6} lg={4} xl={3}>
                      <Product
                        product={item}
                        tag={item.category_name}
                        bg="#c4c1d4"
                      />
                    </Col>
                  );
                })}
              <Paginate
                pages={pages} //3
                page={pageNumber} //1
                keyword={keyword ? keyword : ""} //keyword
                sort={sorted ? sorted : ""}
              />
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ProductPage;
