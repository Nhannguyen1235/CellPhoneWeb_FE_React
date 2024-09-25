import React, { useEffect, useState } from "react";
import { Alert, Button, Container, FormGroup, Input, Label, Table } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, getAllCategories, createCategory, updateCategory, resetStatusAndMessage } from "../../redux/categorySlice";
import { FaTrash, FaRegSave } from "react-icons/fa";
import { LuClipboardEdit } from "react-icons/lu";
// import './category.css';

export default function CategoryManagement() {
  const [showMessage, setShowMessage] = useState(false);

  const dispatch = useDispatch();
  const {categories, status, message } = useSelector((state) => state.category)

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    if (status && message) {
      setShowMessage(true);

      const timer = setTimeout(() => {
        setShowMessage(false);
        dispatch(resetStatusAndMessage());
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [status, message, dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteCategory(id)).then(() => {
      dispatch(getAllCategories());
    });
  };

  const [editCategory, setEditCategory] = useState({ isEdit: false, id: "" });
  const [newName, setNewName] = useState("");

  const handleEdit = (id, item) => {
    setEditCategory({ isEdit: true, id });
    setNewName(item.name);
  };


  const handleSave = (id) => {
    dispatch(updateCategory({ categoryId: id, name: newName }));
    setEditCategory({ isEdit: false, id: "" });
  };

  // thêm
  const [newCategory, setNewCategory] = useState("");
  const handleAddCategory = () => {
    if (newCategory.trim() === "") {
      alert("Tên danh mục không được để trống");
      return;
    }
    dispatch(createCategory({ name: newCategory })).then(() => {
      setNewCategory(""); 
      dispatch(getAllCategories());
    });
  };
  return (
    <div>
      <Container>
        <h1>Total Categories:</h1>
        {showMessage && (
          <Alert color={status === 200 ? "success" : "danger"}>{message}</Alert>
        )}
        <div className="add-category">
        <FormGroup>
          <Input
            type="text"
            id="newCategory"
            placeholder="Nhập tên danh mục"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <Button color="success" onClick={handleAddCategory} className="mt-2">Add category</Button>
        </FormGroup>
        </div>
        <Table hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories && categories.map((item, index) => (
              <tr key={index} className={editCategory.isEdit && item.id === editCategory.id ? "category-item active" : "category-item"}>
                <th scope="row">{item.id}</th>
                <td>
                  {editCategory.isEdit && item.id === editCategory.id ? (
                    <Input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
                  ) : (
                    item.name
                  )}
                </td>
                <td>
                  {editCategory.isEdit && item.id === editCategory.id ? (
                    <Button color="success" onClick={() => handleSave(item.id)}><FaRegSave /></Button>
                  ) : (
                    <div className="function">
                      <Button color="success" onClick={() => handleEdit(item.id, item)}><LuClipboardEdit /></Button>
                      <Button color="danger" onClick={() => {
                        if (window.confirm("Bạn có muốn xóa danh mục này?")) {
                          handleDelete(item.id);
                        }
                      }}><FaTrash /></Button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}
