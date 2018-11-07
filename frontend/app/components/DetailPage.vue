<template>
    <Page :actionBarHidden="abmanager">
        <ScrollView>
            <GridLayout columns="*" rows="*" class="mylight">
                <StackLayout>
                    <GridLayout columns="*" rows="70">
                        <GridLayout horizontalAlignment="right" width="15%" margin="15">
                            <Image src="~/assets/images/btn/cancel.png" stretch="aspectFit" @tap="resetdetailpagedata(),$navigateBack()"/>
                        </GridLayout>
                    </GridLayout>
                    <GridLayout columns="*" class="mybold">
                        <detail-col col="0" :coldata="DetailPageData"></detail-col>
                    </GridLayout>
                </StackLayout>
            </GridLayout>
        </ScrollView>
    </Page>
</template>

<script>
    import DetailCol from "./imageview/DetailCol"
    import { mapState, mapMutations } from 'vuex'
    import _ from 'lodash'
    import Constant from "../constant"
    export default {
        name: "DetailPage",
        components: { DetailCol },
        created() {
            console.log(this.DetailPageData.author);
        },
        computed: _.extend({

        },mapState([ 'DetailPageData', 'abmanager' ])),
        methods:{
            resetdetailpagedata() {
                this.$store.dispatch(Constant.RSDP);
            }
        }
    }
</script>

<style scoped>

</style>
