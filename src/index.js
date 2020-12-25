/* eslint-disable multiline-ternary */
/* eslint-disable no-loop-func */
/* eslint-disable no-plusplus */
import './styles.css';
import axios from 'axios'
import "@babel/polyfill";


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



var config= {
  url:'/dcs/api/device/getInfos',
  method:'get',
  headers: {
     //'content-type': 'application/x-www-form-urlencoded',
     //'X-CSRF-Token': 'M2EyOGY4ZWU4ZjllZTUzNA==NmU4MDIxNmRlMTA0NDc0N2JiYmVlMTVkNTBkNDUxYWM=',
     //'X-Requested-With': 'XMLHttpRequest'
    },
   //data: qs.stringify(data)
}

// eslint-disable-next-line consistent-return
axios(config).then(res=>{
  const { msg,devInfoVo } = res;
  // eslint-disable-next-line eqeqeq
  if (msg != 'SUCCESS') {
    return false
  }

  if (devInfoVo.length > 0) {
    pageData = devInfoVo;
  }

});


// 维护设备信息
var m = new Map();
m.set('0','振动给料机');
m.set('1','皮带输送机1');
m.set('2','皮带输送机2');
m.set('3','二级振动筛');
m.set('4','破碎机');
m.set('5','一级振动筛');
m.set('6','一级铅栅螺旋');
m.set('7','二级铅栅螺旋');
m.set('8','压滤机');
m.set('9','刮板输送机');
m.set('10','滤液输送泵');
m.set('11','滤液罐');
m.set('12','铅泥输送泵');
m.set('13','铅泥罐搅拌机');
m.set('14','铅泥罐');
m.set('15','铅泥沉淀机液下泵1');
m.set('16','铅泥沉淀机液下泵2');
m.set('17','铅泥沉淀机');
m.set('18','酸液循环泵'); 
m.set('19','酸液循环稀泥泵');
m.set('20','循环罐搅拌机');
m.set('21','循环罐');
m.set('22','循环水池液下泵');

// 转换True False
function format(value) {
  if (value === 'True') {
    return '是'
  } else if (value === 'False') {
    return '否'
  } 
  return value;
  
  
}



// 初始化渲染遮罩
function createMask(list,title) {
  var mask = document.createElement('div');
  const info = list.map((i)=>`<p>${i.name}:${format(i.value)}</p>`).join('');
  mask.classList.add('mask');
  mask.id = 'mask';
  mask.innerHTML = `<div class='mask-content'><p class='title'>设备名称:${title}</p>${info}</div>`
  document.body.appendChild(mask);
}


// 根据设备名称获取设备信息
function getInfo(data,name) {
  var num = data.filter((item)=>item.name === name)
  // eslint-disable-next-line max-statements-per-line
  if (num.length === 0) {
    return false;
  }
  return num[0].plcParamInfoVoList
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
      document.getElementById(`box${i+1}`).onmouseenter = ()=>{
        var tempList = getInfo(pageData,m.get(`${i}`)); 
        createMask(tempList,m.get(`${i}`)) 
        document.getElementById("mask").className = `mask mask${i+1}`
      }
      document.getElementById(`box${i+1}`).onmouseleave = ()=>{
        var box=document.getElementById("mask");
        box.parentNode.removeChild(box);
      }
    }(j))
}



