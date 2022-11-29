<template>
    <div style="width:100%;background: #f5f5f5;">
        <div style="width:1226px;margin:0 auto;padding-bottom: 60px;">
            <div style="padding: 30px 0;">
            <div style="display:flex;background: #fff;height: 70px;line-height: 70px;padding: 0 20px;border-bottom: 1px solid #424242;">
                <span style="flex:1;text-align: left;"><el-checkbox v-model="checked" @change="selectAll">全选</el-checkbox></span>
                <span style="flex:2;text-align: left;">商品名称</span>
                <span style="flex:1;text-align: center;">单价</span>
                <span style="flex:1;text-align: center;">数量</span>
                <span style="flex:1;text-align: center;">小计</span>
                <span style="flex:1;text-align: center;">操作</span>
            </div>
            <div style="display:flex;flex-direction:column;background: #fff;padding: 0 20px;font-family:'ShuHeiTi'">
                <div style="display:flex;align-items: center;padding: 10px 0;" v-for="(item, index) of cartList" :key="index">
                    <span style="flex:0.4;text-align: left;"><el-checkbox v-model="item.check" @change="selectPro"></el-checkbox></span>
                    <span style="flex:2.6;display: flex;align-items: center;">
                        <img :src="item.storeInfo.image" alt="" width="80" height="80">
                        <span style="margin:0 20px">{{ item.storeInfo.storeName}}</span>
                        <span>{{ item.attrInfo.sku.substring(0,item.attrInfo.sku.length-1)}}</span>
                    </span>
                    <span style="flex:1;text-align: center;">{{ item.attrInfo.price}}元</span>
                    <span style="flex:1;text-align: center;">
                    <el-input-number v-model="item.cartNum" @change="(num) => { handleChange(num,item.id)} " :min="1" :max="item.attrInfo.stock"></el-input-number>
                    </span>
                    <span style="flex:1;text-align: center;color: #ff7800;">{{ item.cartNum * item.attrInfo.price}}元</span>
                    <span style="flex:1;text-align: center;"><i class="el-icon-close" style="cursor:pointer" @click="del(item.id)"></i></span>
                </div>
            </div>

            <el-empty v-if="cartList.length === 0" description="你的购物车没有商品" style="padding:200px"></el-empty>
        </div>
        <div style="display:flex;align-items:center;height:50px;background:#fff;padding-left: 30px;justify-content: space-between;">
            <div style="display:flex;color:#AAAAAA;font-size: 14px;">
                <span style="cursor:pointer" @click="$router.push('/')">继续购物</span>
                <span style="margin:0 20px">|</span>
                <span>已选择<span style="color:#ff7800">{{ num }}</span>件</span>
            </div>
            <div style="display:flex;font-size: 14px;">
                <span>合计：<span style="color:#ff7800;font-size:35px">{{ totalPrice }}</span>元</span>
                <span style="height:100%;width:200px;line-height:50px;color:#fff;background:#ff7800;text-align:center;font-size:20px;margin-left: 50px;" @click="submit">去结算</span>
            </div>
        </div>  
        </div>
    </div>
</template>
<script>
import { mapMutations} from 'vuex'
import { getCart, delCart ,uptNum} from '@/api/CartApi';
export default {
    data () {
        return {
            cartList: [],
            checked: false,
            num: 0,
            totalPrice: 0
        }
    },
    created (){
        this.getCartList()
    },
    methods: {
            ...mapMutations({
            setCart: 'SET_CART',
            setCartNumber: 'SET_CARTNUMBER'
        }),
        submit () {
            let ids = []
            this.cartList.forEach(e => {
                if (e.check) {
                    ids.push(e.id)
                }
            })

            if (ids.length === 0) {
                return this.$message.warning('请至少选择一件商品')
            }

            this.$router.push({
                path: '/shop/checkout',
                query: {
                    cartIds: ids.join(',')
                }
            })
        },
        handleChange (num,id) {
            uptNum(id,num).then(res => {
                this.$message.success(res.msg)
                this.computedPrice()
            })
        },
        del (id) {
            delCart(id).then(res => {
                this.$message.success(res.msg)
                this.getCartList()
            })
        },
        selectAll () {
            this.cartList.forEach(e => {
                e.check = this.checked
            })
            this.computedPrice()
        },
        computedPrice () {
            let num = 0
            let total = 0
            this.cartList.forEach(e => {
                if (e.check){
                    num++;
                    total += e.cartNum * e.attrInfo.price
                }
            })
            this.num = num
            this.totalPrice = total
        },
        selectPro () {
            this.checked = true
            this.cartList.forEach(e => {
                if (!e.check) {
                    this.checked = false
                }
            })
            this.computedPrice()
        },
        getCartList () {
            getCart().then(res => {
                this.setCart(res.obj)
                this.setCartNumber(res.obj.length)
                this.cartList = res.obj.map(e => {
                    e.check = false
                    return e
                })
                console.log(this.cartList);
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    ::v-deep .el-checkbox__inner {
        width: 20px;
        height: 20px;
        line-height: 20px;
    }
    ::v-deep .el-checkbox__inner::after {
        height: 10px;
        left: 7px;
        top: 2px;
    }
</style> 