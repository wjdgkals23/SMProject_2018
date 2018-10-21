<template>
    <Page>
        <ActionBar :title="pid_name">
            <NavigationButton text="Go back" android.systemIcon="ic_menu_back" @tap="$navigateBack()" />
        </ActionBar>
        <ActivityIndicator :busy=busy @busyChange="onBusyChanged" />
        <component v-on:changepeed="changepeed(val)" :is="currentView"></component>
    </Page>
</template>

<script>
    import TotalPeed from './TotalPeed'
    import UserPeed from './UserPeed'
    export default {
        name: "App",
        components: { TotalPeed, UserPeed },
        data() {
            return {
                msg: 'Hello World!',
                busy: true,
                data: null, // 이곳에다 데이터 바인딩하면 이미지 데이터 변동
                currentView: TotalPeed,
                pid_name: "Total"
            }
        },
        methods:{

        }
    }
</script>

<style scoped>
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20px;
        color: #333333;
    }

    #navigation {
        background-color: aquamarine;
    }

    #navigation Label {
        text-align:center;
        font-size: 25%;
        color: darkslategray;
        vertical-align: middle;
        /*hover*/
    }
</style>
