import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { PRODUCT_EDIT_RESET } from "../redux/constants/ProductConstants";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import {
  detailProducts,
  editProductDetails,
} from "../redux/actions/productActions";
import axios from "axios";

function AdminUpdateProduct() {
  const { id } = useParams();
  let tempImg = "";

  //trying a logic

  console.log("id", id);
  const dispatch = useDispatch();
  let productDetail = useSelector((state) => state.productDetail);

  console.log(productDetail);

  const { loading, error, product } = productDetail;
  const productUpdated = useSelector((state) => state.productEdit);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdated;

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_EDIT_RESET });
      navigate("/admin/productlist");
    } else {
      if (!product.name || product._id !== id) {
        dispatch(detailProducts(id));
      } else {
        console.log(name, price, image);
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, successUpdate, id, loading]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    console.log("fileees", file);
    if (image) {
      const formData = new FormData();
      formData.append("image", file);

      console.log(formData);
      setUploading(true);
      try {
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };

        const { data } = await axios.post("/api/upload", formData, config);
        if (data) {
          tempImg = data;
        }
        console.log(data);
        setImage(data);
        setUploading(false);
      } catch (error) {
        console.error(error);
        setUploading(false);
      }
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("khara");
    console.log(tempImg);
    dispatch(
      editProductDetails({
        id,
        name,
        price,
        image: image,
        brand,
        category,
        description,
        countInStock,
      })
    );
  };
  return (
    <>
      {!loading ? (
        <Container>
          <Row className="align-items-center justify-content-center">
            <Col>
              <div className="py-3">
                <h4>Profile</h4>
              </div>

              <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="price">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="brand">
                  <Form.Label>Brand</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="countInStock">
                  <Form.Label>Count In Stock</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter countInStock"
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="category">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Multiple files input example</Form.Label>
                  <Form.Control
                    type="file"
                    placeholder="Enter image url"
                    value={image?.image}
                    onChange={uploadFileHandler}
                  />{" "}
                  {uploading && "loading"}
                </Form.Group>
                <Button type="submit" variant="primary">
                  Update
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      ) : (
        ""
      )}
    </>
  );
}

export default AdminUpdateProduct;