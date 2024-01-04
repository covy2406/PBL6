import { toast } from "react-toastify";
//import hook
import useAuth from "hook/useAuth";
import useCartHandle from "hook/useCartHandle";

//import icon
import { AiOutlineClose } from "react-icons/ai";

//import pages
import ShopProductPromoList from "./ShopProductPromoList";
import { useEffect, useState } from "react";

function ProductOrderCard(props) {
  const { url } = useAuth(); //url để lấy ảnh

  const productItem = props.props.productItem;
  const shop = props.props.shop;

  const setShopFilter = props.func.setShopFilter;

  //show promo
  const [shopProductPromo, setShopProductPromo] = useState([]);

  useEffect(() => {
    const subTotal = shop.products.reduce((price, product) => {
      if (product.checked === true) {
        return price + product.total_price - product.discount_amount;
      }
      return price;
    }, 0);
    setShopFilter((prevShopFilter) => {
      return prevShopFilter.map((shop) => {
        if (shop.shopId === productItem.shop_id) {
          return { ...shop, shop_total_price: subTotal };
        }
        return shop;
      });
    });
  }, [productItem]);

  //handle quantity change
  const { decreaseQuantity, increaseQuantity, delfromcart } = useCartHandle(); //các hàm xử lý giỏ hàng
  const updateQuantity = (productId, state) => {
    setShopFilter((prevShopFilter) => {
      const updatedShopFilter = prevShopFilter.map((shop) => {
        if (shop.shopId === productItem.shop_id) {
          return {
            ...shop,
            products: shop.products.map((product) => {
              if (product.id === productItem.id) {
                let newQuantity = product.quantity_order;
                if (state === "incqty") {
                  newQuantity += 1;
                } else if (state === "decqty" && newQuantity > 0) {
                  newQuantity -= 1;
                }
                if (state === "decqty" && newQuantity < 1) {
                  // Xóa sản phẩm khỏi giỏ hàng nếu số lượng giảm xuống dưới 1
                  delfromcart(productId);
                  return null; // Bỏ qua việc cập nhật mục trong giỏ hàng
                }
                return {
                  ...product,
                  quantity_order: newQuantity,
                  total_price: newQuantity * product.price,
                };
              }
              return product;
            }),
          };
        }
        return shop;
      });
      return updatedShopFilter;
    });
  };

  const incQuantity = async (id) => {
    const res = await increaseQuantity(id);
    console.log(res ? "true" : "false");
    if (res) {
      updateQuantity(id, "incqty");
      console.log("Increasing quantity success " + id);
    } else {
      toast.error("Số lượng sản phẩm đã hết");
      console.log("Increasing quantity fail " + id);
    }
  };

  const decQuantity = async (id) => {
    const res = await decreaseQuantity(id);
    if (res) {
      updateQuantity(id, "decqty");
      console.log("Decreasing quantity success " + id);
    } else {
      console.log("Decreasing quantity fail " + id);
    }
  };

  const handlePromoChecked = (e, promoItem) => {
    if (e.target.checked) {
      setShopProductPromo((prevShopProductPromo) => {
        return prevShopProductPromo.map((prevPromoItem) => {
          if (prevPromoItem.id === promoItem.id) {
            return { ...prevPromoItem, checked: true };
          }
          return prevPromoItem;
        });
      });
    } else {
      setShopProductPromo((prevShopProductPromo) => {
        return prevShopProductPromo.map((prevPromoItem) => {
          if (prevPromoItem.id === promoItem.id) {
            return { ...prevPromoItem, checked: false };
          }
          return prevPromoItem;
        });
      });
    }
  };

  const handleCheckboxChange = (e, productItem) => {
    if (e.target.checked) {
      setShopFilter((prevShopFilter) => {
        return prevShopFilter.map((shop) => {
          if (shop.shopId === productItem.shop_id) {
            return {
              ...shop,
              products: shop.products.map((product) => {
                if (product.id === productItem.id) {
                  return { ...product, checked: true };
                }
                return product;
              }),
            };
          }
          return shop;
        });
      });
    } else {
      setShopFilter((prevShopFilter) => {
        return prevShopFilter.map((shop) => {
          if (shop.shopId === productItem.shop_id) {
            return {
              ...shop,
              products: shop.products.map((product) => {
                if (product.promos) {
                  handlePromoChecked(e, product.promos);
                }
                if (product.id === productItem.id) {
                  return {
                    ...product,
                    checked: false,
                    promos: null,
                    discount_amount: 0,
                    code_discount: [],
                  };
                }
                return product;
              }),
            };
          }
          return shop;
        });
      });
    }
  };

  return (
    <>
      <td>
        <input
          type="checkbox"
          className="select__Checkbox"
          onClick={(e) => handleCheckboxChange(e, productItem)}
        />
      </td>
      <td>
        <img src={`${url}${productItem.image}`} alt={productItem.name}></img>
      </td>
      <td className="product-name-with-select">
        {productItem.name}
        <div className="discount__byShop">
          <div className="discount__byShop-ad">
            <div className="btn__checkout-discount-shop">
              Xem mã giảm giá
              <ShopProductPromoList
                props={{
                  shop_id: shop.shopId,
                  product_id: productItem.shop_product_id,
                  shopProductPromo: shopProductPromo,
                  checked: productItem.checked,
                }}
                func={{
                  setShopFilter,
                  setShopProductPromo,
                  handlePromoChecked,
                }}
              />
            </div>
          </div>
        </div>
      </td>
      <td>{parseInt(productItem.price).toLocaleString("vn-VN")} đ</td>
      <td>
        <div className="qty">
          <button
            className="incqty"
            onClick={() => incQuantity(productItem.id)}>
            +
          </button>
          <input type="text" value={productItem.quantity_order}></input>
          <button
            className="incqty"
            onClick={() => decQuantity(productItem.id)}>
            -
          </button>
        </div>
      </td>
      <td>
        <p className="subtotal">
          <div
            style={
              productItem.discount_amount
                ? { textDecoration: "line-through" }
                : { textDecoration: "none" }
            }>
            {(
              parseInt(productItem.price) * productItem.quantity_order
            ).toLocaleString("vn-VN")}{" "}
            đ
          </div>
          {productItem.discount_amount ? (
            <div>
              {(
                parseInt(productItem.price) * productItem.quantity_order -
                parseInt(productItem.discount_amount)
              ).toLocaleString("vn-VN")}{" "}
              đ
            </div>
          ) : null}
        </p>
      </td>
      <td>
        <div className="close">
          <button onClick={() => delfromcart(productItem.id)}>
            <AiOutlineClose />
          </button>
        </div>
      </td>
    </>
  );
}

export default ProductOrderCard;
