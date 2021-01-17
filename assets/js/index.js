$(function(){
    getUserinfo();

    var layer = layui.layer;
    $("#bunLogout").on('click',function(){
        // 提示用户是否退出
        layer.confirm('确定退出登录?', {icon: 8, title:'提示'}, 
            function(index){
                //do something
                // 清除本地存储
                localStorage.removeItem('token');
                // 页面退回到登录页面
                location.href = '/login.html';
                // 关闭询问框
                layer.close(index);
            });
    })


function getUserinfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        // headers:{   baseAPI.js中添加了请求 此处可以省略不写
        //     Authorization: localStorage.getItem("token") || ''
        // },
        success:function(res){
            console.log(res);
            if(res.status !== 0){
                return layui.layer.msg(res.message);
            }
            renderAvtar(res.data);
            
        },
        // 无论成功或是失败都会调用complete回调函数   baseAPI.js中添加了
        // complete: function(res){
        //     console.log(res);
        //     if(res.responseJSON.status === 1&& res.responseJSON.message === '身份验证失败'){
        //         localStorage.removeItem('token');
        //         location.href = '/login.html';
        //     }
        // }

    })
}
 //渲染用户信息
    function renderAvtar(txt){
        var uname = txt.username;
        //如果有昵称则显示昵称，没有则显示登陆名
            var names = txt.nickname || txt.username;
            $("#welcome").html("欢迎"+names);
            uname = names[0].toUpperCase();
            if(txt.user_pic === null) {
                $(".userinfo img").hide();
                $(".userinfo .text-avatar").html(uname);
            }else if(txt.user_pic !== null){
                $(".userinfo img").attr('src',txt.user_pic).show();
                $('.text-avatar').hide();
            }
    }

})