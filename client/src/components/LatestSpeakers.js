import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpeakers } from "../redux/actions/productActions";
import "./styles/Latestphones.css";

function LatestSpeakers() {
  const dispatch = useDispatch();
  //get latest speakers
  const speakerList = useSelector((state) => state.speakers);
  const { products: speakers, loading } = speakerList;

  useEffect(() => {
    dispatch(getSpeakers());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        "loading"
      ) : (
        <>
          <div className="text_deco">
            <h2 data-text="Latest Speakers">Latest Speakers</h2>
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

export default LatestSpeakers;
