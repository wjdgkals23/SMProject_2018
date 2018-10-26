<template>
    <GridLayout columns="*" rows="*">
        <GridLayout rows="*,60">
            <image-view :imgdata="posts"></image-view>
            <bottom-navigation></bottom-navigation>
        </GridLayout>
    </GridLayout>
</template>

<script>
    import _ from 'lodash'
    import { mapState } from 'vuex'
    import axios from 'axios'
    // import { mapstate } from ''
    import BottomNavigation from './navi/BottomNavigation'
    import ImageView from './imageview/ImageView'
    export default {
        name: "TotalPeed",
        components: { ImageView, BottomNavigation },
        data() {
            return {
                msg: 'Hello World!',
                busy: true
            }
        },
        methods:{

        },
        computed : _.extend({

        },mapState([ 'posts' ]))
    }
</script>

<style scoped>

</style>
