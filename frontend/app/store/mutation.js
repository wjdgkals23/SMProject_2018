import Constant from '../constant'

export default {
    [Constant.GETIMG] : (state,payload) => {
        console.log("temp");
    },
    [Constant.PEEDCH] : (state,payload) => {
        if(payload==1)
            state.peedmanager = 1;
        else
            state.peedmanager = 2;
    }
}
