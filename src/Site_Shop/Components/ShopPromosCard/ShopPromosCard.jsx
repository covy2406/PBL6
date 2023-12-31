import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
//handle datepicker
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { da, vi } from "date-fns/locale";

import "./ShopPromosCard.css";

const ShopPromosCard = ({ data, filter }) => {
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

  const handleChange = (e) => {
    setPromo({ ...promo, [e.target.name]: e.target.value });
  };

  return (
    <>
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
            <div className="promoscard__wrapper"></div>
            <div className="promoscard__wrapper">
              <div className="promoscard__wrapper--item">
                <div className="promoscard__wrapper--item-text">
                  <span>Ngày bắt đầu</span>
                  <DatePicker
                    selected={new Date(promo.startDate)}
                    onChange={(date) =>
                      setPromo({
                        ...promo,
                        startDate: format(date, "yyyy-MM-dd"),
                      })
                    }
                  />
                </div>
              </div>
              <div className="promoscard__wrapper--item">
                <div className="promoscard__wrapper--item-text">
                  <span>Ngày kết thúc</span>
                  <DatePicker
                    selected={new Date(promo.endDate)}
                    onChange={(date) =>
                      setPromo({
                        ...promo,
                        endDate: format(date, "yyyy-MM-dd"),
                      })
                    }
                  />
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
