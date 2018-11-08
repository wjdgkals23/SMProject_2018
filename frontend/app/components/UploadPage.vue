<template>
    <Page :actionBarHidden="abmanager">
        <ScrollView>
            <GridLayout columns="*" rows="*" class="mylight" paddingBottom="30">
                <GridLayout rows="50,*,*" columns="*,*" style="margin-top:30px">
                    <GridLayout row="0" col="0" verticalAlignment="top" horizontalAlignment="left" width="10%">
                        <StackLayout paddingTop="8" paddingLeft="10">
                            <Image src="~/assets/images/icon/leftarrow.png" stretch="aspectFit" @tap="$navigateBack" />
                        </StackLayout>
                    </GridLayout>
                    <GridLayout row="0" col="1" verticalAlignment="center" horizontalAlignment="right" width="23%">
                        <StackLayout paddingTop="8" paddingRight="10">
                            <Image verticalAlignment="center" src="~/assets/images/btn/upload.png" stretch="aspectFit" />
                        </StackLayout>
                    </GridLayout>
                    <upload-view row="1" colSpan="2"></upload-view>
                    <!--<bottom-navigation row="2" colSpan="2"></bottom-navigation>-->
                    <upload-tag row="2" colSpan="2"></upload-tag>
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
