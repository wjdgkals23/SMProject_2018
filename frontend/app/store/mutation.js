import Constant from '../constant'
import {postget} from "../lib/getpost";
import axios from 'axios';
import { apiPath } from "../lib/httpconfig";


export default {
    [Constant.GETPOST] : (state, payload) => {
        console.log(payload.data);
        for(let item in payload.data){
            if( item%2 === 0 ) {
                console.log(payload.data[item].selectLike);
                payload.data[item].like = payload.data[item].selectLike == 0 ? true : false;
                console.log(payload.data[item].like);
                // payload.data[item].src = "~/assets/images/test.jpeg";
                payload.data[item].like_count = payload.data[item].likeCount;
                state.secondcol.push(payload.data[item]);
            }
            else {
                console.log(payload.data[item].selectLike);
                payload.data[item].like = payload.data[item].selectLike == 0 ? true : false;
                console.log(payload.data[item].like);
                payload.data[item].like_count = payload.data[item].likeCount;
                state.firstcol.push(payload.data[item]);
            }
        }
    },
    [Constant.CLEANPOST] : (state) => {
        state.firstcol = [];
        state.secondcol = [];
    },
    [Constant.PEEDCH] : (state,payload) => {
        if(payload==1)
            state.peedmanager = 1;
        else if(payload==2)
            state.peedmanager = 2;
        else if(payload==3)
            state.peedmanager = 3;
    },
    [Constant.SDP] : (state, payload) => {
        console.log("#########payload ", payload);
        // CHANGE DB CONNECT
        state.DetailPageData.id = payload;
        state.DetailPageData.Image.push({src:"~/assets/images/test.jpeg", checked: false });
        state.DetailPageData.Image.push({src:"~/assets/images/source_1.jpg", checked: false });
        state.DetailPageData.Image.push({src:"~/assets/images/source_2.jpg", checked: false});
        state.DetailPageData.author = "Jeong Yeon Ho";
        state.DetailPageData.like_count = 3004;
        state.DetailPageData.title = "오버사이즈 체크 스트라이프 셔츠"
        state.DetailPageData.content = "오버사이즈 스트라이프 셔츠에요 이쁘죠 맞아요 존나 잘만듬요. 깔끔함이 포인트 입니다."
        state.DetailPageData.tag = [
            {name: "청바지", type: "cloth"},
            {name: "티셔츠", type: "cloth"},
            {name: "코트", type: "cloth"},
            {name: "슬랙스", type: "cloth"},
            {name: "후드코트", type: "cloth"},
            {name: "걸리쉬", type: "style"},
        ];
        state.DetailPageData.version = 1;
        state.DetailPageData.comment.push({ id: "nayekim", content: "왼쪽 가슴 아래에 포켓하나 더 있으면 좋을거같아요!!", have_img: true, src: "~/assets/images/source_1.jpg"});
        state.DetailPageData.comment.push({ id: "hamin jeong", content: "잘 만드셨네요!!!!", have_img: false });
    },
    [Constant.RSDP] : (state, payload) => {
        state.DetailPageData = null;
        state.DetailPageData = {
            Image: [],
            title: "",
            content: "",
            author: "",
            likecount: 0,
            comment: [],
            tag: []
        };
    },
    //Server
    [Constant.CL] : (state, payload) => {
        //FirstCol
        if(payload.colnum == "1"){
            let data = {
                userId: state.id_num,
                postId: state.firstcol[payload.index].postId,
            }
            state.firstcol[payload.index].like = !state.firstcol[payload.index].like;
            //DELETE
            if(state.firstcol[payload.index].like) {
                console.log(data.postId);
                axios.post(payload.api + "/api/common/delete_like", data).then((res)=> {
                    if(res.data.message == "success") {
                        console.log("delete success");
                        state.firstcol[payload.index].like_count--;
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
                console.log(data.postId);
                axios.post(payload.api + "/api/common/insert_like", data).then((res)=> {
                    if(res.data.message == "success") {
                        console.log("insert success");
                        state.firstcol[payload.index].like_count++;
                    }
                    else {
                        console.log("firstcol" + " " + payload.index + "delete_like fail");
                    }
                }).catch((err)=> {
                    console.log(err);
                })
            }
        }
        else{
            let data = {
                userId: state.id_num,
                postId: state.secondcol[payload.index].postId,
            };
            state.secondcol[payload.index].like = !state.secondcol[payload.index].like;
            //DELETE
            if(state.secondcol[payload.index].like) {
                console.log(data.postId);
                axios.post(payload.api + "/api/common/delete_like", data).then((res)=> {
                    if(res.data.message == "success") {
                        console.log("delete success");
                        state.secondcol[payload.index].like_count--;
                    }
                    else {
                        console.log("secondcol" + " " + payload.index + "delete_like fail");
                    }
                }).catch((err)=> {
                    console.log(err);
                })
            }
            //INSERT
            else{
                console.log(data.postId);
                axios.post(payload.api + "/api/common/insert_like", data).then((res)=> {
                    if(res.data.message == "success") {
                        console.log("insert success");
                        state.secondcol[payload.index].like_count++;
                    }
                    else{
                        console.log("secondcol" + " " + payload.index + "insert_like fail");
                    }
                }).catch((err)=> {
                    console.log(err);
                })
            }
        }
    },
    [Constant.WC] : (state,payload) => {
        state.DetailPageData.comment.push(payload);
    },
    [Constant.STD] : (state,payload) => {
        console.log(payload);
    }
}
