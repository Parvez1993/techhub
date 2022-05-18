import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editcategory } from "../redux/actions/categoryActions";

function CategoryEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  let tempImg = "";

  //trying a logic

  console.log("id", id);
  const dispatch = useDispatch();
  let categoryCreate = useSelector((state) => state.categoryCreate);

  const { loading, error, category } = categoryCreate;
  const productUpdated = useSelector((state) => state.productEdit);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdated;

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (successUpdate) {
      navigate("/admin/categorylist");
    } else {
      setName(category.name);
      setImage(category.image);
      setDescription(category.description);
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

        const { data } = await axios.post(
          "/api/categoryUpload",
          formData,
          config
        );
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
    dispatch(
      editcategory({
        id,
        name,
        image: image,
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
                <h4>Category</h4>
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

export default CategoryEdit;
