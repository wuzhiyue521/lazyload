/**
 * 1. 预加载的第一种实现方式
 *    1. 设置 display 属性值:  display: none;
 *    <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2124150283,1686567165&fm=15&gp=0.jpg" style="display: none" />
 *
 */

/**
 * 2. 预加载 的第二种实现方式
 */
// 使用 Image 对象
// var image = new Image()
// image.src = "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2124150283,1686567165&fm=15&gp=0.jpg"



/**
 * 3. 预加载的第三种实现方式
 *
 * 1. 会有跨域问题 。
 * 2. 可以更精细的控制预加载的过程 。
 */
// // 使用 XMLHttpRequest 对象
// var xmlhttprequest = new XMLHttpRequest();

// xmlhttprequest.onreadystatechange = callback;

// xmlhttprequest.onprogress = progressCallback;

// xmlhttprequest.open("GET","http://image.baidu.com/mouse.jpg",true);

// xmlhttprequest.send();

// function callback () {
//   if (xmlhttprequest.readyState == 4 && xmlhttprequest.status==200){
//     var responseText = xmlhttprequest.responseText;
//   }else{
//     console.log("Request was unsuccessful: " + xmlhttprequest.status);
//   }
// }

// function progressCallback (e) {
//   e = e || event;
//   if (e.lengthComputable){
//       console.log("Received " + e.loaded + " of " + e.total + " bytes")
//   }
// }



/**
 * 4. 预加载的第四种实现方式
 *    1. 使用插件 preload.js 实现预加载
 *       <script src="./src/js/preload.min.js"></script>
 */
var queue = new createjs.LoadQueue(false);

queue.on("complete", handleComplete, this);

queue.loadManifest([
  {id: "myImage", src:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2124150283,1686567165&fm=15&gp=0.jpg"},
  {id: 'myImage2', src:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=673529491,3736296165&fm=26&gp=0.jpg"}
]);

function handleComplete() {
  var image = queue.getResult("myImage");
  document.body.appendChild(image);
}