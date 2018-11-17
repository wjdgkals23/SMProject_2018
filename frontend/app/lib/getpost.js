import axios from "axios";
import Constant from "../constant";

function postget(apiPath, vue) {
    axios.get(apiPath + "/api/total_feed/fetch")
        .then(function (response) {
            vue.$store.dispatch(Constant.GETPOST, response);
        }).catch(function (error) {
            console.log(error);
        }
    );
}

export { postget }
