//=============================================================================
// SupponTextFilter.js
//=============================================================================

/*:
 * @plugindesc メッセージウインドウに表示されるテキストにフィルター処理を施します。 Version 1.00
 * @author Suppon
 *
 * @param ---Layout1---
 * @default
 * 
 * @param Layout1 Rotation Speed
 * @desc 回転させるスピード -100 ～ 100の数値を入れてください。
 * @default 0
 * 
 * @param Layout1 Rotation Speed Randomize
 * @desc 回転させるスピードのランダム化 true か falseを入れてください。
 * @default false
 *
 * @param Layout1 Stretch X Intensity
 * @desc X方向の伸縮強度 0～100の数値をいれてください。
 * @default 50
 *
 * @param Layout1 Stretch X Speed
 * @desc X方向の伸縮速度 0～100の数値をいれてください。
 * @default 50
 *
 * @param Layout1 Stretch Y Intensity
 * @desc Y方向の伸縮強度 0～100の数値をいれてください。
 * @default 50
 *
 * @param Layout1 Stretch Y Speed
 * @desc Y方向の伸縮速度 0～100の数値をいれてください。
 * @default 50
 * 
 * @param Layout1 Stretch Timing Shift
 * @desc XY方向の伸縮タイミングのずれ 0～360の数値をいれてください。
 * @default 0
 *
 * @param Layout1 StandOut
 * @desc 派手に光らせるかどうか true か falseを入れてください。
 * @default true
 *
 * @param Layout1 PixelateFilter
 * @desc ピクセル化強度 0～10の数値を入れてください。
 * @default 0
 *
 * @param Layout1 BlurFilter
 * @desc ブラー強度 0～10の数値を入れてください。
 * @default 0
 *
 * @param ---Layout2---
 * @default
 * 
 * @param Layout2 Rotation Speed
 * @desc 回転させるスピード -100 ～ 100の数値を入れてください。
 * @default 20
 * 
 * @param Layout2 Rotation Speed Randomize
 * @desc 回転させるスピードのランダム化 true か falseを入れてください。
 * @default false
 *
 * @param Layout2 Stretch X Intensity
 * @desc X方向の伸縮強度 0～100の数値をいれてください。
 * @default 0
 *
 * @param Layout2 Stretch X Speed
 * @desc X方向の伸縮速度 0～100の数値をいれてください。
 * @default 0
 *
 * @param Layout2 Stretch Y Intensity
 * @desc Y方向の伸縮強度 0～100の数値をいれてください。
 * @default 0
 *
 * @param Layout2 Stretch Y Speed
 * @desc Y方向の伸縮速度 0～100の数値をいれてください。
 * @default 0
 * 
 * @param Layout2 Stretch Timing Shift
 * @desc XY方向の伸縮タイミングのずれ 0～360の数値をいれてください。
 * @default 0
 *
 * @param Layout2 StandOut
 * @desc 派手に光らせるかどうか true か falseを入れてください。
 * @default false
 *
 * @param Layout2 PixelateFilter
 * @desc ピクセル化強度 0～10の数値を入れてください。
 * @default 0
 *
 * @param Layout2 BlurFilter
 * @desc ブラー強度 0～10の数値を入れてください。
 * @default 0
 *
 * @param ---Layout3---
 * @default
 * 
 * @param Layout3 Rotation Speed
 * @desc 回転させるスピード -100 ～ 100の数値を入れてください。
 * @default 0
 * 
 * @param Layout3 Rotation Speed Randomize
 * @desc 回転させるスピードのランダム化 true か falseを入れてください。
 * @default false
 *
 * @param Layout3 Stretch X Intensity
 * @desc X方向の伸縮強度 0～100の数値をいれてください。
 * @default 0
 *
 * @param Layout3 Stretch X Speed
 * @desc X方向の伸縮速度 0～100の数値をいれてください。
 * @default 0
 *
 * @param Layout3 Stretch Y Intensity
 * @desc Y方向の伸縮強度 0～100の数値をいれてください。
 * @default 0
 *
 * @param Layout3 Stretch Y Speed
 * @desc Y方向の伸縮速度 0～100の数値をいれてください。
 * @default 0
 * 
 * @param Layout3 Stretch Timing Shift
 * @desc XY方向の伸縮タイミングのずれ 0～360の数値をいれてください。
 * @default 0
 *
 * @param Layout3 StandOut
 * @desc 派手に光らせるかどうか true か falseを入れてください。
 * @default false
 *
 * @param Layout3 PixelateFilter
 * @desc ピクセル化強度 0～10の数値を入れてください。
 * @default 5
 *
 * @param Layout3 BlurFilter
 * @desc ブラー強度 0～10の数値を入れてください。
 * @default 0
 * 
 * @param ---Layout4---
 * @default
 * 
 * @param Layout4 Rotation Speed
 * @desc 回転させるスピード -100 ～ 100の数値を入れてください。
 * @default 0
 * 
 * @param Layout4 Rotation Speed Randomize
 * @desc 回転させるスピードのランダム化 true か falseを入れてください。
 * @default false
 *
 * @param Layout4 Stretch X Intensity
 * @desc X方向の伸縮強度 0～100の数値をいれてください。
 * @default 0
 *
 * @param Layout4 Stretch X Speed
 * @desc X方向の伸縮速度 0～100の数値をいれてください。
 * @default 0
 *
 * @param Layout4 Stretch Y Intensity
 * @desc Y方向の伸縮強度 0～100の数値をいれてください。
 * @default 0
 *
 * @param Layout4 Stretch Y Speed
 * @desc Y方向の伸縮速度 0～100の数値をいれてください。
 * @default 0
 * 
 * @param Layout4 Stretch Timing Shift
 * @desc XY方向の伸縮タイミングのずれ 0～360の数値をいれてください。
 * @default 0
 *
 * @param Layout4 StandOut
 * @desc 派手に光らせるかどうか true か falseを入れてください。
 * @default false
 *
 * @param Layout4 PixelateFilter
 * @desc ピクセル化強度 0～10の数値を入れてください。
 * @default 0
 *
 * @param Layout4 BlurFilter
 * @desc ブラー強度 0～10の数値を入れてください。
 * @default 5
 *
 * @param ---Layout5---
 * @default
 * 
 * @param Layout5 Rotation Speed
 * @desc 回転させるスピード -100 ～ 100の数値を入れてください。
 * @default 50
 * 
 * @param Layout5 Rotation Speed Randomize
 * @desc 回転させるスピードのランダム化 true か falseを入れてください。
 * @default true
 *
 * @param Layout5 Stretch X Intensity
 * @desc X方向の伸縮強度 0～100の数値をいれてください。
 * @default 50
 *
 * @param Layout5 Stretch X Speed
 * @desc X方向の伸縮速度 0～100の数値をいれてください。
 * @default 10
 *
 * @param Layout5 Stretch Y Intensity
 * @desc Y方向の伸縮強度 0～100の数値をいれてください。
 * @default 50
 *
 * @param Layout5 Stretch Y Speed
 * @desc Y方向の伸縮速度 0～100の数値をいれてください。
 * @default 10
 * 
 * @param Layout5 Stretch Timing Shift
 * @desc XY方向の伸縮タイミングのずれ 0～360の数値をいれてください。
 * @default 180
 *
 * @param Layout5 StandOut
 * @desc 派手に光らせるかどうか true か falseを入れてください。
 * @default false
 *
 * @param Layout5 PixelateFilter
 * @desc ピクセル化強度 0～10の数値を入れてください。
 * @default 0
 *
 * @param Layout5 BlurFilter
 * @desc ブラー強度 0～10の数値を入れてください。
 * @default 0
 *
 * @help メッセージウインドウに表示されるテキストにフィルター処理を施します。
 *  一度に5種類のレイアウトを設定出来ます。
 *  ＜使用方法＞
 *  \STF[n]テキスト\STF[n] nはレイアウトのナンバーです。1～5の数字を入れてください。
 * 
 *  ＜使用例＞
 *  \STF[1]あいうえお\STF[1]
 */
