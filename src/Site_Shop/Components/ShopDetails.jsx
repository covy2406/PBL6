import { useState, useEffect } from "react";
import Swal from "sweetalert2";

//import hooks
import useShop from "hook/useShop";
import useAuth from "hook/useAuth";

const ShopDetails = () => {
  const { shopProfile } = useAuth();
  const { getShopdetails, updateShopdetails } = useShop();
  const [editform, setEditform] = useState(false);
  const [shop, setShop] = useState({
    shopName: shopProfile?.shopName,
    shopAddress: shopProfile?.shopAddress,
    shopPhone: shopProfile?.shopPhone,
    state: shopProfile?.state,
    bankAccount: shopProfile?.bankAccount,
  });

  const handleChangeStatus = (e) => {
    e.preventDefault();
    Swal.fire({
      title: (shop.state ? "Dừng hoạt động " : "Hoạt động lại ") + "cửa hàng",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (!result.isConfirmed) return;
      setShop({ ...shop, state: !shop.state });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Xác nhận chỉnh sửa thông tin cửa hàng",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (!result.isConfirmed) return;
      updateShopdetails({ ...shop, state: shop.state ? 1 : 0 }, shopProfile.id);
      setEditform(!editform);
    });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setEditform(!editform);
    setShop({
      shopName: shopProfile?.shopName,
      shopAddress: shopProfile?.shopAddress,
      shopPhone: shopProfile?.shopPhone,
      state: shopProfile?.state,
      bankAccount: shopProfile?.bankAccount,
    });
  };

  const changeForm = (e) => {
    e.preventDefault();
    console.log("change form", editform);
    setEditform(!editform);
  };

  useEffect(() => {
    getShopdetails();
  }, []);

  useEffect(() => {
    setShop({
      shopName: shopProfile?.shopName,
      shopAddress: shopProfile?.shopAddress,
      shopPhone: shopProfile?.shopPhone,
      state: shopProfile?.state,
      bankAccount: shopProfile?.bankAccount,
    });
  }, [shopProfile]);

  return (
    <>
      <div className="shop__container-nav">
        <div className="shop__menu_container">
          <div className="shop__home">
            <ul className="shop__home-list">
              <li className="shop__home-item">Thông tin cửa hàng</li>
            </ul>
          </div>
        </div>
        <div className="shop__content">
          <div className="shop__content--title">
            <div className="shop__content-text">Tên cửa hàng</div>
            <div className="shop__content-text">Địa chỉ cửa hàng</div>
            <div className="shop__content-text">Số điện thoại</div>
            <div className="shop__content-text">Trạng thái</div>
            <div className="shop__content-text">Tài khoản ngân hàng</div>
          </div>
          <div className="shop__content--body">
            {!editform ? (
              <>
                <div className="shop__content-text">{shop.shopName}</div>
                <div className="shop__content-text">{shop.shopAddress}</div>
                <div className="shop__content-text">{shop.shopPhone}</div>
                <div
                  className="shop__content-text"
                  id={shop.state ? "active" : "inactive"}>
                  {shop.state ? "Hoạt động" : "Dừng hoạt động"}
                </div>
                <div className="shop__content-text">{shop.bankAccount}</div>
                <div className="shop__content--button">
                  <button
                    className="shop__button"
                    onClick={(e) => changeForm(e)}>
                    Chỉnh sửa
                  </button>
                  <button className="shop__button">Xem Shop của tôi</button>
                </div>
              </>
            ) : (
              <>
                <input
                  className="shop__content-text"
                  value={shop.shopName}
                  onChange={(e) =>
                    setShop({ ...shop, shopName: e.target.value })
                  }></input>
                <input
                  className="shop__content-text"
                  value={shop.shopAddress}
                  onChange={(e) =>
                    setShop({ ...shop, shopAddress: e.target.value })
                  }></input>
                <input
                  className="shop__content-text"
                  value={shop.shopPhone}
                  onChange={(e) =>
                    setShop({ ...shop, shopPhone: e.target.value })
                  }></input>
                <div
                  className="shop__content-change"
                  id={shop.state ? "active" : "inactive"}>
                  {shop.state ? "Hoạt động" : "Dừng hoạt động"}
                  <button
                    className="shop--change-status"
                    id={shop.state ? "inactive" : "active"}
                    onClick={(e) => handleChangeStatus(e)}>
                    {shop.state ? "Dừng hoạt động" : "Hoạt động lại"}
                  </button>
                </div>
                <input
                  className="shop__content-text"
                  value={shop.bankAccount}
                  onChange={(e) =>
                    setShop({ ...shop, bankAccount: e.target.value })
                  }></input>
                <div className="shop__content-change">
                  <button
                    className="shop__button"
                    onClick={(e) => handleSubmit(e)}>
                    Lưu
                  </button>
                  <button
                    className="shop__button"
                    onClick={(e) => handleCancel(e)}>
                    Hủy
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default ShopDetails;
