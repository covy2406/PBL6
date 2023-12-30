import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { useState, useEffect, useRef } from "react";
//hooks
import useProduct from "hook/useProduct";
import useShop from "hook/useShop";

import { URLUtils } from "utils/urlUtils";

const ShopProductAdd = () => {
  //get product info for selection
  const { getAllProducts } = useProduct();
  const [productList, setProductList] = useState({});
  useEffect(() => {
    getAllProducts().then((res) => {
      setProductList(res);
    });
  }, []);
  //product data to create
  const [product, setProduct] = useState({
    name: "",
    shop_id: JSON.parse(window.sessionStorage.getItem("shopProfile")).id,
    product_id: "",
    price: "",
    quantity: 1,
    desciption: "",
    warranty: 6,
    status: 1,
    isNew: 1,
    image: null,
  });
  //handle image upload
  const inputRef = useRef();
  const [image, setImage] = useState(null);
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  //handle create
  const { createShopProduct } = useShop();
  const navigate = useNavigate();
  const handleCreate = (e) => {
    setProduct({ ...product, image: image && URLUtils.base64ToFile(image) });
    createShopProduct(product).then((res) => {
      console.log(res);
    });
    e.preventDefault();
    navigate("/shop/products/list/all");
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
          <div className="productscard__container-updateform">
            <div className="productscard__container-update--title">
              Tạo sản phẩm mới
            </div>
            <div className="productscard__container-update--body">
              <div className="productscard__container-update--body-item">
                <div className="productscard__container-update--body-item--title">
                  Tên sản phẩm
                </div>
                <div>
                  <input
                    className="productscard__container-update--body-item--input"
                    type="text"
                    value={product.name}
                    onChange={(e) =>
                      setProduct({ ...product, name: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="productscard__container-update--body-item">
                <div className="productscard__container-update--body-item--title">
                  Loại sản phẩm
                </div>
                <div>
                  <Select
                    placeholder="Chọn loại sản phẩm"
                    onChange={(selectedOption) =>
                      setProduct({
                        ...product,
                        product_id: selectedOption.value,
                      })
                    }
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
                    options={Object.keys(productList).map((key) => {
                      return {
                        value: productList[key].id,
                        label: productList[key].name,
                      };
                    })}
                  />
                </div>
              </div>
              <div className="productscard__container-update--body-item">
                <div className="productscard__container-update--body-item--title">
                  Giá sản phẩm
                </div>
                <div>
                  <input
                    className="productscard__container-update--body-item--input"
                    type="text"
                    value={Number(product.price).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        price: String(e.target.value.replace(/\D/g, "")),
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
                    value={product.quantity}
                    onChange={(e) =>
                      setProduct({ ...product, quantity: e.target.value })
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
                    value={product.description ? product.description : ""}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="productscard__container-update--body-item">
                <div className="productscard__container-update--body-item--title">
                  Tình trạng
                </div>
                <div>
                  <Select
                    placeholder="Chọn tình trạng"
                    onChange={(selectedOption) =>
                      setProduct({
                        ...product,
                        isNew: selectedOption.value,
                      })
                    }
                    styles={{
                      control: (base) => ({
                        ...base,
                        width: "40rem",
                        border: "1px solid #d9d9d9",
                        borderRadius: "5px",
                        paddingLeft: "1rem",
                        maxHeight: "5rem",
                      }),
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
                      menu: (base) => ({
                        ...base,
                        fontSize: "1.4rem",
                        backgroundColor: "#f0f0f0",
                        border: "1px solid #d9d9d9",
                        borderRadius: "5px",
                        paddingLeft: "1rem",
                      }),
                    }}
                    options={[
                      { value: "1", label: "Mới" },
                      { value: "0", label: "Cũ" },
                    ]}
                  />
                </div>
              </div>
              <div className="productscard__container-update--body-item">
                <div className="productscard__container-update--body-item--title">
                  Bảo hành
                </div>
                <div>
                  <input
                    type="text"
                    className="productscard__container-update--body-item--input"
                    value={product.warranty + " tháng"}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        warranty: e.target.value.replace(" tháng", ""),
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="productscard__update--image">
              <img
                src={image}
                alt=""
                className="productscard__update--image--img"
              />
              <input
                type="file"
                accept="image/*"
                ref={inputRef}
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
              <button
                className="productscard__update--image--button"
                onClick={(e) => {
                  e.preventDefault();
                  inputRef.current.click();
                }}>
                {image ? "" : "Thêm ảnh"}
              </button>
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
                  navigate("/shop/products/list/all");
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
