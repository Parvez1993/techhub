import React, { useEffect, useState } from "react";
import { Alert, Button, Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { deleteUsers, getUsers } from "../redux/actions/userActions";

function UserList() {
  const userList = useSelector((state) => state.getAllUsers);
  const { loading, error, users } = userList;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.userLogin);
  const { error: userError, loading: userLoading, userInfo } = user;

  const deletedUser = useSelector((state) => state.userDelete);

  const { succ: successDelete } = deletedUser;

  const [reload, setReload] = useState(false);

  console.log(reload);

  useEffect(() => {
    if (userInfo.user && userInfo.user.isAdmin) {
      dispatch(getUsers());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo.user, successDelete]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteUsers(id));
      setReload(!reload);
    }
  };

  return (
    <Container>
      <>
        <h1>Users</h1>
        {loading ? (
          "loading"
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <i
                        className="fas fa-check"
                        style={{ color: "green" }}
                      ></i>
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/user/${user._id}/update`}>
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
              ))}
            </tbody>
          </Table>
        )}
      </>
    </Container>
  );
}

export default UserList;
