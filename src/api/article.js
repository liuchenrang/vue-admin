/**
 * @file: table.
 * @intro: table请求数据配置.
 * @author: zzmhot.
 * @email: zzmhot@163.com.
 * @Date: 2017/5/8 15:25.
 * @Copyright(©) 2017 by thinkive.
 *
 */
import qs from 'qs'
import fetch from '../common/fetch'
let model = "article";
 let list = "/api/" + model
let get = "/api/" + model
let save = "/api/" + model
let del = "/api/" + model
let update = "/api/" + model

//数据列表
export function list(params) {
  return fetch({
    url: list,
    method: 'get',
    params
  })
}

//根据id查询数据
export function get(params) {
  let id = params["id"]
  delete params["id"];
  return fetch({
    url: get + "/" + id,
    method: 'get',
    params
  })
}

//根据id删除数据
export function del(data) {
  return fetch({
    url: del + "/" + data['id'],
    method: 'delete',
    data
  })
}
//添加或修改数据
export function save(data) {
  let method = ''
  let url = '';
  if("id" in data && data.id > 0) {
    method = "put"
    url = save + "/" + data['id']
  }else{
    method = "post"
    url = save
  }
  return fetch({
    url: url,
    method: method,
     data
  })
}
//批量删除
export function batch_del(data) {
  return fetch({
    url: batch_del,
    method: 'delete',
    data
  })
}

