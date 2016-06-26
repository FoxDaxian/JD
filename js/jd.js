/**
 * Created by xiuli on 2016/6/9.
 */
/***************************************异步加载页头页脚***************************************************/
$("#top").load("jd_top.html");
$("#footer").load("jd_footer.html");
/***************************************搜索框异步请求************************************************/
$('.search_txt').keyup(function(){
    var value=$('.search_txt').val();
    $.get("data/jd_search.php",{search:value},function(data){
        console.log("获得数据");
        if(value&&value.trim()!==""){
            $(".search_php").html(data).addClass("display");
        }else{
            $(".search_php").removeClass("display");
        }
    })
});
/****************************************myshopcar**************************************************/
/*  购物车的对话框弹出效果  */
$(".my_shopcar").hover(function(){
    $(this).addClass("my_shopcar_change");
    $(this).children(".my_shopcar_alert").addClass("display");
},function(){
    $(this).removeClass("my_shopcar_change");
    $(this).children(".my_shopcar_alert").removeClass("display");
});
/********************************************nav**************************************************/
/*  给nav左边设置弹出效果  */
$('.nav_left>li').hover(function(){
    $(this).children("div.pop").addClass("display");
},function(){
    $(this).children("div.pop").removeClass("display");
});
/*  给nav左边弹出的部分的标题加样式  */
$(".nav_left .pop_top>li").hover(function(){
    $(this).addClass("nav_change");
    $(this).children("div").addClass("nav_bar_change");
},function(){
    $(this).removeClass("nav_change");
    $(this).children("div").removeClass("nav_bar_change");
});
/*  carousel  */
var imgs=[
    {"i":0,src:"imgs/carousel1.jpg"},
    {"i":1,src:"imgs/carousel2.jpg"},
    {"i":2,src:"imgs/carousel3.jpg"},
    {"i":3,src:"imgs/carousel4.jpg"},
    {"i":4,src:"imgs/carousel5.jpg"}
];
var idv={
    LIWIDTH:730,
    WAIT:2000,
    STEPS:300,
    DURATION:500,
    timer:null,
    autoMove:true,
    init:function(){
        var me=this;
        me.viewPoint();
        $(".carousel").mouseover(function(){
            me.autoMove=false;
        });
        $(".carousel").mouseout(function(){
            me.autoMove=true;
        });
        me.autoPlay();
        $(".carousel_idexs").mouseover(function(e){
            var target= e.target;
            if(target.nodeName=="LI"&&$(target).html()-1!=imgs[0].i){
                $(".carousel_idexs>.active").removeClass("active");
                $(target).addClass("active");
                var n=$(target).html()-1-imgs[0].i;
                me.move(n);
            }
        });
        $(".carousel").hover(function(){
            $(".both_btn").addClass("display");
        },function(){
            $(".both_btn").removeClass("display");
        });
        $(".prev_btn1").click(function(){
            me.move(-1);
        })
        $(".next_btn1").click(function(){
            me.move(1);
        })
    },
    move:function(n){
        clearTimeout(this.timer);
        this.timer=null;
        var me=this;
        if(n<0){
            imgs=imgs.splice(imgs.length+n,-n).concat(imgs);
            me.viewPoint();
            $(".carousel_imgs").css("left",n*me.LIWIDTH+"px");
        };
        me.moveStep(n);
    },
    viewPoint:function(){
        var me=this;
        $(".carousel_imgs").css("width",imgs.length*me.LIWIDTH+"px");
        for(var i= 0,lis=[],idex=[];i<imgs.length;i++){
            lis[i]="<li><img src="+imgs[i].src+"></li>";
            idex[i]="<li>"+(i+1)+"</li>";
        };
        $(".carousel_imgs").html(lis.join(""));
        $(".carousel_idexs").html(idex.join(""));
        $(".carousel_idexs>.active").removeClass("active");
        $(".carousel_idexs>li")[imgs[0].i].className="active";
    },
    autoPlay:function(){
        var me=this;
        me.timer=setTimeout(function(){
            if(me.autoMove){
                me.moveStep(1);
            }else{
                me.autoPlay();
            }
        },me.WAIT);
    },
    moveStep:function(n){
        var me=this;
        var step=n*me.LIWIDTH/me.STEPS;
        var style=$(".carousel_imgs").css("left");
        var left=parseFloat(style)-step;
        $(".carousel_imgs").css("left",left+"px");
        if(n>0&&left>-n*me.LIWIDTH||n<0&&left<0){
            me.timer=setTimeout(function(){
                me.moveStep(n);
            },me.DURATION/me.STEPS)
        }else{
            $(".carousel_imgs").css("left","0");
            me.autoPlay();
            if(n>0){
                imgs=imgs.concat(imgs.splice(0,n));
                me.viewPoint();
            }
        }
    },
};
$(function(){
    idv.init();
});
/*  sub_carousel  */
var sub={
    ULWIDTH:1000,
    DURATION:800,
    STEPS:400,
    WAIT:3000,
    timer:null,
    canAuto:true,
    init:function(){
        var me=this;
        me.autoPlay();
        $(".sub_nav_container").mouseover(function(){
            me.canAuto=false;
        });
        $(".sub_nav_container").mouseout(function(){
            me.canAuto=true;
        });
        $(".carousel").hover(function(){
            $(".prev_btn1").addClass("display");
            $(".next_btn1").addClass("display");
        },function(){
            $(".prev_btn1").removeClass("display");
            $(".next_btn1").removeClass("display");
        });
        $(".sub_prev_btn").click(function(){
            me.move(1);
        })
        $(".sub_next_btn").click(function(){
            me.move(-1);
        })
    },
    move:function(n){
        if(n<0){

        }
    },
    autoPlay:function(){
        var me=this;
        me.timer=setTimeout(function(){
            if(me.canAuto){
                me.moveStep(1);
            }else{
                me.autoPlay();
            }
        },me.WAIT)
    },
    moveStep:function(n){
        var me=this;
        var step=n*me.ULWIDTH/me.STEPS;
        var style=$(".sub_nav_group").css("left");
        var left=parseFloat(style)-step;
        $(".sub_nav_group").css("left",left+"px");
        if(n>0&&left>-n*me.ULWIDTH||n<0&&left<0){
            me.timer=setTimeout(function(){
                me.moveStep(n);
            },me.DURATION/me.STEPS);
        }else{
            if(n>0){
                $(".sub_nav_group").css("left",0);
                var uls=$(".sub_nav_group>ul");
                var low=uls.splice(0,n);
                uls=uls.insertBefore(low);
            };
            me.autoPlay();
        };
    },
};
$(function(){
    sub.init();
});
/********************************************first-floor**************************************************/
/*  给一楼鞋服那里添加切换功能  */
$(".first_floor_title>ul>li").mouseover(function(){
    $(this).siblings(".hover1").removeClass("hover1");
    $(this).addClass("hover1");
    var link=$(this).children("a").attr("href");
    $(link).siblings(".display").removeClass("display");
    $(link).addClass("display");
});
/*  first_floor_carousel  */
var imges=[
    {"i":0,src:"imgs/index_part1_4.jpg"},
    {"i":1,src:"imgs/index_part1_5.jpg"},
    {"i":2,src:"imgs/index_part1_6.jpg"},
    {"i":3,src:"imgs/index_part1_7.jpg"}
];
var sub2={
    LIWIDTH:440,
    WAIT:1000,
    STEPS:200,
    DURATION:300,
    timer:null,
    canAuto:true,
    init:function(){
        var me=this;
        me.viewPoint();
        $(".index_part1_carousel").mouseover(function(){
            me.canAuto=false;
        });
        $(".index_part1_carousel").mouseout(function(){
            me.canAuto=true;
        });
        me.autoPlay();
        $(".index_part1_idex").mouseover(function(e){
            var target= e.target;
            if(target.nodeName==="LI"&&$(target).html()-1!==imges[0].i){
                $(".index_part1_idex>.active2").removeClass("active2");
                $(target).addClass("active2");
                var n=($(target).html()-1)-imges[0].i;
                me.move(n);
            };
        });
        $(".index_part1_carousel").hover(function(){
            $(".prev_btn2").addClass("display");
            $(".next_btn2").addClass("display");
        },function(){
            $(".prev_btn2").removeClass("display");
            $(".next_btn2").removeClass("display");
        });
        $(".prev_btn2").click(function(){
            me.move(-1)
        });
        $(".next_btn2").click(function(){
            me.move(1)
        });
    },
    move:function(n){
        clearTimeout(this.timer);
        this.timer=null;
        var me=this;
        if(n<0){
            imges=imges.splice(imges.length+n,-n).concat(imges);
            me.viewPoint()
            $(".index_part1_imgs").css("left",n*me.LIWIDTH+"px");
        };
        me.moveStep(n);
    },
    viewPoint:function(){
        var me=this;
        $(".index_part1_imgs").css("width",imges.length*me.LIWIDTH+"px");
        for(var i= 0,lis=[],idex=[];i<imges.length;i++){
            lis[i]='<li><a href="#"><img src="'+ imges[i].src +'"></a></li>';
            idex[i]='<li>'+ (i+1) +'</li>';
        };
        $(".index_part1_imgs").html(lis.join(""));
        $(".index_part1_idex").html(idex.join(""));
        $(".index_part1_idex>li.active2").removeClass("active2");
        $(".index_part1_idex>li")[imges[0].i].className="active2";
    },
    autoPlay:function(){
        var me=this;
        me.timer=setTimeout(function(){
            if(me.canAuto){
                me.moveStep(1);
            }else{
                me.autoPlay();
            }
        },me.WAIT);
    },
    moveStep:function(n){
        var me=this;
        var step=n*me.LIWIDTH/me.STEPS;
        var style=$(".index_part1_imgs").css("left");
        var left=parseFloat(style)-step;
        $(".index_part1_imgs").css("left",left+"px");
        if(n>0&&left>-n*me.LIWIDTH||n<0&&left<0){
            me.timer=setTimeout(function(){
                me.moveStep(n);
            },me.DURATION/me.STEPS)
        }else{
            $(".index_part1_imgs").css("left","0");
            me.autoPlay();
            if(n>0){
                imges=imges.concat(imges.splice(0,n));
                me.viewPoint()
            };
        }
    },
};
$(function(){
    sub2.init();
});
/********************************************discount**************************************************/
/*  discount_carousel  */
var sub3={
    LIHEIGHT:120,
    STEPS:300,
    DURATION:300,
    timer:null,
    canAuto:true,
    init:function(){
        var me=this;
        me.autoPlay();
    },
    autoPlay:function(){
        var me=this;
        me.timer=setTimeout(function(){
            if(me.canAuto){
                me.moveStep(1)
            }else{
                me.autoPlay();
            }
        })
    },
    moveStep:function(n){
        var me=this;
        var step=me.LIHEIGHT/me.STEPS;
        var style=$(".discount_content_right_ctn>ul").css("top");
        var top=parseFloat(style)-step;
        $(".discount_content_right_ctn>ul").css("top",top+"px");
        if(n>0&&top>-n*me.LIHEIGHT){
            me.timer=setTimeout(function(){
                me.moveStep(n);
            },me.DURATION/me.STEPS)
        }else{
            $(".discount_content_right_ctn>ul").css("top","0px");
            me.autoPlay();
            if(n>0){
                var low=$(".discount_content_right_ctn>ul>li").splice(0,n);
                $(".discount_content_right_ctn>ul>li").insertBefore(low);
            }
        }
    },
};
$(function(){
    sub3.init()                                                                                                                                                                                                                                                                                                                         ;
});
/********************************************页面右边固定定位部分**************************************************/
/*  页面的fixed  */
$(".aside_top>li").hover(function(){
    $(this).children("div").removeClass("slide");
    $(this).children(".aside_bg").animate({"right":"32px"});
    $(this).children().eq(0).addClass("nav_change");
    $(this).eq(0).addClass("nav_change");
},function(){
    $(this).children("div").addClass("slide");
    $(this).children().eq(0).removeClass("nav_change");
    $(this).children(".aside_bg").animate({"right":"-60px"});
    $(this).eq(0).removeClass("nav_change");
});
$(".aside_bottom>li").hover(function(){
    $(this).children("div").removeClass("slide");
    $(this).children(".aside_bg").animate({"right":"32px"});
    $(this).children().eq(0).addClass("nav_change");
    $(this).eq(0).addClass("nav_change");
},function(){
    $(this).children("div").addClass("slide");
    $(this).children().eq(0).removeClass("nav_change");
    $(this).children(".aside_bg").animate({"right":"-60px"});
    $(this).eq(0).removeClass("nav_change");
});
/********************************************从数据库中获得用户名，显示在top中**************************************************/
function getUname(){
    var unames=[];
    for(var key in localStorage){
        unames.push(localStorage[key]);
    };
    unames.sort(function(a,b){return a-b});
    return unames[unames.length-1];
};
function getKeys(){
    var keys=[];
    for(var key in localStorage){
        keys.push(key);
    };
    return keys[0];
};
$(function(){
    var key=getKeys();
    if(key.substr(0,2)=="99"){
        $("#login_name").html("欢迎您, "+getUname());
    };
});









