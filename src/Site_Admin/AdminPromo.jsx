import useAdmin from "hook/useAdmin";
import "./css/AdminPromo.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import useShop from "hook/useShop";

function AdminPromo() {
  const navigate = useNavigate();
  const { getAllPromos } = useAdmin();
  const { createShopPromo } = useShop();
  const [promoList, setPromoList] = useState({});

  const [toggle, setToggle] = useState(false);
  const [promo, setPromo] = useState({
    shop_product_id: null,
    type: 1,
    value: "",
    minPriceCondition: null,
    detail: "",
    status: 1,
    quantity: 0,
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    getAllPromos().then((res) => {
      setPromoList(res.data);
    });
  }, []);
  console.log(promoList);
  const handleCreate = (e) => {
    e.preventDefault();
    // Convert the dates to the format "yyyy-mm-dd"
    const startDate = new Date(promo.startDate).toISOString().split("T")[0];
    const endDate = new Date(promo.endDate).toISOString().split("T")[0];
    createShopPromo({
      ...promo,
      startDate: startDate,
      endDate: endDate,
    }).then((res) => {
      getAllPromos().then(() => {
        navigate("/admin/product");
      });
    });
  };

  return (
    <>
      <div className="grid">
        <div className="admin__top--title">Danh sách khuyến mãi</div>
        <button
          className="admin__body--promo-button"
          onClick={(e) => {
            e.preventDefault();
            setToggle(true);
          }}>
          Thêm mã khuyến mãi của 4B1G
        </button>
        <div className="admin__body-promo">
          <div className="admin__body--list">
            {Object.keys(promoList).map((key) => {
              return (
                <div className="admin__body-promo--list-item">
                  <div className="admin--item--title">
                    Mã khuyến mãi: {promoList[key].code}
                  </div>
                  <div className="admin--item--title">
                    Giá trị:{" "}
                    {promoList[key].type
                      ? promoList[key].value + "%"
                      : parseInt(promoList[key].value).toLocaleString() + "VNĐ"}
                  </div>
                  <div className="admin--item--title">
                    Số lượng: {promoList[key].quantity}
                  </div>
                  <div className="admin--item--title">
                    Điều kiện áp dụng: tối thiếu{" "}
                    {parseInt(
                      promoList[key].minPriceCondition
                    ).toLocaleString()}{" "}
                    VNĐ
                  </div>
                  <div className="admin--item--title">
                    Trạng thái:{" "}
                    {promoList[key].status
                      ? "Đang hoạt động"
                      : "Ngừng hoạt động"}
                  </div>
                  <div className="admin--item--title">
                    Từ:{" "}
                    {promoList[key].startDate?.split("-").reverse().join("-")}{" "}
                    đến:{" "}
                    {promoList[key].endDate?.split("-").reverse().join("-")}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {!toggle ? null : (
        <div className="shop__container-nav">
          <div className="shop__content">
            <div className="productscard__container-update">
              <div className="promoscard__container-updateform">
                <div className="productscard__container-update--title">
                  Tạo mã khuyến mãi cho 4B1G
                </div>
                <div className="promoscard-update--body">
                  <div className="productscard__container-update--body-item"></div>
                  <div className="productscard__container-update--body-item">
                    <div className="productscard__container-update--body-item--title">
                      Loại khuyến mãi
                    </div>
                    <div>
                      <Select
                        name="type"
                        value={{
                          label: promo.type ? "%" : "VNĐ",
                          value: promo.type ? 1 : 0,
                        }}
                        onChange={(selectedOption) => {
                          setPromo({
                            ...promo,
                            type: selectedOption.value,
                          });
                        }}
                        options={[
                          { value: 1, label: "%" },
                          { value: 0, label: "VNĐ" },
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
                  <div className="productscard__container-update--body-item">
                    <div className="productscard__container-update--body-item--title">
                      Giá trị khuyến mãi
                    </div>
                    <div>
                      {promo.type ? (
                        <input
                          className="productscard__container-update--body-item--input"
                          type="text"
                          value={promo.value + "%"}
                          onChange={(e) => {
                            // Remove the percentage sign from the input value
                            const value = e.target.value.replace(/%/g, "");
                            setPromo({ ...promo, value: value });
                          }}
                          placeholder="%"
                        />
                      ) : (
                        <input
                          className="productscard__container-update--body-item--input"
                          type="text"
                          value={Number(promo.value).toLocaleString("vi-VN")}
                          onChange={(e) =>
                            setPromo({
                              ...promo,
                              value: String(e.target.value.replace(/\D/g, "")),
                            })
                          }
                          placeholder="VNĐ"
                        />
                      )}
                    </div>
                  </div>
                  <div className="productscard__container-update--body-item">
                    <div className="productscard__container-update--body-item--title">
                      Điều kiện áp dụng
                    </div>
                    <div>
                      <input
                        className="productscard__container-update--body-item--input"
                        type="text"
                        title="Tổng giá trị đơn hàng lớn hơn"
                        value={Number(promo.minPriceCondition).toLocaleString(
                          "vi-VN"
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
                      Mô tả
                    </div>
                    <div>
                      <input
                        className="productscard__container-update--body-item--input"
                        type="text"
                        value={promo.detail}
                        onChange={(e) =>
                          setPromo({
                            ...promo,
                            detail: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="productscard__container-update--body-item">
                    <div className="productscard__container-update--body-item--title">
                      Số lượng
                    </div>
                    <div>
                      <input
                        className="productscard__container-update--body-item--input"
                        type="text"
                        value={promo.quantity}
                        onChange={(e) =>
                          setPromo({
                            ...promo,
                            quantity:
                              e.target.value && !isNaN(e.target.value)
                                ? parseInt(e.target.value)
                                : 0,
                          })
                        }
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
                        onChange={(e) =>
                          setPromo({
                            ...promo,
                            startDate: e.target.value,
                          })
                        }
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
                        onChange={(e) =>
                          setPromo({
                            ...promo,
                            endDate: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="productscard__update--button-list">
                  <button
                    onClick={(e) => handleCreate(e)}
                    className="ShopProduct--update-button">
                    Tạo
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setToggle(false);
                    }}
                    className="ShopProduct--delete-button">
                    Quay lại
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default AdminPromo;
