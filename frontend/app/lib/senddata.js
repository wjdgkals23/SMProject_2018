const bghttpModule = require("nativescript-background-http");
const session = bghttpModule.session("image-upload");
const axios = require("axios");

let device_api = null;
let url = null;
let request = {
    url: device_api + url,
    method: "POST",
    headers: {
        "Content-Type": "application/octet-stream",
        "File-Name": "upload-image"
    }
};

function upload(srcs, apipath, textdata) {

    let params = [];
    device_api = apipath;
    url = "/api/test/img";

    request.url = device_api + url;

    //{ name: "fileToUpload", filename: file, mimeType: 'image/jpeg' }
    params.push({ name: "textdata" , value: JSON.stringify(textdata) });
    for(let item in srcs){
        if(item == 0) {
            console.log(item);
            params.push({ name: srcs[item].name, filename:srcs[item].src, mimeType: 'image/png' });
        }
        else{
            params.push({ name: srcs[item].name, filename:srcs[item].src, mimeType: 'image/png' });
        }
    }

    let task = session.multipartUpload(params, request);
    task.on("complete", (res) => {
        console.log(res);
    });

}

function uploadcomment(apipath, data) {
    // textdata 에는 유저 아이디, comment의 contents 이미지 작성해야함.
    if(data.hasOwnProperty("src")){
        let params = [];
        console.log(apipath);
        device_api = apipath;
        url = "/api/test/temp";
        request.url = device_api + url;

        // { id: this.id, content: this.writecomment, have_img: true, src: this.editimage[0].src }

        let textdata = {
            id: data.id,
            contents: data.content,
        }

        // ###### 포스트 아이디 포함, 이미지 이름 포함

        params.push({ name: "textdata" , value: JSON.stringify(textdata) });
        params.push({ name: "temp", filename:data.src, mimeType: 'image/png' });
        let task = session.multipartUpload(params, request);

        // task.on("complete", (res) => {
        //     console.log(res);
        // });
    }
    else{
    //    send text data
    }
}

export { upload, uploadcomment };
