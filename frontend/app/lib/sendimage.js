const bghttpModule = require("nativescript-background-http");
const session = bghttpModule.session("image-upload");

import { apiPath } from "./httpconfig";

function sendimage(srcs, apipath) {

    let params = [];

    //{ name: "fileToUpload", filename: file, mimeType: 'image/jpeg' }

    for(let item in srcs){
        params.push({ name: srcs[item].name, filename:srcs[item].src, mimeType: 'image/png'});
    }

    let request = {
        url: apipath+"/api/test/img",
        method: "POST",
        headers: {
            "Content-Type": "application/octet-stream",
            "File-Name": "upload-image"
        }
    };

    let task = session.multipartUpload(params, request);
    task.on("complete", (res) => {
        console.log(res);
    });

}

export { sendimage };
