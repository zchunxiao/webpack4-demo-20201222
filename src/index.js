import { cube } from './math.js';
import './styles.css';
import axios from 'axios'


//任何位于 /src 的本地代码都可以关联到 process.env.NODE_ENV 环境变量
if (process.env.NODE_ENV !== 'production') {
     console.log('Looks like we are in development mode!');
 }

function component() {
  var element = document.createElement('pre');
  element.innerHTML = [
          'Hello webpack!',
          '5 cubed is equal to ' + cube(5)
        ].join('\n\n');

  return element;
}

console.log('axios.CancelToken:',axios.CancelToken.source());

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 请求拦截
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  console.log('开始发送请求',config);
  return Promise.resolve(config)
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});


// 响应拦截
axios.interceptors.response.use((response)=>{
  console.log('响应成功:',response)
  return Promise.resolve(response)
},err=>{
  console.log('err:',err)
})





// axios.post('/api/esthesia/web/app/v5/pageIndex',{a:1,b:2})
//   .then(function (response) {
//     // handle success
//     console.log('请求成功的数据:',response);
//   })
import qs from 'qs';
const data = { 'bar': 123,"c":2,"d":3 };
const d = "name=zang&age=12"
console.log('data:',data);
console.log('data1:',qs.stringify(data),qs.parse())
var config= {
  url:'/api/esthesia/web/app/v5/pageIndex',
  method:'post',
  // headers: { 'content-type': 'application/x-www-form-urlencoded' },
  // data: qs.stringify(data),
  data,
}

axios(config);

document.body.appendChild(component());
  

