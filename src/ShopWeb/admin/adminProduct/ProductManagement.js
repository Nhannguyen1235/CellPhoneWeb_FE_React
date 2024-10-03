import React, { useEffect, useState } from "react";
import {
  fetchProducts,
  addProduct,
  editProduct,
  fetchCategories,
  addImagesProduct,
  fetchNameImagesProduct,
  fetchImagesProduct,
  deleteProduct,
  deleteImagesProduct,
} from "../../redux/productSlice";
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
import { fetchProductImages } from "../../redux/cartSlice";

const ProductManagement = () => {
  const dispatch = useDispatch();
  const { categories, products } = useSelector((state) => state.products);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [productName, setProductName] = useState("");

  const [editingProduct, setEditingProduct] = useState(null);
  const [productDescription, setProductDescription] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [currentProductId, setCurrentProductId] = useState(null)
  const [newImages, setNewImages] = useState([]);
  const [productQuantity, setProductQuantity] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [editFormData, setEditFormData] = useState({
    productName: "",
    price: "",
    categoryId: "",
    productDescription: "",
    quantityInStock: "",
  });
  const [productCategory, setProductCategory] = useState("");
  const [productImageMap, setProductImageMap] = useState({});

  const toggle = () => {
    setModal(!modal);
    if (!modal) {
      dispatch(fetchCategories());
    }
  };

  const toggleEdit = () => {
    setEditModalOpen(!editModalOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchProducts());
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (currentProductId) {
      dispatch(fetchProductImages(currentProductId));
    }
  }, [currentProductId, dispatch]);

  useEffect(() => {
    const fetchImagesForProducts = async () => {
      for (const product of products) {
        if (!productImageMap[product.id]) {
          await handleFetchImages(product.id);
        }
      }
    };
    if (products.length > 0) {
      fetchImagesForProducts();
    }
  }, [products]);

  const handleFetchImages = async (productId) => {
    try {
      const imageNames = await dispatch(
        fetchNameImagesProduct({ productId })
      ).unwrap();
      const imageUrls = await Promise.all(
        imageNames.map(async (image) => {
          const response = await dispatch(
            fetchImagesProduct({
              imageName: image.imageUrl,
              options: { responseType: "blob" },
            })
          ).unwrap();

          if (response instanceof Blob) {
            return URL.createObjectURL(response);
          } else {
            console.error("Phản hồi không phải là Blob:", response);
            return null;
          }
        })
      );

      const validImageUrls = imageUrls.filter((url) => url !== null);
      setProductImageMap((prevState) => ({
        ...prevState,
        [productId]: validImageUrls,
      }));
    } catch (error) {
      console.error("Lỗi khi tải ảnh cho sản phẩm:", productId, error);
    }
  };

  const handleAddProduct = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("productName", productName);
    formData.append("price", productPrice);
    formData.append("categoryId", productCategory);
    formData.append("productDescription", productDescription);
    formData.append("quantityInStock", productQuantity);

    productImages.forEach((image) => {
      formData.append("files", image);
    });

    try {
      const response = await dispatch(addProduct(formData)).unwrap();
      const productId = response.id;
      if (productId) {
        const images = formData.getAll("files");
        await dispatch(addImagesProduct({ images, productId }));
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }

    toggle();
    resetForm();
  };

  const handleDeleteProduct = async (productId) => {
    try {
      // Lấy danh sách ảnh của sản phẩm
      const imageNames = await dispatch(
        fetchNameImagesProduct({ productId })
      ).unwrap();

      // Xóa từng ảnh của sản phẩm
      for (const image of imageNames) {
        await dispatch(deleteImagesProduct({ imageId: image.id })).unwrap();
      }

      // Sau khi xóa tất cả ảnh, xóa sản phẩm
      await dispatch(deleteProduct({ productId })).unwrap();

      // Cập nhật lại danh sách sản phẩm
      dispatch(fetchProducts());

      // Thông báo xóa thành công
      alert("Sản phẩm đã được xóa thành công");
      dispatch(fetchProducts());
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
      alert("Có lỗi xảy ra khi xóa sản phẩm");
    }
  };

  const handleEditClick = async (product) => {
    setEditingProduct(product);
    await dispatch(fetchCategories()).unwrap();
    console.log(product)
    setEditFormData({
      productName: product.name,
      price: product.price,
      categoryId: product.category.id,
      productDescription: product.description,
      quantityInStock: product.quantityInStock,
    });
    console.log(product.category.id)

    const imageNames = await dispatch(
      fetchNameImagesProduct({ productId: product.id })
    ).unwrap();
    const imageUrls = await Promise.all(
      imageNames.map(async (image) => {
        if (image.imageUrl.startsWith('http') || image.imageUrl.startsWith('data:')) {
          // Nếu imageUrl đã là một URL hoặc data URL, sử dụng nó trực tiếp
          return { id: image.id, url: image.imageUrl };
        } else {
          // Nếu không, fetch ảnh và tạo object URL
          const response = await dispatch(
            fetchImagesProduct({ imageName: image.imageUrl })
          ).unwrap();
          return { id: image.id, url: URL.createObjectURL(response) };
        }
      })
    );
    setProductImages(imageUrls);

    toggleEdit();
  };
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageDelete = async (imageId) => {
    try {
      if (imageId.startsWith('new-')) {
        setNewImages(prevImages => prevImages.filter(img => `new-${img.name}` !== imageId));
        setProductImages(prevImages => prevImages.filter(img => img.id !== imageId));
      }
      else {
        await dispatch(deleteImagesProduct({ imageId })).unwrap();
        setProductImages((prev) => prev.filter((img) => img.id !== imageId));
      }
    } catch (error) {
      console.error("Lỗi khi xóa ảnh:", error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(editFormData).forEach((key) =>
        formData.append(key, editFormData[key])
      );

      // Thêm ảnh mới vào formData
      newImages.forEach((image) => {
        formData.append("files", image);
      });

      await dispatch(
        editProduct({ productId: editingProduct.id, formData })
      ).unwrap();

      // Nếu có ảnh mới, gọi API để thêm ảnh
      if (newImages.length > 0) {
        await dispatch(
          addImagesProduct({ images: newImages, productId: editingProduct.id })
        ).unwrap();
      }

      setEditModalOpen(false);
      dispatch(fetchProducts());
      setNewImages([]); // Reset newImages sau khi đã upload
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error);
    }
  };

  const handleImageChange = (e) => {
    setProductImages(Array.from(e.target.files));
  };

  const handleNewImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages(files);

    // Tạo preview cho ảnh mới
    const newImagePreviews = files.map(file => ({
      id: `new-${file.name}`,
      url: URL.createObjectURL(file)
    }));

    setProductImages(prevImages => [...prevImages, ...newImagePreviews]);
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
          <Form onSubmit={handleAddProduct}>
            <FormGroup>
              <Label for="productName">Product Name</Label>
              <Input
                id="productName"
                name="name"
                placeholder="Product Name"
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
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
                required
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
                required
              >
                <option value="">Select Category</option>
                {Array.isArray(categories) &&
                  categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
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
                required
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
            {productImages.map((image, index) => (
              <div key={index} className="image-preview-item">
                <img
                  src={image.url}
                  alt={`Product img ${index + 1}`}
                  style={{ width: "100px", margin: "5px" }}
                />
                <button onClick={() => handleImageDelete(image.id)}>Xóa</button>
              </div>
            ))}
            <FormGroup>
              <Label for="productQuantity">Product Quantity</Label>
              <Input
                id="productQuantity"
                name="quantity"
                placeholder="Product Quantity"
                type="number"
                value={productQuantity}
                onChange={(e) => setProductQuantity(e.target.value)}
                required
              />
            </FormGroup>
            <Button type="submit" color="primary">
              Save
            </Button>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={editModalOpen} toggle={toggleEdit}>
        <ModalHeader toggle={toggleEdit}>
         Edit Product
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleEditSubmit}>
            <FormGroup>
              <Label for="name">Product Name</Label>
              <Input
                id="name"
                name="name"
                value={editFormData.productName}
                onChange={handleEditInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={editFormData.price}
                onChange={handleEditInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="categoryId">Category</Label>
              <Input
                id="categoryId"
                name="categoryId"
                type="select"
                value={editFormData.categoryId}
                onChange={handleEditInputChange}
              >
                <option value="">Select Category</option>
                {Array.isArray(categories) && categories.length > 0 ? (
                  categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    No category
                  </option>
                )}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                id="description"
                name="description"
                type="textarea"
                value={editFormData.productDescription}
                onChange={handleEditInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="quantityInStock">Quantity in stock</Label>
              <Input
                id="quantityInStock"
                name="quantityInStock"
                type="number"
                value={editFormData.quantityInStock}
                onChange={handleEditInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="newImages">Add new image</Label>
              <Input
                type="file"
                name="newImages"
                id="newImages"
                multiple
                onChange={handleNewImageChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Product Image</Label>
              <div className="d-flex flex-wrap">
                {productImages.map((image) => (
                  <div key={image.id} className="position-relative m-2">
                    <img
                      src={image.url}
                      alt="Product"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                    <Button
                      close
                      className="position-absolute top-0 end-0"
                      onClick={() => handleImageDelete(image.id)}
                    />
                  </div>
                ))}
              </div>
            </FormGroup>
            <Button color="primary" type="submit">
              Save changes
            </Button>
          </Form>
        </ModalBody>
      </Modal>

      <h3>Product List</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Images</th>
            <th>Quantity in stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
                {Array.isArray(productImageMap[product.id]) &&
                  productImageMap[product.id].map((imageUrl, idx) => (
                    <img
                      key={idx}
                      src={imageUrl}
                      alt={`Ảnh sản phẩm ${idx + 1}`}
                      style={{
                        width: "100px",
                        height: "100px",
                        margin: "5px",
                        objectFit: "cover",
                      }}
                      onError={(e) => {
                        console.error(`Lỗi khi tải ảnh: ${imageUrl}`);
                        e.target.src = "đường_dẫn_đến_ảnh_mặc_định";
                      }}
                    />
                  ))}
              </td>
              <td>{product.quantityInStock}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleEditClick(product)}
                >
                  Sửa
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManagement;
