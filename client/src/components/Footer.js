import React from "react";

function Footer() {
  return (
    <>
      <footer className="bg-dark">
        <div className="container p-4">
          <div className="row">
            <div className="col-lg-6 col-md-12 mb-4">
              <h5
                className="mb-3"
                style={{ letterSpacing: "2px", color: "#fff" }}
              >
                footer content
              </h5>
              <p className="text-white">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
                atque ea quis molestias. Fugiat pariatur maxime quis culpa
                corporis vitae repudiandae aliquam voluptatem veniam, est atque
                cumque eum delectus sint!
              </p>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <h5
                className="mb-3"
                style={{ letterSpacing: "2px", color: "#fff" }}
              >
                links
              </h5>
              <ul className="list-unstyled mb-0">
                <li className="mb-1">
                  <a href="#!" style={{ color: "#fff" }}>
                    Frequently Asked Questions
                  </a>
                </li>
                <li className="mb-1">
                  <a href="#!" style={{ color: "#fff" }}>
                    Delivery
                  </a>
                </li>
                <li className="mb-1">
                  <a href="#!" style={{ color: "#fff" }}>
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#!" style={{ color: "#fff" }}>
                    Where we deliver?
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <h5
                className="mb-1"
                style={{ letterSpacing: "2px", color: "#fff" }}
              >
                opening hours
              </h5>
              <table
                className="table"
                style={{ color: "#fff", borderColor: "#fff" }}
              >
                <tbody>
                  <tr>
                    <td>Mon - Fri:</td>
                    <td>8am - 9pm</td>
                  </tr>
                  <tr>
                    <td>Sat - Sun:</td>
                    <td>8am - 1am</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          <a className="text-dark" href="#!">
            mdparvez.devs@gmail.com
          </a>
        </div>
      </footer>
    </>
  );
}

export default Footer;
