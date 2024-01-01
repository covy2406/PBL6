import { useState } from "react";
import Select from "react-select";
import "./ShopPromosCard.css";
import Swal from "sweetalert2";

const ShopPromosCard = ({ data, filter }) => {
  //create this state to handle update
  const [promo, setPromo] = useState({
    id: data.id || "",
    code: data.code || "",
    shop_product_id: data.shop_product_id || "",
    shop_id: data.shop_id || "",
    type: data.type || "",
    value: data.value || "",
    minPriceCondition: data.minPriceCondition || "",
    detail: data.detail || "",
    status: data.status || "",
    quantity: data.quantity || "",
    startDate: data.startDate || "2024-01-01",
    endDate: data.endDate || "2024-02-01",
  });
  //see details state
  const [seeDetails, setSeeDetails] = useState(false);

  const handleChange = (e) => {
    setPromo({ ...promo, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Bạn có chắc muốn cập nhật khuyến mãi này?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: `Cập nhật`,
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Cập nhật thành công",
          showConfirmButton: false,
          timer: 1500,
        });
        setSeeDetails(!seeDetails);
      }
    });
  };

  const handleDelete = (e) => {};

  return (
    <>
      {seeDetails ? (
        <>
          <div className="promosdetails__container">
            <div className="promosdetails__wrapper">
              <div className="productscard__container-update--title">
                Chi tiết khuyến mãi
              </div>
              <div className="productscard__container-update--body-item">
                <div className="productscard__container-update--body-item--title">
                  Mã khuyến mãi:
                </div>
                <div>
                  <input
                    disabled
                    className="productscard__container-update--body-item--input"
                    type="text"
                    name="code"
                    value={promo.code}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="productscard__container-update--body-item">
                <div className="productscard__container-update--body-item--title">
                  Ngày bắt đầu:
                </div>
                <div>
                  <input
                    className="productscard__container-update--body-item--input"
                    type="date"
                    name="startDate"
                    value={promo.startDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="productscard__container-update--body-item">
                <div className="productscard__container-update--body-item--title">
                  Ngày kết thúc:
                </div>
                <div>
                  <input
                    className="productscard__container-update--body-item--input"
                    type="date"
                    name="endDate"
                    value={promo.endDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="productscard__container-update--body-item">
                <div className="productscard__container-update--body-item--title">
                  Điều kiện giảm giá:
                </div>
                <div>
                  <input
                    className="productscard__container-update--body-item--input"
                    type="text"
                    name="minPriceCondition"
                    value={Number(promo.minPriceCondition).toLocaleString(
                      "vi-VN",
                      {
                        style: "currency",
                        currency: "VND",
                      }
                    )}
                    onChange={(e) =>
                      setPromo({
                        ...promo,
                        minPriceCondition: String(
                          e.target.value.replace(/\D/g, "")
                        ),
                      })
                    }
                  />
                </div>
              </div>
              <div className="productscard__container-update--body-item">
                <div className="productscard__container-update--body-item--title">
                  Loại giảm giá
                </div>
                <div>
                  <Select
                    name="discount"
                    value={{
                      label: promo.type ? "%" : "VNĐ",
                      value: promo.type ? "%" : "VNĐ",
                    }}
                    styles={{
                      valueContainer: (base) => ({
                        ...base,
                        fontSize: "1.4rem",
                        fontWeight: "400",
                        color: "#9e9e9e",
                      }),
                      placeholder: (base) => ({
                        ...base,
                        color: "#9e9e9e",
                        fontSize: "1.4rem",
                        fontWeight: "400",
                      }),
                      control: (base) => ({
                        ...base,
                        width: "40rem",
                        border: "1px solid #d9d9d9",
                        borderRadius: "5px",
                        paddingLeft: "1rem",
                        maxHeight: "5rem",
                      }),
                      menu: (base) => ({
                        ...base,
                        fontSize: "1.4rem",
                        backgroundColor: "#f0f0f0",
                        border: "1px solid #d9d9d9",
                        borderRadius: "5px",
                        paddingLeft: "1rem",
                      }),
                    }}
                    onChange={(selectedOption) => {
                      handleChange({
                        target: {
                          name: "discount",
                          value: selectedOption.value,
                        },
                      });
                    }}
                    options={[
                      { value: "%", label: "%" },
                      { value: "VNĐ", label: "VNĐ" },
                    ]}
                    defaultValue={{
                      value: promo.type ? "%" : "VNĐ",
                      label: promo.type ? "%" : "VNĐ",
                    }}
                  />
                </div>
              </div>
              <div className="productscard__container-update--body-item">
                <div className="productscard__container-update--body-item--title">
                  Mức giảm:
                </div>
                <div>
                  <input
                    className="productscard__container-update--body-item--input"
                    type="text"
                    name="discount"
                    value={promo.value}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="productscard__container-update--body-item">
                <div className="productscard__container-update--body-item--title">
                  Trạng thái
                </div>
                <div>
                  <Select
                    name="status"
                    value={{ label: promo.status, value: promo.status }}
                    onChange={(selectedOption) => {
                      handleChange({
                        target: { name: "status", value: selectedOption.value },
                      });
                    }}
                    options={[
                      { value: "1", label: "Hoạt động" },
                      { value: "0", label: "Không hoạt động" },
                    ]}
                    styles={{
                      valueContainer: (base) => ({
                        ...base,
                        fontSize: "1.4rem",
                        fontWeight: "400",
                        color: "#9e9e9e",
                      }),
                      placeholder: (base) => ({
                        ...base,
                        color: "#9e9e9e",
                        fontSize: "1.4rem",
                        fontWeight: "400",
                      }),
                      control: (base) => ({
                        ...base,
                        width: "40rem",
                        border: "1px solid #d9d9d9",
                        borderRadius: "5px",
                        paddingLeft: "1rem",
                        maxHeight: "5rem",
                      }),
                      menu: (base) => ({
                        ...base,
                        fontSize: "1.4rem",
                        backgroundColor: "#f0f0f0",
                        border: "1px solid #d9d9d9",
                        borderRadius: "5px",
                        paddingLeft: "1rem",
                      }),
                    }}
                  />
                </div>
              </div>
              <div className="productscard__update--button-list">
                <button
                  className="ShopProduct--update-button"
                  onClick={(e) => handleUpdate(e)}>
                  Lưu
                </button>
                <button
                  className="ShopProduct--delete-button"
                  onClick={(e) => handleDelete(e)}>
                  Xóa
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
      {filter === data.status || filter === "all" ? (
        <>
          <div className="promoscard__container">
            <div className="promoscard__wrapper">
              <div className="promoscard__wrapper--item">
                <div className="promoscard__wrapper--item-text">
                  <span>Mã khuyến mãi: </span>
                  <span className="promoscard--promo-code">{promo.code}</span>
                </div>
              </div>
            </div>
            <div className="promoscard__wrapper">
              <div className="promoscard__wrapper--item">
                <div className="promoscard__wrapper--item-text">
                  <span>Loại khuyến mãi: </span>
                  <span className="promoscard--promo-code">
                    {promo.type ? "Phần trăm" : "VNĐ"}
                  </span>
                </div>
              </div>
              <div className="promoscard__wrapper--item">
                <div className="promoscard__wrapper--item-text">
                  <span>Giá trị khuyến mãi: </span>
                  <span className="promoscard--promo-code">
                    {!promo.type
                      ? Number(promo.value).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })
                      : promo.value + "%"}
                  </span>
                </div>
              </div>
            </div>
            <div className="promoscard__wrapper">
              <div className="promoscard__wrapper--item">
                <div className="promoscard__wrapper--item-text">
                  <span>Điều kiện áp dụng: </span>
                  <span className="promoscard--promo-code">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(promo.minPriceCondition)}
                  </span>
                </div>
              </div>
              <div className="promoscard__wrapper--item">
                <div className="promoscard__wrapper--item-text">
                  <span>Số lượng: </span>
                  <span className="promoscard--promo-code">
                    {promo.quantity}
                  </span>
                </div>
              </div>
            </div>
            <div className="promoscard__wrapper">
              <div className="promoscard__wrapper--item">
                <div className="promoscard__wrapper--item-text">
                  <span>Ngày bắt đầu </span>
                  <input disabled type="date" value={promo.startDate} />
                  <button
                    className="promoscard__wrapper--item-edit"
                    onClick={(e) => {
                      e.preventDefault();
                      setSeeDetails(!seeDetails);
                    }}>
                    ...
                  </button>
                </div>
              </div>
              <div className="promoscard__wrapper--item">
                <div className="promoscard__wrapper--item-text">
                  <span>Ngày kết thúc</span>
                  <input disabled type="date" value={promo.endDate} />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default ShopPromosCard;
