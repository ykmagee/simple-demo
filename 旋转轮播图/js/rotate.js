window.onload=function(){
	var arr = [
        {   //  1
            width:400,
            top:70,
            left:50,
            opacity:20,
            zIndex:2
        },
        {  // 2
            width:600,
            top:120,
            left:0,
            opacity:80,
            zIndex:3
        },
        {   // 3
            width:800,
            top:100,
            left:200,
            opacity:100,
            zIndex:4
        },
        {  // 4
            width:600,
            top:120,
            left:600,
            opacity:80,
            zIndex:3
        },
        {   //5
            width:400,
            top:70,
            left:750,
            opacity:20,
            zIndex:2
        }
    ];
    var arrNum=[{num:-2},{num:-1},{num:0},{num:1},{num:2}];

    var slide=document.getElementById("slide");
    var liArr=slide.getElementsByTagName("li");
    var arrow=slide.children[1];
    var arrowArr=arrow.children;
    //设置一个开闭原则变量，点击以后修改这个值。
    var flag=true;

    //1.鼠标放到轮播图上，两侧的按钮显示，并清除定时器；鼠标移开后按钮隐藏，并添加定时器自动旋转。
    slide.onmouseenter=function(){
    	arrow.style.opacity=100;
        clearInterval(timer_0);
    }
    slide.onmouseleave=function(){
    	arrow.style.opacity=0;
        timer_0=setInterval(function(){
            move(true);
        },2600);
    }

    //书写函数
    function move(bool){
        //判断：如果等于undefined,那么就不执行这两个if语句
    	if (bool===true||bool===false) {
    		if (bool) {
    			arr.unshift(arr.pop());
                arrNum.unshift(arrNum.pop());
    		}else{
    			arr.push(arr.shift());
                arrNum.push(arrNum.shift());
    		}
    	}
        //为页面上的所有li赋值属性，利用缓动框架
    	for(var i=0;i<arr.length;i++){
    		animate(liArr[i],arr[i],function(){
                //跳转完成后修改flag值为true(打开)
                flag=true;
            });
            liArr[i].num=arrNum[i].num;
    	}
    }

    //先展开图片
    move();
    //添加定时器，自动旋转
    var timer_0=setInterval(function(){
        move(true);
    },2600);

    //3.把两侧按钮绑定事件。(调用同一个方法，只有一个参数，true为正向旋转，false为反向旋转)
    //只有flag为true时才会执行点击事件，点击之后修改flag值为false(关闭)，避免多次点击
    arrowArr[0].onclick=function(){
        if (flag) {
            flag=false;
            move(false);
        }    	
    }
    arrowArr[1].onclick=function(){
        if (flag) {
            flag=false;
            move(true);
        }    	
    }

    //4.点击两侧图片旋转到所点击图片
    for(var i=0;i<liArr.length;i++){
        liArr[i].index=i;
        liArr[i].onclick=function(){           
            switch(liArr[this.index].num){
                case 1:
                    move(true);
                    break;
                case -1:
                    move(false);
                    break;
                case 2:
                    move(true);
                    var timeout=setTimeout(function(){
                        move(true);
                        // console.log(2);
                    },300);
                    // clearTimeout(timeout);
                    break;
                case -2:
                    move(false);
                    var timeout=setTimeout(function(){
                        move(false);
                    },300);
                    // clearTimeout(timeout);
                    break;
            }           
            // console.log(this.index);
            // console.log(liArr[this.index].num);
        }
    }

    //让被选文字清除。
    // window.getSelection?window.getSelection().removeAllRanges():document.selection.empty();
    liArr.onselectstart=function(){
        return false;
    }
}