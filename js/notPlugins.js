//ジェネレーターテスト
<calc0:
this._l=CalcManager.assignLiterals(2);
>
<calc:
var str = rand(5).ts()+' + '+rand(5).ts();
var ans = eval(str);
str = str+' ='+l[0];
la[0] = ans;
yield
var str = rand(5).ts()+' + '+rand(5).ts();
var ans = eval(str);
str = str+' ='+l[1];
la[1] = ans;
yield
var str = l[0]+' + '+l[1];
var ans = la[0] + la[1];
>


//1 スライム
<calc:
var str = rand1(5).ts()+' + '+rand1(5).ts();
var ans = eval(str);
>

//2スパイダー
<calc:
var str = 10.ts()+' - '+rand1(9).ts();
var ans = eval(str);
>

    //8スネイルロード
<calc0:
this._l=CalcManager.assignLiterals(3);
>
<calc:
var str = rand1(5).ts()+' + '+rand1(5).ts();
var ans = eval(str);
str = str+' = '+l[0];
la[0] = ans;
yield
var str = rand1(5).ts()+' + '+rand1(5).ts();
var ans = eval(str);
str = str+' = '+l[1];
la[1] = ans;
yield
var str = rand1(5).ts()+' + '+rand1(5).ts();
var ans = eval(str);
str = str+' = '+l[2];
la[2] = ans;
yield
var str = l[0]+' + '+l[1]+' + '+l[2];
var ans = la[0]+la[1]+la[2];
>

    
    
    
    
    //91スノーウルフ
<calc:
var str = (rand1(10)+10).ts()+' + '+rand1(10).ts();
var ans = eval(str);
yield
var str = (rand1(10)+10).ts()+' + '+rand1(10).ts()+' + '+rand1(10).ts();
var ans = eval(str);
yield
var str = (rand1(10)+10).ts()+' + '+rand1(10).ts()+' + '+rand1(10).ts()+' + '+rand1(10).ts();
var ans = eval(str);
>
   //コールドボイス 
<calc:
var str = rand1(10).ts()+' * '+rand1(10).ts()+' + '+rand1(20).ts();
var ans = eval(str);
>
    //コオーク
<calc:
if(rand(2) == 1){
    var str = (rand1(9)+1).ts()+' * '+(rand1(9)+1).ts();
    var ans = eval(str);
} else {
    var ans = rand1(7)+3;
    var v1 = rand1(7)+3;
    var str = (ans*v1).ts()+' / '+v1.ts();
}
>
    
    //オーク
<calc:
var str = (rand1(10)+10).ts()+' + '+rand1(10).ts();
var ans = eval(str);
yield
var str = (rand1(10)+10).ts()+' + '+rand1(10).ts()+' + '+rand1(10).ts();
var ans = eval(str);
yield
var str = (rand1(10)+10).ts()+' + '+rand1(10).ts()+' + '+rand1(10).ts()+' + '+rand1(10).ts();
var ans = eval(str);
>

    //11グラナート
<calc:
var v1 = rand1(8)+1;
var v2 = 10+rand(v1-1)+1
var str = v2.ts()+' - '+v1.ts();
var ans = eval(str);
>

    //スマラクト
<calc:
var v1 = rand1(8)+1;
var v3 = rand1(9);
var v2 = v3*10+rand(v1-1)+1
v1 += rand(v3)*10;
var str = v2.ts()+' - '+v1.ts();
var ans = eval(str);
>

    //12パペット
<calc:
var v1 = rand1(8)+1;
var v3 = rand1(9);
var v2 = v3*10+rand(v1-1)+1
v1 += rand(v3)*10;
var str = v2.ts()+' - '+v1.ts();
var ans = eval(str);
>
    
    //8スネイルロード
