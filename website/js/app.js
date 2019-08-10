'use strict'; 
// 預防IE出錯
    if (window.console == undefined) {var em = function() {};window.console = { log: em, debug: em, info: em, warn: em };}
    if (typeof(console) == '') {var em = function() {};console = { log: em, debug: em, info: em, warn: em };}
    if (console.log == undefined || console.log == 'undefined') {var em = function() {};console.log = em;}
    if (console.debug == undefined || console.debug == 'undefined') {var em = function() {};console.debug = em;}
    if (console.info == undefined || console.info == 'undefined') {var em = function() {};console.info = em;}
    if (console.warn == undefined || console.warn == 'undefined') {var em = function() {};console.warn = em;}
// end : 預防IE出錯

//===========   bindingEvent function     ===========//
function ajaxEvent(){
    $.ajax({
        url: './JSON/beer-data.json',// url位置
        type: 'get',                   // post/get
        dataType: "text",
        error: function (xhr) {
            console.log(xhr);
        },      // 錯誤後執行的函數
        success: function (response) {
            window.beerData = $.parseJSON(response);
            $loadingHandle.keyDom = $($loadingHandle.key);
            $loadingHandle.setSetp(0.25);
            loadingObj(beerData, bindingEvent);
        }// 成功後要執行的函數
    });
} 
function bindingEvent(){
    var _initial = [$headerHandle,
                    $modalHandle,
                    $threeHandle,
                    $sectionHandle,
                    $drawIconHandle,
                    $inputHandle,
                    $textareaHandle,
                    $contactHandle,
                    $loadingHandle];
    var _onResize    = [],
        _onScroll    = [],
        _onDraw      = [],
        _onMouseMove = [],
        _onMouseDown = [],
        _onMouseUp   = [],
        _onClick     = [],
        _onWheel     = [];
    let _whellLength = 0,
        _whellFn = false;
    //判斷手機為body新增class
    if(isMobile){ $('body').addClass('isMobile'); }

    //初始所有initial function
    $.each(_initial,function(i,o){
        if(typeof o.key === 'string'){
            o.keyDom = $(o.key);
            o.keyHas = o.keyDom.length > 0;
        }
        if(o.hasOwnProperty('initial')){
            o.initial();
        }
        //判斷此物件是否有要resize的function
        if(o.hasOwnProperty('onResize')){
            _onResize.push(o);
        }
        //判斷此物件是否有要scroll的function
        if(o.hasOwnProperty('onScroll')){
            _onScroll.push(o);
        }
        //判斷此物件是否有要DrawLeft的function
        if(o.hasOwnProperty('onDraw')){
            _onDraw.push(o);
        }
        //判斷此物件是否有要MouseMove的function
        if(o.hasOwnProperty('onMouseMove')){
            _onMouseMove.push(o);
        }
        //判斷此物件是否有要MouseDown的function
        if(o.hasOwnProperty('onMouseDown')){
            _onMouseDown.push(o);
        }
        //判斷此物件是否有要Mouseup的function
        if(o.hasOwnProperty('onMouseUp')){
            _onMouseUp.push(o);
        }
        //判斷此物件是否有要onWheel的function
        if(o.hasOwnProperty('onWheel')){
            _onWheel.push(o);
        }
        //判斷此物件是否有要onClick的function
        if(o.hasOwnProperty('onClick')){
            _onClick.push(o);
        }
    });
    //each動作
    function eachEvent(eventArray, eventName, booleanName, time, data, beforeFn){
        if(!eventData[booleanName]){
            eventData[booleanName] = true;
            setTimeout(()=>{
                if(beforeFn){
                    beforeFn();
                }
                $.each(eventArray,function(i,o){
                    o[eventName](data);
                });
                eventData[booleanName] = false;
            }, time);
        } 
    }
    //Resize動作
    windowJquery.resize(function(){
        eachEvent(_onResize, 'onResize', 'isResize', 200, null,()=>{
            $windowData.width = windowJquery.outerWidth();
            $windowData.inHeight = window.innerHeight;
        });
    });
    //scroll動作
    windowJquery.on('mousewheel', function(event, delta, deltaX, deltaY) {
        if(!eventData.isWheel){
            _whellLength = 0;
            eventData.isWheel = true;
        }
        else{
            _whellLength += delta;
            if(!_whellFn && Math.abs(_whellLength) >= 3){
                _whellFn = true;
                let wheelType = null;
                if(_whellLength <= -3){
                    wheelType = 'down'
                }
                else if(_whellLength >= 3){
                    wheelType = 'up';
                } 
                $.each(_onWheel,function(i,o){
                    o.onWheel(wheelType);
                });
            }
                
        }
        setTimeout(()=>{
            eventData.isWheel = false;
            _whellFn = false;
        },200);
        
    });
    windowJquery.on('mousemove touchmove', function(e){
        eachEvent(_onMouseMove, 'onMouseMove', 'isMouseMove', 5, e,()=>{
            $windowData.mouseX = typeof e.pageX === 'number'? e.pageX: e.originalEvent.touches[0].pageX;
            $windowData.mouseY = typeof e.pageY === 'number'? e.pageY: e.originalEvent.touches[0].pageY;
        });  
    });
    windowJquery.on('mousedown touchstart', function(e){
        $windowData.mouseX = typeof e.pageX === 'number'? e.pageX: e.originalEvent.touches[0].pageX;
        $windowData.mouseY = typeof e.pageY === 'number'? e.pageY: e.originalEvent.touches[0].pageY;
        eachEvent(_onMouseDown, 'onMouseDown', 'isMouseDown', 50);
        let xPos = $windowData.mouseX,
            yPos = $windowData.mouseY;
        let timeStart = Date.now();
        $windowData.mouseDownPos.x = xPos;
        $windowData.mouseDownPos.y = yPos;
        windowJquery.off('mouseup touchend').on('mouseup touchend', function(e2){
            let xPosFn = $windowData.mouseX,
                yPosFn = $windowData.mouseY;
            $windowData.mouseDownPos.x = null;
            $windowData.mouseDownPos.y = null;
            let timeEnd = Date.now() - timeStart;
            let xMoveLength = xPosFn - xPos,
                yMoveLength = yPosFn - yPos;

            let drawType = null;
            if((timeEnd < 300 && Math.abs(xMoveLength) > 50) || Math.abs(xMoveLength) * 3 > $windowData.width){
                if(xMoveLength > 0){
                    drawType = 'left';
                }
                else{
                    drawType = 'right';
                }
            }
            else if((timeEnd < 300 && Math.abs(yMoveLength) > 50) || Math.abs(yMoveLength) * 3 > $windowData.height){
                if(yMoveLength > 0){
                    drawType = 'down';
                }
                else{
                    drawType = 'up';
                }
            }
            eachEvent(_onMouseUp, 'onMouseUp', 'isMouseUp', 50);
            eachEvent(_onDraw, 'onDraw', 'isDraw', 50, drawType);
        });
    });
    //body click動作
    windowJquery.on('click',function(){
        eachEvent(_onClick, 'onClick', 'isClick', 50);
    });
}

