<template>
    <FlexboxLayout flexDirection="column" justifyContent="space-around" backgroundColor="#3c495e">
        <Label text="VODA" height="70" backgroundColor="#43b883"/>
        <Label text="ID" alignSelf="center" width="50%" height="10%" backgroundColor="#1c6b48" @tap="Login"/>
        <Label text="PW" alignSelf="center" width="50%" height="10%" backgroundColor="#289062"/>
        <Label text="fourth" height="70" backgroundColor="#289062"/>
    </FlexboxLayout>
</template>
<script>
    import _ from 'lodash/lodash.min';
    import { mapState, mapMutations } from 'vuex'

    export default {
        name: "LoginPage",
        data() {
            return {
                usernameInput: '',
                passwordInput: '',
            }
        },
        created(){

        },
        methods: {
            Login(){
                function configureOAuthProviderFacebook(){
                    const facebookProviderOptions = {
                        openIdSupport: "webapp",
                        clientId: "147573416043152",
                        clientSecret: "e61995123f3d380ba3ae35f83cfaf9ad",
                        redirectUri: "https://www.facebook.com/connect/login_success.html",
                        scopes: ["email"]
                    };
                    const facebookProvider = new TnsOaProviderFacebook(facebookProviderOptions);
                    return facebookProvider;
                }

                configureTnsOAuth([
                    configureOAuthProviderFacebook()
                ])

                function tnsOauthLogin() {
                    let client = new TnsOAuthClient('facebook');

                    client.loginWithCompletion((res, error) => {
                        if (error) {
                            console.error("back to main page with error: ");
                            console.error(error);
                        } else {
                            console.log("back to main page with access token: ");
                            console.log(res);
                        }
                    });
                }

                tnsOauthLogin();
            }
        },
        computed : _.extend({

        },mapState([ 'peedmanager', 'abmanager' ]))
    }
</script>

<style scoped>

</style>
