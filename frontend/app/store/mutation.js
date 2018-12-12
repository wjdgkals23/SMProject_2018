import Constant from '../constant'
import axios from 'axios';
import us from 'underscore/underscore-min';
import { post_sort_like_count } from "../lib/sortfunc";
import { comment_sort_date } from "../lib/sortfunc";


export default {
    [Constant.LOGIN] : (state, payload) => {
        console.log(payload);
        state.id_num = payload[0].id;
        state.mynamecard.name = payload[0].name;
        state.mynamecard.email = payload[0].email;
        state.peedmanager = 1;
    },
    [Constant.GETPOST] : (state, payload) => {
        state.secondcol.splice(0, state.secondcol.length);
        state.firstcol.splice(0, state.firstcol.length);
        state.totalcol.splice(0, state.totalcol.length);
        for(let item in payload.data){
            payload.data[item].like = payload.data[item].selectLike == 0 ? true : false;
            payload.data[item].like_count = payload.data[item].likeCount;
            state.totalcol.push(payload.data[item]);
            if( item%2 === 0 ) {
                state.secondcol.push(payload.data[item]);
            }
            else {
                state.firstcol.push(payload.data[item]);
            }
        }
    },
    [Constant.GETTOP3] : (state, payload) => {
        console.log("GETTOP3 ITEM");
        state.top3 = payload.data;
        console.log(state.top3);
    },
    [Constant.GMP] : (state, payload) => {
        state.my_post_second.splice(0, state.my_post_second.length);
        state.my_post_first.splice(0, state.my_post_first.length);
        state.my_post_total.splice(0, state.my_post_total.length);
        for(let item in payload.data){
            payload.data[item].like = payload.data[item].selectLike == 0 ? true : false;
            payload.data[item].like_count = payload.data[item].likeCount;
            state.my_post_total.push(payload.data[item]);
            if( item%2 === 0 ) {
                state.my_post_second.push(payload.data[item]);
            }
            else {
                state.my_post_first.push(payload.data[item]);
            }
        }
    },
    [Constant.GML] : (state, payload) => {
        state.my_like_second.splice(0, state.my_like_second.length);
        state.my_like_first.splice(0, state.my_like_first.length);
        state.my_like_total.splice(0, state.my_like_total.length);
        for(let item in payload.data){
            payload.data[item].like = payload.data[item].selectLike == 0 ? true : false;
            payload.data[item].like_count = payload.data[item].likeCount;
            state.my_like_total.push(payload.data[item]);
            if( item%2 === 0 ) {
                state.my_like_second.push(payload.data[item]);
            }
            else {
                state.my_like_first.push(payload.data[item]);
            }
        }
    },
    [Constant.CLEANPOST] : (state) => {
        state.firstcol = [];
        state.secondcol = [];
    },
    [Constant.PEEDCH] : (state,payload) => {
        console.log(payload);
        if(payload==1)
            state.peedmanager = 1;
        else if(payload==2)
            state.peedmanager = 2;
        else if(payload==3)
            state.peedmanager = 3;
        else
            state.peedmanager = 4;

        state.ifm = 1;
    },
    [Constant.SDP] : (state, payload) => {
        console.log("#########상세페이지 ");
        console.log(payload.commentList);
        console.log("#########상세페이지 ");
        console.log(payload.commentAttachment);
        state.chcomment.splice(0,state.chcomment.length);
        payload.commentAttachment.sort(comment_sort_date);
        payload.commentList.sort(comment_sort_date);
        state.namecard.name = payload.userData.name;
        state.namecard.email = payload.userData.email;
        state.DetailPageData.author_id = payload.userData.id;
        state.DetailPageData.id = payload.postDetail.post_id;
        state.DetailPageData.maxversion = payload.maxPostVersion;
        state.DetailPageData.version = payload.postAttachment[0].version;
        state.DetailPageData.tag = payload.tagList;
        state.DetailPageData.Image = payload.postAttachment;
        state.DetailPageData.title = payload.postDetail.title;
        state.DetailPageData.content = payload.postDetail.contents;
        state.DetailPageData.like_count = payload.postDetail.likeCount;
        state.DetailPageData.selectLike = (payload.postDetail.selectLike === 1 ? true: false);
        state.DetailPageData.author = payload.userData.name;
        // for(let temp in payload.commentList) {
        //     if(state.DetailPageData.version === state.DetailPageData[temp].version) {
        //
        //     }
        // }
        state.DetailPageData.comment = payload.commentList;
        let index = 0;
        if(payload.commentAttachment.length != 0) {
            for(let list in state.DetailPageData.comment){
                if(payload.commentAttachment[index].comment_id === state.DetailPageData.comment[list].id){
                    console.log(state.DetailPageData.comment[list].id);
                    state.DetailPageData.comment[list].url = payload.commentAttachment[index].url;
                    state.DetailPageData.comment[list].have_img = true;
                    index++;
                    if(index === payload.commentAttachment.length) {
                        break;
                    }
                }
            }
        }
    },
    [Constant.RSDP] : (state, payload) => {
        state.namecard.name = "";
        state.namecard.email = "";
        state.DetailPageData.author_id = "";
        state.DetailPageData.id = "";
        state.DetailPageData.version = "";
        state.DetailPageData.tag = "";
        state.DetailPageData.Image = "";
        state.DetailPageData.title = "";
        state.DetailPageData.content = "";
        state.DetailPageData.like_count = "";
        state.DetailPageData.selectLike = "";
        state.DetailPageData.author = "";
        state.DetailPageData.comment = "";
    },
    //Server
    [Constant.CL] : (state, payload) => {
        //FirstCol
        let data = "";
        if(payload.colnum == "1") {
            data = state.firstcol;
        }
        else if(payload.colnum == "0") {
            data = state.secondcol;
        }
        else if(payload.colnum == "3") {
            data = state.my_post_first;
        }
        else if(payload.colnum == "2") {
            data = state.my_post_second;
        }
        else if(payload.colnum == "4") {
            data = state.my_like_second;
        }
        else {
            data = state.my_like_first;
        }

        let sdata = {
            userId: state.id_num,
            postId: data[payload.index].postId,
        };

        data[payload.index].like = !data[payload.index].like;
        //DELETE
        if(data[payload.index].like) {
            console.log(sdata.postId);
            axios.post(payload.api + "/api/common/delete_like", sdata).then((res)=> {
                if(res.data.message == "success") {
                    console.log("delete success");
                    data[payload.index].like_count--;
                }
                else {
                    console.log("firstcol" + " " + payload.index + "delete_like fail");
                }
            }).catch((err)=> {
                console.log(err);
            })
        }
        //INSERT
        else{
            console.log(sdata.postId);
            axios.post(payload.api + "/api/common/insert_like", sdata).then((res)=> {
                if(res.data.message == "success") {
                    console.log("insert success");
                    data[payload.index].like_count++;
                }
                else {
                    console.log("firstcol" + " " + payload.index + "delete_like fail");
                }
            }).catch((err)=> {
                console.log(err);
            })
        }
    },
    [Constant.WC] : (state,payload) => {
        state.DetailPageData.comment.push(payload);
    },
    [Constant.STD] : (state,payload) => {
        // for(let item in payload.data){
        //     payload.data[item].selected = false;
        // }

        state.tags = payload.data;
    },
    [Constant.SETD] : (state,payload) => {
        console.log(payload.data);
        state.secondcol.splice(0, state.secondcol.length);
        state.firstcol.splice(0, state.firstcol.length);
        state.totalcol.splice(0, state.totalcol.length);
        for(let item in payload.data){
            payload.data[item].like = payload.data[item].selectLike == 0 ? true : false;
            payload.data[item].like_count = payload.data[item].likeCount;
            state.totalcol.push(payload.data[item]);
            if( item%2 === 0 ) {
                state.secondcol.push(payload.data[item]);
            }
            else {
                state.firstcol.push(payload.data[item]);
            }
        }
        state.ifm = 2;
    },
    [Constant.GSP] : (state,payload) => {
        console.log(payload);
        state.sellingproduct = [];
        state.sellingproduct.push({ title: "하늘색 스트라이프 셔츠", like_count: 3400, price: 48000, src:"~/assets/images/test.jpeg" });
        state.sellingproduct.push({ title: "트렌치코트 황토색", like_count: 3400, price: 48000, src:"~/assets/images/test2.jpeg" });
        state.sellingproduct.push({ title: "하늘색 스트라이프 셔츠", like_count: 3400, price: 48000, src:"~/assets/images/source_1.jpg" });

    },
    [Constant.SAP]  : (state,payload) => {
        state.api = payload;
    },
    [Constant.SEI]  : (state,payload) => {
        state.evhp = payload.hp;
        state.evname = payload.name;

        console.log(state.evhp);
    },
    [Constant.RT] : (state,payload) => {
        state.ifm = 1;
    },
    [Constant.PSLC] : (state,payload) => {
        let temp = us.clone(state.totalcol);
        temp.sort(post_sort_like_count);
        state.secondcol.splice(0, state.secondcol.length);
        state.firstcol.splice(0, state.firstcol.length);
        for(let item in temp) {
            if( item%2 === 0 ) {
                state.secondcol.push(temp[item]);
            }
            else {
                state.firstcol.push(temp[item]);
            }
        }
    },
    [Constant.PSD] : (state,payload) => {
        state.secondcol.splice(0, state.secondcol.length);
        state.firstcol.splice(0, state.firstcol.length);
        for(let item in state.totalcol) {
            if( item%2 === 0 ) {
                state.secondcol.push(state.totalcol[item]);
            }
            else {
                state.firstcol.push(state.totalcol[item]);
            }
        }
    },
    [Constant.DCL] : (state,payload) => {
        let sdata = {
            userId: state.id_num,
            postId: state.DetailPageData.id,
        };

        state.DetailPageData.selectLike = !state.DetailPageData.selectLike;
        //DELETE
        if(payload.type === "delete") {
            axios.post(state.api + "/api/common/delete_like", sdata).then((res)=> {
                if(res.data.message == "success") {
                    console.log("delete success");
                    state.DetailPageData.like_count--;
                }
                else {
                    console.log("delete_like fail");
                }
            }).catch((err)=> {
                console.log(err);
            })
        }
        //INSERT
        else{
            axios.post(state.api + "/api/common/insert_like", sdata).then((res)=> {
                if(res.data.message == "success") {
                    console.log("insert success");
                    state.DetailPageData.like_count++;
                }
                else {
                    console.log("delete_like fail");
                }
            }).catch((err)=> {
                console.log(err);
            })
        }
    },
    [Constant.CC] : (state, payload) => {
        axios.post(state.api + "/api/detail_page/comment_select", {
            selectData: {
                selectType: Math.abs(1-state.DetailPageData.comment[payload.index].select_type),
                id: state.DetailPageData.comment[payload.index].id
            }
        }).then((res) => {
            if(res.data){
                state.DetailPageData.comment[payload.index].select_type = Math.abs(1-state.DetailPageData.comment[payload.index].select_type);
                if(state.DetailPageData.comment[payload.index].select_type === 1) {
                    state.chcomment.push(state.DetailPageData.comment[payload.index]);
                }
                else {
                    if(state.chcomment.length > 0 ){
                        for(let item in state.chcomment) {
                            if(state.DetailPageData.comment[payload.index].id === state.chcomment[item].id) {
                                state.chcomment.splice(item, 1);
                            }
                        }
                    }
                }
            }
        }).catch((err) => {
            console.log(err);
        });
    }
}