//===========   bindingEvent function: end ===========//
const windowJquery = $(window);

var eventData = {
    isResize: false,
    isScroll: false,
    isClick: false,
    isWheel : false,
    isDraw  : false,
    isMouseDown: false,
    isMouseUp: false,
    isMouseMove: false,
};
var $windowData = { width:     windowJquery.outerWidth(),
                    inHeight:    window.innerHeight,
                    scrollTop: windowJquery.scrollTop(),
                    mouseX: 0,
                    mouseY: 0,
                    mouseDownPos:{x: null, y: null}
                };
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
let beer;


const threeJsControlData = {
    mouseX: -30,
    mouseXPercen: 15 / $windowData.width,
    mouseY: 0,
    mouseYPercen: 15 / $windowData.inHeight,
    windowHalfX: window.innerWidth / 2,
    windowHalfY: window.innerHeight / 2,
    trun: 1,
    activeIndex: 0,
    oldActiveIndex: 0,
    mirror: 1,
    transformXing:false,
    activePos: {
        scale: 1.2,
        x: -22,
        y: -3,
        z: 0,
        itemGap: 30
    },
    smallActivePos: {
        scale: 0.5,
        x: -30,
        y: -5,
        z: 0,
        itemGap: 20
    }
}
const beerThreeData = [];
//設定材質
const materialObj = {
    _glassMaterialData:{
        urls: [ "./img/white-room/px.jpg", "./img/white-room/nx.jpg",
                "./img/white-room/py.jpg", "./img/white-room/ny.jpg",
                "./img/white-room/pz.jpg", "./img/white-room/nz.jpg"]
    },
    textureCube: null,
    _textureLoader: new THREE.TextureLoader(),
    _CubeTextureLoader: new THREE.CubeTextureLoader(),
    glassMaterial: function(custom) {
        let self = this;
        let defaultSetting = {
            color: 0xffffff,
            flatShading: true,
            envMap: self.textureCube,
            transparent: true,
            side: THREE.BackSide,
            shininess: 100
        };
        if(typeof custom === "object"){
            $.extend(defaultSetting, custom);
        }
        return new THREE.MeshPhongMaterial(defaultSetting);
    },
    coverAndLogo: function(custom) {
        let defaultSetting = {
            metalness: 0.05,
            roughness: 0.9,
            side: THREE.DoubleSide,
            transparent: true
        };
        if(typeof custom === "object"){
            $.extend(defaultSetting, custom);
        }
        return new THREE.MeshStandardMaterial(defaultSetting);
    },
    foodPlane: function(url){
        return new THREE.MeshBasicMaterial({
            color: 0xffffff,
            map: materialObj._textureLoader.load(url),
            transparent: true
        });
    }
};
materialObj.textureCube = materialObj._CubeTextureLoader.load( materialObj._glassMaterialData.urls );
materialObj.textureCube.mapping = THREE.CubeRefractionMapping;
//還景貼圖


