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

const VoucherManagement = () => {
  const [modal, setModal] = useState(false);
  const [vouchers, setVouchers] = useState([]);
  const [voucherName, setVoucherName] = useState("");
  const [voucherPrice, setVoucherPrice] = useState("");
  const [voucherCategory, setVoucherCategory] = useState("");
  const [voucherExpiredDate, setVoucherExpiredDate] = useState("");
  const BaseUrl = "http://localhost:8080/api/v1";

  const toggle = () => {
    setModal(!modal);
  };

  useEffect(() => {
    axiosInstance
      .get(`${BaseUrl}/voucher/getAll`)
      .then((response) => {
        setVouchers(response.data.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const addVoucher = (event) => {
    event.preventDefault();
    if (voucherName && voucherPrice) {
      setVouchers([
        ...vouchers,
        {
          name: voucherName,
          price: voucherPrice,
          category: voucherCategory,
          expiredDate: voucherExpiredDate,
        },
      ]);
      setVoucherName("");
      setVoucherPrice("");
      setVoucherCategory("");
      setVoucherExpiredDate("");
      toggle();
    }
  };

  return (
    <div className="mt-4 p-4">
      <h2>Voucher Management</h2>
      <Button className="btn btn-success" onClick={toggle}>
        Add new voucher
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add new voucher</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="exampleEmail">Voucher Name</Label>
              <Input
                id="exampleEmail"
                name="name"
                placeholder="Voucher Name"
                type="text"
                value={voucherName}
                onChange={(e) => setVoucherName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Voucher Price</Label>
              <Input
                id="exampleEmail"
                name="price"
                placeholder="Voucher Price"
                type="number"
                value={voucherPrice}
                onChange={(e) => setVoucherPrice(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleSelect">Voucher Category</Label>
              <Input
                id="exampleSelect"
                name="category"
                type="select"
                value={voucherCategory}
                onChange={(e) => setVoucherCategory(e.target.value)}
              >
                <option value={""}>Chọn danh mục</option>
                <option value={"1"}>Danh mục 1</option>
                <option value={"2"}>Danh mục 2</option>
                <option value={"3"}>Danh mục 3</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="exampleDate">Voucher Expired Date</Label>
              <Input
                id="exampleDate"
                name="expiredDate"
                placeholder="date placeholder"
                type="date"
                value={voucherExpiredDate}
                onChange={(e) => setVoucherExpiredDate(e.target.value)}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={addVoucher}>
            Save
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <h3>Voucher List</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vouchers.map((voucher, index) => (
            <tr key={index}>
              <td>{voucher.name}</td>
              <td>{voucher.price}</td>
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

export default VoucherManagement;
