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
import fetch from 'common/fetch'
import {link_list} from 'common/port_uri'
//数据列表
export function list(params) {
  return fetch({
    url: link_list.list,
    method: 'get',
    params
  })
}

//根据id查询数据
export function get(params) {
  return fetch({
    url: link_list.get,
    method: 'get',
    params
  })
}

//根据id删除数据
export function del(data) {
  return fetch({
    url: link_list.del,
    method: 'post',
    data
  })
}
//添加或修改数据
export function save(data) {
  return fetch({
    url: link_list.save,
    method: 'post',
     data
  })
}
//批量删除
export function batch_del(data) {
  return fetch({
    url: link_list.batch_del,
    method: 'post',
    data
  })
}

