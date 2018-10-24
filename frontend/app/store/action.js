
import Constant from '../constant';

export default {
    [Constant.LOGIN] : (store, payload) => {
        console.log("### GETIMG");npm
    },
    [Constant.PEEDCH] : (store, payload) => {
        console.log("### LOGIN");
        store.commit(Constant.PEEDCH, payload);
    }
}
