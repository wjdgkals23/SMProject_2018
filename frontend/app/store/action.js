import Constant from '../constant';
import { apiPath } from "../lib/httpconfig";
const platformModule = require('tns-core-modules/platform');
import axios from 'axios';
import {postget} from "../lib/getpost";

export default {
    [Constant.LOGIN] : (store, payload) => {
        // 로그인 정보 보내고 받고 처리
    },
    [Constant.GETPOST] : (store, payload) => {
        console.log("### GETPOST");
        store.commit(Constant.GETPOST, payload);
    },
    [Constant.CLEANPOST] : (store) => {
        console.log("### CLEANPOST");
        store.commit(Constant.CLEANPOST);
    },
    [Constant.PEEDCH] : (store, payload) => {
        console.log("### PEEDCH");
        store.commit(Constant.PEEDCH, payload);
    },
    [Constant.SDP] : (store, payload) => {
        console.log("### SET DETAIL PAGE");
        store.commit(Constant.SDP, payload);
    },
    [Constant.SDP_V] : (store, payload) => {
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
    [Constant.STD] : (store, payload) => {
        // console.log("### SET TAG DATA", payload);
        store.commit(Constant.STD, payload);
    },
    [Constant.SETD] : (store, payload) => {
        console.log("### SEND TAG DATA", payload);
        store.commit(Constant.SETD, payload);
    },
    [Constant.GSP] : (store, payload) => {
        console.log("### GET SELLING PRODUCT", payload);
        store.commit(Constant.GSP, payload);
    },
    [Constant.SAP] : (store, payload) => {
        console.log("### SET API PATH", payload);
        store.commit(Constant.SAP, payload);
    },
    [Constant.SEI] : (store, payload) => {
        console.log("### SET EVENT INFO", payload);
        store.commit(Constant.SEI, payload);
    },
    [Constant.RT] : (store, payload) => {
        console.log("### RESEARCH TAG", payload);
        store.commit(Constant.RT, payload);
    },
    [Constant.PSLC] : (store, payload) => {
        console.log("### POST SORT LIKE COUNT");
        store.commit(Constant.PSLC, payload);
    },
    [Constant.PSD] : (store, payload) => {
        console.log("### POST SORT DATE");
        store.commit(Constant.PSD, payload);
    },
    [Constant.GMP] : (store, payload) => {
        console.log("### GET MY POST");
        store.commit(Constant.GMP, payload);
    },
    [Constant.GML] : (store, payload) => {
        console.log("### GET MY LIKE");
        store.commit(Constant.GML, payload);
    },
    [Constant.DCL] : (store, payload) => {
        console.log("### DETAIL PAGE CLICK LIKE");
        store.commit(Constant.DCL, payload);
    },
    [Constant.CC] : (store, payload) => {
        console.log("CHECK COMMENT");
        store.commit(Constant.CC, payload);
    }
}
