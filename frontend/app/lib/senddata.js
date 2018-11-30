const bghttpModule = require("nativescript-background-http");
const session = bghttpModule.session("image-upload");
const axios = require("axios");

let request = {
    url: "",
    method: "POST",
    headers: {
        "Content-Type": "application/octet-stream",
        "File-Name": "upload-image"
    }
};

function upload(srcs, apipath, textdata, tagdata) {

    let params = [];

    request.url = apipath + "/api/test/img";

    //{ name: "fileToUpload", filename: file, mimeType: 'image/jpeg' }
    params.push({ name: "textdata" , value: JSON.stringify(textdata) });
    params.push({ name: "textdata" , value: JSON.stringify(textdata) });
    params.push({ name: "tagdata" , value: JSON.stringify(tagdata) });
    for(let item in srcs){
        if(item == 0) {
            console.log(item);
            params.push({ name: srcs[item].name, filename:srcs[item].src, mimeType: 'image/png' });
        }
        else{
            params.push({ name: srcs[item].name, filename:srcs[item].src, mimeType: 'image/png' });
        }
    }

    console.log(params);
    // let task = session.multipartUpload(params, request);
    // task.on("complete", (res) => {
    //     console.log(res);
    // });

}

function uploadcomment(apipath, data) {
    if(data.hasOwnProperty("src")){
        // 이미지가 포함된 댓글
        let params = [];
        request.url = apipath + "/api/test/temp";

        let textdata = {
            id: data.id,
            contents: data.content,
        }

        params.push({ name: "textdata" , value: JSON.stringify(textdata) });
        params.push({ name: data.name, filename:data.src, mimeType: 'image/png' });

        console.log(JSON.stringify(params));
        let task = session.multipartUpload(params, request);

        // task.on("complete", (res) => {
        //     console.log(res);
        // });
        // 백엔드 작업 완료되면 콜백안에서 this.$store.dispatch(Constant.WC, data); 로 마무리
    }
    else{
    // 이미지 말고 댓글만
        console.log(JSON.stringify(data));
    }
}

export { upload, uploadcomment };
