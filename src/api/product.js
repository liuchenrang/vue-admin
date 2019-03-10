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
import {port_product} from '../common/port_uri'
//数据列表
export function list(params) {
  return fetch({
    url: port_product.list,
    method: 'get',
    params
  })
}

//根据id查询数据
export function get(params) {
  return fetch({
    url: port_product.get + "/" + params['id'],
    method: 'get',
    params
  })
}

//根据id删除数据
export function del(data) {
  return fetch({
    url: port_product.del + "/" + data['id'],
    method: 'delete',
    data
  })
}
//添加或修改数据
export function save(data) {
  let method = ''
  let url
  if("id" in data) {
    method = "put"
     url = port_product.save + "/" + data['id']
  }else{
    method = "post"
     url = port_product.save
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
    url: port_product.batch_del,
    method: 'delete',
    data
  })
}

