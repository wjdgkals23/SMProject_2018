<template>
    <!-- App 컴포넌트 화면 전환 -->
    <FlexboxLayout justifyContent="space-around" row="1" id="navigation">
        <Image src="~/assets/images/btn/menu.png" stretch="aspectFit" @tap="peedch(1)"/>
        <Image src="~/assets/images/btn/thumbs.png" stretch="aspectFit" @tap="peedch(2)" />
        <Image src="~/assets/images/btn/cart.png" stretch="aspectFit" @tap="peedch(3)" />
        <Image src="~/assets/images/btn/person.png" stretch="aspectFit" @tap="peedch(4)"/>
        <!-- 각각의 라벨 터치 할때마다 최상위 부모의 currentView 값 수정 -->
    </FlexboxLayout>
</template>

<script>
    import Constant from '../../constant'

    export default {
        name: "BottomNavigation",
        data(){
            return{

            }
        },
        methods: {
            peedch: function(val) {
                this.$store.dispatch(Constant.PEEDCH, val);
            }
        }
    }
</script>

<style scoped>
    #navigation {
        background-color: white;
        padding: 20px;
    }

    #navigation Image {
        /*text-align:center;*/
        /*padding: 10px;*/
        color: purple;
        /*vertical-align: middle;*/
        /*hover*/
    }
</style>
