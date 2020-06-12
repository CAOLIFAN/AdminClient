import qs from 'qs'
import { message } from 'antd'
import axios from 'axios'

axios.interceptors.request.use(function (config) {
    
  const { method, data } = config
  if (method.toLowerCase() === 'post' && typeof data === 'object' ) {
    config.data = qs.stringify(data)
  }
    return config;
});

axios.interceptors.response.use(function (response) {
  
  return response.data;
}, function (error) {
  message.error('请求出错 ' + error.message)
  return new Promise(() => {})
});

export default axios