<template>
    <GridLayout class="coverImage" rows="3*,2*">
        <GridLayout class="coverImage2" row="1" rows="*,*,*,*">
            <GridLayout paddingLeft="15" paddingRight="15" row="0" verticalAlignment="center" horizontalAlignment="center">
                <TextField style="color: #6a1495; font-size: 15%; width: 100%;" v-model="hp" hint="핸드폰 ex) 000-0000-0000" maxLength="20" />
            </GridLayout>
            <GridLayout paddingLeft="15" paddingRight="15" row="1" verticalAlignment="center" horizontalAlignment="center">
                <TextField autocapitalizationType="none" style="color: #6a1495; font-size: 15%; width: 100%;" v-model="email" hint="이메일" maxLength="30" />
            </GridLayout>
            <GridLayout paddingLeft="15" paddingRight="15" row="2" verticalAlignment="center" horizontalAlignment="center">
                <TextField style="color: #6a1495; font-size: 15%; width: 100%;" v-model="name" hint="이름" maxLength="10" />
            </GridLayout>
            <GridLayout row="3">
                <Image src="~/assets/images/btn/start.png" stretch="aspectFit" @tap="insertuser"></Image>
            </GridLayout>
        </GridLayout>
    </GridLayout>
</template>
<script>
    import _ from 'lodash/lodash.min';
    import { mapState, mapMutations } from 'vuex'
    import axios from 'axios';
    import Constant from '../constant';

    export default {
        name: "LoginPage",
        data() {
            return {
                usernameInput: '',
                passwordInput: '',
                hp: "",
                email: "",
                name: "",
            }
        },
        created(){

        },
        methods: {
            checkinfo() {
                let hp_rule = /^\d{3}-\d{3,4}-\d{4}$/;
                let email_rule = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
                if(!this.hp.match(hp_rule) || !this.email.match(email_rule)) {
                    return false;
                }
                return true;
            },
            insertuser() {
                if(this.checkinfo()){
                    axios.post(this.api + "/api/common/insert_user", {
                        userData: {
                            email: this.email,
                            name: this.name,
                            phone: this.hp
                        }
                    }).then((res) => {
                        if(res) {
                            axios.get(this.api + "/api/common/get_user_data", {params: {
                                    phone: this.hp
                                }}).then((res) => {
                                    console.log("SUCCESS LOGIN");
                                    this.$store.dispatch(Constant.LOGIN, res.data);
                            }).catch((err) => {
                                console.log(err);
                            })
                        }
                    });
                }
                else{
                    alert("이메일과 휴대폰번호가 올바른지 확인해주세요!").then((res) => {
                        console.log(res);
                    })
                }
            }
        },
        computed : _.extend({

        },mapState([ 'peedmanager', 'abmanager', 'api' ]))
    }
</script>

<style scoped>
    .coverImage {
        background-image: url('https://s3.ap-northeast-2.amazonaws.com/smproject2018/background.png');
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }
    .coverImage2 {
        background-color: #eee5f7;
    }
</style>
