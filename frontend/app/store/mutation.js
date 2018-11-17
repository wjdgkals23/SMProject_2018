import Constant from '../constant'
import {postget} from "../lib/getpost";
import axios from 'axios';

export default {
    // [Constant.REQUEST] : async (state) => {
    //     let res = await postget("http://127.0.0.1:3000");
    //     this.$store.dispatch(Constant.GETPOST, res);
    // },
    [Constant.GETPOST] : (state, payload) => {
        console.log("mutation");
        console.log(payload);
        for(let item in payload.data){
            console.log(item);
            payload.data[item].like = true;
            state.posts.push(payload.data[item]);
        }
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
        state.DetailPageData.likecount = 3004;
        state.DetailPageData.title = "오버사이즈 스트라이프 셔츠"
        state.DetailPageData.content = "오버사이즈 스트라이프 셔츠에요 이쁘죠 맞아요 존나 잘만듬요. 깔끔함이 포인트 입니다."
        state.DetailPageData.tag = [
            {name: "청바지", type: "cloth"},
            {name: "티셔츠", type: "cloth"},
            {name: "코트", type: "cloth"},
            {name: "슬랙스", type: "cloth"},
            {name: "후드코트", type: "cloth"},
            {name: "걸리쉬", type: "style"},
        ]
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
    [Constant.CL] : (state, payload) => {
        state.posts[payload].like = !state.posts[payload].like;
        if(state.posts[payload].like){
            state.posts[payload].like_count -= 1;
        }
        else {
            state.posts[payload].like_count += 1;
        }
    },
    [Constant.WC] : (state,payload) => {
        state.DetailPageData.comment.push(payload);
    }
}
