<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body"
         v-loading="load_data"
         element-loading-text="拼命加载中">
      <el-row>
        <el-col :span="8">
          <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="名称:" prop="title">
              <el-input v-model="form.title" placeholder="请输入内容" style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item label="网址:" prop="url">
              <el-input v-model="form.url" placeholder="请输入内容" style="width: 250px;"></el-input>
            </el-form-item>
             <el-form-item label="排序:" prop="sort">
              <el-input v-model="form.sort" placeholder="请输入内容" style="width: 250px;"></el-input>
            </el-form-item>
             <el-form-item label="描述:" prop="description">
              <el-input v-model="form.description" placeholder="请输入内容" style="width: 250px;"></el-input>
            </el-form-item>
           
             <el-form-item label="封面:" prop="cover">
              <el-input v-model="form.cover" placeholder="请输入内容" style="width: 250px;"></el-input>
            </el-form-item>
           
            
          
          
            <el-form-item>
              <el-button type="primary" @click="on_submit_form" :loading="on_submit_loading">立即提交</el-button>
              <el-button @click="$router.back()">取消</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {panelTitle} from 'components'

  export default{
    data(){
      return {
        form: {
          title: "",
          url: "",
          sort: 20,
          description: "",
          cover: ""
        },
        route_id: this.$route.params.id,
        load_data: false,
        on_submit_loading: false,
        rules: {
          title: [{required: true, message: '名称不能为空', trigger: 'blur'}]
        }
      }
    },
    created(){
      this.route_id && this.get_form_data()
    },
    methods: {
      //获取数据
      get_form_data(){
        this.load_data = true
        this.$fetch.api_link.get({
          id: this.route_id
        })
          .then(({data}) => {
            this.form = data
            this.load_data = false
          })
          .catch(() => {
            this.load_data = false
          })
      },
      //时间选择改变时
      on_change_birthday(val){
        this.$set(this.form, 'birthday', val)
      },
      //提交
      on_submit_form(){
        this.$refs.form.validate((valid) => {
          if (!valid) return false
          this.on_submit_loading = true
          this.$fetch.api_link.save(this.form)
            .then(({msg}) => {
              this.$message.success(msg)
              setTimeout(this.$router.back(), 500)
            })
            .catch(() => {
              this.on_submit_loading = false
            })
        })
      }
    },
    components: {
      panelTitle
    }
  }
</script>
