'use strict';
// 預防IE出錯

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

if (window.console == undefined) {
    var em = function em() {};window.console = { log: em, debug: em, info: em, warn: em };
}
if (typeof console == '') {
    var em = function em() {};console = { log: em, debug: em, info: em, warn: em };
}
if (console.log == undefined || console.log == 'undefined') {
    var em = function em() {};console.log = em;
}
if (console.debug == undefined || console.debug == 'undefined') {
    var em = function em() {};console.debug = em;
}
if (console.info == undefined || console.info == 'undefined') {
    var em = function em() {};console.info = em;
}
if (console.warn == undefined || console.warn == 'undefined') {
    var em = function em() {};console.warn = em;
}
// end : 預防IE出錯

//===========   bindingEvent function     ===========//
function ajaxEvent() {
    detectWebGLContext({
        supported: function supported() {
            $.ajax({
                url: './JSON/beer-data.json', // url位置
                type: 'get', // post/get
                dataType: "text",
                error: function error(xhr) {
                    console.log(xhr);
                }, // 錯誤後執行的函數
                success: function success(response) {
                    function run() {
                        window.beerData = $.parseJSON(response);
                        $loadingHandle.keyDom = $($loadingHandle.key);
                        $loadingHandle.setSetp(0.25);
                        loadingObj(beerData, bindingEvent);
                    }

                    detectIE({
                        isIE: function isIE(version) {
                            getInclude('./include/include-error-ie.html', function (response) {
                                var IeDOM = $(response);
                                var year = new Date().getFullYear();
                                IeDOM.find('.error-text .text').html('No one is using IE in ' + year + '<br>It may make you have a bad experience');
                                if (version <= 10) {
                                    IeDOM.find('.error-small-btn-content').remove();
                                } else if (version === 11) {
                                    IeDOM.find('.error-small-btn-content .link-content').on('click', function (e) {
                                        e.preventDefault();
                                        IeDOM.remove();
                                        run();
                                    });
                                }
                                $('body').append(IeDOM);
                            });
                        },
                        notIE: function notIE() {
                            run();
                        }
                    });
                } // 成功後要執行的函數
            });
        },
        enabled: function enabled() {
            getInclude('./include/include-error-webgl.html', function (response) {
                $('body').html(response);
            });
        }
    });
}
function bindingEvent() {
    var _initial = [$headerHandle, $modalHandle, $threeHandle, $sectionHandle, $drawIconHandle, $inputHandle, $textareaHandle, $contactHandle, $loadingHandle, $windowSizeHandle, $mobileScrollHandle, $tooltipHandle];
    var _onResize = [],
        _onScroll = [],
        _onDraw = [],
        _onMouseMove = [],
        _onMouseDown = [],
        _onMouseUp = [],
        _onClick = [],
        _onWheel = [],
        _onRotate = [];
    var _whellLength = 0,
        _whellFn = false;
    //判斷手機為body新增class
    if (isMobile) {
        $('body').addClass('isMobile');
    }

    //初始所有initial function
    $.each(_initial, function (i, o) {
        if (typeof o.key === 'string') {
            o.keyDom = $(o.key);
            o.keyHas = o.keyDom.length > 0;
        }

        if (o.hasOwnProperty('initial')) {
            o.initial();
        }
        //判斷此物件是否有要resize的function
        if (o.hasOwnProperty('onResize')) {
            _onResize.push(o);
        }
        //判斷此物件是否有要scroll的function
        if (o.hasOwnProperty('onScroll')) {
            _onScroll.push(o);
        }
        //判斷此物件是否有要DrawLeft的function
        if (o.hasOwnProperty('onDraw')) {
            _onDraw.push(o);
        }
        //判斷此物件是否有要MouseMove的function
        if (o.hasOwnProperty('onMouseMove')) {
            _onMouseMove.push(o);
        }
        //判斷此物件是否有要MouseDown的function
        if (o.hasOwnProperty('onMouseDown')) {
            _onMouseDown.push(o);
        }
        //判斷此物件是否有要Mouseup的function
        if (o.hasOwnProperty('onMouseUp')) {
            _onMouseUp.push(o);
        }
        //判斷此物件是否有要onWheel的function
        if (o.hasOwnProperty('onWheel')) {
            _onWheel.push(o);
        }
        //判斷此物件是否有要onClick的function
        if (o.hasOwnProperty('onClick')) {
            _onClick.push(o);
        }
        //判斷此物件是否有要onRotate的function
        if (o.hasOwnProperty('onRotate')) {
            _onRotate.push(o);
        }
    });
    //each動作
    function eachEvent(eventArray, eventName, booleanName, time, data, beforeFn) {
        if (!eventData[booleanName]) {
            eventData[booleanName] = true;
            setTimeout(function () {
                if (beforeFn) {
                    beforeFn();
                }
                $.each(eventArray, function (i, o) {
                    o[eventName](data);
                });
                eventData[booleanName] = false;
            }, time);
        }
    }
    //Resize動作
    windowJquery.resize(function () {
        eachEvent(_onResize, 'onResize', 'isResize', 200, null, function () {
            $windowData.width = windowJquery.outerWidth();
            $windowData.oldInHeight = $windowData.inHeight;
            $windowData.inHeight = window.innerHeight;
            isMobileContent = isMobile && $windowData.width <= 900;
            $windowData.aspectRatio.old = $windowData.aspectRatio.now;
            $windowData.aspectRatio.now = $windowData.inHeight / $windowData.width;
        });
    });
    //wheel動作
    $('body').on('mousewheel', function (event, delta, deltaX, deltaY) {
        if (!eventData.isWheel) {
            _whellLength = 0;
            eventData.isWheel = true;
        } else {
            _whellLength += delta;
            if (!_whellFn && Math.abs(_whellLength) >= 3) {
                _whellFn = true;
                var wheelType = null;
                if (_whellLength <= -3) {
                    wheelType = 'down';
                } else if (_whellLength >= 3) {
                    wheelType = 'up';
                }
                $.each(_onWheel, function (i, o) {
                    o.onWheel(wheelType);
                });
            }
        }
        setTimeout(function () {
            eventData.isWheel = false;
            _whellFn = false;
        }, 200);
    });
    windowJquery.on('scroll', function (e) {
        eachEvent(_onScroll, 'onScroll', 'isScroll', 50);
    });
    //mousemove動作
    windowJquery.on('mousemove touchmove', function (e) {
        eachEvent(_onMouseMove, 'onMouseMove', 'isMouseMove', 5, e, function () {
            $windowData.mouseX = typeof e.pageX === 'number' ? e.pageX : e.originalEvent.touches[0].pageX;
            $windowData.mouseY = typeof e.pageY === 'number' ? e.pageY : e.originalEvent.touches[0].pageY;
            if ($windowData.mouseDownPos.x) {
                $windowData.mouseDownMoveLength.x = $windowData.mouseDownPos.x - $windowData.mouseX;
                $windowData.mouseDownMoveLength.y = $windowData.mouseDownPos.y - $windowData.mouseY;
            } else {
                $windowData.mouseDownMoveLength.x = null;
                $windowData.mouseDownMoveLength.y = null;
            }
        });
    });
    //mousedown動作
    windowJquery.on('mousedown touchstart', function (e) {
        $windowData.mouseX = typeof e.pageX === 'number' ? e.pageX : e.originalEvent.touches[0].pageX;
        $windowData.mouseY = typeof e.pageY === 'number' ? e.pageY : e.originalEvent.touches[0].pageY;
        eachEvent(_onMouseDown, 'onMouseDown', 'isMouseDown', 50);
        var xPos = $windowData.mouseX,
            yPos = $windowData.mouseY;
        var timeStart = Date.now();
        $windowData.mouseDownPos.x = xPos;
        $windowData.mouseDownPos.y = yPos;
        //mouseup動作
        windowJquery.off('mouseup touchend').on('mouseup touchend', function (e2) {
            var xPosFn = $windowData.mouseX,
                yPosFn = $windowData.mouseY;
            $windowData.mouseDownPos.x = null;
            $windowData.mouseDownPos.y = null;
            var timeEnd = Date.now() - timeStart;
            var xMoveLength = xPosFn - xPos,
                yMoveLength = yPosFn - yPos;
            var xMoveLengthAbs = Math.abs(xMoveLength),
                yMoveLengthAbs = Math.abs(yMoveLength);

            var drawType = null;
            //onDraw動作
            if (xMoveLengthAbs > yMoveLengthAbs) {
                if (timeEnd < 300 && xMoveLengthAbs > 50 || xMoveLengthAbs * 3 > $windowData.width) {
                    if (xMoveLength > 0) {
                        drawType = 'left';
                    } else {
                        drawType = 'right';
                    }
                }
            } else {
                if (timeEnd < 300 && yMoveLengthAbs > 50 || yMoveLengthAbs * 3 > $windowData.inHeight) {
                    if (yMoveLength > 0) {
                        drawType = 'up';
                    } else {
                        drawType = 'down';
                    }
                }
            }
            eachEvent(_onMouseUp, 'onMouseUp', 'isMouseUp', 50);
            eachEvent(_onDraw, 'onDraw', 'isDraw', 50, drawType);
        });
    });
    //body click動作
    windowJquery.on('click', function () {
        eachEvent(_onClick, 'onClick', 'isClick', 50);
    });
}

