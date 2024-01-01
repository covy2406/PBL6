import { useState, useRef } from "react";
import useAuth from "hook/useAuth";
import "./ShopProductsCard.css";
import "../../css/shopProductUpdate.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Select from "react-select";
//hooks
import useShop from "hook/useShop";

const ShopProductsCard = ({ data, filter, func }) => {
  const { auth } = useAuth();
  const { updateShopProduct, deleteShopProduct, getShopProductsAll } =
    useShop();
  const [product, setProduct] = useState({
    id: data.id,
    shop_id: data.shop_id,
    product_id: data.product_id,
    price: data.price,
    quantity: data.quantity,
    starRated: data.starRated,
    status: data.status,
    isNew: data.isNew,
    warranty: data.warranty,
    description: data.description,
    created_at: data.created_at,
    updated_at: data.updated_at,
    image: data.image,
    name: data.name,
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

  const [update, setUpdate] = useState(false);
  const handleUpdate = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Xác nhận chỉnh sửa thông tin sản phẩm?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (!result.isConfirmed) {
        //if user click cancel, set product to default data
        setProduct({
          id: data.id,
          shop_id: data.shop_id,
          product_id: data.product_id,
          price: data.price,
          quantity: data.quantity,
          starRated: data.starRated,
          status: data.status,
          isNew: data.isNew,
          warranty: data.warranty,
          description: data.description,
          created_at: data.created_at,
          updated_at: data.updated_at,
          image: data.image,
          name: data.name,
        });
        setUpdate(false);
        return;
      }
      setUpdate(false);
      //nén thành json để gửi dữ liệu lên update
      const packageData = JSON.stringify(product);
      updateShopProduct(packageData, product.id).then(() => {
        getShopProductsAll().then(() => {
          func(JSON.parse(window.sessionStorage.getItem("shopProducts")));
        });
      });
    });
  };
  const handleDelete = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Xác nhận xóa sản phẩm?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (!result.isConfirmed) return;
      deleteShopProduct(product.id).then(() => {
        getShopProductsAll().then(() => {
          func(JSON.parse(window.sessionStorage.getItem("shopProducts")));
        });
      });
    });
    setUpdate(false);
  };
  return (
    <>
      {filter === (data.status ? "active" : "inactive") || filter === "all" ? (
        <div>
          <div className="productscard__container">
            <div className="productscard__product-name">
              <img
                src={auth.url + product.image}
                alt=""
                className="productscard__product-name--img"
              />
              <div className="productscard__product-name--text">
                {product.name}
                <div className="productscard__product-price">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(product.price)}
                </div>
              </div>
            </div>

            <div className="productscard__product-quantity">
              Kho: {product.quantity}
            </div>
            <div className="productscard__product-button-list">
              <button
                className="productscard__product--button"
                onClick={() => setUpdate(true)}>
                Sửa
              </button>
              <Link
                to={`/Viewdetail/${product.id}`}
                className="productscard__product-button">
                Xem thêm
              </Link>
            </div>
            <div className="productscard__product-starrate">
              <div className="productscard__product-starrate--text">
                Đánh giá:
              </div>
              <ul className="productscard__product-starrate--star">
                {[...Array(product.starRated)].map((index) => {
                  return (
                    <div
                      key={index}
                      className="productscard__product-starrate--star--icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="red"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                        />
                      </svg>
                    </div>
                  );
                })}
                {[...Array(5 - product.starRated)].map((item, index) => {
                  return (
                    <>
                      <div className="productscard__product-starrate--star--icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                          />
                        </svg>
                      </div>
                    </>
                  );
                })}
              </ul>
            </div>
            <div
              className="productscard__product-status"
              id={product.status ? "" : "inactive"}>
              {product.status ? "" : "Dừng hoạt động"}
            </div>
          </div>
          {update ? (
            <div className="productscard__container-update">
              <div className="productscard__container-updateform">
                <div className="productscard__container-update--title">
                  Cập nhật sản phẩm
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
                      Giá sản phẩm
                    </div>
                    <div>
                      <input
                        className="productscard__container-update--body-item--input"
                        type="text"
                        value={product.price}
                        onChange={(e) =>
                          setProduct({ ...product, price: e.target.value })
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
                      Bảo hành
                    </div>
                    <div>
                      <input
                        type="text"
                        className="productscard__container-update--body-item--input"
                        value={product.warranty}
                        onChange={(e) =>
                          setProduct({ ...product, warranty: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="productscard__container-update--body-item">
                    <div className="productscard__container-update--body-item--title">
                      Trạng thái
                    </div>
                    <div>
                      <Select
                        placeholder="Chọn tình trạng"
                        onChange={(selectedOption) =>
                          setProduct({
                            ...product,
                            status: selectedOption.value,
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
                          { value: "1", label: "Hoạt động" },
                          { value: "0", label: "Dừng hoạt động" },
                        ]}
                        defaultValue={{
                          value: product.status,
                          label: product.status
                            ? "Hoạt động"
                            : "Dừng hoạt động",
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="productscard__update--button-list">
                  <button
                    onClick={(e) => handleUpdate(e)}
                    className="ShopProduct--update-button">
                    Lưu
                  </button>
                  <button
                    onClick={(e) => handleDelete(e)}
                    className="ShopProduct--delete-button">
                    Xóa
                  </button>
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
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
};
export default ShopProductsCard;
