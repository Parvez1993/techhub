import React, { useEffect, useState } from "react";
import { Alert, Button, Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import {
  createProduct,
  deleteProduct,
  listProducts,
} from "../redux/actions/productActions";
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_EDIT_RESET,
} from "../redux/constants/ProductConstants";

function ProductList() {
  const { pageNo } = useParams();

  let pageNumber = pageNo ? pageNo : 1;
  const productList = useSelector((state) => state.productList);
  const { loading, products, error, pages } = productList;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.userLogin);
  const { userInfo } = user;

  const productCreate = useSelector((state) => state.productCreate);
  const { success: successCreate, product: createdProduct } = productCreate;

  const deletedProduct = useSelector((state) => state.productDelete);
  const productUpdated = useSelector((state) => state.productEdit);
  const { success: successUpdate } = productUpdated;

  const { succ: successDelete } = deletedProduct;

  const [reload, setReload] = useState(false);

  useEffect(() => {
    dispatch({ type: PRODUCT_EDIT_RESET });
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (userInfo.user && userInfo.user.isAdmin) {
      console.log("ami ekhane");
      dispatch(listProducts("", pageNumber));
    } else {
      navigate("/login");
    }

    if (successCreate) {
      navigate(`/admin/product/${createdProduct.product._id}/update`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successCreate,
    successUpdate,
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteProduct(id));
      setReload(!reload);
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };
  return (
    <Container>
      <div className="d-flex justify-content-between my-3 py-3">
        <h3>Products</h3>
        <Button variant="dark" onClick={createProductHandler}>
          Create Products
        </Button>
      </div>
      <>
        {loading ? (
          <Loader />
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products
                ? products.map((user) => (
                    <tr key={user._id}>
                      <td>{user._id}</td>
                      <td>{user.name}</td>
                      <td>$ {user.price}</td>
                      <td>{user.category}</td>
                      <td>{user.brand}</td>
                      <td>
                        <LinkContainer to={`/admin/product/${user._id}/update`}>
                          <Button variant="light" className="btn-sm">
                            <i className="fas fa-edit"></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          variant="danger"
                          className="btn-sm"
                          onClick={() => handleDelete(user._id)}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  ))
                : ""}
            </tbody>
          </Table>
        )}
        <Paginate
          pages={pages} //3
          page={pageNumber} //1
          isAdmin={true}
        />
      </>
    </Container>
  );
}

export default ProductList;
