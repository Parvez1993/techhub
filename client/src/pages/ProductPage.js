import React, { useEffect, useState } from "react";
import { Col, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import Product from "../components/Product";
import SearchBar from "../components/SearchBar";
import { listProducts } from "../redux/actions/productActions";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

// Demo styles, see 'Styles' section below for some notes on use.
import "react-accessible-accordion/dist/fancy-example.css";
import { listCategory } from "../redux/actions/categoryActions";
import { prices } from "../utils";

function ProductPage() {
  const {
    keyword,
    pageNo,
    sort,
    cat: catParams,
    min = 0,
    max = 0,
  } = useParams();

  let pageNumber = pageNo ? pageNo : 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);

  const { loading, error, products, pages } = productList;

  const categoryList = useSelector((state) => state.category);
  const { category, loading: catLoading } = categoryList;

  //sorting
  const navigate = useNavigate();

  const sortOptions = ["latest", "oldest", "a-z", "z-a"];
  const [sorted, setSorted] = useState("latest");

  const [cat, setCat] = useState("all");

  const [minprice, setminprice] = useState(0);
  const [maxprice, setmaxprice] = useState(1000);
  //price

  useEffect(() => {
    if (!category.length > 0) {
      dispatch(listCategory());
    }
    dispatch(listProducts(keyword, pageNumber, sort, catParams, min, max));
  }, [dispatch, keyword, pageNumber, sort, catParams, min, max]);

  //handle filter

  // handle sort
  const handleChange = (e) => {
    e.preventDefault();
    let x = e.target.value;
    setSorted(x);
    navigate(`/products/page/1/sort/${x}`);
  };

  // handle category

  //price handler

  const handleCategory = (e) => {
    e.preventDefault();
    setCat(e.target.innerText);
    if (e.target.innerText === "All") {
      navigate(`/products/page/1/sort/latest`);
    } else {
      navigate(
        `/products/page/1/sort/${sorted}/category/${e.target.innerText}`
      );
    }
  };

  const handlePrice = (min, max) => {
    setminprice(min);
    setmaxprice(max);
  };

  const getFilterUrl = (filter) => {
    let sortOrder = filter.sort || sorted;

    const filterCategory = filter.category || "All";

    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;

    return `/products/page/1/sort/${sortOrder}/category/${filterCategory}/min/${filterMin}/max/${filterMax}`;
  };
  return (
    <>
      <Image
        src="https://s3-ap-southeast-1.amazonaws.com/hnsgsfp/4/images/JBL-Main+banner+1200x300px.jpg"
        alt="img"
        width="100%"
        className="fluid"
      />

      <Row>
        <Col lg={2}></Col>
        <Col lg={9}>
          <div className=" d-flex justify-content-around align-items-center mt-5">
            <div className="w-75">
              <SearchBar />
            </div>

            <div>
              <select
                class="custom-select custom-select-lg py-2 sort"
                onChange={(e) => {
                  navigate(getFilterUrl({ sort: e.target.value }));
                }}
              >
                {sortOptions.map((i, k) => {
                  return (
                    <option value={i} name={i} key={k}>
                      {i}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </Col>
      </Row>

      {/* // FILTER  */}
      <Row className="my-5">
        <Col lg={3}>
          <ListGroup className="text-secondary ps-2">
            <ListGroup.Item>Filter</ListGroup.Item>
            {/* //category */}
            <ListGroup.Item>
              <Accordion>
                <AccordionItem>
                  <AccordionItemHeading>
                    {/* CATEGORY FILTER */}
                    <AccordionItemButton>Category</AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <ul style={{ listStyle: "none" }}>
                      <li className="my-2">
                        <Link to={getFilterUrl({ category: "All" })}>All</Link>
                      </li>
                      {category.map((i, k) => {
                        return (
                          <div key={k}>
                            <li className="my-2">
                              <Link to={getFilterUrl({ category: i.name })}>
                                {i.name}
                              </Link>
                            </li>
                          </div>
                        );
                      })}
                    </ul>
                  </AccordionItemPanel>
                </AccordionItem>
              </Accordion>
            </ListGroup.Item>

            {/* //prices */}

            <ListGroup.Item>
              <Accordion>
                <AccordionItem>
                  <AccordionItemHeading>
                    {/* CATEGORY FILTER */}
                    <AccordionItemButton>Prices</AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <ul style={{ listStyle: "none", width: "400px" }}>
                      {prices.map((p) => (
                        <li key={p.name} className="my-2">
                          <Link to={getFilterUrl({ min: p.min, max: p.max })}>
                            {p.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionItemPanel>
                </AccordionItem>
              </Accordion>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col lg={9}>
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
    </>
  );
}

export default ProductPage;
