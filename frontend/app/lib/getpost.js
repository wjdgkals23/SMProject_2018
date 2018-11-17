import axios from "axios";

function postget(apiPath) {
    axios.get(apiPath + "/api/total_feed/fetch")
        .then(function (response) {
            console.log("data");
            console.log(response.data);
            return response.data;
        }).catch(function (error) {
            console.log(error);
        }
    );
}

export { postget }
