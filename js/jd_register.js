/**
 * Created by tarena on 2011/10/31.
 */
/*  连接服务器端，将注册信息传递给服务器  */
$("#register_btn").click(function(){
    var uname=$("#uname").val();
    var upwd=$("#upwd").val();
    var tel=$("#tel").val();
    $.post("data/jd_register.php",{"uname":uname,"upwd":upwd,"tel":tel},function(data){
        if(data=="yes"){
            window.location.href="skip.html";
        }else{
            alert("注册失败")
        }
    })
});
/************************************************************/
/*  二维码绘制  */
$("#d2").css("background",ecolor()).css("opa")
var ctx=d2.getContext("2d");
/*  画验证码的字  */
var db='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';
for(var i= 0,arr=[];i<4;i++){
    var r=parseInt(Math.random()*db.length);
    var pst=[12,32,52,72];
    var txt=db[r];
    arr[i]=txt;
    var x=pst[i];
    var y=22;
    ctx.fillStyle=color();
    ctx.font="16px 'microsoft yahei'";
    ctx.fillText(txt,x,y);
    ctx.lineWidth=4;
}
/*  画圆随机函数  */
for(var i=0;i<10;i++){
    ctx.beginPath();
    var x3=parseInt(Math.random()*94);
    var y3=parseInt(Math.random()*32);
    ctx.arc(x3,y3,5,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fillStyle=ecolor();
    ctx.fill();
}
/*  随机产生线条  */
for(var i=0;i<5;i++){
    var x1=parseInt(Math.random()*94);
    var y1=parseInt(Math.random()*32);
    var x2=parseInt(Math.random()*94);
    var y2=parseInt(Math.random()*32);
    ctx.strokeStyle=ecolor();;
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.closePath();
    ctx.stroke( );
    ctx.fill( );
}
/*  颜色随机函数  */
function color(){
    var r=parseInt(Math.random()*255);
    var g=parseInt(Math.random()*255);
    var b=parseInt(Math.random()*255);
    return "rgb("+r+","+g+","+b+")";
}
function ecolor(){
    var r=parseInt(Math.random()*255);
    var g=parseInt(Math.random()*255);
    var b=parseInt(Math.random()*255);
    return "rgba("+r+","+g+","+b+",.1)";
}
/************************************************************/
/*  检验表单元素正确与否  */
/*  整体点击效果  */
/*  检验用户名  */
$('#uname').blur(function(){
    if($('#uname').val().trim()===""){
        $(this).parent().next("span").removeClass("right").addClass("err");
        $(this).addClass("turn_red").siblings("label").addClass("turn_red");
        $(this).parent().next().next().addClass("visible");
    }else{
        $(this).parent().next("span").removeClass("err").addClass("right");
        $(this).removeClass("turn_red").siblings("label").removeClass("turn_red");
        $(this).parent().next().next().removeClass("visible");
    }
});
/*  检验密码格式  */
$('#upwd').blur(function(){
    var str=$('#upwd').val();
    if((isUpwd(str)!==true)||(str.trim()==="")){
        $(this).parent().next("span").removeClass("right").addClass("err");
        $(this).addClass("turn_red").siblings("label").addClass("turn_red");
        $(this).parent().next().next().addClass("visible");
    }else{
        $(this).parent().next("span").removeClass("err").addClass("right");
        $(this).removeClass("turn_red").siblings("label").removeClass("turn_red");
        $(this).parent().next().next().removeClass("visible");
    }
});
/*  检验密码重复输入格式  */
$('#upwd_again').blur(function(){
    var upwd=$('#upwd').val();
    var aupwd=$('#upwd_again').val();
    if(upwd!==aupwd||aupwd.trim()===""){
        $(this).parent().next("span").removeClass("right").addClass("err");
        $(this).addClass("turn_red").siblings("label").addClass("turn_red");
        $(this).parent().next().next().addClass("visible");
    }else{
        $(this).parent().next("span").removeClass("err").addClass("right");
        $(this).removeClass("turn_red").siblings("label").removeClass("turn_red");
        $(this).parent().next().next().removeClass("visible");
    }
});
/*  检验电话格式  */
$('#tel').blur(function(){
    var tel=$('#tel').val();
    if(isPhone(tel)!==true||tel.trim()===""){
        $(this).parent().next("span").removeClass("right").addClass("err");
        $(this).addClass("turn_red").siblings("label").addClass("turn_red");
        $(this).parent().next().next().addClass("visible");
    }else{
        $(this).parent().next("span").removeClass("err").addClass("right");
        $(this).removeClass("turn_red").siblings("label").removeClass("turn_red");
        $(this).parent().next().next().removeClass("visible");
    }
});
/*  检验验证码  */
$('#check_code').blur(function(){
    var check_code=$('#check_code').val();
    var code=arr.join("");
    if(code!==check_code){
        $(this).parent().next("span").removeClass("right").addClass("err");
        $(this).addClass("turn_red").siblings("label").addClass("turn_red");
        $(this).parent().next().next().addClass("visible");
    }else{
        $(this).parent().next("span").removeClass("err").addClass("right");
        $(this).removeClass("turn_red").siblings("label").removeClass("turn_red");
        $(this).parent().next().next().removeClass("visible");
    }
})
/*  检验密码函数  */
function isUpwd(str){
    var reg= /^(?=.*?[a-zA-Z])(?=.*?[0-6])[!"#$%&'()*+,\-./:;<=>?@\[\\\]^_`{|}~A-Za-z0-9]{8,16}$/;
    if(str.match(reg)==null){
        return false;
    }else{
        return true;
    }
}
/*  检验电话号码函数  */
function isPhone(num){
    var reg= /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    if(num.match(reg)==null){
        return false;
    }else{
        return true;
    }
}
/*  表单提交按钮  */
var ipts=$('#register_frm input:lt(5)');
$.each(ipts,function(i,v){
    ipts.eq(i).blur(function(){
        if($('#register_frm .right').length=="5"&&$('#has_agree').prop("checked")==="checked"){
            $('#register_btn').removeAttr("disabled");
        }
    })
})
$("#has_agree").click(function(){
    console.log("a")
    if($('#register_frm .right').length=="5"&&$('#has_agree').prop("checked")===true){
        $('#register_btn').removeAttr("disabled");
    }
})


