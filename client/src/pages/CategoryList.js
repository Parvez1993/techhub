import React, { useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addcategory } from "../redux/actions/categoryActions";
import {
  CATEGORY_CREATE_RESET,
  CATEGORY_EDIT_RESET,
} from "../redux/constants/CategoryConstants";

function CategoryList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.userLogin);
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
      console.log("ok");
    } else {
      navigate("/login");
    }

    if (successCreate) {
      navigate(`/admin/category/${createdCategory._id}/update`);
    }
  }, [dispatch, navigate, userInfo, successCreate]);

  return (
    <Container>
      <div className="d-flex justify-content-between my-3 py-3">
        <h3>Category</h3>
        <Button variant="dark" onClick={handlecreateCategory}>
          Create Category
        </Button>
      </div>
    </Container>
  );
}

export default CategoryList;
