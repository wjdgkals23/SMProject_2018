<template>
    <Page :actionBarHidden="abmanager">
        <ScrollView>
            <GridLayout columns="*" rows="*" class="mylight" paddingBottom="30">
                <GridLayout rows="*,*" columns="*" style="margin-top:30px">
                    <upload-view row="0" ></upload-view>
                    <!--<bottom-navigation row="2" colSpan="2"></bottom-navigation>-->
                    <upload-tag row="1" ></upload-tag>
                </GridLayout>
            </GridLayout>
        </ScrollView>
    </Page>
</template>

<script>
    import BottomNavigation from './navi/BottomNavigation'
    import UploadView from './uploadview/UploadView'
    import UploadTag from './tagview/UploadTag'
    import { mapState, mapMutations } from 'vuex'
    import _ from 'lodash'

    export default {
        name: "UploadPage",
        components: { BottomNavigation, UploadView, UploadTag },
        methods:{

        },
        computed : _.extend({

        },mapState([ 'abmanager' ]))
    }
</script>

<style scoped>

</style>
