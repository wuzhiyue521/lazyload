/**
 * 1. 方法一: 自己封装 懒加载
 *
 * 1. 当我们的图片进入可视区域之后, 去请求资源
 * 2. 需要去监听 scroll 事件, 在 scroll 事件的回调中, 去判断我们的懒加载图片是否进入可视区域 。
 * 3. 什么是可视区域(手机屏幕的高度):
 *    1. **document.documentElement.clientHeight**
 * 4. 当前图片相对于当前屏幕的左上角的位置 ** item.getBoundingClientRect().top **, 也就是图片上边缘 top 的情况, 以及手机屏幕 height 的情况; 当图片上边缘的 top 小于手机屏幕 height 的时候, 这个时候我们就可以判断已经进入可视区域了 。
 * 5. 懒加载还需要注意一点, 需要有一个占位
 *    1. 什么叫占位: 图片的大小在事件触发之前必须要确定下来;
 *    2. 原因就是 ** getBoundingClientRect ** 实际上是在图片本身还没有下载下来之前, 就已经去做的 。
 *    3. 如果不设置高度, 那么图片的懒加载就无法实现 。
 */

var viewHeight = document.documentElement.clientHeight // 可视区域的高度
function lazyload () {
  // 获取元素
  // document.querySelectorAll() 返回的并不是我们想当然的数组, 而是 NodeList, 对 NodeList, 它里面没有 .forEach() 方法 。
  var eles = document.querySelectorAll('img[data-original][lazyload]')
  console.log('11111: ', eles);
  // [].forEach.call() == Array.prototype.forEach.call()  (  [1,2,3].forEach(function (num) { console.log(num); })  )
  // [] 就是个数组, 而且是用不到的空数组 。 目的就是为了访问它的数组相关方法, 比如 .forEach; 这是一种简写; 完整的写法就是 Array.prototype.forEach.call() 。
  // [].forEach.call() 是一种快速访问 forEach 的方法, 并将空数组的 this 换成想要遍历的 list 。
  // forEach 方法, 它可以接受一个函数参数 。
  Array.prototype.forEach.call(eles, function (item, index) {
    var rect
    /**
     * 1. dataset:
     *    1. dataset 属性用来管理 HTML 元素自定义属性 。
     *    2. 仅对符合 HTML5 规范, 通过 data-* 语法格式规定的自定义属性有效 。
     */
    if (item.dataset.original === '')
      return
    rect = item.getBoundingClientRect()

    if (rect.bottom >= 0 && rect.top < viewHeight) {
      /**
       * 1. !function 跟 (function(){... })(); 函数意义相同, 叫做立即运行的匿名函数(也叫立即调用函数) 。
       *    1. !function(){}() 这种写法, 是一种立即执行函数的写法, 即 IIFE 等设计模式; 这种函数在函数定义的地方就直接执行了 。
       * 2. js 中可以这样创建一个匿名函数:
       *    1. (function(){do something...})()
       *    2. (function(){do something...}())
       */
      !function () {
        /**
         * 1. new Image(): 建立图像对象
         * 2. 图像对象的属性: border complete height hspace lowsrc name src vspace width
         * 3. 图像对象的事件: onabort onerror onkeydown onkeypress onkeyup onload
         * 4. 需要注意的是: src 属性一定要写到 onload 的后面，否则程序在 IE 中会出错。
         */
        var img = new Image()
        img.src = item.dataset.original
        img.onload = function () {
          item.src = img.src
        }
        /**
         * 1. removeAttribute() 方法删除指定的属性。
         * 2. 此方法与 removeAttributeNode() 方法的差异是: removeAttributeNode() 方法删除指定的 Attr 对象, 而 removeAttribute() 此方法删除具有指定名称的属性, 结果是相同的; 同时此方法不返回值, 而 removeAttributeNode() 方法返回被删除的属性, 以 Attr 对象的形式 。
         */
        item.removeAttribute('data-original')
        item.removeAttribute('lazyload')
      }()
    }
  })
}
lazyload()
document.addEventListener('scroll', lazyload)
// document.addEventListener('scroll', function (params) {
//   setTimeout(() => {
//     lazyload()
//   }, 2000);
// })





// /**
//  * 1. 方法二: 使用 zepto -> zepto.lazyload.js 懒加载
//  */
// $('img[data-original][lazyload]').lazyload()