//===========
const $loadingHandle = {
    key: '.beer-comp-loading',
    stepType: [25, 50, 70, 100],
    setSetp: function(num){
        num = Math.floor(num * 100);
        let result = this.stepType
                        .filter((typeNum, index) => {
                            return num <= typeNum
                        })[0] || 0;
        this.keyDom.addClass('step'+result);
    },
    final: function(){
        this.keyDom.addClass('start');
        setTimeout(()=>{
            this.keyDom.hide();
        }, 1000);
    },
    initial: function(){
        this.keyDom.on('click mousedown mouseup', function(e){
            e.preventDefault();
            e.stopPropagation();
        });
    }
}
const $contactHandle = {
    key: '#popup-contact',
    keyContent: null,
    keyButton: null,
    keyForm: null,
    sandAnEasing: CteatrEasing(0.57,-0.59,0.95,-0.39),
    isSand: false,
    sandAn: function(){
        return new TWEEN.Tween({y: 0, rotate: 0, scale: 1})
                    .to({y: -1000, rotate: 150, scale: 0.6}, 1000)
                    .easing(this.sandAnEasing)
    },
    _initChildDOM: function(){
        this.Button = this.keyDom.find('.modal-footer .btn-content .link-content');
        this.keyContent = this.keyDom.find('.modal-content');
        this.keyForm = this.keyDom.find('form');
    },
    _initEvent: function(){
        let self = this;
        this.Button.on('click',function(e){
            e.preventDefault();
            self.submitAn();
        });
        this.keyDom.on('hidden.bs.modal',()=>{
            this.submitAnReset();
        });
    },
    submitAn: function(){
        this.keyDom.addClass('contact-to-white');
        this.keyContent.css('height', this.keyContent.height() + 'px');
        this.isSand = true;
        setTimeout(()=>{
            if(!this.isSand) {return;}
            this.keyDom.addClass('contact-to-mail');
             setTimeout(()=>{
                if(!this.isSand) {return;}
                this.keyDom.addClass('contact-mail-close');
                setTimeout(()=>{
                    if(!this.isSand) {return;}
                    this.keyDom.addClass('contact-sand');
                    this.sandAn()
                        .onUpdate((e)=>{
                            if(!this.isSand) {return;}
                            let transform = `translateY(${e.y}px) rotate(${e.rotate}deg) scale(${e.scale})`
                            this.keyContent.css('transform', transform);
                        })
                        .start();
                },500);
             },700);
        },800);
    },
    submitAnReset: function(){
        if(this.isSand){
            this.keyForm.get(0).reset();
            this.keyContent.attr('style', '');
            this.keyDom.removeClass('contact-to-white');
            this.keyDom.removeClass('contact-to-mail');
            this.keyDom.removeClass('contact-mail-close');
            this.keyDom.removeClass('contact-sand');
            this.isSand = false;
            $inputHandle.checkAllVal(this.keyDom);
            $textareaHandle.checkAllVal(this.keyDom);
        }
    },
    initial: function(){
        this._initChildDOM();
        this._initEvent();
    }
};
const $inputHandle = {
    key: '.beer-form-el-input',
    keyFormDOM: null,
    _initChildDOM: function(){
        this.keyFormDOM = this.keyDom.find('input');
    },
    _initEvent: function(){
        let self = this;
        this.keyFormDOM.on('focus', function(){
            $(this).parents(self.key).addClass('is-focus');
        });
        this.keyFormDOM.on('blur', function(){
            let thisInput = $(this);
            if(thisInput.val() === ''){
                thisInput.parents(self.key).removeClass('is-focus');
            }
        });
    },
    checkAllVal: function(target){
        target = target? $(target).find('.beer-form-el-input input'): $inputHandle.keyFormDOM;
        target.each(function(_, DOM){
            let thisDOM = $(DOM);
            let thisDOMParent = thisDOM.parents($inputHandle.key);
            if(thisDOM.val() !== ''){
                thisDOMParent.addClass('is-focus');
            }
            else{
                thisDOMParent.removeClass('is-focus');
            }
        });
    },
    initial: function(){
        this._initChildDOM();
        this._initEvent();
        this.checkAllVal();
    }
};
const $textareaHandle = {
    key: '.beer-form-el-textarea',
    keyFormDOM: null,
    _initChildDOM: function(){
        this.keyFormDOM = this.keyDom.find('textarea');
    },
    _initEvent: function(){
        $inputHandle._initEvent.call(this);
        let self = this;
        this.keyFormDOM.on('input', function(){
            self._checkSize(this);
        });
    },
    checkAllVal: function(target){
        target = target? $(target).find('.beer-form-el-textarea textarea'): $textareaHandle.keyFormDOM;
        target.each(function(_, DOM){
            let thisDOM = $(DOM);
            let thisDOMParent = thisDOM.parents($textareaHandle.key);
            if(thisDOM.val() !== ''){
                thisDOMParent.addClass('is-focus');
            }
            else{
                thisDOMParent.removeClass('is-focus');
            }
        });
    },
    checkAllSize: function(target){
        target = target? $(target).find('.beer-form-el-textarea textarea'): $textareaHandle.keyFormDOM;
        target.each(function(_, DOM){
            $textareaHandle._checkSize(DOM);
        });
    },
    _checkSize: function(textarea){
        let fnHeight = 120;
        textarea.style.height = '120px';
        fnHeight = textarea.scrollHeight > 120? textarea.scrollHeight:120
        textarea.style.height = fnHeight + 'px';
    },
    initial: function(){
        this._initChildDOM();
        this._initEvent();
        this.checkAllVal();
        $modalHandle.addEventList('shown', this.checkAllSize);
    }
};
const $modalHandle = {
    key:'.modal',
    isModalOpen: false,
    eventsList:{
        'show': [],
        'shown': [],
        'hide': [],
        'hidden':[]
    },
    _initBindEvent: function(){
        let self = this;
        for(let events in this.eventsList){
            this.keyDom.on(events + '.bs.modal', function(e){
                self.eventsList[events].forEach(function(event){
                    event(e.target);
                });
            });
        }
    },
    _initDefaultEvent: function(){
        this.addEventList('show', ()=>{
            this.isModalOpen =  true;
            $('body').addClass('content-blur');
        });
        this.addEventList('hidden', ()=>{
            this.isModalOpen =  false;
            $('body').removeClass('content-blur');
        });
    },
    addEventList: function(name, event){
        this.eventsList[name].push(event);
    },
    reomveEventList: function(name, event){
        let thisEvents = this.eventsList[name]
        let index = thisEvent.indexOf(event);
        if(index > -1){
            thisEvents.splice(index, 1);
        }
    },
    initial: function(){
        this._initBindEvent();
        this._initDefaultEvent();
    }
};
const $drawIconHandle = {
    key: '#draw-icon',
    keyUnderline: null,
    keyCircle: null,
    time: 0,
    countTime: null,
    mouseTrack: true,
    iconToUnderlineDOM: null,
    mousePos:{
        x:0,
        y:0,
        nextX:0,
        nextY:0
    },
    handleShow: function(){
        if(this.time > 5){
            this.keyDom.addClass('hide');
            this.time = 0;
            clearInterval(this.countTime);
            this.countTime = null;
        }
    },
    stopMouseTrack: function(){
        this.mouseTrack = false;
    },
    startMouseTrack: function(){
        this.mouseTrack = true;
    },
    setPos: function(){
        setInterval(()=>{
            if($modalHandle.isModalOpen){ return }

            this.mousePos.x += (this.mousePos.nextX - this.mousePos.x) * 0.1;
            this.mousePos.y += (this.mousePos.nextY - this.mousePos.y) * 0.1;
            this.keyDom.css('left', (this.mousePos.x) + 'px');
            this.keyDom.css('top',  (this.mousePos.y) + 'px');
        },10);
    },
    setNextPos: function(){
        if(this.mouseTrack){
            this.mousePos.nextX = $windowData.mouseX - 25;
            this.mousePos.nextY = $windowData.mouseY - 25;
        }
    },
    setTrackDOM: function(DOM){
        this.iconToUnderlineDOM = DOM;
    },
    setToUnderlindPos: function(){
        if($modalHandle.isModalOpen){ return }
        this.stopMouseTrack();
        let thisPos = this.keyDom.get(0).getBoundingClientRect();
        let DOM = this.iconToUnderlineDOM;
        let DOMPos = DOM.getBoundingClientRect();
        this.keyDom.addClass('hide-arraw hide-scroll');


        /*******to button: start*******/

        let width  = DOMPos.width,
            height = DOMPos.height;

        let top  = DOMPos.top - (thisPos.height - height) / 2,
            left = DOMPos.left - (thisPos.width - width) / 2;

        this.mousePos.nextY = top;
        this.mousePos.nextX = left;
        
        this.keyCircle.css('width', width + 'px');
        this.keyCircle.css('height', height + 'px');
        this.keyCircle.css('border-radius', height / 2 + 'px');
        /*******to button: end*******/

        /***** Underlind code: start
        let width = DOMPos.width;
        let top = DOMPos.bottom - 30,
            left = DOMPos.left + (DOMPos.width - thisPos.width) / 2;
        this.keyDom.addClass('is-underline');

        this.mousePos.nextX = left;
        this.mousePos.nextY = top;
        this.keyUnderline.css('width', width + 'px');
        ****** Underlind code: end   ****/
    },
    removeUnderlindPos: function(){
        if($modalHandle.isModalOpen){ return }
        let self = this || $drawIconHandle;
        self.iconToUnderlineDOM = null;
        self.startMouseTrack();
        self.keyDom.removeClass('hide-arraw hide-scroll');

        /*******to button: start*******/
        self.keyCircle.css('width', '');
        self.keyCircle.css('height', '');
        self.keyCircle.css('border-radius', '');
        /*******to button: end*******/

        // windowJquery.trigger('mousemove');
        /***** Underlind code: start
        this.keyDom.removeClass('is-underline');
        this.keyUnderline.css('width', '');
        ****** Underlind code: end   ****/
    },
    initial: function(){
        this.mousePos.x = $windowData.mouseX;
        this.mousePos.y = $windowData.mouseY;
        this.mousePos.nextX = $windowData.mouseX;
        this.mousePos.nextY = $windowData.mouseY;
        this.setPos();
        /*******to button: start*******/
        this.keyCircle = this.keyDom.find('.draw-circle');;
        /*******to button: end*******/

        $modalHandle.addEventList('hidden', this.removeUnderlindPos);
        /***** Underlind code: start
        this.keyUnderline = this.keyDom.find('.underline');
        ****** Underlind code: end   ****/
    },
    onMouseMove: function(){
        this.time = 0;
        this.setNextPos();
    },
    onResize: function(){
        // if(this.iconToUnderlineDOM !== null){
        //     this.setToUnderlindPos();
        // }
    }
};
const $headerHandle = {
    key:'.beer-comp-header',
    keyNav: null,
    itemStepDOM: null,
    itemStepDOMChild:{
        all: null,
        now: null
    },
    sectionStepDOM: null,
    sectionStepDOMChild:{
        li: null
    },
    nowBeerDOM: null,
    nowBeerTextDOM: null,
    stepDOMInit: function(){
        this.itemStepDOM = this.keyDom.find('.beer-step');
        this.itemStepDOMChild.all = this.itemStepDOM.find('.beer-all .text');
        this.itemStepDOMChild.now = this.itemStepDOM.find('.beer-now .text');

        this.sectionStepDOM = this.keyDom.find('.beer-section-step');
        this.sectionStepDOMChild.li = this.sectionStepDOM.find('li');

        this.nowBeerDOM = this.keyDom.find('.section-scroll-text');
        this.nowBeerTextDOM = this.nowBeerDOM.find('.text');
    },
    beerStep: function(){
        this.itemStepDOMChild.all.text('/' + (beerData.length));
        this.itemStepDOMChild.now.text(threeJsControlData.activeIndex + 1);
    },
    beerSection: function(){
        this.sectionStepDOMChild.li.removeClass('active');
        this.sectionStepDOMChild.li.eq($sectionHandle.sectionActive).addClass('active');
    },
    setkeyNav: function(){
        this.keyNav = this.keyDom.find('.header-li');
    },
    keyNavEvent: function(){
        this.keyNav.on('mousedown',function(e){
            e.stopPropagation()
        });
        this.keyNav.on('mouseenter',function(e){
            $drawIconHandle.setTrackDOM(this);
            $drawIconHandle.setToUnderlindPos();
        });
        this.keyNav.on('mouseleave',function(e){
            $drawIconHandle.removeUnderlindPos();
        });
    },
    setNowBeerText: function(text){
        this.nowBeerDOM.addClass('change');
        setTimeout(()=>{
            this.nowBeerTextDOM.text(text);
            this.nowBeerDOM.addClass('changed');
            setTimeout(()=>{
                this.nowBeerDOM.removeClass('change changed');
            },410);
        },210);
        
    },
    initial: function(){
        this.stepDOMInit();
        this.beerStep();
        this.setkeyNav();
        this.keyNavEvent();
        this.setNowBeerText(beerData[threeJsControlData.activeIndex].content.section_1.title);
        
    },
    onResize:function(){}
};
const $sectionHandle = {
    key: '.content-section',
    itemChanged: true,
    itemMoving:false,
    sectionChanged: true,
    sectionMoving:false,
    sectionActive:0,
    itemChangeData:{
        activeBeer: null,
        nextBeer: null,
        moveLength: 0,
        num: 0,
        next: null 
    },
    cameraAn:{
        '180': null,
        '0'  : null,
        'x => 100': null,
        'x => -35': null
    },
    innerActivePos:threeJsControlData.activePos,
    _compareData: function(DOM, data, key){
        let dataType = Object.prototype.toString.call(data);
        if(dataType === "[object Object]"){
            this._dataEachObj(DOM, data, key);
        }
        else if(dataType === "[object Array]"){
            this._dataEachArr(DOM, data, key);
        }
        else{
            let changeDOM = DOM.find('[data-key="' + key + '"]');
            let dataFn = changeDOM.attr('data-fn');
            if(dataFn && dataFn !== ''){
                changeDOM.html(window[dataFn](data));
            }
            else{
                changeDOM.text(data);
            }
        }
    },
    _dataEachObj: function(DOM, Obj, key){
        for(let dataKey in Obj){
            this._compareData(DOM, Obj[dataKey], dataKey);
        }
    },
    _dataEachArr: function(DOM, array, key){
        array.forEach(item => {
            this._compareData(DOM.find('[data-key="' + key + '"]'), item, key);
        });
    },
    _trunCarmraAn: function(){
        this.cameraAn['180'] = 
            new TWEEN.Tween(beer.camera.position)
                .to({z:45}, 900);
        this.cameraAn['0'] = 
            new TWEEN.Tween(beer.camera.position)
                .to({z:-45}, 900);
        this.cameraAn['-180'] =
            new TWEEN.Tween(beer.camera.position)
                .to({z:45}, 1200)
                .onUpdate(()=>{
                    let x = -0.0296*Math.pow(beer.camera.position.z, 2) + 30;
                    beer.camera.position.x = x;
                });
        this.cameraAn['-0'] =
            new TWEEN.Tween(beer.camera.position)
                .to({z:-45}, 1200)
                .onUpdate(()=>{
                    let x = -0.0296*Math.pow(beer.camera.position.z, 2) + 30;
                    beer.camera.position.x = x;
                });
    },
    _changeItemContent: function(){
        let data = beerData[threeJsControlData.activeIndex].content;
        let self = this;
        $headerHandle.setNowBeerText(data.section_1.title);
        this.keyDom.each(function(i,o){
            let thisData = $(o);
            let dataName = thisData.attr('data-name');
            thisData.addClass('change');
            setTimeout(()=>{
                self._compareData(thisData, data[dataName], dataName);
                thisData.addClass('changed');
                setTimeout(()=>{
                    thisData.removeClass('change changed');
                },410);
            },210);
                
        });
    },
    changeSection: function(num){
        if(!this.itemChanged || this.itemMoving){
            return;
        }
        if(this.sectionChanged && this.sectionActive !== num){
            this.sectionChanged = false;
            this.sectionMoving = true;
            let oldActive = this.sectionActive;
            this.keyDom.eq(this.sectionActive).removeClass('show');
            this.sectionActive = num;
            this.keyDom.eq(num).addClass('show');
            let self = this;
            function sectionType(){
                self.sectionChanged = true;
                self.sectionMoving = false;
            }
            if(num === 0){
                this.cameraAn['0']
                    .easing(TWEEN.Easing.Quadratic.Out)
                    .onComplete(sectionType)
                    .start();
                threeJsControlData.mirror = 1;
            }
            else if(num === 1){
                if(oldActive === 2){
                    this.cameraAn['-180']
                        .easing(TWEEN.Easing.Quadratic.Out)
                        .onComplete(sectionType)
                        .start();
                    this.innerActivePos = threeJsControlData.activePos;
                    $threeHandle.carousel.hideFoodImg(this.itemChangeData.activeBeer).start();
                    $threeHandle.carousel.beerSizeReset(this.itemChangeData.activeBeer).start();
                }
                else{
                    this.cameraAn['180']
                        .easing(TWEEN.Easing.Quadratic.Out)
                        .onComplete(sectionType)
                        .start();
                }
                threeJsControlData.mirror = -1;
            }
            else if(num === 2){
                this.cameraAn['-0']
                    .easing(TWEEN.Easing.Quadratic.Out)
                    .onComplete(sectionType)
                    .start();
                threeJsControlData.mirror = 1;
                this.innerActivePos = threeJsControlData.smallActivePos;
                $threeHandle.carousel.showFoodImg(this.itemChangeData.activeBeer).start();
                $threeHandle.carousel.beerSizeToSmall(this.itemChangeData.activeBeer).start();

            }
            $headerHandle.beerSection();
        }
    },
    _changeItemAn: function(bool){
        if(!this.itemChanged){
            this.itemChanged = true;
            this.itemMoving = true;

            let acPosX = this.innerActivePos.x;
            let gep = this.innerActivePos.itemGap;

            threeJsControlData.activeIndex = this.itemChangeData.next;
            $headerHandle.beerStep();
            let self = this;
            let prop = self.itemChangeData.moveLength / gep;
            let speed = 900 - prop * 900;
            let activeOpacity = 1 - prop,
                nextOpacity = prop;
            let change = this.itemChangeData.next !== threeJsControlData.oldActiveIndex;
            if(!bool){
                [activeOpacity, nextOpacity] = [nextOpacity, activeOpacity];
            }
            $threeHandle.carousel
                .turnAnimation({x: self.itemChangeData.activeBeer.objs[0].position.x,
                                 opacity: activeOpacity},
                                {x: acPosX + (gep * self.itemChangeData.num * threeJsControlData.mirror),
                                 opacity: 0},
                                speed,
                                self.itemChangeData.activeBeer)
                    .onStart(()=>{
                        if(change && self.sectionActive === 2){
                            $threeHandle.carousel.hideFoodImg(self.itemChangeData.activeBeer).start();
                        }
                    })
                    .onComplete(()=>{
                        self.itemChangeData.next = null;
                        threeJsControlData.oldActiveIndex = threeJsControlData.activeIndex;
                        self.itemMoving = false;
                    })
                    .start();
            $threeHandle.carousel
                .turnAnimation({x: self.itemChangeData.nextBeer.objs[0].position.x,
                                 opacity: nextOpacity},
                                {x: acPosX,
                                 opacity: 1},
                                speed,
                                self.itemChangeData.nextBeer)
                    .onStart(()=>{
                        if(change && self.sectionActive === 2){
                            $threeHandle.carousel.showFoodImg(self.itemChangeData.nextBeer).start();
                        }
                    })
                    .onComplete(()=>{
                        self.itemChangeData.activeBeer = beerThreeData[threeJsControlData.activeIndex];
                    })
                    .start();
            if(change){
                this._changeItemContent();
            }
        } 
    },
    _drawChange: function(){
        if(!this.sectionChanged || this.sectionMoving){
            return;
        }
        if (!this.itemChanged) {
            if ($windowData.mouseDownPos.x) {
                let acPosX = this.innerActivePos.x;
                let acPosY = this.innerActivePos.y;
                let gep = this.innerActivePos.itemGap;
                let scale = this.innerActivePos.scale;

                let moveDirection = ($windowData.mouseX - $windowData.mouseDownPos.x) / 15 * threeJsControlData.mirror;
                this.itemChangeData.moveLength = Math.abs(moveDirection);
                this.itemChangeData.moveLength = this.itemChangeData.moveLength > gep ? gep : this.itemChangeData.moveLength
                this.itemChangeData.num = moveDirection > 0 ? -1 : 1;
                this.itemChangeData.num *= threeJsControlData.mirror;
                this.itemChangeData.next = $threeHandle.carousel.getNext(this.itemChangeData.num);
                let prev = $threeHandle.carousel.getNext(-this.itemChangeData.num);
                this.itemChangeData.activeBeer = beerThreeData[threeJsControlData.activeIndex];
                this.itemChangeData.nextBeer = beerThreeData[this.itemChangeData.next];
                beerThreeData[prev].transform('material', 'opacity', 0);
                beerThreeData[prev].transform('position', 'x', 50);

                //判斷在哪個section 調整大小
                function setScale(beer, type){
                    beer.transform('scale', 'x', scale);
                    beer.transform('scale', 'y', scale);
                    beer.transform('scale', 'z', scale);
                    beer.transform('position', 'y', acPosY);
                    beer.size = type;
                }

                if(this.sectionActive === 2){
                    if(this.itemChangeData.nextBeer.size === 'default'){
                        setScale(this.itemChangeData.nextBeer, 'small');
                    }
                }
                else{
                    if(this.itemChangeData.nextBeer.size === 'small'){
                        setScale(this.itemChangeData.nextBeer, 'default');
                    }
                }
                /////
                let activeNewX = acPosX - moveDirection;
                this.itemChangeData.activeBeer.transform('material', 'opacity', 1 - this.itemChangeData.moveLength / gep);
                this.itemChangeData.activeBeer.transform('position', 'x', activeNewX);

                ////
                let nextNewX = acPosX - (gep * this.itemChangeData.num * threeJsControlData.mirror) - moveDirection;
                this.itemChangeData.nextBeer.transform('material', 'opacity', this.itemChangeData.moveLength / gep);
                this.itemChangeData.nextBeer.transform('position', 'x', nextNewX);
                if (this.itemChangeData.moveLength >= gep / 2) {
                    this._changeItemAn();
                }
            }
        }
    },
    onMouseDown: function(){
        if($modalHandle.isModalOpen){ return }
        if(!this.itemMoving){
            this.itemChanged = false;
        }
    },
    onClick: function(){
        if(!this.itemMoving && !this.itemMoving){
            this.itemChanged = true;
        }
    },
    onMouseUp: function(){},
    onMouseMove: function(e){
        this._drawChange();
    },
    onDraw: function(type){
        let onNext = true;
        if(this.itemChangeData.moveLength <= 0 || this.itemChangeData.next == null){
            return;
        }
        if(!this.itemChanged){
            if(this.itemChangeData.moveLength < 5 && (type !== 'left' || type !== 'right')){
                //為了讓酒瓶回位先改變Active
                [this.itemChangeData.activeBeer, this.itemChangeData.nextBeer]= 
                [this.itemChangeData.nextBeer, this.itemChangeData.activeBeer];
                this.itemChangeData.num = -this.itemChangeData.num;
                this.itemChangeData.next = threeJsControlData.activeIndex;
                onNext = false;
            }
        }
        this._changeItemAn(onNext);
    },
    onWheel: function(type){
        if($modalHandle.isModalOpen){ return }
        let num = type === 'down'? 1 : -1;
        let next = this.sectionActive + num;
        if(next < 0 || next >= this.keyDom.length){
            return
        }
        this.changeSection(next);
    },
    initial: function(){
        this.itemChangeData.activeBeer = beerThreeData[threeJsControlData.activeIndex];
        this._trunCarmraAn();
        this._changeItemContent();
    }
}
const $threeHandle = {
    key: null,
    carousel: null,
    _setThreeData: function(){
        beerData.forEach((beer, index) => {
            beerThreeData[index] = new Beer(beer);
        });
    },
    _createWord: function(){
        let appendToDOM = document.getElementById('three-canvas');
        beer = new ThreeScene(window.innerWidth, window.innerHeight);
        beer.scene.background = materialObj.textureCube;
        beer
            .setCamera(60,
                window.innerWidth / window.innerHeight,
                0.1,
                2000,
                new THREE.Vector3(50, 10, -45),
                false)
            .setStats(document.getElementById('stats'))
            .addLight('AmbientLight', 'AmbientLight', 0x999999)
            .addLight('PointLight1', 'PointLight', 0xffffff, new THREE.Vector3(50, 150, -150))
            .addLight('PointLight2', 'PointLight', 0xffffff, new THREE.Vector3(50, 150, 150))
            .addLight('PointLight3', 'PointLight', 0x222222, new THREE.Vector3(-500, -300, 0))
            .rr()
            .rendererDOM(appendToDOM);

        // let axes = new THREE.AxesHelper(20); // 參數為座標軸長度
        // beer.scene.add(axes);
    },
    _threeJsRender: function() {
        beer.stats.update();
        requestAnimationFrame($threeHandle._threeJsRender);
        TWEEN.update();
        if(!threeJsControlData.transformXing){
            beer.camera.position.x += (threeJsControlData.mouseX - beer.camera.position.x) * 0.01;
        }
        beer.camera.position.y += (-threeJsControlData.mouseY - beer.camera.position.y) * 0.01;
        beer.camera.lookAt(beer.scene.position);
        beer.renderer.render(beer.scene, beer.camera);
        // console.log(beer.camera.position);
    }, 
    initial: function(){
        this._setThreeData();
        this._createWord();
        this.carousel = new CarouselBeer(beer.scene, beerThreeData, threeJsControlData);
        this._threeJsRender();
        $loadingHandle.setSetp(1);
        setTimeout(()=>{
            $loadingHandle.final();
        },700);
    },
    onMouseMove: function(e){
        if(!isMobile){
            let mouseX = e.clientX * threeJsControlData.mouseXPercen;
            let mouseY = e.clientY * threeJsControlData.mouseYPercen;
            threeJsControlData.mouseX =  -25 - mouseX;
            threeJsControlData.mouseY =  10 - mouseY;
        }       
    },
    onResize: function(){
        beer.resize($windowData.width, $windowData.inHeight);
        threeJsControlData.mouseXPercen = 15 / $windowData.width;
        threeJsControlData.mouseYPercen = 15 / $windowData.inHeight;
    }
}

