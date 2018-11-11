import Constant from '../constant'

export default {
    [Constant.GETIMG] : (state,payload) => {
        console.log("temp");
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
        state.DetailPageData.Image.push({src:"~/assets/images/test.jpeg"});
        state.DetailPageData.Image.push({src:"~/assets/images/source_1.jpg"});
        state.DetailPageData.Image.push({src:"~/assets/images/source_2.jpg"});
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
        state.DetailPageData.comment.push({ id: "haminjeong", content: "잘 만드셨네요!!!!", have_img: false });
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
    }
}
