import React, { useEffect, useState } from "react";
import { Alert, Button, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Table } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteVoucher, getAllVouchers, createVoucher, getVoucherByCode,updateVoucher, resetStatusAndMessage } from "../../redux/voucherSlice";
import { FaTrash, FaRegSave } from "react-icons/fa";
import { LuClipboardEdit } from "react-icons/lu";
import Swal from "sweetalert2";
import "./VoucherManagement.css";

export default function VoucherManagement() {
  const [showMessage, setShowMessage] = useState(false);
  const dispatch = useDispatch();
  const { vouchers, status, message } = useSelector((state) => state.voucher);

  useEffect(() => {
    dispatch(getAllVouchers());
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

  const [modal, setModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [newVoucherData, setNewVoucherData] = useState({
    code: "",
    discountAmount: "",
    expirationDate: "",
    isActive: true,
    minOrderValue: "",
  });

  const handleAddVoucher = () => {
    dispatch(createVoucher(newVoucherData))
      .unwrap()
      .then((response) => {
        if (response.status === 200) {
          resetNewVoucherForm();
          setErrorMessage("");
          dispatch(getAllVouchers());
          toggle();
        }
      })
      .catch((error) => {
        console.log("Error adding voucher:", error);
        if (error.status === 400 && error.message) {
          const validationErrors = error.data;
          setErrorMessage(
            <ul>
              {validationErrors.map((err, index) => (
                <li key={index}>{err}</li>
              ))}
            </ul>
          );
        } else if (error.status === 409) {
          setErrorMessage(<ul><li>{error.data}</li></ul>); 
        } else {
          setErrorMessage(<ul><li>Đã xảy ra lỗi khi thêm voucher!</li></ul>);
        }
      });
  };
  
  

  const toggle = () => {
    setModal(!modal);
    if (!modal) {
      setErrorMessage("");
    }
  };

  const resetNewVoucherForm = () => {
    setNewVoucherData({
      code: "",
      discountAmount: "",
      expirationDate: "",
      isActive: true,
      minOrderValue: "",
    });
    setErrorMessage(""); // Reset error message khi đóng modal
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa voucher này?',
      text: "Hành động này không thể hoàn tác!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Chắc chắn!',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteVoucher(id)).then(() => {
          dispatch(getAllVouchers());
        });
      }
    });
  };

  const [editVoucher, setEditVoucher] = useState({ isEdit: false, id: "" });
  const [editedVoucherData, setEditedVoucherData] = useState({ code: "", discountAmount: "", expirationDate: "", minOrderValue: "" });

  const handleEdit = (item) => {
    setEditVoucher({ isEdit: true, id: item.id });
    setEditedVoucherData({ 
      code: item.code, 
      discountAmount: item.discountAmount, 
      expirationDate: item.expirationDate.split('T')[0],
      minOrderValue: item.minOrderValue 
    });
  };

  const handleSave = (id) => {
    dispatch(updateVoucher({ voucherId: id, voucherDTO: editedVoucherData }));
    setEditVoucher({ isEdit: false, id: "" });
  };

  // const [voucherCode, setVoucherCode] = useState(""); // Thêm state cho mã voucher

  // const handleSearchByCode = () => {
  //   if (voucherCode.trim()) {
  //     dispatch(getVoucherByCode(voucherCode));
  //   }
  // };

  return (
    <div>
      <Container>
        <div className='title-page-admin'>
            <Container>
                <h1>Voucher Management</h1>
            </Container>
        </div>
        {showMessage && (
          <Alert color={status === 200 ? "success" : "danger"}>{message}</Alert>
        )}
        {/* <FormGroup className="d-flex align-items-center mb-3">
          <Input 
            type="text" 
            placeholder="Nhập mã voucher cần tìm..." 
            value={voucherCode} 
            onChange={(e) => setVoucherCode(e.target.value)} 
          />
          <Button color="primary" onClick={handleSearchByCode} className="ml-2">
            Tìm kiếm
          </Button>
        </FormGroup> */}
        <Button className="btn btn-success mb-5" onClick={toggle}>
          Tạo mới Voucher
        </Button>
        <div className='title-list'>
            <Container>
                <h2>Voucher List</h2>
            </Container>
          </div>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Tạo mới Voucher</ModalHeader>
          <ModalBody>
          {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
            <Form>
              <FormGroup>
                <Label for="voucherCode">Mã voucher</Label>
                <Input
                  id="voucherCode"
                  value={newVoucherData.code}
                  onChange={(e) => setNewVoucherData({ ...newVoucherData, code: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Label for="discountAmount">Số tiền giảm giá</Label>
                <Input
                  id="discountAmount"
                  type="number"
                  value={newVoucherData.discountAmount}
                  onChange={(e) => setNewVoucherData({ ...newVoucherData, discountAmount: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Label for="expirationDate">Ngày Hết Hạn</Label>
                <Input
                  id="expirationDate"
                  type="date"
                  value={newVoucherData.expirationDate}
                  onChange={(e) => setNewVoucherData({ ...newVoucherData, expirationDate: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Label for="minOrderValue">Giá trị đơn hàng tối thiểu</Label>
                <Input
                  id="minOrderValue"
                  type="number"
                  value={newVoucherData.minOrderValue}
                  onChange={(e) => setNewVoucherData({ ...newVoucherData, minOrderValue: e.target.value })}
                />
              </FormGroup>
              <FormGroup className="css_checkbox" >
                <Label for="isActive">Hoạt động: </Label>
                <div className="css_checkbox_model">
                  <Input
                    id="isActive"
                    type="checkbox"
                    checked={newVoucherData.isActive}
                    onChange={(e) => setNewVoucherData({ ...newVoucherData, isActive: e.target.checked })}
                  />
                </div>
                
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleAddVoucher}>
              Lưu
            </Button>
            <Button color="secondary" onClick={toggle}>
              Hủy
            </Button>
          </ModalFooter>
        </Modal>
        <Table hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Code</th>
              <th>Discount Amount</th>
              <th>Expiration Date</th>
              <th>Is Active</th>
              <th>Min Order Value</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vouchers && vouchers.map((item, index) => (
              <tr key={index} className={editVoucher.isEdit && item.id === editVoucher.id ? "voucher-item active" : "voucher-item"}>
                <th scope="row">{index + 1}</th>
                <td>
                  {editVoucher.isEdit && item.id === editVoucher.id ? (
                    <Input type="text" value={editedVoucherData.code} onChange={(e) => setEditedVoucherData({ ...editedVoucherData, code: e.target.value })} />
                  ) : (
                    item.code
                  )}
                </td>
                <td>
                  {editVoucher.isEdit && item.id === editVoucher.id ? (
                    <Input type="number" value={editedVoucherData.discountAmount} onChange={(e) => setEditedVoucherData({ ...editedVoucherData, discountAmount: e.target.value })} />
                  ) : (
                    item.discountAmount
                  )}
                </td>
                <td>
                  {editVoucher.isEdit && item.id === editVoucher.id ? (
                    <Input type="date" value={editedVoucherData.expirationDate} onChange={(e) => setEditedVoucherData({ ...editedVoucherData, expirationDate: e.target.value })} />
                  ) : (
                    new Date(item.expirationDate).toLocaleDateString() // Chuyển đổi định dạng ngày
                  )}
                </td>
                <td>
                  {editVoucher.isEdit && item.id === editVoucher.id ? (
                    <div className="css_checkbox">
                      <Input type="checkbox" checked={editedVoucherData.isActive} onChange={(e) => setEditedVoucherData({ ...editedVoucherData, isActive: e.target.checked })} />
                    </div>
                  ) : (
                    (item.isActive ? "Có" : "Không")
                  )}
                </td>
                <td>
                  {editVoucher.isEdit && item.id === editVoucher.id ? (
                    <Input type="number" value={editedVoucherData.minOrderValue} onChange={(e) => setEditedVoucherData({ ...editedVoucherData, minOrderValue: e.target.value })} />
                  ) : (
                    item.minOrderValue
                  )}
                </td>
                <td>
                  {editVoucher.isEdit && item.id === editVoucher.id ? (
                    <Button color="success" onClick={() => handleSave(item.id)}><FaRegSave /></Button>
                  ) : (
                    <div className="function">
                      <Button color="success" onClick={() => handleEdit(item)}><LuClipboardEdit /></Button>
                      <Button color="danger" onClick={() => handleDelete(item.id)}><FaTrash /></Button>
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
