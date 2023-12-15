import axiosClient from "./axiosClient";

const apiIncreaseProduct = {

    incqty(id, increase) {
        console.log("incqty",id)
        const url = `/in_decreaseAmount?product_order_id=${id}&increase`;
        return axiosClient.get(
            url,
            {
                increase: 1,
            }
        )
    }
}

export default apiIncreaseProduct