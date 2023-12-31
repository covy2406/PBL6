import apiComment from "api/apiComment";
import useCart from "./useCart";
//import { useParams } from "react-router-dom";

const useComment = () => {
    const { setComment } = useCart();
    //const {number, shop_product_id} = useParams();
    const fetchComments = async (number, shop_product_id) => {
        try {
            const resCmt = await apiComment.getComment(number, shop_product_id);
            setComment(resCmt.data);
        }
        catch (err) {
            //console.log('Lỗi không thể lấy được comment',err);
            //console.log(err.status)
            if (err.response) {
                // Lỗi HTTP, ví dụ: error.response.status
                console.log('Lỗi HTTP:', err.response.status);
            } else if (err.request) {
                // Yêu cầu đã được gửi nhưng không nhận được phản hồi
                console.log('Yêu cầu không được phản hồi:', err.request);
            } else {
                // Lỗi khác
                console.log('Lỗi:', err.message);
            }
        }
    }

    return {
        fetchComments,
    }
}
 export default useComment;