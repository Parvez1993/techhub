import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTopProducts } from "../redux/actions/productActions";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import Ratings from "./Ratings";
import "./styles/Top.css";
import Loader from "./Loader";
function TopProducts() {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.topProducts);
  const { topProducts, loading, error } = selector;

  useEffect(() => {
    dispatch(getTopProducts());
  }, [dispatch]);
  return (
    <>
      {error ? (
        "error"
      ) : loading ? (
        <Loader />
      ) : (
        <>
          <div className="bg-light py-5">
            <div className="text_deco2">
              <div className="d-flex">
                <h2 data-text="Top Products">Top Products</h2>
              </div>
            </div>
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
                    <div className="d-flex align-items-center justify-content-center box gap-3">
                      <div>
                        <img
                          src={item.image}
                          alt={item.name}
                          class="swipe_img"
                        />
                      </div>
                      <div className="mx-4 text_box">
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
          </div>
        </>
      )}
    </>
  );
}

export default TopProducts;
