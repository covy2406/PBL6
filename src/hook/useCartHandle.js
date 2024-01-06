import { toast } from "react-toastify";
import useCart from "./useCart";
import apiHandleCart from "api/apiHandleCart";
import apiProductHome from "api/apiProductHome";

const useCartHandle = () => {
  const {
    setCartListProduct,
    setProductList,
    productList,
    searchTerm,
    setSearchTerm,
    setSearchResults,
  } = useCart();
  // Add to cart
  const addtocart = async (productId, quantity) => {
    const response = await apiHandleCart.add(productId, quantity);
    if (response) {
      showCartList();
      toast.success("Thêm vào giỏ hàng thành công", { autoClose: 1000 });
      return true;
    } else {
      console.error("Add to cart err", response);
      toast.error("Không thể thêm vào giỏ hàng", response);
      return false;
    }
  };

  // xoa 1 san pham trong gio hang
  const delfromcart = async (productID) => {
    const response = await apiHandleCart.del(productID);
    if (response) {
      showCartList();
      toast.success("Đã xóa sản phẩm ra khỏi giỏ hàng");
      return true;
    } else {
      toast.error("Lỗi không thể xóa sản phẩm");
    }
  };

  // Show all product in cart
  const showCartList = async () => {
    const response = await apiHandleCart.viewCart();
    if (response) {
      if (response.data?.message) {
        return false;
      }
      // Cập nhật state và lưu vào sessionStorage nếu API trả về thành công
      window.sessionStorage.setItem(
        "cartListProduct",
        JSON.stringify(response.data.data)
      );
      setCartListProduct(
        response.data.data.map((item) => {
          return {
            ...item,
            checked: false,
            total_price: parseInt(item.price) * parseInt(item.quantity_order),
            promos: null,
            discount_amount: 0,
            code_discount: [],
          };
        })
      );
      return true;
    } else {
      toast.error("Lỗi không thể xem giỏ hàng");
      return false;
    }
  };
  const increaseQuantity = async (id) => {
    try {
      const res = await apiHandleCart.incqty(id);
      if (res.data.data?.id) {
        return true;
      } else {
        toast.error("Lỗi không thể tăng số lượng");
        return false;
      }
    } catch (error) {
      toast.error("Lỗi không thể tăng số lượng");
      return false;
    }
  };
  const decreaseQuantity = async (id) => {
    try {
      const res = await apiHandleCart.decqty(id);
      if (res) {
        return true;
      } else {
        toast.error("Lỗi không thể giảm số lượng");
        return false;
      }
    } catch (error) {
      toast.error("Lỗi không thể giảm số lượng");
      return false;
    }
  };

  const fetchProductHome = async () => {
    try {
      const response = await apiProductHome.getAll();
      window.sessionStorage.setItem(
        "productList",
        JSON.stringify(response.data)
      );
      setProductList(response.data);
      return response.data;
    } catch (error) {
      return false;
    }
  };

  // xử lý ô input nhập dữ liệu
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // // Hàm xử lý khi người dùng ấn nút search
  // const handleSearchSubmitResults = () => {
  //   // Chuyển đổi từ khóa tìm kiếm thành chữ thường
  //   const searchTermLowerCase = searchTerm.toLowerCase();

  //   // Lọc sản phẩm theo từ khóa tìm kiếm trong tên hoặc brand
  //   const results = productList.filter(product =>
  //     product.name.toLowerCase().includes(searchTermLowerCase) ||
  //     product.shopName.toLowerCase().includes(searchTermLowerCase)
  //   );

  //   setSearchResults(results);
  // };

  const handleSearchSubmitResults = () => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    const productsWithSameName = {};

    productList.forEach((product) => {
      const productNameLower = product.name.toLowerCase();
      const shopNameLower = product.shopName.toLowerCase();

      // Kiểm tra xem tên sản phẩm hoặc tên cửa hàng có chứa từ khóa tìm kiếm không
      const includesKeyword =
        productNameLower.includes(searchTermLowerCase) ||
        shopNameLower.includes(searchTermLowerCase);

      if (includesKeyword) {
        // Nếu tên sản phẩm chưa được thêm vào kết quả, khởi tạo nó
        if (!productsWithSameName[productNameLower]) {
          productsWithSameName[productNameLower] = [];
        }

        // Thêm sản phẩm vào kết quả
        productsWithSameName[productNameLower].push(product);
      }
    });

    // Giữ nguyên kết quả để bao gồm tất cả các sản phẩm cùng tên
    const results = Object.values(productsWithSameName).flat();
    setSearchResults(results);
  };

  //console.log('kết quả tìm kiếm', searchResults);

  return {
    addtocart,
    delfromcart,
    showCartList,
    increaseQuantity,
    decreaseQuantity,
    fetchProductHome,
    handleInputChange,
    handleSearchSubmitResults,

    //handlePayment
  };
};

export default useCartHandle;
