import React, { useEffect, useState } from "react";
import { Alert, Button, Container, Input, Table } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, getAllCategories, createCategory, updateCategory, resetStatusAndMessage } from "../../redux/categorySlice";
import { FaTrash, FaRegSave } from "react-icons/fa";
import { LuClipboardEdit } from "react-icons/lu";
import "./CategoryManagement.css"
import Swal from "sweetalert2";

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
    // Hiển thị thông báo xác nhận xóa bằng SweetAlert2
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa danh mục này?',
      text: "Hành động này không thể hoàn tác!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Chắc chắn',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCategory(id)).then(() => {
          dispatch(getAllCategories());
        });
      }
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
    dispatch(createCategory({ name: newCategory }))
      .unwrap()
      .then((response) => {
        if (response.status === 200) {
          setNewCategory("");
          dispatch(getAllCategories());
        }
      })
      .catch((error) => {
        console.log("Error adding category:", error);
      });
  };
  return (
    <div>
      <Container>
        <div className='title-page-admin'>
          <Container>
            <h1>Category Management</h1>
          </Container>
        </div>
        {showMessage && (
          <Alert color={status === 200  ? "success" : "danger"}>{message}</Alert>
        )}
        <div className="add-category">
            <Input
              type="text"
              id="newCategory"
              placeholder="Enter category name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <Button color="success" onClick={handleAddCategory}>Add category</Button>
        </div>
        <div className='title-list'>
            <Container>
                <h2>Category List</h2>
            </Container>
        </div>
        <div className="table-category">
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
                <th scope="row">{index + 1}</th>
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
                      <Button color="danger" onClick={() => handleDelete(item.id)}><FaTrash /></Button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      </Container>
    </div>
  );
}
