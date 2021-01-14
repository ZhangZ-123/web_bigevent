$(function(){
    // console.log(12);
    $("#link_reg").on("click",function(){
        
        $(".login-box").hide();
        $(".reg-box").show();
    })
    $("#link_login").on("click",function(){
        $(".login-box").show();
        $(".reg-box").hide();
    });

    // layui中获取form 自定义验证规则
    var form = layui.form;
    form.verify({
        pwd:[/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
        repwd:function(value){
          var pwd = $(".reg-box [name=password]").val();
          if(pwd !== value){
              return '两次密码不一致'
          }
        }
    });

    // 监听注册额表单
    $("#form_reg").on("submit",function(e){
       e.preventDefault();
       var data = {
            username:$("#form_reg [name=username]").val(),
            password:$("#form_reg [name=password]").val()
       }
        $.post('/api/reguser',data,function(res){
           console.log(res);
            if(res.status !== 0){
                return layer.msg(res.message)
            }
            
            layer.msg(res.message)
            $("#link_login").click();
        })
    });

    // 登录表单
    $("#form_login").submit(function(e){
        e.preventDefault();
        
        $.ajax({
            method: 'POST',
            url:'/api/login',
            data: $(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg("登录失败")
                }
                layer.msg("登录成功");
                //将登录成功产生的 token值存到本地存储
                localStorage.setItem('token',res.token);
                location.href = '/index.html';
            }
        })
    })
})