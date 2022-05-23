import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listCategory } from "../redux/actions/categoryActions";
import "./styles/Categories.css";

function Categories() {
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.category);
  const { category, loading } = categoryList;

  useEffect(() => {
    dispatch(listCategory());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        "loading"
      ) : (
        <>
          <div className="text_deco">
            <h2 data-text="Category">Category</h2>
          </div>
          <div className="category_card d-flex justify-content-center">
            {category.map((i, k) => {
              return (
                <div className="img_box">
                  <img src={i.image} alt={i.name} className="cat__img" />
                  <div className="name">{i.name}</div>
                  <div className="description">{i.description}</div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}

export default Categories;
