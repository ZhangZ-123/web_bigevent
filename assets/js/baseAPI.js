// 每次调用get post 或ajax 都会先调用 ajaxPrefilter函数

// 得到给ajax提供的配置对象

$.ajaxPrefilter(function(options){

options.url='http://api-breakingnews-web.itheima.net'+ options.url;
console.log(options.url);
})