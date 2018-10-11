<template>
    <GridLayout columns="*" rows="*">
        <GridLayout rows="*,60">
            <image-view :imgdata="data"></image-view>
            <bottom-navigation></bottom-navigation>
        </GridLayout>
    </GridLayout>
</template>

<script>
    import _ from 'lodash'
    import { mapState } from 'vuex'
    import axios from 'axios'
    // import { mapstate } from ''
    import BottomNavigation from './BottomNavigation'
    import ImageView from './ImageView'
    export default {
        name: "TotalPid",
        components: { ImageView, BottomNavigation },
        data() {
            return {
                msg: 'Hello World!',
                busy: true,
                data: [
                    {title:"head", src: "~/assets/images/NativeScript-Vue.png"},
                    {title:"body", src: "~/assets/images/NativeScript-Vue.png"},
                    {title:"leg", src: "~/assets/images/NativeScript-Vue.png"},
                    {title:"foot", src: "~/assets/images/NativeScript-Vue.png"},
                    {title:"head", src: "~/assets/images/NativeScript-Vue.png"},
                    {title:"body", src: "~/assets/images/NativeScript-Vue.png"},
                    {title:"leg", src: "~/assets/images/NativeScript-Vue.png"},
                    {title:"foot", src: "~/assets/images/NativeScript-Vue.png"},
                    {title:"head", src: "~/assets/images/NativeScript-Vue.png"},
                    {title:"body", src: "~/assets/images/NativeScript-Vue.png"},
                    {title:"leg", src: "~/assets/images/NativeScript-Vue.png"},
                    {title:"foot", src: "~/assets/images/NativeScript-Vue.png"}
                ], // 데이터 바인딩하면 이미지 데이터 변동
            }
        },
        methods:{

        },
        // computed: _.mapState{asdas}
    }
</script>

<style scoped>

</style>
