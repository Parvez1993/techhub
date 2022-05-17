import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTopProducts } from "../redux/actions/productActions";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import Ratings from "./Ratings";
function TopProducts() {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.topProducts);
  const { topProducts, loading, success, error } = selector;

  useEffect(() => {
    dispatch(getTopProducts());
  }, [dispatch]);
  return (
    <>
      {error ? (
        "error"
      ) : loading ? (
        "loading"
      ) : (
        <Swiper
          pagination={{
            type: "fraction",
          }}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          {topProducts.map((item, key) => {
            return (
              <SwiperSlide>
                <div className="d-flex align-items-center justify-content-around">
                  <div>
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="mx-4">
                    <h3>{item.name}</h3>
                    <p className="w-75">{item.description}</p>
                    <Ratings
                      ratings={item.rating}
                      numberOfRatings={item.numReviews}
                    ></Ratings>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </>
  );
}

export default TopProducts;
