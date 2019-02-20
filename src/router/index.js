/**
 * Created by zzmhot on 2017/3/23.
 *
 * 路由Map
 *
 * @author: zzmhot
 * @github: https://github.com/zzmhot
 * @email: zzmhot@163.com
 * @Date: 2017/3/23 18:30
 * @Copyright(©) 2017 by zzmhot.
 *
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import store from 'store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

//import components
//view page warp component
import viewPageComponent from 'pages/App'

//home
import homeComponent from 'pages/home'
//404
import noPageComponent from 'pages/error/404'
//login
import loginComponent from 'pages/user/login'
//base table
import baseTableComponent from 'pages/table/base'
//sort table
import sortTableComponent from 'pages/table/sort'
//save table
import saveTableComponent from 'pages/table/save'
//bar charts
import barChartsComponent from 'pages/charts/bar'

import linkTableComponent from 'pages/link/base'
import saveLinkComponent from 'pages/link/save'

import siteTableComponent from 'pages/site/base'
import saveSiteComponent from 'pages/site/save'
import productTableComponent from 'pages/product/base'
import saveProductComponent from 'pages/product/save'

import articleTableComponent from 'pages/article/base'
import editArticleComponent from 'pages/article/save'




Vue.use(VueRouter)

//使用AMD方式加载
// component: resolve => require(['pages/home'], resolve),
const routes = [{
  path: '/404',
  name: 'notPage',
  component: noPageComponent
}, {
  path: '*',
  redirect: '/404'
}, {
  path: '/user/login',
  name: 'login',
  component: loginComponent
}, {
  path: '/',
  redirect: '/home',
  component: viewPageComponent,
  children: [{
    path: '/home',
    name: 'home',
    component: homeComponent,
    meta: {
      title: "主页",
      auth: true
    }
  }, {
    path: '/table/base',
    name: 'tableBase',
    component: baseTableComponent,
    meta: {
      title: "基本表格",
      auth: true
    }
    }, {
      path: '/product/base',
      name: 'tableProduct',
      component: productTableComponent,
      meta: {
        title: "产品列表",
        auth: true
      }
    }, {
      path: '/product/add',
      name: 'productAdd',
      component: saveProductComponent,
      meta: {
        title: "新增产品",
        auth: true
      }
    }
    , {
      path: '/article/base',
      name: 'article',
      component: articleTableComponent,
      meta: {
        title: "列表",
        auth: true
      }
    }, {
      path: '/article/add',
      name: 'articleEdit',
      component: editArticleComponent,
      meta: {
        title: "新增产品",
        auth: true
      }
    }
    , {
      path: '/article/update/:id',
      name: 'articleUpdate',
      component: editArticleComponent,
      meta: {
        title: "编辑产品",
        auth: true
      }
    }
  ,{
    path: '/product/update/:id',
    name: 'productUpdate',
    component: saveProductComponent,
    meta: {
      title: "编辑产品",
      auth: true
    }
  }
  ,{
    path: '/site/base',
    name: 'tableSite',
    component: siteTableComponent,
    meta: {
      title: "网站列表",
      auth: true
    }
  }, {
    path: '/site/update/:id',
    name: 'siteUpdate',
    component: saveSiteComponent,
    meta: {
      title: "网站修改",
      auth: true
    }
  },{
    path: '/link/base',
    name: 'tableLink',
    component: linkTableComponent,
    meta: {
      title: "友情链接",
      auth: true
    }
  }, {
    path: '/link/add',
    name: 'linkAdd',
    component: saveLinkComponent,
    meta: {
      title: "新建链接",
      auth: true
    }
  }, {
    path: '/table/sort',
    name: 'tableSort',
    component: sortTableComponent,
    meta: {
      title: "排序表格",
      auth: true
    }
  }, {
    path: '/table/update/:id',
    name: 'tableUpdate',
    component: saveTableComponent,
    meta: {
      title: "数据修改",
      auth: true
    }
  }, {
    path: '/table/add',
    name: 'tableAdd',
    component: saveTableComponent,
    meta: {
      title: "添加数据",
      auth: true
    }
  }, {
    path: '/charts/bar',
    name: 'chartsBar',
    component: barChartsComponent,
    meta: {
      title: "柱状图表",
      auth: true
    }
  }]
}]

const router = new VueRouter({
  routes,
  mode: 'hash', //default: hash ,history
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
})

//全局路由配置
//路由开始之前的操作
router.beforeEach((to, from, next) => {
  NProgress.done().start()
  let toName = to.name
  // let fromName = from.name
  let is_login = store.state.user_info.login

  if (!is_login && toName !== 'login') {
    next({
      name: 'login'
    })
  } else {
    if (is_login && toName === 'login') {
      next({
        path: '/'
      })
    } else {
      next()
    }
  }
})

//路由完成之后的操作
router.afterEach(route => {
  NProgress.done()
})

export default router
