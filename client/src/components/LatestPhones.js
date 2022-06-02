import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPhones } from "../redux/actions/productActions";
import Loader from "./Loader";
import Product from "./Product";
import "./styles/Latestphones.css";
function LatestPhones() {
  const dispatch = useDispatch();
  const latestspeakers = useSelector((state) => state.phones);
  const { products: phones, loading } = latestspeakers;

  useEffect(() => {
    dispatch(getPhones());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="text_deco">
                <h2 data-text="Latest Phones">Latest Phones</h2>
              </div>
              <div className="d-flex justify-content-between flex-wrap gap-2">
                {phones.map((i, k) => {
                  return (
                    <Product product={i} tag="Limited Editions" bg="#ffe3e8" />
                  );
                })}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default LatestPhones;
