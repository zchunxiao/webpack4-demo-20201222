/* eslint-disable no-loop-func */
/* eslint-disable no-plusplus */
import './styles.css';
import axios from 'axios'
//import qs from 'qs'


var pageData = []
// eslint-disable-next-line max-statements
function component() {
  // 外层盒子
  var element = document.createElement('div');
  element.classList.add('main');
  element.id='main'

  // eslint-disable-next-line no-plusplus
  for (var i =0 ,len = 23; i < len; i++) {
     var bodyElement = document.createElement('div');
     bodyElement.id = `box${i+1}`;
     bodyElement.classList.add('box');
     bodyElement.classList.add(`box${i+1}`);
     element.appendChild(bodyElement);
  }
  return element;
}




// 请求拦截
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  return Promise.resolve(config)
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});


// 响应拦截
axios.interceptors.response.use((response)=>Promise.resolve(response.data),err=>{
  console.log('err:',err)
})




// const data = {
//   "__limit": 50,
//   "__page": 1,
//   "__sidx": "createTime", 
//   "__order": "desc",
//   "tableName":"", 
//   "tableComment":"", 
//   "startTime": "", 
//   "endTime": ""
// }


// var config1= {
//   url:'/api/esthesia/web/app/v5/pageIndex',
//   method:'post',
//   data,
// }
// axios(config1);


var config= {
  url:'/dcs/sys/config/infos',
  method:'post',
  headers: {
     'content-type': 'application/x-www-form-urlencoded',
     'X-CSRF-Token': 'M2EyOGY4ZWU4ZjllZTUzNA==NmU4MDIxNmRlMTA0NDc0N2JiYmVlMTVkNTBkNDUxYWM=',
     'X-Requested-With': 'XMLHttpRequest'
    },
   //data: qs.stringify(data)
}

// eslint-disable-next-line consistent-return
axios(config).then(res=>{
  const { msg,data } = res;

  // eslint-disable-next-line eqeqeq
  if (msg != 'SUCCESS') {
    return false
  }

  if (data.length > 0) {
    pageData = data;
    // eslint-disable-next-line no-use-before-define
   // createMask(data,0)  
  }
});





// 初始化渲染遮罩
function createMask(maskData,showIndex) {
  var list = maskData[showIndex];
  var mask = document.createElement('div');
  console.log('list.paramName',showIndex,list.paramName)
  mask.classList.add('mask');
  mask.id = 'mask';
  mask.innerHTML = `<h1>1111<p>${list.paramName}</p></h1>`
  document.body.appendChild(mask);
}



document.body.appendChild(component());



// 执行格式鼠标移入事件
// eslint-disable-next-line no-empty
var btn= document.getElementsByClassName('box'),
   // eslint-disable-next-line block-scoped-var
   l= btn.length;
//eslint-disable-next-line block-scoped-var
for (var j =0; j < l; j++) {
  (
    function(i) {
      document.getElementById(`box${i+1}`).onmouseenter = function() {
        createMask(pageData,i)  
        document.getElementById("mask").className = `mask mask${i+1}`
      }
      document.getElementById(`box${i+1}`).onmouseleave = function() {
        var box=document.getElementById("mask");
        box.parentNode.removeChild(box);
      }
    }(j))
}



