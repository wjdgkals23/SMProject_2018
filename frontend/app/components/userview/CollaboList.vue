<template>
    <ScrollView>
        <StackLayout>
            <CardView class="cardStyle" elevation="20" radius="10" v-for="item in collabolist">
                <GridLayout rows="auto" columns="*" paddingBottom="8" paddingLeft="10" paddingRight="10" @tap="$navigateTo(page)">
                    <GridLayout rows="40,40" columns="auto,*,*">
                        <GridLayout row="0" col="0" columns="*,*" horizontalAlignment="left" paddingTop="8" paddingBottom="5" paddingLeft="5" paddingRight="5">
                            <GridLayout col="0">
                                <Image src="~/assets/images/default_user.png" />
                            </GridLayout>
                            <GridLayout col="1" paddingLeft="5" >
                                <Label style="font-size: 18%; color: purple;" :text="item.email"></Label>
                            </GridLayout>
                        </GridLayout>
                        <GridLayout paddingLeft="5" row="1" col="0" columnSpan="1">
                            <Label :text="item.name"></Label>
                        </GridLayout>
                    </GridLayout>
                </GridLayout>
            </CardView>
            <GridLayout rows="10"></GridLayout>
        </StackLayout>
    </ScrollView>
</template>

<script>
    import ConfirmCollabo from './ConfirmCollabo';

    export default {
        name: "CollaboList",
        data() {
            return {
                collabolist: [
                    { name: "같이 작업하고싶습니다.", email: "wjdgkals23@naver.com" },
                    { name: "입사시험 요청드립니다.", email: "whatclothes@cp.com" },
                ],
                page: ConfirmCollabo,
            }
        }
    }
</script>

<style scoped>
    .cardStyle {
        color: purple;
        background: #e0d0ea;
        width: 92%;
        font-size: 20%;
        padding: 4%;
        margin-top: 25px;
        /*font-family: THEmpgtB;*/
        /*font-family: THELu;*/
    }
</style>
