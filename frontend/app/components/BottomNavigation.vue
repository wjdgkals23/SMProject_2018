<template>
    <StackLayout orientation="horizontal" row="1" id="navigation">
        <Label width="25%" class="fa" :text="'fa-eye' | fonticon" @tap="$navigateTo(router_list.one)" />
        <Label width="25%" class="fa" :text="'fa-heart' | fonticon" @tap="$navigateTo(router_list.two)"/>
        <Label width="25%" class="fa" :text="'fa-user' | fonticon" />
        <Label width="25%" class="fa" :text="'fa-user' | fonticon" />
    </StackLayout>
</template>

<script>
    import _ from 'lodash'
    import { mapState } from 'vuex'
    import axios from 'axios'
    import app from './App'
    import test from './TEST'
    export default {
        name: "BottomNavigation",
        data(){
            return{
                router_list: {
                    one: app,
                    two: test
                }
            }
        },
        methods: {
            talk: function(){
                axios.get('http://10.0.2.2:3000/temp')
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
    }
</script>

<style scoped>
    #navigation {
        background-color: aquamarine;
    }

    #navigation Label {
        text-align:center;
        font-size: 25%;
        color: darkslategray;
        vertical-align: middle;
        /*hover*/
    }
</style>
