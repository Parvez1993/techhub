import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPhones, getSpeakers } from "../redux/actions/productActions";
import "./styles/Latestphones.css";
function LatestPhones() {
  const dispatch = useDispatch();
  //get latest speakers
  const latestspeakers = useSelector((state) => state.phones);
  const { products: speakers, loading } = latestspeakers;

  useEffect(() => {
    dispatch(getPhones());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        "loading"
      ) : (
        <>
          <div className="text_deco">
            <h2 data-text="Latest Phones">Latest Phones</h2>
          </div>
          <div className="d-flex justify-content-between flex-wrap gap-2">
            {speakers.map((i, k) => {
              return (
                <div className="card_box">
                  <img src={i.image} alt={i.name} className="card_img" />
                  <div className="cardName">{i.name}</div>
                  <div className="cardPrice">${i.price}</div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}

export default LatestPhones;
