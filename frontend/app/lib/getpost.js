import axios from "axios";
import Constant from "../constant";

function postget(apiPath, vue, id_num) {
    console.log("postget");
    axios.get(apiPath + "/api/total_feed/get_feed", {params: { user_id: id_num }})
        .then((response)=>{
            console.log(response);
            vue.$store.dispatch(Constant.GETPOST, response);
        }).catch((error) => {
            console.log(error);
        }
    );
}

function tagget(apiPath, vue) {
    console.log("tagget");
    axios.get(apiPath + "/api/common/get_tag")
        .then((res)=> {
            console.log(res.data);
            vue.$store.dispatch(Constant.STD, res);
        }).catch((err)=>{
            console.log(err);
    })
}

function detailget(apiPath, vue, data) {
    console.log("detailget");
    axios.get(apiPath + "/api/detail_page/get_post_detail", {params: { postId: data.postId, userId: data.userId, postVersion: -1 }})
        .then((response) => {
            vue.$store.dispatch(Constant.SDP, response.data);
            vue.$navigateTo(vue.page);
        }).catch(err => {
            console.log(err);
    })
}

export { postget, tagget, detailget }
