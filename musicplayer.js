//version 1.2  15.07.16
//contact yjh

// 播放器预执行
            function doFirst(){
                audio = document.getElementById('audio');
                bar = document.getElementById('audioline');
                audioplay = document.getElementById('audioplay');
                playbtn = document.getElementById('playbtn');
                barsize = document.getElementById('audioline').offsetWidth;

                bar.addEventListener('click',clickedBar,false);

               

            }

            // 播放暂停
            function playOrPause(id,obj){
                if(!audio.paused && !audio.ended){
                    audio.pause();
                    obj.src='music-play.png';
                    window.clearInterval(updatedBar);
                }else{
                    audio.play();
                    obj.src='music-pause.png';
                    updatedBar=setInterval(update,500);
                }
            }
            // 进度条根据当前时间走
            function update(){
                if(!audio.ended){
                    var size=parseInt(audio.currentTime*barsize/audio.duration);

                    timebar.style.width=size+'px';
                    audioplay.style.left=size+'px';
                }else{
                    timebar.style.width='0px';
                    window.clearInterval(updatedBar);
                    playbtn.src='music-play.png';
                }
            }
            // 点击控制进度条
            function clickedBar(e){
                if(!audio.paused && !audio.ended){
                    var mouseX = e.pageX-bar.offsetLeft;
                    var newtime = mouseX*audio.duration/barsize;  //新的播放时间
                    audio.currentTime = newtime;
                    audioplay.style.left=(size)+'px';
                    timebar.style.width=mouseX+'px';
                    window.clearInterval(updatedBar);
                   
                }else{
                    var mouseX = e.pageX-bar.offsetLeft;
                    var newtime = mouseX*audio.duration/barsize;  //新的播放时间
                    audio.currentTime = newtime;
                    audioplay.style.left=(mouseX)+'px';
                    timebar.style.width=mouseX+'px';
                    window.clearInterval(updatedBar);

                }
            }
            window.addEventListener('load',doFirst,false);    




//响应鼠标拖动操作

$(document).ready(function() {
    $("#audioplay").draggable({
        axis: "x",//x轴移动
        containment: ".audio-content",//限制元素包含容器

        start: function(e) {

        },//拖动开始执行函数

        drag: function(e) {
            var mouseX = e.pageX - bar.offsetLeft;

            if (mouseX >= barsize) {
                timebar.style.width = barsize + 'px';

            } else {
                audioplay.style.left = mouseX + 'px';
                timebar.style.width = mouseX + 'px';

            }

            var newtime = mouseX * audio.duration / barsize; //获得拖动后的时间
            audio.currentTime = newtime;

            $('playbtn').click(false);
        },//拖动中执行函数

        stop: function(e) {

        }//拖动结束执行函数

    });
});



//响应手指拖动
 var playbtn = {
            // 判断设备是否支持touch事件
            touch: ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
            playbtn: document.getElementById('playbtn'),
 
            // 事件
            events: {
                index: 0,                                       // 显示元素的索引
                playbtn: this.playbtn,                            // this为playbtn对象
                handleEvent: function(event) {
                    // this指events对象
                    var self = this;
 
                    if (event.type == 'touchstart') {
                        self.start(event);
                    } else if(event.type == 'touchmove') {
                        self.move(event);
                    } else if(event.type == 'touchend') {
                        self.end(event);
                    }
                },
 
                // 滑动开始
                start: function(event) {
                    event.preventDefault();                      // 阻止触摸事件的默认动作,即阻止滚屏
                    var touch = event.touches[0];                // touches数组对象获得屏幕上所有的touch，取第一个touch
                    startPos = {                                 // 取第一个touch的坐标值
                        x: touch.pageX,
                        y: touch.pageY,
                    };
 
                    // 绑定事件
                    this.playbtn.addEventListener('touchmove', this, false);
                    this.playbtn.addEventListener('touchend', this, false);
                },
 
                // 移动
                move: function(event) {
                    event.preventDefault();                      // 阻止触摸事件的默认行为，即阻止滚屏
 
                    // 当屏幕有多个touch或者页面被缩放过，就不执行move操作
                    if (event.touches.length > 1 || event.scale && event.scale !== 1) return;
                    var touch = event.touches[0];
                    endPos = {
                        x: touch.pageX - startPos.x,
                        y: touch.pageY - startPos.y
                    };
 
                    // 执行操作，使元素移动
                    this.playbtn.style.left = endPos.x + 'px';
                },
 
                // 滑动释放
                end: function(event) {
                    var duration = +new Date - startPos.time;    // 滑动的持续时间
 
                    this.icon[this.index].className = '';
                    if (Number(duration) > 100) {
                        // 判断是左移还是右移，当偏移量大于50时执行
                        if (endPos.x > 50) {
                            if(this.index !== 0) this.index -= 1;
                        } else if(endPos.x < -50) {
                            if (this.index !== 4) this.index += 1;
                        }
                    }
 
                    this.playbtn.className = 'cnt f-anim';
                    this.playbtn.style.left = -this.index*600 + 'px';
                    this.icon[this.index].className = 'curr';
 
                    // 解绑事件
                    this.playbtn.removeEventListener('touchmove', this, false);
                    this.playbtn.removeEventListener('touchend', this, false);
                }
            },
 
            // 初始化
            init: function() {
                // this指playbtn对象
                var self = this;
 
                // addEventListener第二个参数可以传一个对象，会调用该对象的handleEvent属性
                if(!!self.touch) self.playbtn.addEventListener('touchstart', self.events, false);
            }
        };
 
        playbtn.init();
















