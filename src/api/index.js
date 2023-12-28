import request from '@/utils/request';
export function getcalendar() {
  return request({
    url: '/api/getcalendar',
    method: 'post',
  })
}
export function addcalendar(data) {
  return request({
    url: '/api/addcalendar',
    method: 'post',
    data
  })
}
export function editcalendar(data) {
  return request({
    url: '/api/editcalendar',
    method: 'post',
    data
  })
}
export function delcalendar(data) {
  return request({
    url: '/api/delcalendar',
    method: 'post',
    data
  })
}