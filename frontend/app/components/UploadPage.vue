<template>
    <ScrollView>
        <GridLayout columns="*" rows="*" class="mylight">
            <GridLayout rows="50,*,*" columns="*,*" style="margin-top:30px">
                <GridLayout row="0" col="0" verticalAlignment="top" horizontalAlignment="left" width="10%">
                    <StackLayout paddingTop="8" paddingLeft="10">
                        <Image src="~/assets/images/icon/leftarrow.png" stretch="aspectFit" />
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
</template>

<script>
    import BottomNavigation from './navi/BottomNavigation'
    import UploadView from './uploadview/UploadView'
    import UploadTag from './tagview/UploadTag'
    export default {
        name: "UploadPage",
        components: { BottomNavigation, UploadView, UploadTag },
        methods:{

        },
    }
</script>

<style scoped>

</style>
