import { toast } from "react-toastify";
//import hook
import useAuth from "hook/useAuth";
import useCartHandle from "hook/useCartHandle";

//import icon
import { AiOutlineClose } from "react-icons/ai";

//import pages
import ShopProductPromoList from "./ShopProductPromoList";

function ProductOrderCard(props) {
  const { url } = useAuth(); //url để lấy ảnh

  const productItem = props.props.productItem;
  const shop = props.props.shop;

  const setCartListProduct = props.func.setCartListProduct;
  const setSelectedProducts = props.func.setSelectedProducts;

  //handle quantity change
  const { decreaseQuantity, increaseQuantity, delfromcart } = useCartHandle(); //các hàm xử lý giỏ hàng
  const updateQuantity = (productId, state) => {
    setCartListProduct((prevCart) => {
      const updatedCart = prevCart
        .map((item) => {
          if (item.id === productId) {
            let newQuantity = item.quantity_order;
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
            return { ...item, quantity_order: newQuantity };
          }
          return item;
        })
        .filter((item) => item !== null); // Lọc ra các giá trị null (sản phẩm đã bị xóa);
      toast.success("Cập nhật giỏ hàng thành công", { autoClose: 1000 });
      return updatedCart;
    });
    setSelectedProducts((prevSelectedProducts) => {
      return prevSelectedProducts.map((item) => {
        if (item.id === productId) {
          let newQuantity = item.quantity_order;
          if (state === "incqty") {
            newQuantity += 1;
          } else if (state === "decqty" && newQuantity > 0) {
            newQuantity -= 1;
          }
          return {
            ...item,
            quantity_order: newQuantity,
            total_price: item.price * newQuantity,
          };
        }
        return item;
      });
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

  const handleCheckboxChange = (e, productItem) => {
    if (e.target.checked) {
      setSelectedProducts((prevSelectedProducts) => [
        ...prevSelectedProducts,
        { ...productItem, checked: true },
      ]);
      setCartListProduct((prevCart) => {
        return prevCart.map((item) => {
          if (item.id === productItem.id) {
            return { ...item, checked: true };
          }
          return item;
        });
      });
    } else {
      setSelectedProducts((prevSelectedProducts) =>
        prevSelectedProducts.filter((product) => product.id !== productItem.id)
      );
      setCartListProduct((prevCart) => {
        return prevCart.map((item) => {
          if (item.id === productItem.id) {
            return { ...item, checked: false };
          }
          return item;
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
                }}
                func={{
                  setSelectedProducts: setSelectedProducts,
                  setCartListProduct: setCartListProduct,
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
