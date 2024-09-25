import React, { useEffect, useState } from "react";
import { fetchProducts, addProduct, fetchCategories } from "../../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
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

const ProductManagement = () => {
  const dispatch = useDispatch();
  const {categories} = useSelector(state => state.products);
  const [modal, setModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [productQuantity, setProductQuantity] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");

  const toggle = () => {
    dispatch(fetchCategories())
    setModal(!modal);
  };

  useEffect(() => {
    dispatch(fetchProducts())
      .then(response => {
        setProducts(response.payload);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, [dispatch]);

  const handleAddProduct = (event) => {
    event.preventDefault();
    const newProduct = {
      productName: productName,
      price: productPrice,
      categoryId: productCategory,
      productDescription: productDescription,
      quantity: productQuantity
    };
    dispatch(addProduct(newProduct,productImages));
    resetForm();
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
    setProductImages([]);
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
                <option value="">Select Category</option>
                {
                categories && categories.map((category, index) => {
                  return(
                    <option key={index} value={category.id}>{category.name}</option>
                  );
                  })};  
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
          <Button color="primary" onClick={handleAddProduct}>
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