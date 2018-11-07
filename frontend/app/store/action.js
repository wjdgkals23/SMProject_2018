import Constant from '../constant';

export default {
    [Constant.LOGIN] : (store, payload) => {
        console.log("### LOGIN");npm
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
}
