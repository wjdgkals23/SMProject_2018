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
    }
}
