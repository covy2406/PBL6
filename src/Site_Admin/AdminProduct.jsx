import useAdmin from "hook/useAdmin";
import { useEffect, useState } from "react";

function AdminProduct() {
  const { getAllShopProduct } = useAdmin();
  const [shopProductList, setShopProductList] = useState([]);
  useEffect(() => {
    getAllShopProduct().then((res) => {
      console.log(res);
      setShopProductList(res.data);
    });
  }, []);

  return (
    <>
      <div className="grid">
        <div className="admin__top--title">Admin product list</div>
        <div className="admin__body--list">
          {Object.keys(shopProductList).map((key) => {
            return (
              <div>
                <div>{shopProductList[key].name}</div>
                <div>{shopProductList[key].price}</div>
                <div>{shopProductList[key].description}</div>
                <div>{shopProductList[key].image}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default AdminProduct;
