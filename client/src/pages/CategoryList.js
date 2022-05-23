import React, { useEffect } from "react";
import { Button, Card, Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { addcategory, listCategory } from "../redux/actions/categoryActions";
import {
  CATEGORY_CREATE_RESET,
  CATEGORY_EDIT_RESET,
} from "../redux/constants/CategoryConstants";

function CategoryList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.userLogin);

  const categoryList = useSelector((state) => state.category);
  const { category } = categoryList;
  const { error: userError, loading: userLoading, userInfo } = user;

  const categoryCreate = useSelector((state) => state.categoryCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    category: createdCategory,
  } = categoryCreate;

  const handlecreateCategory = () => {
    dispatch(addcategory());
  };

  useEffect(() => {
    // dispatch({ type: CATEGORY_EDIT_RESET });
    // dispatch({ type: CATEGORY_CREATE_RESET });
    if (userInfo.user && userInfo.user.isAdmin) {
      dispatch(listCategory());
    } else {
      navigate("/login");
    }

    if (successCreate) {
      navigate(`/admin/category/${createdCategory._id}/update`);
    }
  }, [dispatch, navigate, userInfo, successCreate, listCategory]);

  return (
    <Container>
      <div className="d-flex justify-content-between my-3 py-3">
        <h3>Category</h3>
        <Button variant="dark" onClick={handlecreateCategory}>
          Create Category
        </Button>
      </div>
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>Description</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {category
            ? category.map((cat, k) => (
                <tr key={cat._id}>
                  <td>{k + 1}</td>
                  <td>{cat.name}</td>
                  <td>{cat.description}</td>
                  <td>
                    <img src={cat.image} alt={cat.name} width="40px" />
                  </td>
                  <td>
                    <LinkContainer to={`/admin/category/${cat._id}/update`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button variant="danger" className="btn-sm">
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))
            : ""}
        </tbody>
      </Table>
    </Container>
  );
}

export default CategoryList;