(function() {
    
    var params = PluginManager.parameters('SupponTextFilter');
    var SupponTextFilter = {};
    SupponTextFilter.layouts = [];
    for (var i=1; i<6; i++){
        var header = 'Layout'+i+' ';
        var layout = {}
        layout.rotationSpeed = Number(params[header+'Rotation Speed']||0);
        layout.rotationSpeedRandomize = (params[header+'Rotation Speed Randomize'] === 'true');
        layout.stretchXIntensity = Number(params[header+'Stretch X Intensity']||0);
        layout.stretchXSpeed = Number(params[header+'Stretch X Speed']||0);
        layout.stretchYIntensity = Number(params[header+'Stretch Y Intensity']||0);
        layout.stretchYSpeed = Number(params[header+'Stretch Y Speed']||0);
        layout.stretchTimingShift = Number(params[header+'Stretch Timing Shift']||0);
        layout.standOut = (params[header+'StandOut'] === 'true');
        layout.pixelateFilter = Number(params[header+'PixelateFilter']||0);
        layout.blurFilter = Number(params[header+'BlurFilter']||0);
        SupponTextFilter.layouts[i] = layout;
    }
    
    
       
    var _Window_Message_initialize = Window_Message.prototype.initialize;
    Window_Message.prototype.initialize = function() {
        console.log('abc')
        //_Window_Message_initialize.call(this);
        this.initSTF();
        this._spriteForSTF = new Sprite();
        SceneManager._scene.addChild(this._spriteForSTF);
        _Window_Message_initialize.call(this);
    };
    
    Window_Message.prototype.initSTF = function(){
        //this._spriteForSTF = new Sprite();
        var a = []
        for(var i=0; i < 10; i++){
            a.push(false);
        }
        this._supponTextFilter = a;
    }
    
    var _Window_Message_updatePlacement = Window_Message.prototype.updatePlacement;
    Window_Message.prototype.updatePlacement = function() {
        _Window_Message_updatePlacement.call(this);
        this._spriteForSTF.x = this.x;
        this._spriteForSTF.y = this.y;
    };
    
    var _Window_Message_newPage = Window_Message.prototype.newPage;
    Window_Message.prototype.newPage = function(textState) {
        _Window_Message_newPage.call(this, textState);
        this.initSTF();
    };
    
    var _Window_Message_processEscapeCharacter = Window_Message.prototype.processEscapeCharacter;
    Window_Message.prototype.processEscapeCharacter = function(code, textState) {
        switch (code) {
        case 'STF':
            var index = this.obtainEscapeParam(textState);
            this._supponTextFilter[index] = !this._supponTextFilter[index];
            break;
        }
        _Window_Message_processEscapeCharacter.call(this, code, textState);
    };
    
    Window_Message.prototype.processNormalCharacter = function(textState) {
        var index = this._supponTextFilter.indexOf(true);
        if (index>0){
            var c = textState.text[textState.index++];
            var w = this.textWidth(c);
            var bitmap = new Bitmap(100, 100);
            bitmap.fontSize = this.contents.fontSize;
            bitmap.textColor = this.contents.textColor;
            bitmap.drawText(c, 0, 0, w*2, textState.height);
            var sprite = new Sprite_STF();
            sprite.bitmap = bitmap;
            sprite.width = w;
            sprite.height = textState.height;
            sprite.setupFilter(SupponTextFilter.layouts[index]);
            this._spriteForSTF.addChild(sprite);
            //var padding = this.standardPadding() + sprite.height/2;
            sprite.x = textState.x + this.standardPadding() + sprite.width/2;
            sprite.y = textState.y + this.standardPadding() + sprite.height/2;
            textState.x += w;
        }else{
            Window_Base.prototype.processNormalCharacter.call(this, textState);
        }
    };
    
    var _Window_Message_terminateMessage = Window_Message.prototype.terminateMessage;
    Window_Message.prototype.terminateMessage = function() {
        this._spriteForSTF.children = [];
        _Window_Message_terminateMessage.call(this);
    };
    
    function Sprite_STF() {
        this.initialize.apply(this, arguments);
    }

    Sprite_STF.prototype = Object.create(Sprite.prototype);
    Sprite_STF.prototype.constructor = Sprite_STF;
    
    Sprite_STF.prototype.initialize = function() {
        Sprite.prototype.initialize.call(this);
        this.anchor = new Point(0.5, 0.5);
        this._STFilters = [];
        this._tx = 0;
        this._ty = 0;
    };
    
    Sprite_STF.prototype.setupFilter = function(layout){
        this._layout = layout;
        this._rotationRandom = 1;
        if(layout.rotationSpeedRandomize){
            this._rotationRandom = (1-2*Math.random());
        }
        if(layout.pixelateFilter>0){
            var filter = new PIXI.PixelateFilter();
            filter.size = new Point(layout.pixelateFilter, layout.pixelateFilter);
            this._STFilters.push(filter);
        }
        if(layout.blurFilter>0){
            var filter = new PIXI.BlurFilter();
            filter.blur = layout.blurFilter;
            this._STFilters.push(filter);
        }
        if(this._STFilters.length>0){
            this.filters = this._STFilters;
        }
        this._ty = Math.PI * layout.stretchTimingShift / 180;
        //console.log(this.filters, this._filters)
    }
    
    Sprite_STF.prototype.update = function(){
        Sprite.prototype.update.call(this);
        this.scale.x = 1+this._layout.stretchXIntensity*0.01*(Math.sin(this._tx));
        this.scale.y = 1+this._layout.stretchYIntensity*0.01*(Math.sin(this._ty));
        this._tx += 0.01*this._layout.stretchXSpeed;
        this._ty += 0.01*this._layout.stretchYSpeed;
        this.rotation += this._layout.rotationSpeed*0.005*this._rotationRandom;
        if (this._layout.standOut){
            if(Graphics.frameCount % 9 == 0){
                this.setColorTone([255, 0, 0, 0]);
            }else if(Graphics.frameCount % 6 == 0){
                this.setColorTone([0, 255, 0, 0]);
            }else if(Graphics.frameCount % 3 == 0){
                this.setColorTone([0, 0, 255, 0])
            }
        }
    }

})();
