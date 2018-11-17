<template>
    <ScrollView>
        <GridLayout columns="*,*" class="mybold" paddingBottom="15">
            <image-col :coldata="posts" col="0"></image-col>
            <image-col :coldata="posts" col="1"></image-col>
        </GridLayout>
    </ScrollView>
</template>

<script>
    import ImageCol from "./ImageCol"
    import _ from 'lodash'
    import { mapState } from 'vuex'
    import Constant from "../../constant"

    export default {
        name: 'ImageView',
        components: {
            // CardView
            ImageCol
        },
        data() {
            return {
                msg: 'Hello World!',
                data:[
                    {title:"none", src: "~/assets/images/NativeScript-Vue.png"},
                ],
                busy: true,
                result: null,
            }
        },
        created() {
            // this.$store.dispatch(Constant.GETPOST, {});
            console.log(this.posts);
            console.log("here");
        },
        methods:{

        },
        computed : _.extend({
            // first_col(){
            //     if(this.posts == null){
            //         return this.data;
            //     }
            //     else{
            //         let firstcol = [];
            //         for(let i in this.posts){
            //             if(i % 2 == 1){
            //                 firstcol.push({ data: this.posts[i], index: i });
            //             }
            //         }
            //         return firstcol;
            //     }
            // },
            // second_col(){
            //     if(this.posts == null){
            //         return this.data;
            //     }
            //     else{
            //         let secondcol = [];
            //         for(let i in this.posts){
            //             if(i % 2 == 0){
            //                 secondcol.push({ data: this.posts[i], index: i })
            //             }
            //         }
            //         return secondcol;
            //     }
            // }
        },mapState([ 'posts' ])),
    }
</script>

<style scoped>

</style>
