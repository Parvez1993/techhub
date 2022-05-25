import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpeakers } from "../redux/actions/productActions";

function LatestPhones() {
  const dispatch = useDispatch();
  //get latest speakers
  const latestspeakers = useSelector((state) => state.phones);
  const { products: speakers, loading } = latestspeakers;

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
            <h2 data-text="Latest Phones">Latest Phones</h2>
          </div>
          <div className="category_card2 d-flex justify-content-between flex-wrap gap-2">
            {speakers.map((i, k) => {
              return (
                <div className="img_box">
                  <img src={i.image} alt={i.name} className="cat__img" />
                  <div className="name">{i.name}</div>
                  <div className="description">{i.price}</div>
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
