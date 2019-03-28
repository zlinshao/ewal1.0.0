<template>
    <div id="birthday">
        <div class="mainList"  :style="{'height': this.mainListHeight(-9) + 'px'}">
            <div class="birthday_info">
                <div class="today_birthday">
                    <div class="today_birthday_title"><span>今日寿星</span></div>
                    <div class="today_birthday_list">
                        <div class="birthday_box" v-for="(item,index) in todayBirthday">
                            <img src="../../../../../assets/image/newMedia/theme1/staff.png" alt="">
                            <div class="">
                                <span class="writingMode">{{item.depart}}</span>
                                <span class="writingMode">{{item.name}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="fix_birthday_btn" @click="wishes_visible = true"><span>送上祝福</span></div>
                </div>
                <div class="months_birthday">
                    <div class="months_birthday_title"><span>本月寿星</span></div>
                    <div class="months_birthday_list justify-bet">
                        <div class="birthday_box" v-for="(item,index) in monthBirthday">
                            <img src="../../../../../assets/image/newMedia/theme1/staff.png" alt="">
                            <div class="">
                                <span class="writingMode">{{item.depart}}</span>
                                <span class="writingMode">{{item.name}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="switch_icon_box flex-center">
                    <span></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "birthday",
        data(){
            return{
                todayBirthday:[
                    {name:'齐达内',depart:'南京二区一组',avatar:""},
                    {name:'齐达内',depart:'南京二区一组',avatar:""},
                    {name:'齐达内',depart:'南京二区一组',avatar:""},

                ],
                monthBirthday:[
                    {name:'齐达内',depart:'南京二区一组',avatar:""},
                    {name:'齐达内',depart:'南京二区一组',avatar:""},
                    {name:'齐达内',depart:'南京二区一组',avatar:""},
                    {name:'齐达内',depart:'南京二区一组',avatar:""},
                    {name:'齐达内',depart:'南京二区一组',avatar:""},
                    {name:'齐达内',depart:'南京二区一组',avatar:""},
                    {name:'齐达内',depart:'南京二区一组',avatar:""},
                ],
            }
        }
    }
</script>

<style scoped>

</style>