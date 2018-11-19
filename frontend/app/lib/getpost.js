import axios from "axios";
import Constant from "../constant";

async function postget(apiPath, vue) {
    axios.get(apiPath + "/api/total_feed/get_feed")
        .then(await function (response) {
            vue.$store.dispatch(Constant.GETPOST, response);
        }).catch(function (error) {
            console.log(error);
        }
    );
}

export { postget }