//===========   bindingEvent function: end ===========//
var windowJquery = $(window);

var eventData = {
    isResize: false,
    isScroll: false,
    isClick: false,
    isWheel: false,
    isDraw: false,
    isMouseDown: false,
    isMouseUp: false,
    isMouseMove: false
};
var $windowData = { width: windowJquery.outerWidth(),
    inHeight: window.innerHeight,
    oldInHeight: window.innerHeight,
    aspectRatio: {
        now: 0,
        old: 0
    },
    scrollTop: windowJquery.scrollTop(),
    mouseX: 0,
    mouseY: 0,
    mouseDownPos: { x: null, y: null },
    mouseDownMoveLength: { x: null, y: null }
};
$windowData.aspectRatio.now = $windowData.aspectRatio.old = $windowData.inHeight / $windowData.width;
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
// isMobile = true;
var isMobileContent = isMobile && $windowData.width <= 900;
var beer = void 0;

var threeJsControlData = {
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
    transformXing: false,
    bastSizeLimit: {
        height: 800,
        ratio: 0.625
    },
    foodPosData: {
        'larger900': { scale: 1,
            position: { x: -2,
                y: 0,
                z: 18 },
            rotation: { y: Math.PI + 0.3 }
        },
        'smaller900&larger480': { scale: 1,
            position: { x: 18,
                y: 8,
                z: 18 },
            rotation: { y: Math.PI + 1 }
        },
        'smaller480': { scale: 0.8,
            position: { x: 20,
                y: 10,
                z: 18 },
            rotation: { y: Math.PI + 1 }
        }
    },
    windowActivePosData: {
        'larger900': {
            activePosSection1: { scale: 1.2,
                position: { x: -22,
                    y: -3 },
                rotation: { z: 0.5 },
                itemGap: 30 },
            activePosSection2: 'activePosSection1',
            activePosSection3: { scale: 0.5,
                position: { x: -30,
                    y: -5 },
                rotation: { z: 0.5 },
                itemGap: 20 }
        },
        'smaller900&larger480': {
            activePosSection1: { scale: 1,
                position: { x: 0,
                    y: 3 },
                rotation: { z: 0.5 },
                itemGap: 30 },
            activePosSection2: { scale: 1.2,
                position: { x: 20,
                    y: 5 },
                rotation: { z: 0.5 },
                itemGap: 50 },
            activePosSection3: { scale: 0.5,
                position: { x: -18,
                    y: -1 },
                rotation: { z: 0.5 },
                itemGap: 20 }
        },
        'smaller480': {
            activePosSection1: { scale: 0.7,
                position: { x: 0,
                    y: 5 },
                rotation: { z: 0.5 },
                itemGap: 30 },
            activePosSection2: { scale: 1.2,
                position: { x: 15,
                    y: 5 },
                rotation: { z: 0.9 },
                itemGap: 50 },
            activePosSection3: { scale: 0.5,
                position: { x: -10,
                    y: 2 },
                rotation: { z: 0.5 },
                itemGap: 20 }
        }
    },
    activePos: null,
    activePosSection2: null,
    activePosSection3: null,
    foodPos: null
};

var beerThreeData = [];
//設定材質
var materialObj = {
    _glassMaterialData: {
        urls: ["./img/white-room/px.jpg", "./img/white-room/nx.jpg", "./img/white-room/py.jpg", "./img/white-room/ny.jpg", "./img/white-room/pz.jpg", "./img/white-room/nz.jpg"]
    },
    textureCube: null,
    _textureLoader: new THREE.TextureLoader(),
    _CubeTextureLoader: new THREE.CubeTextureLoader(),
    glassMaterial: function glassMaterial(custom) {
        var self = this;
        var defaultSetting = {
            color: 0xffffff,
            flatShading: true,
            envMap: self.textureCube,
            transparent: true,
            side: THREE.BackSide,
            shininess: 100
        };
        if ((typeof custom === 'undefined' ? 'undefined' : _typeof(custom)) === "object") {
            $.extend(defaultSetting, custom);
        }
        return new THREE.MeshPhongMaterial(defaultSetting);
    },
    coverAndLogo: function coverAndLogo(custom) {
        var defaultSetting = {
            metalness: 0.05,
            roughness: 0.9,
            side: THREE.DoubleSide,
            transparent: true
        };
        if ((typeof custom === 'undefined' ? 'undefined' : _typeof(custom)) === "object") {
            $.extend(defaultSetting, custom);
        }
        return new THREE.MeshStandardMaterial(defaultSetting);
    },
    foodPlane: function foodPlane(url) {
        return new THREE.MeshBasicMaterial({
            color: 0xffffff,
            map: materialObj._textureLoader.load(url),
            transparent: true
        });
    }
};
materialObj.textureCube = materialObj._CubeTextureLoader.load(materialObj._glassMaterialData.urls);
materialObj.textureCube.mapping = THREE.CubeRefractionMapping;
//還景貼圖


