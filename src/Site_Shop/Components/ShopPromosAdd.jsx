import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { useState, useEffect } from "react";
//hooks
import useShop from "hook/useShop";

const ShopProductAdd = (props) => {
  //get product info for selection
  const { getShopProductsAll, createShopPromo, getShopPromosAll } = useShop();
  const [shopProductList, setShopProductList] = useState({});
  useEffect(() => {
    getShopProductsAll().then((res) => {
      setShopProductList(res);
    });
    console.log(shopProductList);
  }, []);

  //product data to create
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

  //handle create promo
  const navigate = useNavigate();
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
      getShopPromosAll().then(() => {
        navigate("/shop/details");
      });
      console.log(res);
    });
  };

  return (
    <div className="shop__container-nav">
      <div className="shop__menu_container">
        <div className="shop__home">
          <ul className="shop__home-list">
            <li className="shop__home-item">Thêm sản phẩm</li>
          </ul>
        </div>
      </div>
      <div className="shop__content">
        <div className="productscard__container-update">
          <div className="promoscard__container-updateform">
            <div className="productscard__container-update--title">
              Tạo mã khuyến mãi
            </div>
            <div className="promoscard-update--body">
              <div className="productscard__container-update--body-item">
                <div className="productscard__container-update--body-item--title">
                  Sản phẩm áp dụng
                </div>
                <div>
                  <Select
                    placeholder="Chọn sản phẩm, để trống nếu áp dụng cho tất cả"
                    onChange={(selectedOption) => {
                      console.log(selectedOption.value);
                      setPromo({
                        ...promo,
                        shop_product_id: selectedOption.value,
                      });
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
                    options={Object.keys(shopProductList).map((key) => {
                      return {
                        value: shopProductList[key].id,
                        label: shopProductList[key].name,
                      };
                    })}
                  />
                </div>
              </div>
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
                  navigate("/shop/promos/list/all");
                }}
                className="ShopProduct--delete-button">
                Quay lại
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShopProductAdd;
