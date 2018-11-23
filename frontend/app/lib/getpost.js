import axios from "axios";
import Constant from "../constant";

async function postget(apiPath, vue, id_num) {
    console.log("postget");
    console.log(id_num);
    axios.get(apiPath + "/api/total_feed/get_feed", {params: { user_id: id_num }})
        .then(await function (response) {
            vue.$store.dispatch(Constant.GETPOST, response);
        }).catch(function (error) {
            console.log(error);
        }
    );
}

export { postget }
