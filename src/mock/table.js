/**
 * Created by zzmhot on 2017/3/24.
 *
 * @author: zzmhot
 * @github: https://github.com/zzmhot
 * @email: zzmhot@163.com
 * @Date: 2017/3/24 16:50
 * @Copyright(©) 2017 by zzmhot.
 *
 */

//获取url参数
const parseQueryString = (url) => {
  var reg_url = /^[^\?]+\?([\w\W]+)$/,
    reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g,
    arr_url = reg_url.exec(url),
    ret = {}
  if (arr_url && arr_url[1]) {
    var str_para = arr_url[1], result;
    while ((result = reg_para.exec(str_para)) != null) {
      ret[result[1]] = result[2]
    }
  }
  return ret
}

import Mock from 'mockjs'
import {port_code, port_table, link_list} from 'common/port_uri'

// 姓名	性别	年龄	生日	地址

const data_list = [{
  'id|10-100': 1,
  'name': '@cname',
  'sex': '@pick([1, 2])',//1男，2女
  'age|20-25': 20,
  'birthday': '@date("yyyy-MM-dd")',
  'address': '@county(true)',
  'zip': '@zip'
}]

Mock.mock(new RegExp(port_table.list), ({url}) => {
  const params = parseQueryString(url)
  return Mock.mock({
    code: port_code.success,
    msg: '获取成功',
    data: {
      [`result|${params.length}`]: data_list,
      page: Number.parseInt(params.page),
      'total': 200
    }
  })
})
// Mock.mock(new RegExp(link_list.list), ({url}) => {
//   const params = parseQueryString(url)
//   return {"succ":true,"code":0,"msg":"","data":{"result":[{"id":4,"title":"1","url":"1","cover":"","description":null,"sort":20,"createdAt":null,"updatedAt":null},{"id":3,"title":"123","url":"123","cover":"123","description":null,"sort":20,"createdAt":null,"updatedAt":null},{"id":2,"title":"title","url":"http://www.baidu.com","cover":"cover","description":"desp","sort":1,"createdAt":1528203798000,"updatedAt":1528203798000}],"total":3,"page":1}}
// })

Mock.mock(new RegExp(port_table.get), {
  code: port_code.success,
  msg: '获取成功',
  data: data_list[0]
})

Mock.mock(new RegExp(port_table.del), {
  code: port_code.success,
  msg: '删除成功'
})

Mock.mock(new RegExp(port_table.save), {
  code: port_code.success,
  msg: '操作成功'
})

Mock.mock(new RegExp(port_table.batch_del), {
  code: port_code.success,
  msg: '批量删除成功'
})
