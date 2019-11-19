import request from '@/utils/request'

// var baseURL='http://192.168.1.128:5000/'
var baseURL='https://rate.iasac.org.cn/api/'

export function login(data) {
  return request({
    url: baseURL+'account/login',
    method: 'post',
    data
  })
}

export function taskInfo(data) {
  return request({
    url: baseURL+'common/task/info',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: baseURL+'account/logout',
    method: 'post'
  })
}

export function getList(data) {
  return request({
    url: baseURL+'judge/task/list',
    method: 'post',
    data
  })
}