//============   class   ==================//
    class Beer {
        constructor(data) {
            this.data = data;
            this.objs = [];
            this.foodImg = [];
            this._createBeer();
            this._createFoodImg();
            this.size = 'default';
        }
        smoothObj(geometry, subdivisions ) {
            var modifier = new SubdivisionModifier(subdivisions);
            var smoothGeometry = modifier.modify(geometry);
            return smoothGeometry
        }
        _createFn(child, childName, material) {
            child.geometry.computeFaceNormals()
            child.geometry.computeVertexNormals()
            let innerGeometry = child.geometry;
            let objSmoothNum = this.data.children[childName].objSmooth;
            
            if(objSmoothNum){
                innerGeometry = this.smoothObj(child.geometry, objSmoothNum);
            }

            let innerChild = new THREE.Mesh(innerGeometry, material);
            innerChild.name = childName;
            return innerChild;
        }
        _createBeer() {
            let self = this;
            self.data.loadedMesh.children.forEach(function(child, index) {
                let childName = child.name.toLowerCase();
                let childData = self.data.children[childName];
                let materialCustom = childData.materialCustom? childData.materialCustom: null;
                let material = materialObj[childData.material](materialCustom);
                let maps = self.data.children[childName].maps
                for (let map in maps) {
                    material[map] = materialObj._textureLoader.load(maps[map]);
                }
                self.objs.push(self._createFn(child, childName, material));
            });
        }
        _createFoodImg(){
            let material = materialObj.foodPlane(this.data.foodImage);
            var planeGeometry = new THREE.PlaneBufferGeometry(60, 48);
            var ground = new THREE.Mesh(planeGeometry, material);
            ground.name = 'food';
            this.foodImg.push(ground);
        }
        addTo(scene, objs) {
            objs = objs || 'all';
            let objsName = objs.toLowerCase();
            if(objsName === 'beer' || objsName === 'all'){
                this.objs.forEach((obj) => {
                    scene.add(obj);
                })
            }
            if(objsName === 'food' || objsName === 'all'){
                this.foodImg.forEach((obj) => {
                    scene.add(obj);
                })
            }
                
        }
        removeFrom(scene) {
            this.objs.forEach((obj) => {
                scene.remove(obj);
            })
        }
        transform(attr, axisOrNum, num, objs) {
            objs = objs === 'food'? this.foodImg: this.objs;
            objs.forEach((obj) => {
                obj[attr][axisOrNum] = num;
            });
        }
    }
    class CarouselBeer {
        constructor(scene, items, active) {
            this.scene = scene;
            this.active = active;
            this.items = items;
            this.init();
        }
        init() {
            this.items.forEach((item, index) => {
                item.transform('material', 'opacity', 0);
                item.transform('rotation', 'z', 0.5);
                item.transform('position', 'y', threeJsControlData.activePos.y);
                if(threeJsControlData.activePos.scale !== 1){
                    item.transform('scale', 'x', threeJsControlData.activePos.scale);
                    item.transform('scale', 'y', threeJsControlData.activePos.scale);
                    item.transform('scale', 'z', threeJsControlData.activePos.scale);
                }
                //food設定
                item.transform('material', 'opacity', 0, 'food');
                item.transform('position', 'x', -2, 'food');
                item.transform('position', 'z', 18, 'food');
                item.transform('rotation', 'y', Math.PI + 0.3, 'food');

                if (index === this.active.activeIndex) {
                    item.transform('material', 'opacity', 1);
                    item.transform('position', 'x', threeJsControlData.activePos.x);
                } else {
                    item.transform('position', 'x', 50);
                }
                item.addTo(this.scene);
            }, this);
        }
        turnAnimation(anData, fnData, time, beer){
            return new TWEEN.Tween(anData)
                .to(fnData, time)
                .easing(TWEEN.Easing.Quadratic.Out)
                .onUpdate(()=>{
                    beer.transform('position', 'x', anData.x);
                    beer.transform('material', 'opacity', anData.opacity);
                });
        }
        showFoodImg(beer){
            let show = new TWEEN.Tween({opacity: 0})
                        .to({opacity: 1,}, 500)
                        .easing(TWEEN.Easing.Quadratic.Out)
                        .onUpdate((opacity)=>{
                            beer.transform('material', 'opacity', opacity.opacity ,'food');
                        });
            return show;
                
        }
        hideFoodImg(beer){
            let hide = new TWEEN.Tween({opacity: 1})
                        .to({opacity: 0,}, 500)
                        .easing(TWEEN.Easing.Quadratic.Out)
                        .onUpdate((opacity)=>{
                            beer.transform('material', 'opacity', opacity.opacity ,'food');
                        });
            return hide;
        }
        beerSizeToSmall(beer){
            let toSmall = new TWEEN.Tween({ scale: threeJsControlData.activePos.scale, 
                                                x: threeJsControlData.activePos.x,
                                                y: threeJsControlData.activePos.y})
                                .to({scale: threeJsControlData.smallActivePos.scale, 
                                         x: threeJsControlData.smallActivePos.x,
                                         y: threeJsControlData.smallActivePos.y}, 700)
                                .easing(TWEEN.Easing.Quadratic.Out)
                                .onUpdate((transform)=>{
                                    beer.transform('position', 'x', transform.x);
                                    beer.transform('position', 'y', transform.y);
                                    beer.transform('scale', 'x', transform.scale);
                                    beer.transform('scale', 'y', transform.scale);
                                    beer.transform('scale', 'z', transform.scale);
                                })
                                .onComplete(()=>{
                                    beer.size = 'small';
                                });
            return toSmall;
        }
        beerSizeReset(beer){
            let sizeReset = new TWEEN.Tween({scale: threeJsControlData.smallActivePos.scale, 
                                                 x: threeJsControlData.smallActivePos.x,
                                                 y: threeJsControlData.smallActivePos.y})
                                .to({scale: threeJsControlData.activePos.scale, 
                                         x: threeJsControlData.activePos.x,
                                         y: threeJsControlData.activePos.y}, 700)
                                .easing(TWEEN.Easing.Quadratic.Out)
                                .onUpdate((transform)=>{
                                    beer.transform('position', 'x', transform.x);
                                    beer.transform('position', 'y', transform.y);
                                    beer.transform('scale', 'x', transform.scale);
                                    beer.transform('scale', 'y', transform.scale);
                                    beer.transform('scale', 'z', transform.scale);
                                })
                                .onComplete(()=>{
                                    beer.size = 'default';
                                });
            return sizeReset;
        }
        getNext(num){
            if(num === 0){ return null; }
            let next;
            if (num + this.active.activeIndex >= this.items.length) {
                next = 0;
            } else if (num + this.active.activeIndex < 0) {
                next = this.items.length - 1;
            } else {
                next = num + this.active.activeIndex;
            }
            return next;
        }
    }
    class ThreeScene {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.scene = new THREE.Scene();
            this.lightList = {};

        }
        setCamera(view, aspect, near, far, vector, control) {
            this.camera = new THREE.PerspectiveCamera(view, aspect, near, far);
            this.camera.position.set(vector.x, vector.y, vector.z);
            this.camera.lookAt(this.scene.position);
            if (control === true) {
                this.cameraControl = new THREE.OrbitControls(this.camera);
            }
            return this;
        }
        setStats(DOM) {
            const stats = new Stats();
            this.stats = stats;
            stats.setMode(0);
            DOM.appendChild(stats.domElement);
            return this;
        }
        addLight(lightName, type, color, vector) {
            this.lightList[lightName] = new THREE[type](color);
            if (type !== 'AmbientLight') {
                this.lightList[lightName].position.set(vector.x, vector.y, vector.z);
            }
            this.scene.add(this.lightList[lightName]);
            return this;
        }
        rendererDOM(DOM) {
            DOM.appendChild(this.renderer.domElement);
            return this;
        }
        resize(width, height) {
            this.width = width;
            this.height = height;
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(width, height);
            return this;
        }
        rr() {
            this.renderer = new THREE.WebGLRenderer();
            this.renderer.setSize(this.width, this.height);
            this.renderer.setClearColor(0xff2244, 1.0); // 預設背景顏色
            this.renderer.shadowMap.enable = true; // 陰影效果
            return this;
        }
    }
