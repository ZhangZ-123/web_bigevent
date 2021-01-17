// 每次调用get post 或ajax 都会先调用 ajaxPrefilter函数

// 得到给ajax提供的配置对象

$.ajaxPrefilter(function(options){

    options.url='http://api-breakingnews-web.itheima.net'+ options.url;
    // console.log(options.url);

    // 统一为有权限的接口，设置headers请求头  请求接口有my的 才设置请求头
    if(options.url.indexOf('/my/') !== -1){
        options.headers = {
            Authorization: localStorage.getItem("token") || ''
        }
    }

    // 统一挂载complete回调函数
    options.complete = function(res){
         if(res.responseJSON.status === 1&& res.responseJSON.message === '身份验证失败'){
                localStorage.removeItem('token');
                location.href = '/login.html';
            }
    }


})