<calc0:
this._l=CalcManager.assignLiterals(3);
>
<calc:
var str = rand1(5).ts()+' + '+rand1(5).ts();
var ans = eval(str);
str = str+' = '+l[0];
la[0] = ans;
yield
var str = rand1(5).ts()+' + '+rand1(5).ts();
var ans = eval(str);
str = str+' = '+l[1];
la[1] = ans;
yield
var str = rand1(5).ts()+' + '+rand1(5).ts();
var ans = eval(str);
str = str+' = '+l[2];
la[2] = ans;
yield
var m1 = [' + ', ' - ', ' * '].sample();
var m2 = [' + ', ' - ', ' * '].sample();
var str = l[0]+m1+l[1]+m2+l[2];
var ans = eval(la[0]+m1+la[1]+m2+la[2]);
>
    
    
    //ゲイザー
<calc0:
this._l=CalcManager.assignLiterals(4);
>
<calc:
var str = rand1(5).ts()+' + '+rand1(5).ts();
var ans = eval(str);
str = str+' = '+l[0];
la[0] = ans;
yield
var str = rand1(5).ts()+' + '+rand1(5).ts();
var ans = eval(str);
str = str+' = '+l[1];
la[1] = ans;
yield
var str = rand1(5).ts()+' + '+rand1(5).ts();
var ans = eval(str);
str = str+' = '+l[2];
la[2] = ans;
yield
var str = rand1(5).ts()+' + '+rand1(5).ts();
var ans = eval(str);
str = str+' = '+l[3];
la[3] = ans;
yield
var m1 = [' + ', ' - ', ' * '].sample();
var str = l[0]+m1+l[1]
var ans = eval(la[0]+m1+la[1]);
yield
var m1 = [' + ', ' - ', ' * '].sample();
var str = l[2]+m1+l[3];
var ans = eval(la[2]+m1+la[3]);
>
    //デーモン
    <calc0:
this._l=CalcManager.assignLiterals(5);
>
<calc:
var str = rand1(5).ts()+' + '+rand1(5).ts();
var ans = eval(str);
str = str+' = '+l[0];
la[0] = ans;
yield
var str = rand1(5).ts()+' + '+rand1(5).ts();
var ans = eval(str);
str = str+' = '+l[1];
la[1] = ans;
yield
var str = rand1(5).ts()+' + '+rand1(5).ts();
var ans = eval(str);
str = str+' = '+l[2];
la[2] = ans;
yield
var str = rand1(5).ts()+' + '+rand1(5).ts();
var ans = eval(str);
str = str+' = '+l[3];
la[3] = ans;
yield
var str = rand1(5).ts()+' + '+rand1(5).ts();
var ans = eval(str);
str = str+' = '+l[4];
la[4] = ans;
yield
var m1 = [' + ', ' - ', ' * '].sample();
var str = l[0]+m1+l[1]
var ans = eval(la[0]+m1+la[1]);
yield
var m1 = [' + ', ' - ', ' * '].sample();
var m2 = [' + ', ' - ', ' * '].sample();
var str = l[2]+m1+l[3]+m2+l[4];
var ans = eval(la[2]+m1+la[3]+m2+la[4]);
>
    
    <calc0:
this._l=CalcManager.assignLiterals(5);
>
<calc:
var str = rand1(5).ts()+' + '+rand1(5).ts();
var ans = eval(str);
str = str+' = '+l[0];
la[0] = ans;
yield
var str = rand1(5).ts()+' + '+rand1(5).ts();
var ans = eval(str);
str = str+' = '+l[1];
la[1] = ans;
yield
var str = rand1(5).ts()+' + '+rand1(5).ts();
var ans = eval(str);
str = str+' = '+l[2];
la[2] = ans;
yield
var str = rand1(5).ts()+' + '+rand1(5).ts();
var ans = eval(str);
str = str+' = '+l[3];
la[3] = ans;
yield
var str = rand1(5).ts()+' + '+rand1(5).ts();
var ans = eval(str);
str = str+' = '+l[4];
la[4] = ans;
yield
var v1 = rand(4);
var v2 = rand(4);
var m1 = [' + ', ' - ', ' * '].sample();
var str = l[v1]+m1+l[v2]
var ans = eval(la[v1]+m1+la[v2]);
yield
var v1 = rand(4);
var v2 = rand(4);
var m1 = [' + ', ' - ', ' * '].sample();
var str = l[v1]+m1+l[v2]
var ans = eval(la[v1]+m1+la[v2]);
>
    
    
    //16アースエレメント
