const bghttpModule = require("nativescript-background-http");
const session = bghttpModule.session("image-upload");

function upload(srcs, apipath, textdata) {

    let params = [];

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

export { upload };
