<template>
    <Page actionBarHidden="true">
        <ScrollView>
            <StackLayout paddingTop="5" paddingBottom="30">
                <GridLayout rows="70">
                    <CardView>
                        <GridLayout columns="auto,auto,*" style="background: #ffffff;" paddingTop="15" paddingBottom="15">
                            <GridLayout paddingLeft="10" col="0" verticalAlignment="center" horizontalAlignment="left" paddingRight="10">
                                <Image class="img" src="~/assets/images/btn/leftarrow.png" @tap="$navigateBack"></Image>
                            </GridLayout>
                            <GridLayout col="1" verticalAlignment="center" horizontalAlignment="left">
                                <Label class="headtext" text="네임카드" style="color: #6a1495; font-size: 20%; width: 80%; text-align: left;"/>
                            </GridLayout>
                            <GridLayout col="2" verticalAlignment="center" horizontalAlignment="right" paddingRight="10">
                                <Image class="img" src="~/assets/images/btn/collaboupload.png"></Image>
                            </GridLayout>
                        </GridLayout>
                    </CardView>
                </GridLayout>
                <GridLayout rows="30,150,30">
                    <GridLayout row="1">
                        <Image src="~/assets/images/default_user.png"></Image>
                    </GridLayout>
                </GridLayout>
                <GridLayout rows="50" columns="100,*">
                    <GridLayout verticalAlignment="center" horizontalAlignment="center" col="0" paddingTop="5" paddingBottom="5" paddingRight="5" paddingLeft="15">
                        <Label text="이름"></Label>
                    </GridLayout>
                    <GridLayout verticalAlignment="center" horizontalAlignment="center" col="1">
                        <TextField verticalAlignment="center" horizontalAlignment="center" :text="mynamecard.name" class="tfstyle"></TextField>
                    </GridLayout>
                </GridLayout>
                <GridLayout rows="50" columns="100,*">
                    <GridLayout verticalAlignment="center" horizontalAlignment="center" col="0" paddingTop="5" paddingBottom="5" paddingRight="5" paddingLeft="15">
                        <Label text="이메일"></Label>
                    </GridLayout>
                    <GridLayout verticalAlignment="center" horizontalAlignment="center" col="1">
                        <TextField verticalAlignment="center" horizontalAlignment="center" :text="mynamecard.email" class="tfstyle"></TextField>
                    </GridLayout>
                </GridLayout>
                <GridLayout rows="50" columns="100,*">
                    <GridLayout verticalAlignment="center" horizontalAlignment="center" col="0" paddingTop="5" paddingBottom="5" paddingRight="5" paddingLeft="15">
                        <Label text="휴대전화"></Label>
                    </GridLayout>
                    <GridLayout verticalAlignment="center" horizontalAlignment="center" col="1">
                        <TextField verticalAlignment="center" horizontalAlignment="center" :text="mynamecard.phone" class="tfstyle"></TextField>
                    </GridLayout>
                </GridLayout>
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
    import { mapState } from 'vuex';
    import _ from 'lodash/lodash.min';

    export default {
        name: "DetailNameCard",
        computed: _.extend({

        },mapState([ 'abmanager', 'id_num', 'mynamecard' ])),
    }
</script>

<style scoped>
    .tfstyle{
        width: 90%;
        border-width: 4px;
        border-color: purple;
        border-radius: 40px;
        font-size: 10%;
    }

</style>