//============   class: end   =============//

//=============== tool ====================//
    function loadingObj(beerData, callback){
      let index = 0;
      $loadingHandle.setSetp(0.50);
      function innerLoadingObj(index){
        if(index >= beerData.length){
          callback();
          $loadingHandle.setSetp(0.70);
          return;
        }
        const loader = new THREE.OBJLoader();
        loader.load(beerData[index].objUrl, function(loadedMesh) {
            beerData[index].loadedMesh = loadedMesh
            index++;
            innerLoadingObj(index);
          });
      }
      innerLoadingObj(index);
    }
    function numToChart(num){
        let chart =    $(`<div class="chart-list">
                            <ul class="chart-ul">
                                <li class="chart-li"></li>
                                <li class="chart-li"></li>
                                <li class="chart-li"></li>
                                <li class="chart-li"></li>
                                <li class="chart-li"></li>
                            </ul>
                        </div>`);
        let chartLi = chart.find('li');
        if(num >= 1){
           for(let i = 0; i < num; i++){
                chartLi.eq(i).addClass('whole');
            } 
        }
        if(num % 1 > 0){
            chartLi.eq(Math.floor(num)).addClass('half');
        }
        return chart;
    }
    function CteatrEasing(x1, y1, x2, y2){
        return function(t){
            return bezier_point(t, [0,0], [x1, y1], [x2, y2], [1,1])[1];
        }
    }
    function bezier_coordinate(t, n0, n1, n2, n3){
        return  n0 * Math.pow((1 - t), 3) + 
                3  * n1 * t * Math.pow((1 - t), 2) + 
                3  * n2 * Math.pow(t, 2) * (1 - t) + 
                n3 * Math.pow(t, 3);
    }
    function bezier_point(t, p0, p1, p2, p3){
        return [bezier_coordinate(t, p0[0], p1[0], p2[0], p3[0]),
                bezier_coordinate(t, p0[1], p1[1], p2[1], p3[1])];
    }
    
//=============== tool: end ===============//


//===========   plugin function ============//

//===========   plugin function: end =======//













