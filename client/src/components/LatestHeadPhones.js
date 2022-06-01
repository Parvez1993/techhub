import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHeadphones, getSpeakers } from "../redux/actions/productActions";
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
        "loading"
      ) : (
        <>
          <div className="text_deco">
            <h2 data-text="Latest Headphones">Latest Headphones</h2>
          </div>
          <div className="d-flex justify-content-between flex-wrap gap-2">
            {headphones.map((i, k) => {
              return <Product product={i} tag="Bass Xtreme" bg="#e3e4fa" />;
            })}

            {/* <img src={i.image} alt={i.name} className="card_img" />
                  <div className="cardName">{i.name}</div>
                  <div className="cardPrice">${i.price}</div> */}
          </div>
        </>
      )}
    </>
  );
}

export default LatestHeadPhones;
