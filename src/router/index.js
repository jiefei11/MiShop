import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
import login from '@/views/account/login/index'
import agreement_en from '../../static/agreement/agreement_en'
import agreement_ch from '../../static/agreement/agreement_ch'
import agreement_ja from '../../static/agreement/agreement_ja'
import privacy_en from "../../static/privacy/privacy_en";
import privacy_zh from "../../static/privacy/privacy_zh";
import privacy_ja from "../../static/privacy/privacy_ja";
import shop from "@/views/shop/shopLayout";
import shopMain from "@/views/shop/index/index"
import userCenter from "@/views/shop/userCenter/userCenter";
import portal from "@/views/shop/userCenter/portal";
import address from '@/views/shop/userCenter/address'
import favorite from '@/views/shop/userCenter/favorite'
import order from '@/views/shop/userCenter/order'
import account from "@/views/account/accountLayout";
import service from "@/views/account/service/serviceLayout";
import loginAndSafe from "@/views/account/service/loginAndSafe";
import authorize from "@/views/account/service/authorize";
import help from "@/views/account/service/help";
import identity from "@/views/account/service/identity";
import profile from "@/views/account/service/profile";
import manageLayout from "@/views/manageMent/ManageLayout";
import goodsManage from '@/views/manageMent/goodsManage/goodsManage.vue'
import orderManage from "@/views/manageMent/orderList";
import addGoods from '@/views/manageMent/goodsManage/addGoods.vue'
import manageIndex from '@/views/manageMent/index/index.vue'
import categoryManage from '@/views/manageMent/categoryManage/category.vue'
import userManage from '@/views/manageMent/userManage/user.vue'
import webSetting from '@/views/manageMent/webSettings/setting.vue'
import productDetail from '@/views/shop/product/productDetail.vue'
import cart from '@/views/shop/cart/cart.vue'
import checkout from '@/views/shop/checkout/checkout.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    meta: {
      title: '小米官网'
    }
  },
  {
    path: '/account',
    component: account,
    meta: {
      auth: true
    },
    children: [
      {
        path: 'login',
        component: login,
        meta: {
          title: '小米账号-登录',
        }
      },
      {
        path: 'service',
        component: service,
        children: [
          {
            path: 'loginAndSafe',
            component: loginAndSafe,
            meta: {
              title: '小米账号',
              auth: true
            }
          },
          {
            path: 'authorize',
            component: authorize,
            meta: {
              title: '小米账号',
              auth: true
            }
          },
          {
            path: 'help',
            component: help,
            meta: {
              title: '小米账号',
              auth: true
            }
          },
          {
            path: 'identity',
            component: identity,
            meta: {
              title: '小米账号',
              auth: true
            }
          },
          {
            path: 'profile',
            component: profile,
            meta: {
              title: '小米账号',
              auth: true
            }
          }
        ]
      }
    ],
  },
  {
    path: '/shop',
    component: shop,
    redirect: { path: '/shop/index' },
    children: [
      {
        path: 'index',
        component: shopMain,
        meta: {
          title: '小米商城'
        }
      }, {
        path: 'userCenter',
        component: userCenter,
        meta: {
        auth: true
        },
        children: [
          {
            path: 'portal',
            component: portal,
            meta: {
              title: '个人中心',
              auth: true
            },
          },
          {
            path: 'address',
            name: 'address',
            component: address,
            meta: {
              title: '收货地址',
              auth: true
            },
          },
          {
            path: 'favorite',
            name: 'favorite',
            component: favorite,
            meta: {
              title: '喜欢的商品',
              auth: true
            },
          },
          {
            path: 'orderList',
            name: 'orderList',
            component: order,
            meta: {
              title: '我的订单',
              auth: true
            },
          }
        ],
      },
      {
        path: 'productDetail',
        component: productDetail
      },
      {
        path: 'cart',
        component: cart,
        meta: {
          title: '我的购物车',
          auth: true
        }
      },
      {
        path: 'checkout',
        component: checkout,
        meta: {
          title: '结账',
          auth: true
        }
      }
    ],
  },
  {
    path: '/manageMent',
    component: manageLayout,
    redirect: '/manageMent/index',
    meta: {
      title: '管理首页',
      role: true,
    },
    children: [
      {
        path: 'index',
        component: manageIndex,
        meta: {
          title: '首页',
          role: true,
        }
      },
      {
        path: 'categoryManage',
        component: categoryManage,
        meta: {
          title: '分类管理',
          role: true,
        }
      },
      {
        path: 'userManage',
        component: userManage,
        meta: {
          title: '用户管理',
          role: true,
        }
      },
      {
        path: 'webSettings',
        component: webSetting,
        meta: {
          title: '网站设置',
          role: true,
        }
      },
      {
        path: 'goodsManage',
        component: goodsManage,
        meta: {
          title: '商品管理',
          role: true,
        }
      },
      {
        path: 'orderManage',
        component: orderManage,
        meta: {
          title: '订单管理',
          role: true,
        }
      },
      {
        path: 'addGoods',
        component: addGoods,
        meta: {
          title: '添加商品',
          role: true,
        }
      },
    ],
  },
  {
    path: '/agreement_en',
    component: agreement_en,
    meta: {
      title: 'Mi Account User Agreement'
    }
  },
  {
    path: '/agreement_zh',
    component: agreement_ch,
    meta: {
      title: '小米账号使用协议'
    }
  },
  {
    path: '/agreement_ja',
    component: agreement_ja,
    meta: {
      title: '小米アカウント使用プロトコル'
    }
  },
  {
    path: '/privacy_en',
    component: privacy_en,
    meta: {
      title: 'Xiaomi Privacy'
    }
  },
  {
    path: '/privacy_zh',
    component: privacy_zh,
    meta: {
      title: '小米账号隐私政策'
    }
  },
  {
    path: '/privacy_ja',
    component: privacy_ja,
    meta: {
      title: '小米アカウントプライバシーポリシー'
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

import { Message } from 'element-ui'

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  let userInfo = {}
  if (JSON.parse(sessionStorage.getItem('vuex'))){
    userInfo = JSON.parse(sessionStorage.getItem('vuex')).userInfo
  }
  if (to.meta.auth) {
    if (userInfo.username) {
      next();
    } else {
      router.push("/shop/index")
      Message({
        message: '请先登录',
        type: 'error',
        duration: 3 * 1000
      })
    }
  }

  if (to.meta.role) {
    if (userInfo.role === 'admin'){
      next()
    } else {
        Message({
          message: '你没有权限',
          type: 'error',
          duration: 3 * 1000
        })
      router.push('/shop/index')
    }
  }
  if (to.meta.title) {
    document.title = to.meta.title
    next()
  } else {
    next()
  }


})

export default router
