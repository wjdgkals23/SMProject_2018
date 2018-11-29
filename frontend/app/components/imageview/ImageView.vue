<template>
    <ScrollView>
        <GridLayout columns="*,*" class="mybold" paddingBottom="15">
            <image-col :colnum="firstcol" col="0"></image-col>
            <image-col :colnum="secondcol" col="1"></image-col>
        </GridLayout>
    </ScrollView>
</template>

<script>
    import ImageCol from "./ImageCol"
    import _ from 'lodash/lodash.min';
    import { mapState } from 'vuex'
    import Constant from "../../constant"

    export default {
        name: 'ImageView',
        components: {
            // CardView
            ImageCol
        },
        props: [ 'firstcol', 'secondcol' ],
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
    }
</script>

<style scoped>

</style>