<calc0:
this._l=CalcManager.assignLiterals(2);
>
<calc:
var str = (rand1(8)+1).ts()+' * '+(rand1(8)+1).ts();
var ans = eval(str);
str = str+' = '+l[0];
la[0] = ans;
yield
var str = (rand1(8)+1).ts()+' * '+(rand1(8)+1).ts();
var ans = eval(str);
str = str+' = '+l[1];
la[1] = ans;
yield
var str = l[0]+' + '+l[1];
var ans = eval(la[0]+' + '+la[1]);
>
    
    //17バルキリー
<calc0:
this._l=CalcManager.assignLiterals(3);
>
<calc:
var str = (rand1(8)+1).ts()+' + '+(rand1(8)+1).ts();
var ans = eval(str);
str = str+' = '+l[0];
la[0] = ans;
yield
var v1 = (rand1(8)+1).ts()
var str = v1+' + '+l[0];
var ans = eval(v1+' + '+la[0]);
str = str+' = '+l[1];
la[1] = ans;
yield
var v1 = (rand1(8)+1).ts()
var str = v1+' + '+l[1];
var ans = eval(v1+' + '+la[1]);
str = str+' = '+l[2];
la[2] = ans;
yield
var v1 = (rand1(8)+1).ts()
var str = v1+' + '+l[2];
var ans = eval(v1+' + '+la[2]);
>
    
    <calc0:
this._l=CalcManager.assignLiterals(4);
>
<calc:
var str = (rand1(8)+1).ts()+' + '+(rand1(8)+1).ts();
var ans = eval(str);
str = str+' = '+l[0];
la[0] = ans;
yield
var v1 = (rand1(8)+1).ts()
var str = v1+' + '+l[0];
var ans = eval(v1+' + '+la[0]);
str = str+' = '+l[1];
la[1] = ans;
yield
var v1 = (rand1(8)+1).ts()
var str = v1+' + '+l[1];
var ans = eval(v1+' + '+la[1]);
str = str+' = '+l[2];
la[2] = ans;
yield
var v1 = (rand1(8)+1).ts()
var str = v1+' + '+l[2];
var ans = eval(v1+' + '+la[2]);
str = str+' = '+l[3];
la[3] = ans;
yield
var v1 = (rand1(8)+1).ts()
var str = v1+' + '+l[3];
var ans = eval(v1+' + '+la[3]);
>
    
this._a = [0,0,50,100,200,300,500,1000,2000,3000,5000,7000,10000,
           15000,20000,25000,30000,35000,40000,45000,5000000];
var level;
for (level = 1;;level++){
    if(this._a[level] >= $gameVariables.value(103)){
        break;
    }
}
this._hLevel = level-1;

//フェニックス
<calc:
do{var v1 = (rand1(9)+10)} while(v[0]==v1);
v[0] = v1;
var v2 = 50 + this._counter*10;
var str = v2.ts()+' % '+v1.ts();
var ans = eval(str);
>

<calc:
var op1 = rand(2) == 1 ? (rand(2) == 1 ? ' + ' : ' - ') : ' * ';
var str = (rand1(9)+1)+ op1 +(rand1(9)+1);
var ans = eval(str);
>

<calc0:
this._l=CalcManager.assignLiterals(2);
this._obj._states.push(11);
>
<calc:
if (this._counter != 0){
this._obj.removeState(11)};
var str = (rand1(3) + 3)+' + '+rand1(5);
var ans = eval(str);
str = l[0] + ' = ' + str;
la[0] = ans;
yield
this._obj.addState(11);
var str = (rand1(3) + 3) +' + '+rand1(5);
var ans = eval(str);
str = l[1] + ' = ' + str;
la[1] = ans;
yield
var str = (rand1(3) + 3) +' + '+rand1(5);
var ans = eval(str);
yield
var str = l[0]+' + '+l[1];
var ans = la[0] + la[1];
>
    
