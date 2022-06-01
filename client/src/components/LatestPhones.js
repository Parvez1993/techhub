import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPhones, getSpeakers } from "../redux/actions/productActions";
import Product from "./Product";
import "./styles/Latestphones.css";
function LatestPhones() {
  const dispatch = useDispatch();
  //get latest speakers
  const latestspeakers = useSelector((state) => state.phones);
  const { products: phones, loading } = latestspeakers;

  useEffect(() => {
    dispatch(getPhones());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        "loading"
      ) : (
        <>
          {loading ? (
            "loading"
          ) : (
            <>
              <div className="text_deco">
                <h2 data-text="Latest Headphones">Latest Headphones</h2>
              </div>
              <div className="d-flex justify-content-between flex-wrap gap-2">
                {phones.map((i, k) => {
                  return (
                    <Product product={i} tag="Limited Editions" bg="#ffe3e8" />
                  );
                })}

                {/* <img src={i.image} alt={i.name} className="card_img" />
                    <div className="cardName">{i.name}</div>
                    <div className="cardPrice">${i.price}</div> */}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default LatestPhones;
