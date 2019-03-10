<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body" v-loading="load_data" element-loading-text="拼命加载中">
      <el-row>
        <el-col :span="8">
          <el-form ref="form" :model="form" :rules="rules" label-width="100px">
         
               <el-form-item label="标题:" prop="title">
              <el-input v-model="form.title" placeholder="请输入内容" style="width: 250px;"></el-input>
            </el-form-item>
          
             <el-form-item label="封面图片" prop="img">
              <el-input v-model="form.img" placeholder="请输入内容" style="width: 550px;"></el-input>
            </el-form-item>
            <el-form-item label="内容:" prop="content" style="width: 800px;">
              <el-row>
                <el-col :span="24"> <div ref="editor" style="text-align:left;z-index:1" ></div></el-col>
              </el-row>
               
            </el-form-item>
          
            <el-form-item label="发布时间:" prop="publish_at">
                <el-date-picker 
                  v-model="form.publishAt"
                  align="right"
                  type="datetime"
                  placeholder="选择日期"
                  :picker-options="pickerOptions1">
                </el-date-picker >
            </el-form-item>
            <el-form-item label="转载:" prop="originUrl">
              <el-input v-model="form.originUrl" placeholder="请输入内容" style="width: 550px;"></el-input>
            </el-form-item>
            <el-form-item label="SEO-URL:" prop="slug">
              <el-input v-model="form.slug" placeholder="请输入内容" style="width: 250px;"></el-input>
            </el-form-item>
             <el-form-item label="分类:" prop="cate_id">
                 <el-select v-model="form.cateId" placeholder="请选择">
                    <el-option
                      v-for="item in cates"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
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
  import {
    panelTitle
  } from 'components'
  import E from 'wangeditor'
  var editor;
  export default {
    name: 'editor',
    data() {
      return {
        
        form: {
          id: 0,
          cateId: "",
          originUrl: "",
          publishAt: 20,
          content: "",
          slug: "",
          title: "",
        },
        route_id: this.$route.params.id,
        load_data: false,
        on_submit_loading: false,
        rules: {
          "form.title": [{
            required: true,
            message: '名称不能为空',
            trigger: 'blur'
          }],
          "form.content": [{
            required: true,
            message: '内容不能为空',
            trigger: 'blur'
          }]
        },
        cates: [{
          value: 2,
          label: '搜索优化'
        },{
          value: 1,
          label: '站长工具'
        }],
       pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
      }
    },
    created() {
      this.route_id && this.get_form_data()
     
    },
    mounted() {
      let that = this
      editor = new E(this.$refs.editor)
      editor.customConfig.zIndex = 100
      editor.customConfig.onchange = (html) => {
        that.form.content = html
      }
      editor.create()
    },
    methods: {
      //获取数据
      get_form_data() {
        this.load_data = true
        let api = this.$fetch.api_article
        api.get({
            id: this.route_id
          })
          .then(({
            data
          }) => {
            this.form = data
            editor.txt.html(this.form.content)
            this.load_data = false
          })
          .catch(() => {
            this.load_data = false
          })
      },
   
      //提交
      on_submit_form() {
        this.$refs.form.validate((valid) => {
          if (!valid) return false
          this.on_submit_loading = true
          let api = this.$fetch.api_article
          console.log(this.form)
          api.save(this.form)
            .then(({
              msg
            }) => {
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
<style>
.w-e-text-container{
   z-index: 99 !important;

}
</style>
