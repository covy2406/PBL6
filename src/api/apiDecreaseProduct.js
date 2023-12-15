import axiosClient from "./axiosClient";

const apiDecreaseProduct = {

    decqty(id, decrease) {
        console.log("incqty",id)
        const url = `/in_decreaseAmount?product_order_id=${id}`;
        return axiosClient.get(
            url,
            {
                decrease: 1,
            }
        )
    }
}

export default apiDecreaseProduct