//===========
var $tooltipHandle = {
    key: '.beer-comp-tooltip',
    template: ' \n            <div class="beer-comp-tooltip">\n                <div class="tooltip-content">\n                    <div class="tooltip-info">\n                        <div class="left-content">\n                            <div class="img-content">\n                                <img src="" alt="" class="img" draggable="false">\n                            </div>\n                        </div>\n                        <div class="right-content">\n                            <div class="title-content">\n                                <span class="text"></span>\n                            </div>\n                            <div class="text-content">\n                                <span class="text"></span>\n                            </div>\n                        </div>\n                    </div>\n                    <div class="tooltip-arrow"></div>\n                </div>\n            </div>',
    DOMsList: [],
    hasOpen: false,
    bindingEvent: function bindingEvent(jsDOM) {
        var self = this;
        var thisJsDOM = $(jsDOM);
        thisJsDOM.on('click', function (e) {
            self.closeAll();
            e.stopPropagation();
            e.preventDefault();
            thisJsDOM.addClass('active');
            self.handlePos($(this));
            self.hasOpen = true;
        });
        this.DOMsList.push(thisJsDOM);
    },
    closeAll: function closeAll() {
        if (this.hasOpen) {
            this.DOMsList.forEach(function (DOM) {
                DOM.removeClass('active');
            });
            this.hasOpen = false;
        }
    },
    handlePos: function handlePos(DOM) {
        var infoContent = DOM.find('.tooltip-content');
        infoContent.css('margin-left', '');
        var infoContentJs = infoContent.get(0);
        var infoContentPos = infoContentJs.getBoundingClientRect();
        var arrow = DOM.find('.tooltip-arrow');
        arrow.css('margin-left', '');
        if (infoContentPos.left < 20) {
            var margin = 20 - infoContentPos.left;
            infoContent.css('margin-left', margin + 'px');
            arrow.css('margin-left', -margin + 'px');
        } else if (infoContentPos.right - $windowData.width > 20) {
            var _margin = infoContentPos.right - $windowData.width;
            infoContent.css('margin-left', -_margin + 'px');
            arrow.css('margin-left', _margin + 'px');
        }
    },
    onResize: function onResize() {
        if (this.hasOpen) {
            var _self = this;
            this.keyDom.each(function (_, DOM) {
                _self.handlePos($(DOM));
            });
        }
    },
    onClick: function onClick() {
        this.closeAll();
    },
    initial: function initial() {
        var self = this;
        this.keyDom.each(function (_, DOM) {
            self.bindingEvent(DOM);
        });
    }
};
var $mobileScrollHandle = {
    key: '.layout-content .layout-row',
    onInnerScrollObjs: [],
    scrollData: {
        oldScrollTop: 0,
        scrollTop: 0,
        direction: 0
    },
    addEventList: function addEventList(obj, fns) {
        var data = {
            obj: obj,
            fns: fns
        };
        this.onInnerScrollObjs.push(data);
    },
    scrollTop: function scrollTop(num) {
        this.keyDom.scrollTop(num);
    },
    onInnerScroll: function onInnerScroll(data) {
        var self = $mobileScrollHandle;
        self.scrollData.scrollTop = this.scrollTop;
        self.scrollData.direction = self.scrollData.scrollTop - self.scrollData.oldScrollTop;
        self.scrollData.oldScrollTop = this.scrollTop;
        data.scrollData = self.scrollData;
        self.onInnerScrollObjs.forEach(function (fnData) {
            fnData.fns.forEach(function (fn) {
                fnData.obj[fn](data);
            });
        });
    },
    initial: function initial() {
        this.keyDom.on('scroll', this.onInnerScroll);
    }
};
var $windowSizeHandle = {
    key: '.beer-comp-window-size',
    keyBeers: null,
    invertedBeer: [],
    invertedClass: ['inverted-right', 'inverted-left'],
    keyArrow: {
        height: null,
        width: null
    },
    keyPrompt: null,
    windowWidthSmall: false,
    windowHeightSmall: false,
    _initChildDOM: function _initChildDOM() {
        this.keyBeers = this.keyDom.find('.beer-content');
        this.keyArrow.height = this.keyDom.find('.hendle-height');
        this.keyArrow.width = this.keyDom.find('.hendle-width');
        this.keyPrompt = this.keyDom.find('.prompt-text');
    },
    handleSize: function handleSize() {
        if ($windowData.width <= 900) {
            this.windowWidthSmall = true;
        }
        if ($windowData.inHeight <= 500) {
            this.windowHeightSmall = true;
        }
    },
    handleArrow: function handleArrow() {
        if (this.windowWidthSmall) {
            this.keyArrow.width.addClass('show');
        } else {
            this.keyArrow.width.removeClass('show');
        }
        if (this.windowHeightSmall) {
            this.keyArrow.height.addClass('show');
        } else {
            this.keyArrow.height.removeClass('show');
        }
    },
    handleBeerInverted: function handleBeerInverted() {
        var self = this;

        this.keyBeers.each(function (i, beer) {
            var beerPos = beer.getBoundingClientRect();
            if (self.invertedBeer.indexOf(beer) === -1) {
                if (beerPos.left <= 0) {
                    beer.classList.add('inverted-right');
                    self.invertedBeer.push(beer);
                } else if (beerPos.right > $windowData.width) {
                    beer.classList.add('inverted-left');
                    self.invertedBeer.push(beer);
                } else if (beerPos.top < 0) {
                    beer.classList.add(arrayRandom(self.invertedClass));
                    self.invertedBeer.push(beer);
                }
            }
        });
    },
    handlePromptText: function handlePromptText() {
        if (this.invertedBeer.length) {
            this.keyPrompt.addClass('toggle');
        }
        if (this.invertedBeer.length === this.keyBeers.length) {
            this.keyPrompt.addClass('toggle-2');
        }
    },
    reset: function reset() {
        this.windowWidthSmall = false;
        this.windowHeightSmall = false;
        this.keyDom.removeClass('show');
        this.invertedBeer.forEach(function (beer) {
            beer.classList.remove('inverted-right');
            beer.classList.remove('inverted-left');
        });
        this.invertedBeer = [];
        this.keyArrow.height.removeClass('show');
        this.keyArrow.width.removeClass('show');
        this.keyPrompt.removeClass('toggle toggle-2');
    },
    handleAll: function handleAll() {
        if (isMobile) {
            return;
        }
        this.handleSize();
        if (this.windowWidthSmall || this.windowHeightSmall) {
            this.keyDom.addClass('show');
            this.handleArrow();
            this.handleBeerInverted();
            this.handlePromptText();
            if ($windowData.width > 900) {
                this.windowWidthSmall = false;
            }
            if ($windowData.inHeight > 500) {
                this.windowHeightSmall = false;
            }
            if (!this.windowWidthSmall && !this.windowHeightSmall) {
                this.reset();
            }
        }
    },
    onResize: function onResize() {
        this.handleAll();
    },
    initial: function initial() {
        this._initChildDOM();
        this.handleAll();
    }
};
var $loadingHandle = {
    key: '.beer-comp-loading',
    stepType: [25, 50, 70, 100],
    setSetp: function setSetp(num) {
        num = Math.floor(num * 100);
        var result = this.stepType.filter(function (typeNum, index) {
            return num <= typeNum;
        })[0] || 0;
        this.keyDom.addClass('step' + result);
    },
    final: function final() {
        var _this = this;

        this.keyDom.addClass('start');
        setTimeout(function () {
            _this.keyDom.hide();
        }, 1000);
    },
    initial: function initial() {
        this.keyDom.on('click mousedown mouseup', function (e) {
            e.preventDefault();
            e.stopPropagation();
        });
    }
};
var $contactHandle = {
    key: '#popup-contact',
    keyContent: null,
    keyButton: null,
    keyForm: null,
    sandAnEasing: CteatrEasing(0.57, -0.59, 0.95, -0.39),
    isSand: false,
    sandAn: function sandAn() {
        return new TWEEN.Tween({ y: 0, rotate: 0, scale: 1 }).to({ y: -1000, rotate: 150, scale: 0.6 }, 1000).easing(this.sandAnEasing);
    },
    _initChildDOM: function _initChildDOM() {
        this.Button = this.keyDom.find('.modal-footer .btn-content .link-content');
        this.keyContent = this.keyDom.find('.modal-content');
        this.keyForm = this.keyDom.find('form');
    },
    _initEvent: function _initEvent() {
        var _this2 = this;

        var self = this;
        this.Button.on('click', function (e) {
            e.preventDefault();
            self.submitAn();
        });
        this.keyDom.on('hidden.bs.modal', function () {
            _this2.submitAnReset();
        });
    },
    submitAn: function submitAn() {
        var _this3 = this;

        this.keyDom.addClass('contact-to-white');
        this.keyContent.css('height', this.keyContent.height() + 'px');
        this.isSand = true;
        setTimeout(function () {
            if (!_this3.isSand) {
                return;
            }
            _this3.keyDom.addClass('contact-to-mail');
            setTimeout(function () {
                if (!_this3.isSand) {
                    return;
                }
                _this3.keyDom.addClass('contact-mail-close');
                setTimeout(function () {
                    if (!_this3.isSand) {
                        return;
                    }
                    _this3.keyDom.addClass('contact-sand');
                    _this3.sandAn().onUpdate(function (e) {
                        if (!_this3.isSand) {
                            return;
                        }
                        var transform = 'translateY(' + e.y + 'px) rotate(' + e.rotate + 'deg) scale(' + e.scale + ')';
                        _this3.keyContent.css('transform', transform);
                    }).start();
                }, 500);
            }, 700);
        }, 800);
    },
    submitAnReset: function submitAnReset() {
        if (this.isSand) {
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
    initial: function initial() {
        this._initChildDOM();
        this._initEvent();
    }
};
var $inputHandle = {
    key: '.beer-form-el-input',
    keyFormDOM: null,
    _initChildDOM: function _initChildDOM() {
        this.keyFormDOM = this.keyDom.find('input');
    },
    _initEvent: function _initEvent() {
        var self = this;
        this.keyFormDOM.on('focus', function () {
            $(this).parents(self.key).addClass('is-focus');
        });
        this.keyFormDOM.on('blur', function () {
            var thisInput = $(this);
            if (thisInput.val() === '') {
                thisInput.parents(self.key).removeClass('is-focus');
            }
        });
    },
    checkAllVal: function checkAllVal(target) {
        target = target ? $(target).find('.beer-form-el-input input') : $inputHandle.keyFormDOM;
        target.each(function (_, DOM) {
            var thisDOM = $(DOM);
            var thisDOMParent = thisDOM.parents($inputHandle.key);
            if (thisDOM.val() !== '') {
                thisDOMParent.addClass('is-focus');
            } else {
                thisDOMParent.removeClass('is-focus');
            }
        });
    },
    initial: function initial() {
        this._initChildDOM();
        this._initEvent();
        this.checkAllVal();
    }
};
var $textareaHandle = {
    key: '.beer-form-el-textarea',
    keyFormDOM: null,
    _initChildDOM: function _initChildDOM() {
        this.keyFormDOM = this.keyDom.find('textarea');
    },
    _initEvent: function _initEvent() {
        $inputHandle._initEvent.call(this);
        var self = this;
        this.keyFormDOM.on('input', function () {
            self._checkSize(this);
        });
    },
    checkAllVal: function checkAllVal(target) {
        target = target ? $(target).find('.beer-form-el-textarea textarea') : $textareaHandle.keyFormDOM;
        target.each(function (_, DOM) {
            var thisDOM = $(DOM);
            var thisDOMParent = thisDOM.parents($textareaHandle.key);
            if (thisDOM.val() !== '') {
                thisDOMParent.addClass('is-focus');
            } else {
                thisDOMParent.removeClass('is-focus');
            }
        });
    },
    checkAllSize: function checkAllSize(target) {
        target = target ? $(target).find('.beer-form-el-textarea textarea') : $textareaHandle.keyFormDOM;
        target.each(function (_, DOM) {
            $textareaHandle._checkSize(DOM);
        });
    },
    _checkSize: function _checkSize(textarea) {
        var fnHeight = 120;
        textarea.style.height = '120px';
        fnHeight = textarea.scrollHeight > 120 ? textarea.scrollHeight : 120;
        textarea.style.height = fnHeight + 'px';
    },
    onResize: function onResize() {
        this.checkAllSize();
    },
    initial: function initial() {
        this._initChildDOM();
        this._initEvent();
        this.checkAllVal();
        $modalHandle.addEventList('shown', this.checkAllSize);
    }
};
var $modalHandle = {
    key: '.modal',
    isModalOpen: false,
    eventsList: {
        'show': [],
        'shown': [],
        'hide': [],
        'hidden': []
    },
    _initBindEvent: function _initBindEvent() {
        var _this4 = this;

        var self = this;

        var _loop = function _loop(events) {
            _this4.keyDom.on(events + '.bs.modal', function (e) {
                self.eventsList[events].forEach(function (event) {
                    event(e.target);
                });
            });
        };

        for (var events in this.eventsList) {
            _loop(events);
        }
    },
    _initDefaultEvent: function _initDefaultEvent() {
        var _this5 = this;

        this.addEventList('show', function () {
            _this5.isModalOpen = true;
            $('body').addClass('content-blur');
        });
        this.addEventList('hidden', function () {
            _this5.isModalOpen = false;
            $('body').removeClass('content-blur');
        });
    },
    addEventList: function addEventList(name, event) {
        this.eventsList[name].push(event);
    },
    reomveEventList: function reomveEventList(name, event) {
        var thisEvents = this.eventsList[name];
        var index = thisEvent.indexOf(event);
        if (index > -1) {
            thisEvents.splice(index, 1);
        }
    },
    initial: function initial() {
        this._initBindEvent();
        this._initDefaultEvent();
    }
};
var $drawIconHandle = {
    key: '#draw-icon',
    keyUnderline: null,
    keyCircle: null,
    time: 0,
    countTime: null,
    mouseTrack: true,
    iconToUnderlineDOM: null,
    mousePos: {
        x: 0,
        y: 0,
        nextX: 0,
        nextY: 0
    },
    handleShow: function handleShow() {
        if (this.time > 5) {
            this.keyDom.addClass('hide');
            this.time = 0;
            clearInterval(this.countTime);
            this.countTime = null;
        }
    },
    stopMouseTrack: function stopMouseTrack() {
        this.mouseTrack = false;
    },
    startMouseTrack: function startMouseTrack() {
        this.mouseTrack = true;
    },
    setPos: function setPos() {
        var _this6 = this;

        setInterval(function () {
            if ($modalHandle.isModalOpen) {
                return;
            }

            _this6.mousePos.x += (_this6.mousePos.nextX - _this6.mousePos.x) * 0.1;
            _this6.mousePos.y += (_this6.mousePos.nextY - _this6.mousePos.y) * 0.1;
            _this6.keyDom.css('left', _this6.mousePos.x + 'px');
            _this6.keyDom.css('top', _this6.mousePos.y + 'px');
        }, 10);
    },
    setNextPos: function setNextPos() {
        if (this.mouseTrack) {
            this.mousePos.nextX = $windowData.mouseX - 25;
            this.mousePos.nextY = $windowData.mouseY - 25;
        }
    },
    setTrackDOM: function setTrackDOM(DOM) {
        this.iconToUnderlineDOM = DOM;
    },
    setToUnderlindPos: function setToUnderlindPos() {
        if ($modalHandle.isModalOpen) {
            return;
        }
        this.stopMouseTrack();
        var thisPos = this.keyDom.get(0).getBoundingClientRect();
        var DOM = this.iconToUnderlineDOM;
        var DOMPos = DOM.getBoundingClientRect();
        this.keyDom.addClass('hide-arraw hide-scroll');

        /*******to button: start*******/

        var width = DOMPos.width,
            height = DOMPos.height;

        var top = DOMPos.top - (thisPos.height - height) / 2,
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
    removeUnderlindPos: function removeUnderlindPos() {
        if ($modalHandle.isModalOpen) {
            return;
        }
        var self = this || $drawIconHandle;
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
    initial: function initial() {
        if (isMobile) {
            return;
        }

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
    onMouseMove: function onMouseMove() {
        if (isMobile) {
            return;
        }
        this.time = 0;
        this.setNextPos();
    }
};
var $headerHandle = {
    key: '.beer-comp-header',
    navDOM: null,
    logoDOM: null,
    itemStepDOM: null,
    itemStepDOMChild: {
        all: null,
        now: null
    },
    sectionStepDOM: null,
    sectionStepDOMChild: {
        li: null
    },
    nowBeerDOM: null,
    nowBeerTextDOM: null,
    childDOMInit: function childDOMInit() {
        this.itemStepDOM = this.keyDom.find('.beer-step');
        this.itemStepDOMChild.all = this.itemStepDOM.find('.beer-all .text');
        this.itemStepDOMChild.now = this.itemStepDOM.find('.beer-now .text');

        this.sectionStepDOM = this.keyDom.find('.beer-section-step');
        this.sectionStepDOMChild.li = this.sectionStepDOM.find('li');

        this.nowBeerDOM = this.keyDom.find('.section-scroll-text');
        this.nowBeerTextDOM = this.nowBeerDOM.find('.text');

        this.navDOM = this.keyDom.find('.header-li');
        this.logoDOM = this.keyDom.find('.header-logo');
    },
    beerStep: function beerStep() {
        this.itemStepDOMChild.all.text(beerData.length);
        this.itemStepDOMChild.now.text(threeJsControlData.activeIndex + 1);
    },
    beerSection: function beerSection() {
        this.sectionStepDOMChild.li.removeClass('active');
        this.sectionStepDOMChild.li.eq($sectionHandle.sectionActive).addClass('active');
    },
    childrenEvent: function childrenEvent() {
        if (isMobile) {
            return;
        }
        this.navDOM.on('mousedown', function (e) {
            e.stopPropagation();
        }).on('mouseenter', function (e) {
            $drawIconHandle.setTrackDOM(this);
            $drawIconHandle.setToUnderlindPos();
        }).on('mouseleave', function (e) {
            $drawIconHandle.removeUnderlindPos();
        });

        this.logoDOM.on('mouseenter', function (e) {
            $drawIconHandle.setTrackDOM(this);
            $drawIconHandle.setToUnderlindPos();
            $drawIconHandle.keyDom.addClass('hide');
        }).on('mouseleave', function (e) {
            $drawIconHandle.removeUnderlindPos();
            $drawIconHandle.keyDom.removeClass('hide');
        });
    },
    setNowBeerText: function setNowBeerText(text) {
        var _this7 = this;

        this.nowBeerDOM.addClass('change');
        setTimeout(function () {
            _this7.nowBeerTextDOM.text(text);
            _this7.nowBeerDOM.addClass('changed');
            setTimeout(function () {
                _this7.nowBeerDOM.removeClass('change changed');
            }, 410);
        }, 210);
    },
    initial: function initial() {
        this.childDOMInit();
        this.beerStep();
        this.childrenEvent();
        this.setNowBeerText(beerData[threeJsControlData.activeIndex].content.section_1.title);
    },
    onResize: function onResize() {}
};
var $sectionHandle = {
    key: '.content-section',
    itemChanged: true,
    itemMoving: false,
    HasMovingType: false,
    sectionChanged: true,
    sectionMoving: false,
    sectionActive: 0,
    nowSectionAn: null,
    nowBeerAn: null,
    nowFoodAn: null,
    mobileScrolling: false,
    itemChangeData: {
        activeBeer: null,
        nextBeer: null,
        moveLength: 0,
        num: 0,
        next: null
    },
    cameraAn: {
        '180': null,
        '0': null,
        '-180': null,
        '-0': null
    },
    innerActivePos: null,
    dataFunction: {
        numToChart: {
            numToChartListDOM: {},
            fn: function fn(key, num) {
                var innerKey = key + num;
                if (this.numToChartListDOM[innerKey]) {
                    return this.numToChartListDOM[innerKey];
                }
                var chart = $('<div class="chart-list">\n                                    <ul class="chart-ul">\n                                        <li class="chart-li"></li>\n                                        <li class="chart-li"></li>\n                                        <li class="chart-li"></li>\n                                        <li class="chart-li"></li>\n                                        <li class="chart-li"></li>\n                                    </ul>\n                                </div>');
                var chartLi = chart.find('li');
                if (num >= 1) {
                    for (var i = 0; i < num; i++) {
                        chartLi.eq(i).addClass('whole');
                    }
                }
                if (num % 1 > 0) {
                    chartLi.eq(Math.floor(num)).addClass('half');
                }
                this.numToChartListDOM[innerKey] = chart;
                return chart;
            }
        },
        tooltip: {
            glasswareData: {
                'tulip': {
                    img: './img/glessware/glassware_tulip.svg',
                    text: 'Its short stem facilitates swirling, further enhancing your sensory experience.'
                },
                'pint glass': {
                    img: './img/glessware/glassware_pint-glass.svg',
                    text: 'The pint glass’s basic design neither enhances nor seriously detracts from any particular beer style.'
                }
            },
            glasswareDOM: {},
            parent: null,
            fn: function fn(key, type, DOM) {
                var innertype = type.toLowerCase();
                var innerKey = key + innertype;
                var data = this.glasswareData[innertype];
                var result = void 0;
                if (this.glasswareDOM[innerKey]) {
                    result = this.glasswareDOM[innerKey];
                } else if (data) {
                    result = $($tooltipHandle.template).find('.tooltip-content').clone();
                    result.find('.title-content .text').text(type);
                    result.find('.text-content .text').text(data.text);
                    result.find('.img-content .img').attr('src', data.img);
                    this.glasswareDOM[innerKey] = result;
                }
                this.parent.html(result);
                return type;
            }
        }

    },
    setInnerActivePos: function setInnerActivePos() {
        if (this.sectionActive === 0) {
            this.innerActivePos = threeJsControlData.activePos;
        } else if (this.sectionActive === 1) {
            this.innerActivePos = threeJsControlData.activePosSection2;
        } else {
            this.innerActivePos = threeJsControlData.activePosSection3;
        }
    },
    _compareData: function _compareData(DOM, data, key) {
        var dataType = Object.prototype.toString.call(data);
        if (dataType === "[object Object]") {
            this._dataEachObj(DOM, data, key);
        } else if (dataType === "[object Array]") {
            this._dataEachArr(DOM, data, key);
        } else {
            var changeDOM = DOM.find('[data-key="' + key + '"]');
            var dataFn = changeDOM.attr('data-fn');
            if (dataFn && dataFn !== '') {
                changeDOM.html(this.dataFunction[dataFn].fn(key, data, changeDOM));
            } else {
                changeDOM.text(data);
            }
        }
    },
    _dataEachObj: function _dataEachObj(DOM, Obj, key) {
        for (var dataKey in Obj) {
            this._compareData(DOM, Obj[dataKey], dataKey);
        }
    },
    _dataEachArr: function _dataEachArr(DOM, array, key) {
        var _this8 = this;

        array.forEach(function (item) {
            _this8._compareData(DOM.find('[data-key="' + key + '"]'), item, key);
        });
    },
    _trunCarmraAn: function _trunCarmraAn() {
        this.cameraAn['180'] = new TWEEN.Tween(beer.camera.position).to({ z: 45 }, 900);
        this.cameraAn['0'] = new TWEEN.Tween(beer.camera.position).to({ z: -45 }, 900);
        this.cameraAn['-180'] = new TWEEN.Tween(beer.camera.position).to({ z: 45 }, 1200).onUpdate(function () {
            var x = -0.0296 * Math.pow(beer.camera.position.z, 2) + 30;
            beer.camera.position.x = x;
        });
        this.cameraAn['-0'] = new TWEEN.Tween(beer.camera.position).to({ z: -45 }, 1200).onUpdate(function () {
            var x = -0.0296 * Math.pow(beer.camera.position.z, 2) + 30;
            beer.camera.position.x = x;
        });
    },
    _changeItemContent: function _changeItemContent() {
        var data = beerData[threeJsControlData.activeIndex].content;
        var self = this;
        $tooltipHandle.closeAll();
        $headerHandle.setNowBeerText(data.section_1.title);
        this.keyDom.each(function (i, o) {
            var thisData = $(o);
            var dataName = thisData.attr('data-name');
            thisData.addClass('change');
            setTimeout(function () {
                self._compareData(thisData, data[dataName], dataName);
                thisData.addClass('changed');
                setTimeout(function () {
                    thisData.removeClass('change changed');
                }, 410);
            }, 210);
        });
    },
    changeSection: function changeSection(num, important) {
        if (!this.itemChanged || this.itemMoving) {
            return;
        }
        if ((this.sectionChanged || isMobileContent) && this.sectionActive !== num || important === true) {
            var sectionOnComplete = function sectionOnComplete() {
                _self2.sectionChanged = true;
                _self2.sectionMoving = false;
                _self2.nowSectionAn = null;
            };

            var BeerOnComplete = function BeerOnComplete() {
                _self2.nowBeerAn = null;
            };

            var foodOnComplete = function foodOnComplete() {
                _self2.nowFoodAn = null;
            };

            this.sectionChanged = false;
            this.sectionMoving = true;
            var oldActive = this.sectionActive;
            this.sectionActive = num;
            this.keyDom.eq(oldActive).removeClass('show');
            this.keyDom.eq(num).addClass('show');
            var _self2 = this;

            if (this.nowSectionAn) {
                this.nowSectionAn.stop();
            }
            if (this.nowBeerAn) {
                this.nowBeerAn.stop();
            }
            if (num === 0) {
                this.nowBeerAn = $threeHandle.carousel.beerSizeToDefault(this.itemChangeData.activeBeer, BeerOnComplete).start();
                if (oldActive === 2) {
                    if (this.nowFoodAn) {
                        this.nowFoodAn.stop();
                    }
                    this.nowFoodAn = $threeHandle.carousel.hideFoodImg(this.itemChangeData.activeBeer, foodOnComplete).start();
                }
                this.nowSectionAn = this.cameraAn['0'].easing(TWEEN.Easing.Quadratic.Out).onComplete(sectionOnComplete).start();
                this.setInnerActivePos();
                threeJsControlData.mirror = 1;
            } else if (num === 1) {
                if (oldActive === 2 || isMobileContent) {
                    this.nowBeerAn = $threeHandle.carousel.beerSizeToSection2(this.itemChangeData.activeBeer, BeerOnComplete).start();
                }
                if (oldActive === 2) {
                    this.nowSectionAn = this.cameraAn['-180'].easing(TWEEN.Easing.Quadratic.Out).onComplete(sectionOnComplete).start();
                    if (this.nowFoodAn) {
                        this.nowFoodAn.stop();
                    }
                    this.nowFoodAn = $threeHandle.carousel.hideFoodImg(this.itemChangeData.activeBeer, foodOnComplete).start();
                } else {
                    this.nowSectionAn = this.cameraAn['180'].easing(TWEEN.Easing.Quadratic.Out).onComplete(sectionOnComplete).start();
                }
                this.setInnerActivePos();
                threeJsControlData.mirror = -1;
            } else if (num === 2) {
                this.nowSectionAn = this.cameraAn['-0'].easing(TWEEN.Easing.Quadratic.Out).onComplete(sectionOnComplete).start();
                threeJsControlData.mirror = 1;
                this.setInnerActivePos();
                if (this.nowFoodAn) {
                    this.nowFoodAn.stop();
                }
                this.nowFoodAn = $threeHandle.carousel.showFoodImg(this.itemChangeData.activeBeer, foodOnComplete).start();
                this.nowBeerAn = $threeHandle.carousel.beerSizeToSection3(this.itemChangeData.activeBeer, BeerOnComplete).start();
            }
            $headerHandle.beerSection();
            console.log('4 changeSection fn' + num);
        }
    },
    resetSettion: function resetSettion() {
        this.stopAllAn();
        $mobileScrollHandle.scrollTop(0);
        this.changeSection(0, true);
    },
    _changeItemAn: function _changeItemAn(bool) {
        if (!this.itemChanged) {
            this.itemChanged = true;
            this.itemMoving = true;

            var acPosX = this.innerActivePos.position.x;
            var gep = this.innerActivePos.itemGap;

            threeJsControlData.activeIndex = this.itemChangeData.next;
            $headerHandle.beerStep();
            var _self3 = this;
            var prop = _self3.itemChangeData.moveLength / gep;
            var speed = 900 - prop * 900;
            var activeOpacity = 1 - prop,
                nextOpacity = prop;
            var change = this.itemChangeData.next !== threeJsControlData.oldActiveIndex;
            if (!bool) {
                var _ref = [nextOpacity, activeOpacity];
                activeOpacity = _ref[0];
                nextOpacity = _ref[1];
            }
            $threeHandle.carousel.turnAnimation({ x: _self3.itemChangeData.activeBeer.objs[0].position.x,
                opacity: activeOpacity }, { x: acPosX + gep * _self3.itemChangeData.num * threeJsControlData.mirror,
                opacity: 0 }, speed, _self3.itemChangeData.activeBeer).onStart(function () {
                if (change && _self3.sectionActive === 2) {
                    $threeHandle.carousel.hideFoodImg(_self3.itemChangeData.activeBeer).start();
                }
            }).onComplete(function () {
                _self3.itemChangeData.next = null;
                threeJsControlData.oldActiveIndex = threeJsControlData.activeIndex;
                _self3.itemMoving = false;
            }).start();
            $threeHandle.carousel.turnAnimation({ x: _self3.itemChangeData.nextBeer.objs[0].position.x,
                opacity: nextOpacity }, { x: acPosX,
                opacity: 1 }, speed, _self3.itemChangeData.nextBeer).onStart(function () {
                if (change && _self3.sectionActive === 2) {
                    $threeHandle.carousel.showFoodImg(_self3.itemChangeData.nextBeer).start();
                }
            }).onComplete(function () {
                _self3.itemChangeData.activeBeer = beerThreeData[threeJsControlData.activeIndex];
            }).start();
            if (change) {
                this._changeItemContent();
            }
        }
    },
    _drawChange: function _drawChange() {
        if (!this.sectionChanged || this.sectionMoving) {
            return;
        }
        if (!this.itemChanged) {
            if ($windowData.mouseDownPos.x) {

                //判斷在哪個section 調整大小
                var setScale = function setScale(beer, type) {
                    if (beer !== type) {
                        beer.transform('scale', 'x', scale);
                        beer.transform('scale', 'y', scale);
                        beer.transform('scale', 'z', scale);
                        beer.transform('position', 'y', acPosY);
                        beer.size = type;
                    }
                };

                var acPosX = this.innerActivePos.position.x;
                var acPosY = this.innerActivePos.position.y;
                var gep = this.innerActivePos.itemGap;
                var scale = this.innerActivePos.scale;

                var moveDirection = ($windowData.mouseX - $windowData.mouseDownPos.x) / 15 * threeJsControlData.mirror;
                this.itemChangeData.moveLength = Math.abs(moveDirection);
                this.itemChangeData.moveLength = this.itemChangeData.moveLength > gep ? gep : this.itemChangeData.moveLength;
                this.itemChangeData.num = moveDirection > 0 ? -1 : 1;
                this.itemChangeData.num *= threeJsControlData.mirror;
                this.itemChangeData.next = $threeHandle.carousel.getNext(this.itemChangeData.num);
                var prev = $threeHandle.carousel.getNext(-this.itemChangeData.num);
                this.itemChangeData.activeBeer = beerThreeData[threeJsControlData.activeIndex];
                this.itemChangeData.nextBeer = beerThreeData[this.itemChangeData.next];
                beerThreeData[prev].transform('material', 'opacity', 0);
                beerThreeData[prev].transform('position', 'x', 100);
                if (this.sectionActive === 2) {
                    setScale(this.itemChangeData.nextBeer, 'section3');
                } else if (this.sectionActive === 1) {
                    setScale(this.itemChangeData.nextBeer, 'section2');
                } else {
                    setScale(this.itemChangeData.nextBeer, 'default');
                }
                /////
                var activeNewX = acPosX - moveDirection;
                this.itemChangeData.activeBeer.transform('material', 'opacity', 1 - this.itemChangeData.moveLength / gep);
                this.itemChangeData.activeBeer.transform('position', 'x', activeNewX);

                ////
                var nextNewX = acPosX - gep * this.itemChangeData.num * threeJsControlData.mirror - moveDirection;
                this.itemChangeData.nextBeer.transform('material', 'opacity', this.itemChangeData.moveLength / gep);
                this.itemChangeData.nextBeer.transform('position', 'x', nextNewX);
                if (this.itemChangeData.moveLength >= gep / 2) {
                    this._changeItemAn();
                }
            }
        }
    },
    stopAllAn: function stopAllAn() {
        if (this.nowSectionAn) {
            this.nowSectionAn.stop();
            this.nowSectionAn = null;
        }
        if (this.nowBeerAn) {
            this.nowBeerAn.stop();
            this.nowBeerAn = null;
        }
        if (this.nowFoodAn) {
            this.nowFoodAn.stop();
            this.nowFoodAn = null;
        }
        if (this.sectionActive !== 2) {
            $threeHandle.carousel.hideFoodImg(this.itemChangeData.activeBeer).start();
        }
        self.sectionChanged = true;
        self.sectionMoving = false;
    },
    onResize: function onResize() {
        this.setInnerActivePos();
    },
    onMouseDown: function onMouseDown() {
        if ($modalHandle.isModalOpen) {
            return;
        }
        if (!this.itemMoving && !isMobile) {
            this.itemChanged = false;
        }
    },
    onClick: function onClick() {
        if (!this.itemMoving) {
            this.itemChanged = true;
        }
    },
    onMouseUp: function onMouseUp() {
        if (isMobile) {
            this.mobileScrolling = false;
            this.HasMovingType = false;
        }
    },
    onMouseMove: function onMouseMove(e) {
        if (isMobile && !this.HasMovingType) {
            if ($windowData.mouseDownMoveLength.y && Math.abs($windowData.mouseDownMoveLength.y) > 30) {
                this.mobileScrolling = true;
                this.HasMovingType = true;
                return;
            }
            if ($windowData.mouseDownMoveLength.x && Math.abs($windowData.mouseDownMoveLength.x) > 30) {
                this.itemChanged = false;
                this.HasMovingType = true;
                return;
            }
        }
        this._drawChange();
    },
    handleSectionChangeEvent: function handleSectionChangeEvent(type) {
        if ($modalHandle.isModalOpen || isMobileContent) {
            return;
        }
        var num = type === 'down' ? 1 : type === 'up' ? -1 : null;
        var next = this.sectionActive + num;
        if (next < 0 || next >= this.keyDom.length || num === null) {
            return null;
        }
        return next;
    },
    onDraw: function onDraw(type) {
        var onNext = true;
        var nextSection = this.handleSectionChangeEvent(type);
        if (isMobile) {
            if (typeof nextSection === 'number') {
                console.log('onDraw', 'this.changeSection(nextSection);');
                this.changeSection(nextSection);
            }
        }
        if (this.itemChangeData.moveLength <= 0 || this.itemChangeData.next === null) {
            return;
        }
        if (!this.itemChanged) {
            if (this.itemChangeData.moveLength < 5 && (type !== 'left' || type !== 'right')) {
                var _ref2 = [this.itemChangeData.nextBeer, this.itemChangeData.activeBeer];
                //為了讓酒瓶回位先改變Active

                this.itemChangeData.activeBeer = _ref2[0];
                this.itemChangeData.nextBeer = _ref2[1];

                this.itemChangeData.num = -this.itemChangeData.num;
                this.itemChangeData.next = threeJsControlData.activeIndex;
                onNext = false;
            }
        }
        this._changeItemAn(onNext);
    },
    onWheel: function onWheel(type) {
        if (isMobile) {
            return;
        }
        var next = this.handleSectionChangeEvent(type);
        if (typeof next === 'number') {
            console.log('onWheel', 'this.changeSection(next);');
            this.changeSection(next);
        }
    },
    onScrollEvent: function onScrollEvent(boolFn) {
        var active = null;
        this.keyDom.each(function (i, o) {
            if (i === self.sectionActive) {
                return;
            }
            if (boolFn(i, o)) {
                active = i;
            }
        });
        if (active !== null) {
            console.log('this.changeSection(active);');
            this.changeSection(active);
        }
    },
    onScroll: function onScroll(scroll) {
        if (!isMobileContent) {
            return;
        }
        var self = this;
        var rangeHeight = $windowData.inHeight * 0.7;
        var num = 3;
        var inScroll = scroll.scrollData;
        // console.log(inScroll);
        if (inScroll.direction > 0) {
            this.onScrollEvent(function (i, o) {
                var sectionPos = o.getBoundingClientRect();
                return sectionPos.top <= rangeHeight;
            });
        } else {
            this.onScrollEvent(function (i, o) {
                var sectionPos = o.getBoundingClientRect();
                return sectionPos.bottom >= rangeHeight && sectionPos.bottom < $windowData.inHeight;
            });
        }
    },
    initial: function initial() {
        var _this9 = this;

        this.keyDom.each(function (i, o) {
            var thisDOM = $(o);
            if (thisDOM.hasClass('section-3')) {
                _this9.dataFunction.tooltip.parent = thisDOM.find('.beer-comp-tooltip');
            }
        });

        this.innerActivePos = threeJsControlData.activePos;
        this.itemChangeData.activeBeer = beerThreeData[threeJsControlData.activeIndex];
        this._trunCarmraAn();
        this._changeItemContent();
        $mobileScrollHandle.addEventList(this, ['onScroll']);
    }
};
var $threeHandle = {
    key: null,
    carousel: null,
    windowSizeName: 'larger900',
    oldWindowSizeName: '',
    _initWindowActivePosData: function _initWindowActivePosData() {
        for (var windowName in threeJsControlData.windowActivePosData) {
            var thisWindowName = threeJsControlData.windowActivePosData[windowName];
            for (var section in thisWindowName) {
                var thisSection = thisWindowName[section];
                if (typeof thisSection === 'string') {
                    thisWindowName[section] = thisWindowName[thisSection];
                }
            }
        }
    },
    _setWindowSizeName: function _setWindowSizeName() {
        this.oldWindowSizeName = this.windowSizeName;
        if ($windowData.width > 900) {
            this.windowSizeName = 'larger900';
        } else if ($windowData.width <= 900 && $windowData.width > 480) {
            this.windowSizeName = 'smaller900&larger480';
        } else if ($windowData.width <= 480) {
            this.windowSizeName = 'smaller480';
        }
    },
    _setThreeData: function _setThreeData() {
        beerData.forEach(function (beer, index) {
            beerThreeData[index] = new Beer(beer);
        });
    },
    _createWord: function _createWord() {
        var appendToDOM = document.getElementById('three-canvas');
        beer = new ThreeScene(window.innerWidth, window.innerHeight);
        beer.scene.background = materialObj.textureCube;
        beer.setCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000, new THREE.Vector3(50, 10, -45), false).setStats(document.getElementById('stats')).addLight('AmbientLight', 'AmbientLight', 0x999999).addLight('PointLight1', 'PointLight', 0xffffff, new THREE.Vector3(50, 150, -150)).addLight('PointLight2', 'PointLight', 0xffffff, new THREE.Vector3(50, 150, 150)).addLight('PointLight3', 'PointLight', 0x222222, new THREE.Vector3(-500, -300, 0)).rr().rendererDOM(appendToDOM);

        // let axes = new THREE.AxesHelper(20); // 參數為座標軸長度
        // beer.scene.add(axes);
    },
    _threeJsRender: function _threeJsRender() {
        beer.stats.update();
        requestAnimationFrame($threeHandle._threeJsRender);
        TWEEN.update();
        if (!threeJsControlData.transformXing) {
            beer.camera.position.x += (threeJsControlData.mouseX - beer.camera.position.x) * 0.01;
        }
        beer.camera.position.y += (-threeJsControlData.mouseY - beer.camera.position.y) * 0.01;
        beer.camera.lookAt(beer.scene.position);
        beer.renderer.render(beer.scene, beer.camera);
    },
    handleThreeJsControlDataRatio: function handleThreeJsControlDataRatio(data) {
        var ratioMore = $windowData.aspectRatio.now > threeJsControlData.bastSizeLimit.ratio;
        var afterTransformH = ratioMore ? $windowData.width * threeJsControlData.bastSizeLimit.ratio : $windowData.inHeight;
        var hMoreThan800 = afterTransformH > threeJsControlData.bastSizeLimit.height;
        if ($windowData.width > 900 && (hMoreThan800 || ratioMore)) {
            var ratio = 1;
            if (ratioMore) {
                ratio *= afterTransformH / $windowData.inHeight;
            }
            if (hMoreThan800) {
                ratio *= threeJsControlData.bastSizeLimit.height / afterTransformH;
            }
            if (hMoreThan800 || ratioMore) {
                var result = deepForEach(data, function (result, key, val, obj) {
                    if (typeof val === 'number') {
                        result[key] = val * ratio;
                    }
                });
                if (result.rotation) {
                    result.rotation = data.rotation;
                }
                return result;
            }
        } else {
            return data;
        }
    },
    threeJsControlDataSetting: function threeJsControlDataSetting() {
        this._setWindowSizeName();
        var nowPos = threeJsControlData.windowActivePosData[this.windowSizeName];
        threeJsControlData.activePos = this.handleThreeJsControlDataRatio(nowPos.activePosSection1);
        threeJsControlData.activePosSection2 = this.handleThreeJsControlDataRatio(nowPos.activePosSection2);
        threeJsControlData.activePosSection3 = this.handleThreeJsControlDataRatio(nowPos.activePosSection3);
        threeJsControlData.foodPos = this.handleThreeJsControlDataRatio(threeJsControlData.foodPosData[this.windowSizeName]);
    },
    resizeSetSetting: function resizeSetSetting() {
        this.threeJsControlDataSetting();
        if (this.oldWindowSizeName !== this.windowSizeName || $windowData.aspectRatio.now > threeJsControlData.bastSizeLimit.ratio || $windowData.aspectRatio.old > threeJsControlData.bastSizeLimit.ratio || $windowData.inHeight !== $windowData.oldInHeight && Math.max($windowData.inHeight, $windowData.oldInHeight) > threeJsControlData.bastSizeLimit.height) {

            var activeSection = $sectionHandle.sectionActive;
            $sectionHandle.stopAllAn();
            var activeName = activeSection === 0 ? 'activePos' : activeSection === 1 ? 'activePosSection2' : 'activePosSection3';
            var bottle = this.carousel.items[0].objs[0];
            this.carousel.items.forEach(function (item, index) {
                var activeData = threeJsControlData[activeName];

                var _loop2 = function _loop2(key) {
                    var beerPos = bottle[key];
                    var changePos = activeData[key];
                    if (beerPos) {
                        if ((typeof changePos === 'undefined' ? 'undefined' : _typeof(changePos)) === 'object') {
                            var childKeys = Object.keys(beerPos);
                            for (var i = 0; i < childKeys.length; i++) {
                                var fnPos = changePos[childKeys[i]];
                                if (fnPos !== undefined) {
                                    item.transform(key, childKeys[i], fnPos);
                                }
                            }
                        }
                        if (typeof changePos === 'number') {
                            if (beerPos.set) {
                                item.objs.forEach(function (obj) {
                                    obj[key].set(changePos, changePos, changePos);
                                });
                            }
                        }
                    }
                };

                for (var key in activeData) {
                    _loop2(key);
                }
                if (index !== threeJsControlData.activeIndex) {
                    item.transform('position', 'x', 100);
                }
                var foodChangePos = threeJsControlData.foodPos;
                item.transform('position', 'x', foodChangePos.position.x, 'food');
                item.transform('position', 'y', foodChangePos.position.y, 'food');
                item.transform('position', 'z', foodChangePos.position.z, 'food');
                item.transform('rotation', 'y', foodChangePos.rotation.y, 'food');
                item.transform('scale', 'set', foodChangePos.scale, 'food');
            });
            if (isMobile) {
                $sectionHandle.setInnerActivePos();
                $sectionHandle.resetSettion();
            }
        }
    },
    initial: function initial() {
        this._initWindowActivePosData();
        this._setWindowSizeName();
        this.threeJsControlDataSetting();
        this._setThreeData();
        this._createWord();
        this.carousel = new CarouselBeer(beer.scene, beerThreeData, threeJsControlData);
        this._threeJsRender();
        $loadingHandle.setSetp(1);
        setTimeout(function () {
            $loadingHandle.final();
        }, 700);
    },
    onMouseMove: function onMouseMove(e) {
        if (!isMobile) {
            var mouseX = e.clientX * threeJsControlData.mouseXPercen;
            var mouseY = e.clientY * threeJsControlData.mouseYPercen;
            threeJsControlData.mouseX = -25 - mouseX;
            threeJsControlData.mouseY = 10 - mouseY;
        }
    },
    onResize: function onResize() {
        beer.resize($windowData.width, $windowData.inHeight);
        threeJsControlData.mouseXPercen = 15 / $windowData.width;
        threeJsControlData.mouseYPercen = 15 / $windowData.inHeight;
        this.resizeSetSetting();
    }

    //============   class   ==================//
};
var Beer = function () {
    function Beer(data) {
        _classCallCheck(this, Beer);

        this.data = data;
        this.objs = [];
        this.foodImg = [];
        this._createBeer();
        this._createFoodImg();
        this.size = 'default';
    }

    _createClass(Beer, [{
        key: 'smoothObj',
        value: function smoothObj(geometry, subdivisions) {
            var modifier = new SubdivisionModifier(subdivisions);
            var smoothGeometry = modifier.modify(geometry);
            return smoothGeometry;
        }
    }, {
        key: '_createFn',
        value: function _createFn(child, childName, material) {
            child.geometry.computeFaceNormals();
            child.geometry.computeVertexNormals();
            var innerGeometry = child.geometry;
            var objSmoothNum = this.data.children[childName].objSmooth;

            if (objSmoothNum) {
                innerGeometry = this.smoothObj(child.geometry, objSmoothNum);
            }

            var innerChild = new THREE.Mesh(innerGeometry, material);
            innerChild.name = childName;
            return innerChild;
        }
    }, {
        key: '_createBeer',
        value: function _createBeer() {
            var self = this;
            self.data.loadedMesh.children.forEach(function (child, index) {
                var childName = child.name.toLowerCase();
                var childData = self.data.children[childName];
                var materialCustom = childData.materialCustom ? childData.materialCustom : null;
                var material = materialObj[childData.material](materialCustom);
                var maps = self.data.children[childName].maps;
                for (var map in maps) {
                    material[map] = materialObj._textureLoader.load(maps[map]);
                }
                self.objs.push(self._createFn(child, childName, material));
            });
        }
    }, {
        key: '_createFoodImg',
        value: function _createFoodImg() {
            var material = materialObj.foodPlane(this.data.foodImage);
            var planeGeometry = new THREE.PlaneBufferGeometry(60, 48);
            var ground = new THREE.Mesh(planeGeometry, material);
            ground.name = 'food';
            this.foodImg.push(ground);
        }
    }, {
        key: 'addTo',
        value: function addTo(scene, objs) {
            objs = objs || 'all';
            var objsName = objs.toLowerCase();
            if (objsName === 'beer' || objsName === 'all') {
                this.objs.forEach(function (obj) {
                    scene.add(obj);
                });
            }
            if (objsName === 'food' || objsName === 'all') {
                this.foodImg.forEach(function (obj) {
                    scene.add(obj);
                });
            }
        }
    }, {
        key: 'removeFrom',
        value: function removeFrom(scene) {
            this.objs.forEach(function (obj) {
                scene.remove(obj);
            });
        }
    }, {
        key: 'transform',
        value: function transform(attr, axisOrNum, num, objs) {
            objs = objs === 'food' ? this.foodImg : this.objs;
            if (axisOrNum === 'set') {
                objs.forEach(function (obj) {
                    obj[attr].set(num, num, num);
                });
            } else {
                objs.forEach(function (obj) {
                    obj[attr][axisOrNum] = num;
                });
            }
        }
    }]);

    return Beer;
}();

var CarouselBeer = function () {
    function CarouselBeer(scene, items, active) {
        _classCallCheck(this, CarouselBeer);

        this.scene = scene;
        this.active = active;
        this.items = items;
        this.init();
    }

    _createClass(CarouselBeer, [{
        key: 'init',
        value: function init() {
            var _this10 = this;

            this.items.forEach(function (item, index) {
                item.transform('material', 'opacity', 0);
                item.transform('rotation', 'z', 0.5);
                item.transform('position', 'y', threeJsControlData.activePos.position.y);
                if (threeJsControlData.activePos.scale !== 1) {
                    item.transform('scale', 'set', threeJsControlData.activePos.scale);
                }
                //food設定
                item.transform('material', 'opacity', 0, 'food');
                item.transform('position', 'x', threeJsControlData.foodPos.position.x, 'food');
                item.transform('position', 'y', threeJsControlData.foodPos.position.y, 'food');
                item.transform('position', 'z', threeJsControlData.foodPos.position.z, 'food');
                item.transform('rotation', 'y', threeJsControlData.foodPos.rotation.y, 'food');
                item.transform('scale', 'set', threeJsControlData.foodPos.scale, 'food');
                if (index === _this10.active.activeIndex) {
                    item.transform('material', 'opacity', 1);
                    item.transform('position', 'x', threeJsControlData.activePos.position.x);
                } else {
                    item.transform('position', 'x', 100);
                }
                item.addTo(_this10.scene);
            }, this);
        }
    }, {
        key: 'turnAnimation',
        value: function turnAnimation(anData, fnData, time, beer) {
            return new TWEEN.Tween(anData).to(fnData, time).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function () {
                beer.transform('position', 'x', anData.x);
                beer.transform('material', 'opacity', anData.opacity);
            });
        }
    }, {
        key: 'showFoodImg',
        value: function showFoodImg(beer, onComplete) {
            var show = new TWEEN.Tween({ opacity: beer.foodImg[0].material.opacity }).to({ opacity: 1 }, 500).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function (opacity) {
                beer.transform('material', 'opacity', opacity.opacity, 'food');
            }).onComplete(function () {
                if (onComplete) {
                    onComplete();
                }
            });
            return show;
        }
    }, {
        key: 'hideFoodImg',
        value: function hideFoodImg(beer, onComplete) {
            var hide = new TWEEN.Tween({ opacity: beer.foodImg[0].material.opacity }).to({ opacity: 0 }, 500).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function (opacity) {
                beer.transform('material', 'opacity', opacity.opacity, 'food');
            }).onComplete(function () {
                if (onComplete) {
                    onComplete();
                }
            });
            return hide;
        }
    }, {
        key: 'createTween',
        value: function createTween(beer, fnPosObj, time) {
            time = time || 700;
            var obj = beer.objs[0];
            var startPosObj = {};
            var innerFnPosObj = {};
            var callbackText = '';
            for (var posName in fnPosObj) {
                var startPos = obj[posName];
                var fnPos = fnPosObj[posName];
                if (startPos) {
                    if ((typeof startPos === 'undefined' ? 'undefined' : _typeof(startPos)) === 'object') {
                        if ((typeof fnPos === 'undefined' ? 'undefined' : _typeof(fnPos)) === 'object') {
                            for (var key in startPos) {
                                var keyName = posName + key;
                                if (fnPos[key] !== undefined) {
                                    startPosObj[keyName] = startPos[key];
                                    innerFnPosObj[keyName] = fnPos[key];
                                    callbackText += "beer.transform('" + posName + "','" + key + "', transform." + keyName + ");";
                                }
                            }
                        } else if (typeof fnPos === 'number' && startPos.set) {
                            var keys = Object.keys(startPos);
                            startPosObj[posName] = startPos[keys[0]];
                            innerFnPosObj[posName] = fnPos;
                            for (var i = 0; i < keys.length; i++) {
                                callbackText += "beer.transform('" + posName + "','" + keys[i] + "', transform." + posName + ");";
                            }
                        }
                    }
                }
            }
            var callbackFn = new Function(['beer', 'transform'], callbackText).bind(null, beer);
            return new TWEEN.Tween(startPosObj).to(innerFnPosObj, time).onUpdate(callbackFn);
        }
    }, {
        key: 'beerSizeToSection3',
        value: function beerSizeToSection3(beer, onComplete) {
            var toSmall = this.createTween(beer, threeJsControlData.activePosSection3).easing(TWEEN.Easing.Quadratic.Out).onComplete(function () {
                if (onComplete) {
                    onComplete();
                }
                beer.size = 'section3';
            });
            return toSmall;
        }
    }, {
        key: 'beerSizeToSection2',
        value: function beerSizeToSection2(beer, onComplete) {
            var toSmall = this.createTween(beer, threeJsControlData.activePosSection2).easing(TWEEN.Easing.Quadratic.Out).onComplete(function () {
                if (onComplete) {
                    onComplete();
                }
                beer.size = 'section2';
            });
            return toSmall;
        }
    }, {
        key: 'beerSizeToDefault',
        value: function beerSizeToDefault(beer, onComplete) {
            var sizeReset = this.createTween(beer, threeJsControlData.activePos).easing(TWEEN.Easing.Quadratic.Out).onComplete(function () {
                if (onComplete) {
                    onComplete();
                }
                beer.size = 'default';
            });
            return sizeReset;
        }
    }, {
        key: 'getNext',
        value: function getNext(num) {
            if (num === 0) {
                return null;
            }
            var next = void 0;
            if (num + this.active.activeIndex >= this.items.length) {
                next = 0;
            } else if (num + this.active.activeIndex < 0) {
                next = this.items.length - 1;
            } else {
                next = num + this.active.activeIndex;
            }
            return next;
        }
    }]);

    return CarouselBeer;
}();

var ThreeScene = function () {
    function ThreeScene(width, height) {
        _classCallCheck(this, ThreeScene);

        this.width = width;
        this.height = height;
        this.scene = new THREE.Scene();
        this.lightList = {};
    }

    _createClass(ThreeScene, [{
        key: 'setCamera',
        value: function setCamera(view, aspect, near, far, vector, control) {
            this.camera = new THREE.PerspectiveCamera(view, aspect, near, far);
            this.camera.position.set(vector.x, vector.y, vector.z);
            this.camera.lookAt(this.scene.position);
            if (control === true) {
                this.cameraControl = new THREE.OrbitControls(this.camera);
            }
            return this;
        }
    }, {
        key: 'setStats',
        value: function setStats(DOM) {
            var stats = new Stats();
            this.stats = stats;
            stats.setMode(0);
            DOM.appendChild(stats.domElement);
            return this;
        }
    }, {
        key: 'addLight',
        value: function addLight(lightName, type, color, vector) {
            this.lightList[lightName] = new THREE[type](color);
            if (type !== 'AmbientLight') {
                this.lightList[lightName].position.set(vector.x, vector.y, vector.z);
            }
            this.scene.add(this.lightList[lightName]);
            return this;
        }
    }, {
        key: 'rendererDOM',
        value: function rendererDOM(DOM) {
            DOM.appendChild(this.renderer.domElement);
            return this;
        }
    }, {
        key: 'resize',
        value: function resize(width, height) {
            this.width = width;
            this.height = height;
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(width, height);
            return this;
        }
    }, {
        key: 'rr',
        value: function rr() {
            this.renderer = new THREE.WebGLRenderer();
            this.renderer.setSize(this.width, this.height);
            this.renderer.setClearColor(0xff2244, 1.0); // 預設背景顏色
            this.renderer.shadowMap.enable = true; // 陰影效果
            return this;
        }
    }]);

    return ThreeScene;
}();
//============   class: end   =============//

//=============== tool ====================//


function loadingObj(beerData, callback) {
    var index = 0;
    $loadingHandle.setSetp(0.50);
    function innerLoadingObj(index) {
        if (index >= beerData.length) {
            callback();
            $loadingHandle.setSetp(0.70);
            return;
        }
        var loader = new THREE.OBJLoader();
        loader.load(beerData[index].objUrl, function (loadedMesh) {
            beerData[index].loadedMesh = loadedMesh;
            index++;
            innerLoadingObj(index);
        });
    }
    innerLoadingObj(index);
}
function CteatrEasing(x1, y1, x2, y2) {
    return function (t) {
        return bezier_point(t, [0, 0], [x1, y1], [x2, y2], [1, 1])[1];
    };
}
function bezier_coordinate(t, n0, n1, n2, n3) {
    return n0 * Math.pow(1 - t, 3) + 3 * n1 * t * Math.pow(1 - t, 2) + 3 * n2 * Math.pow(t, 2) * (1 - t) + n3 * Math.pow(t, 3);
}
function bezier_point(t, p0, p1, p2, p3) {
    return [bezier_coordinate(t, p0[0], p1[0], p2[0], p3[0]), bezier_coordinate(t, p0[1], p1[1], p2[1], p3[1])];
}
function arrayRandom(array) {
    return array[Math.floor(array.length * Math.random())];
}
function deepForEach(obj, callback) {
    var result = {};
    for (var key in obj) {
        if (_typeof(obj[key]) === 'object') {
            result[key] = deepForEach(obj[key], callback);
        } else {
            callback(result, key, obj[key], obj);
        }
    }
    return result;
}
function detectWebGL() {
    // Check for the WebGL rendering context
    if (!!window.WebGLRenderingContext) {
        var canvas = document.createElement("canvas"),
            names = ["webgl", "experimental-webgl", "moz-webgl", "webkit-3d"],
            context = false;
        for (var i in names) {
            try {
                context = canvas.getContext(names[i]);
                if (context && typeof context.getParameter === "function") {
                    // WebGL is enabled.
                    return 1;
                }
            } catch (e) {}
        }
        // WebGL is supported, but disabled.
        return 0;
    }
    // WebGL not supported.
    return -1;
};
function detectWebGLContext(obj) {
    var num = detectWebGL();
    if (num >= 0) {
        obj.supported();
    } else {
        obj.enabled();
    }
}
function detectIE(obj) {
    var ieTest = {
        '6-10': document.all && document.compatMode,
        '11': window.navigator.msPointerEnabled
    };
    if (ieTest['6-10'] || ieTest['11']) {
        var version = ieTest['6-10'] ? 10 : 11;
        obj.isIE(version);
    } else {
        obj.notIE();
    }
}
function getInclude(url, _success, _error) {
    $.ajax({
        url: url, // url位置
        type: 'get',
        dataType: "text",
        error: function error(xhr) {
            console.log(xhr);
            _error(xhr);
        }, // 錯誤後執行的函數
        success: function success(response) {
            _success(response);
        } // 成功後要執行的函數
    });
}
//=============== tool: end ===============//


//===========   plugin function ============//

//===========   plugin function: end =======//