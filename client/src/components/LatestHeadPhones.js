import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHeadphones } from "../redux/actions/productActions";
import Loader from "./Loader";
import Product from "./Product";
import "./styles/Latestphones.css";

function LatestHeadPhones() {
  const dispatch = useDispatch();
  //get latest speakers
  const phoneslist = useSelector((state) => state.headphones);
  const { products: headphones, loading } = phoneslist;

  useEffect(() => {
    dispatch(getHeadphones());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="text_deco">
            <h2 data-text="Latest Headphones">Latest Headphones</h2>
          </div>
          <div className="d-flex justify-content-between flex-wrap gap-2">
            {headphones.map((i, k) => {
              return (
                <Product product={i} key={k} tag="Bass Xtreme" bg="#e3e4fa" />
              );
            })}
          </div>
        </>
      )}
    </>
  );
}

export default LatestHeadPhones;
