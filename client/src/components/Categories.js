import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listCategory } from "../redux/actions/categoryActions";
import Loader from "./Loader";
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
        <Loader />
      ) : (
        <>
          <div className="text_deco">
            <h2 data-text="Category">Category</h2>
          </div>
          <div className="category_card d-flex justify-content-center flex-wrap gap-2">
            {category.map((i, k) => {
              return (
                <Link
                  to={`/products/page/1/sort/latest/category/${i.name}/min/0/max/0`}
                >
                  <div className="img_box">
                    <img src={i.image} alt={i.name} className="cat__img" />
                    <div className="name">{i.name}</div>
                    <div className="description">{i.description}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}

export default Categories;
