import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpeakers } from "../redux/actions/productActions";
import Loader from "./Loader";
import Product from "./Product";
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
        <Loader />
      ) : (
        <>
          <div className="text_deco">
            <h2 data-text="Latest Speakers">Latest Speakers</h2>
          </div>
          <div className="d-flex justify-content-between flex-wrap gap-2">
            {speakers.map((i, k) => {
              return <Product product={i} tag="Small Boombox" bg="#f5f9ff" />;
            })}
          </div>
        </>
      )}
    </>
  );
}

export default LatestSpeakers;
