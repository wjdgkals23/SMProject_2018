import axios from "axios";
import Constant from "../constant";

function postget(apiPath, vue, id_num) {
    // console.log("postget");
    axios.get(apiPath + "/api/total_feed/get_feed", {params: { user_id: id_num }})
        .then((response)=>{
            // console.log(response);
            vue.$store.dispatch(Constant.GETPOST, response);
        }).catch((error) => {
            console.log(error);
        }
    );
}

function top3get(apiPath, vue, id_num) {
    console.log("top3get");
    axios.get(apiPath + "/api/total_feed/get_top3", {params: { user_id: id_num }})
        .then((response)=>{
            // console.log(response);
            vue.$store.dispatch(Constant.GETTOP3, response);
        }).catch((error) => {
            console.log(error);
        }
    );
}

function tagpostget(apiPath, vue, id_num, data) {
    console.log("tagpostget");
    axios.get(apiPath + "/api/tag_feed/get_feed", {params: { user_id: id_num, tag_list: data }})
        .then((response)=>{
            // console.log(response);
            vue.$store.dispatch(Constant.SETD, response);
        }).catch((error) => {
            console.log(error);
        }
    );
}

function mylikeget(apiPath, vue, id_num) {
    console.log("mypostget");
    axios.get(apiPath + "/api/my_page/liked_list", {params: { user_id: id_num }})
        .then((response)=>{
            console.log(response);
            vue.$store.dispatch(Constant.GML, response);
        }).catch((error) => {
            console.log(error);
        }
    );
}

function mypostget(apiPath, vue, id_num) {
    console.log("mylikeget");
    axios.get(apiPath + "/api/my_page/my_post", {params: { user_id: id_num }})
        .then((response)=>{
            console.log(response);
            vue.$store.dispatch(Constant.GMP, response);
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
    if(!data.hasOwnProperty("version")) {
        axios.get(apiPath + "/api/detail_page/get_post_detail", {params: { postId: data.postId, userId: data.userId, postVersion: -1 }})
            .then((response) => {
                vue.$store.dispatch(Constant.SDP, response.data);
                vue.$navigateTo(vue.page);
            }).catch(err => {
            console.log(err);
        })
    }
    else {
        axios.get(apiPath + "/api/detail_page/get_post_detail", {params: { postId: data.postId, userId: data.userId, postVersion: data.version }})
            .then((response) => {
                vue.$store.dispatch(Constant.SDP, response.data);
                vue.$navigateBack();
                vue.$navigateTo(vue.page);
            }).catch(err => {
            console.log(err);
        })
    }
}

export { postget, tagget, detailget, mylikeget, mypostget, top3get, tagpostget }
