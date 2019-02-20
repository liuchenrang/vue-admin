<template>
  <div class="left-side">
    <div class="left-side-inner">
      <router-link to="/" class="logo block">
        <img src="./images/logo.png" alt="AdminX">
      </router-link>
      <el-menu
        class="menu-box"
        theme="dark"
        router
        :default-active="$route.path">
        <div
          v-for="(item, index) in nav_menu_data"
          :key="index">
          <el-menu-item
            class="menu-list"
            v-if="typeof item.child === 'undefined'"
            :index="item.path">
            <i class="icon fa" :class="item.icon"></i>
            <span v-text="item.title" class="text"></span>
          </el-menu-item>
          <el-submenu
            :index="item.path"
            v-else>
            <template slot="title">
              <i class="icon fa" :class="item.icon"></i>
              <span v-text="item.title" class="text"></span>
            </template>
            <el-menu-item
              class="menu-list"
              v-for="(sub_item, sub_index) in item.child"
              :index="sub_item.path"
              :key="sub_index">
              <!--<i class="icon fa" :class="sub_item.icon"></i>-->
              <span v-text="sub_item.title" class="text"></span>
            </el-menu-item>
          </el-submenu>
        </div>
      </el-menu>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default{
    name: 'slide',
    data(){
      return {
        nav_menu_data: [{
          title: "主页",
          path: "/link/base",
          icon: "fa-home"
        }, {
          title: "网站管理",
          path: "/site",
          icon: "fa-table",
          child: [{
            title: "全部",
            path: "/site/base"
          }]
        }, {
          title: "商品管理",
          path: "/product",
          icon: "fa-table",
          child: [{
            title: "列表",
            path: "/product/base"
          },{
            title: "新增",
            path: "/product/add"
          }]
        }
        , {
          title: "文章管理",
          path: "/article",
          icon: "fa-table",
          child: [{
            title: "列表",
            path: "/article/base"
          },{
            title: "新增",
            path: "/article/add"
          }]
        }
        , {
          title: "友情链接",
          path: "/link",
          icon: "fa-table",
          child: [{
            title: "列表",
            path: "/link/base"
          },{
            title: "新增",
            path: "/link/add"
          }]
        }
        , {
          title: "图表管理",
          path: "/charts",
          icon: "fa-bar-chart-o",
          child: [{
            title: "柱状图表",
            path: "/charts/bar"
          }]
        }]
      }
    }
  }
</script>
