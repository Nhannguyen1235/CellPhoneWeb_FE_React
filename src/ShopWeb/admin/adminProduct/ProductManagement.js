import React, { useEffect, useState } from "react";
import {
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

const ProductManagement = () => {
  const [modal, setModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImages, setProductImages] = useState([]); // Thay đổi ở đây
  const [productQuantity, setProductQuantity] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const BaseUrl = 'http://localhost:8080/api/v1';

  const toggle = () => {
    setModal(!modal);
  };

  useEffect(() => {
    axiosInstance.get(`${BaseUrl}/product/getAll`)
      .then(response => {
        setProducts(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const addProduct = (event) => {
    event.preventDefault();
    if (productName && productPrice) {
      const newProduct = {
        name: productName,
        price: productPrice,
        description: productDescription,
        images: productImages, // Thay đổi ở đây
        quantity: productQuantity,
        category: productCategory
      };
      setProducts([...products, newProduct]);
      resetForm();
      toggle();

      axiosInstance.post(`${BaseUrl}/product/admin/add`, newProduct)
        .then(response => {
          console.log('Product added successfully:', response.data);
        })
        .catch(error => {
          console.error('Error adding product:', error);
        });
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).map(file => URL.createObjectURL(file));
    setProductImages(files);
  };

  const resetForm = () => {
    setProductName("");
    setProductPrice("");
    setProductCategory("");
    setProductDescription("");
    setProductImages([]); // Reset mảng hình ảnh
    setProductQuantity("");
  };

  return (
    <div className="mt-4 p-4">
      <h2>Product Management</h2>
      <Button className="btn btn-success" onClick={toggle}>
        Add new product
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add new product</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="productName">Product Name</Label>
              <Input
                id="productName"
                name="name"
                placeholder="Product Name"
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="productPrice">Product Price</Label>
              <Input
                id="productPrice"
                name="price"
                placeholder="Product Price"
                type="number"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="productCategory">Product Category</Label>
              <Input
                id="productCategory"
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
              <Label for="productDescription">Product Description</Label>
              <Input
                id="productDescription"
                name="description"
                placeholder="Product Description"
                type="text"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="productImages">Product Images</Label>
              <Input
                id="productImages"
                name="images"
                type="file"
                multiple
                onChange={handleImageChange}
              />
            </FormGroup>
            {productImages.length > 0 && (
              <div className="image-preview">
                {productImages.map((image, index) => (
                  <img key={index} src={image} alt={`Product img ${index + 1}`} style={{ width: '100px', margin: '5px' }} />
                ))}
              </div>
            )}
            <FormGroup>
              <Label for="productQuantity">Product Quantity</Label>
              <Input
                id="productQuantity"
                name="quantity"
                placeholder="Product Quantity"
                type="number"
                value={productQuantity}
                onChange={(e) => setProductQuantity(e.target.value)}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={addProduct}>
            Save
          </Button>
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
    </div>
  );
};

export default ProductManagement;