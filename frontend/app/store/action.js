import Constant from '../constant';
import axios from 'axios';

export default {
    [Constant.LOGIN] : (store, payload) => {
        // 로그인 정보 보내고 받고 처리
        console.log("### LOGIN");
    },
    [Constant.PEEDCH] : (store, payload) => {
        console.log("### PEEDCH");
        store.commit(Constant.PEEDCH, payload);
    },
    [Constant.SDP] : (store, payload) => {
        console.log("### SET DETAIL PAGE");
        store.commit(Constant.SDP, payload);
    },
    [Constant.RSDP] : (store, payload) => {
        console.log("### RESET DETAIL PAGE");
        store.commit(Constant.RSDP, payload);
    },
    [Constant.CL] : (store, payload) => {
        console.log("### CLICK LIKE", payload);
        store.commit(Constant.CL, payload);
    },
    [Constant.WC] : (store, payload) => {
        console.log("### WRITE COMMENT", payload);
        store.commit(Constant.WC, payload);
    },
}
