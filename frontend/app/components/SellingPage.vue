<template>
 <Page :actionBarHidden="abmanager">
     <StackLayout>
         <GridLayout row="0" col="0" verticalAlignment="top" horizontalAlignment="left" width="10%">
             <StackLayout paddingTop="8" paddingLeft="10">
                 <Image src="~/assets/images/btn/leftarrow.png" stretch="aspectFit" @tap="$navigateBack" />
             </StackLayout>
         </GridLayout>
     </StackLayout>
 </Page>
</template>

<script>
    import { mapState } from 'vuex'
    import _ from 'lodash/lodash.min';

    export default {
        name: "SellingPage",
        computed : _.extend({

        },mapState([ 'tags' , 'abmanager', 'api', "id_num" ])),
    }
</script>

<style scoped>

</style>