<calc:
la[0] = rand1(5)+5;
la[1] = rand1(5)+5;
var str = la[0] +' + '+la[1];
var ans = eval(str);
yield
la[2] = rand1(5);
la[3] = rand(2) == 1 ?  ' + ' : ' - ' ;
var str = la[0] +' + '+la[1] + la[3] +la[2];
var ans = eval(str);
yield
var str = la[0] +' + '+la[1] + la[3] +la[2] + ' + ' + rand1(5);
var ans = eval(str);
>
//tier1 シーフ
<calc0:
this._l=CalcManager.assignLiterals(2);
this._obj._states.push(11);
>
<calc:
if (this._counter != 0){
this._obj.removeState(11)};
var str = rand1(3)+' + '+rand1(3);
var ans = eval(str);
str = l[0] + ' = ' + str;
la[0] = ans;
yield
this._obj.addState(11);
var str = rand1(3)+' + '+rand1(3);
var ans = eval(str);
str = l[1] + ' = ' + str;
la[1] = ans;
yield
var str = l[0]+' + '+l[1];
var ans = la[0] + la[1];
>  

<calc0:
this._l=CalcManager.assignLiterals(1);
this._obj._states.push(11);
>
<calc:
if (this._counter != 0){
this._obj.removeState(11)};
var str = rand1(5)+' + '+rand1(5);
var ans = eval(str);
str = l[0] + ' = ' + str;
la[0] = ans;
yield
this._obj.addState(11);
var v1 = rand1(5);
var str = l[0]+' + '+v1;
var ans = la[0]+v1;
>

1  9
2  8 9
3  7 8 9
4  6 7 8 9

//ミニゲージに関するコード 一応消さない。
//var _Window_BattleStatus_initialize = Window_BattleStatus.prototype.initialize;
//Window_BattleStatus.prototype.initialize = function(){
//    this._miniGauges = [];
//    _Window_BattleStatus_initialize.call(this);
//    //this.addChild(miniGauge);
//}
//
//var _Window_BattleStatus_refresh = Window_BattleStatus.prototype.refresh;
//Window_BattleStatus.prototype.refresh = function(){
//    _Window_BattleStatus_refresh.call(this);
//    if(!this._miniGauges.length==0){
//        this._miniGauges.forEach(function(w){
//            w.refresh();
//        })
//    }
//}
//
//Window_BattleStatus.prototype.makeMiniGauge = function(){
//    $gameParty.members().forEach(function(actor){
//        this._miniGauges.push(new Window_MiniGauge(actor));
//    },this)
//}

//ミニゲージ一応消さない。
//function Window_MiniGauge(){
//    this.initialize.apply(this,arguments);
//}
//
//Window_MiniGauge.prototype = Object.create(Window_Base.prototype);
//Window_MiniGauge.prototype.constructor = Window_MiniGauge;
//
//Window_MiniGauge.prototype.initialize = function(actor){
//    Window_Base.prototype.initialize.call(this, 0, 0, 120, 100)
//    this._actor = actor;
//    this.padding = 0;
//    this.margin = 0;
//    this._windowFrameSprite.visible = false;
//    this._windowBackSprite.visible = false;
//    this.refresh();
//    actor._sprite.addChild(this);
//    this.x = 30;
//    this.y = -40;
//}
//
//Window_MiniGauge.prototype.refresh = function(){
//    if(this.contents){
//        this.contents.clear();
//        this.drawItem();
//    }
//}
//
//Window_MiniGauge.prototype.drawItem = function(){
//    this.drawActorHp(this._actor, 0, 0, this.contentsWidth());
//}
    