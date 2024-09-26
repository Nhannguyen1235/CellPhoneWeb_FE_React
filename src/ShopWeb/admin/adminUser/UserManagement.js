import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import axiosInstance from "../../ultil/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/userSlice";
const UserManagement = () => {
  const [modal, setModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const dispatch = useDispatch();
  const {users} = useSelector((state)=>state.users);

  const BaseUrl = "http://localhost:8080";

  const toggle = () => {
    setModal(!modal);
  };

  useEffect(() => {
    dispatch(fetchUsers)
  }, [dispatch]);

//   const addVoucher = (event) => {
//     event.preventDefault();
//     if (voucherName && voucherPrice) {
//       setVouchers([
//         ...vouchers,
//         {
//           name: voucherName,
//           price: voucherPrice,
//           category: voucherCategory,
//           expiredDate: voucherExpiredDate,
//         },
//       ]);
//     //   setVoucherName("");
//     //   setVoucherPrice("");
//     //   setVoucherCategory("");
//     //   setVoucherExpiredDate("");
//       toggle();
//     }
//   };

  return (
    <div className="mt-4 p-4">
      <h2>User Management</h2>
      <Button className="btn btn-success" onClick={toggle}>
        Add new user
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add new user</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="exampleUser">username</Label>
              <Input
                id="exampleUser"
                name="username"
                placeholder="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">password</Label>
              <Input
                id="examplePassword"
                name="password"
                placeholder="password"
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">email</Label>
              <Input
                id="exampleEmail"
                name="email"
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label for="role">role</Label>
              <Input
                id="role"
                name="role"
                placeholder="role"
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" >
            Save
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <h3>User List</h3>
      <table className="table">
        <thead>
          <tr>
            <th>username</th>
            <th>email</th>
            <th>address</th>
            <th>phoneNUmber</th>
            <th>isActive</th>
            <th>tole</th>
          </tr>
        </thead>
        <tbody>
          {users && users.map((user, index) => (
            <tr key={index}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <button className="btn btn-primary">Edit</button>
                <button className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
