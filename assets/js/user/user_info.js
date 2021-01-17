$(function(){
    var form = layui.form;

    form.verify({
         nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！';
            }
        }
    })

    var layer = layui.layer;
    initUserInfo();
    function initUserInfo(){
        $.ajax({
            method:"GET",
            url:'/my/userinfo',
            success:function(res){
                if(res.status !== 0){
                    return layer.msg(res.message);
                }
                // console.log(res);
                // $("#username").val(res.data.username);
                form.val('formUserInfo',res.data);// 自动匹配 和name相同的 res.data里的值
            }
        })
    }

    $("#btnRest").on('click',function(e){
        e.preventDefault();
        initUserInfo();
    })

    $(".layui-form").submit(function(e){
        e.preventDefault();
        $.ajax({
            method:'post',
            url:'/my/userinfo',
            data: $(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                layer.msg('更新信息成功');
                window.parent.getUserinfo();// 调用父页面里的函数 index.html页面里的
            }
        })
    })


})