import React, { useState } from "react";
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

const ProductManagement = () => {
  const [modal, setModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [showModal, setShowModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const addProduct = (event) => {
    event.preventDefault();
    if (productName && productPrice) {
      setProducts([...products, { name: productName, price: productPrice, category: productCategory}]);
      setProductName("");
      setProductPrice("");
      setShowModal(false);
    }
  };

  return (
    <div className="mt-4 p-4">
      <h2>Product Management</h2>
      <Button className="btn btn-success" onClick={toggle}>
        Add new product
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        {/* {error && (
          <Alert color="danger">
            <ul>
              {error.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </Alert>
        )} */}
        <ModalHeader toggle={toggle}>Add new product</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="exampleEmail">Product Name</Label>
              <Input
                id="exampleEmail"
                name="name"
                placeholder="Product Name"
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Product Price</Label>
              <Input
                id="exampleEmail"
                name="price"
                placeholder="Product Price"
                type="number"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleSelect">Product Category</Label>
              <Input
                id="exampleSelect"
                name="category"
                type="select"
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
              >
                <option value={""}>Chọn danh mục</option>
                <option value={"1"}>Danh mục 1</option>
                <option value={"2"}>Danh mục 2</option>
                <option value={"3"}>Danh mục 3</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="exampleDate">Ngày sinh</Label>
              <Input
                id="exampleDate"
                name="birthdate"
                placeholder="date placeholder"
                type="date"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary">
            Save
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <h3>Product List</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
                <button className="btn btn-primary">Edit</button>
                <button className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Thêm style cho modal */}
      <style jsx>{`
        .modal {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};

export default ProductManagement;
