<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">
      <el-button @click.stop="on_refresh" size="small">
        <i class="fa fa-refresh"></i>
      </el-button>
      <router-link :to="{name: 'productAdd'}" tag="span">
        <el-button type="primary" icon="plus" size="small">添加数据</el-button>
      </router-link>
    </panel-title>
    <div class="panel-body">
      <el-table :data="table_data" v-loading="load_data" element-loading-text="拼命加载中" border @selection-change="on_batch_select" style="width: 100%;">
        <el-table-column type="selection">
        </el-table-column>
        <el-table-column prop="id" label="id">
        </el-table-column>
        <el-table-column prop="price" label="价格">
        </el-table-column>
        <el-table-column prop="type" label="类型">
        </el-table-column>
  
        <el-table-column prop="discount" label="折扣">
        </el-table-column>
  
        <el-table-column prop="amount" label="数量">
  
        </el-table-column>
        <el-table-column prop="sort" label="排序">
        </el-table-column>
  
        <el-table-column label="操作" width="180">
          <template slot-scope="props">
              <router-link :to="{name: 'productUpdate', params: {id: props.row.id}}" tag="span">
                <el-button type="info" size="small" icon="edit">修改</el-button>
              </router-link>
              <el-button type="danger" size="small" icon="delete" @click="delete_data(props.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <bottom-tool-bar>
        <el-button
          type="danger"
          icon="delete"
          size="small"
          :disabled="batch_select.length === 0"
          @click="on_batch_del"
          slot="handler">
          <span>批量删除</span>
        </el-button>
        <div slot="page">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="length"
            layout="total, prev, pager, next"
            :total="total">
          </el-pagination>
        </div>
      </bottom-tool-bar>
    </div>
  </div>
</template>

<script type="text/javascript">
  import {
    panelTitle,
    bottomToolBar
  } from 'components'
  
  export default {
    data() {
      return {
        table_data: null,
        //当前页码
        currentPage: 1,
        //数据总条目
        total: 0,
        //每页显示多少条数据
        length: 30,
        //请求时的loading效果
        load_data: true,
        //批量选择数组
        batch_select: []
      }
    },
    components: {
      panelTitle,
      bottomToolBar
    },
    created() {
      this.get_table_data()
    },
    methods: {
      //刷新
      on_refresh() {
        this.get_table_data()
      },
      //获取数据
      get_table_data() {
        this.load_data = true
        this.$fetch.api_product.list({
            page: this.currentPage,
            length: this.length
          })
          .then(({
            data: {
              result,
              page,
              total
            }
          }) => {
            this.table_data = result
            this.total = total
            this.load_data = false
          })
          .catch(() => {
            this.load_data = false
          })
      },
      //单个删除
      delete_data(item) {
        this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => {
            this.load_data = true
            this.$fetch.api_product.del(item)
              .then(({
                msg
              }) => {
                this.get_table_data()
                this.$message.success(msg)
              })
              .catch(() => {})
          })
          .catch(() => {})
      },
      //页码选择
      handleCurrentChange(val) {
        this.currentPage = val
        console.log(this.currentPage)
        this.get_table_data()
      },
      on_batch_del(){

      },
      //批量选择
      on_batch_select(val) {
        this.batch_select = val
      },
      
    }
  }
</script>
