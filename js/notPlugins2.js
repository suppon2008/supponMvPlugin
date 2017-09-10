//ジェネレーターテスト
//201 デザートアサシン
<calc0:
this._l=CalcManager.assignLiterals(2);
this._obj._states.push(11);
>
<calc:
if (this._counter != 0){
this._obj.removeState(11)};
var str = r(3,6)+' + '+r(5);
var ans = eval(str);
str = l[0] + ' = ' + str;
la[0] = ans;
yield
this._obj.addState(11);
var str = r(3,6)+' + '+r(5);
var ans = eval(str);
str = l[1] + ' = ' + str;
la[1] = ans;
yield
var str = l[0]+' + '+l[1];
var ans = la[0] + la[1];
>

//202 バジリスク
<calc0:
this._l=CalcManager.assignLiterals(2);
this._obj._states.push(11);
>
<calc:
if (this._counter != 0){
this._obj.removeState(11)};
var ans = r(3,9);
var v1 = r(3,9);
var str = ans*v1+' / '+ v1
str = l[0] + ' = ' + str;
la[0] = ans;
yield
var ans = r(3,9);
var v1 = r(3,9);
var str = ans*v1+' / '+ v1
str = l[1] + ' = ' + str;
la[1] = ans;
yield
var str = l[0]+' + '+l[1];
var ans = la[0] + la[1];
>

//203
<calc0:
this._l=CalcManager.assignLiterals(2);
this._obj._states.push(11);
>
<calc:
if (this._counter != 0){
this._obj.removeState(11)};
var str = r(3,10)+' + '+r(3,10);
var ans = eval(str);
str = l[0] + ' = ' + str;
la[0] = ans;
yield
this._obj.addState(11);
la[1] = r(5,la[0]-1);
var v1 = r(la[1]-1)
var str = v1+' + '+(la[1]-v1);
var ans = eval(str);
str = l[1] + ' = ' + str;
yield
var str = l[0]+' - '+l[1];
var ans = la[0] - la[1];
>

//204
<calc0:
this._l=CalcManager.assignLiterals(2);
this._obj._states.push(11);
>
<calc:
if (this._counter != 0){
this._obj.removeState(11)};
var ans = r(3,9);
var v1 = r(3,9);
var str = ans*v1+' / '+ v1
str = l[0] + ' = ' + str;
la[0] = ans;
yield
var ans = r(3,9);
var v1 = r(3,9);
var str = ans*v1+' / '+ v1
str = l[1] + ' = ' + str;
la[1] = ans;
yield
var v1 = r(5, 13);
var str = l[0]+' + '+l[1]+' + '+v1;
var ans = la[0] + la[1]+v1;
>

//206
<calc0:
this._l=CalcManager.assignLiterals(3);
this._obj._states.push(11);
>
<calc:
if (this._counter != 0){
this._obj.removeState(11)};
var ans = r(3,9);
var v1 = r(3,9);
var str = ans*v1+' / '+ v1
str = l[0] + ' = ' + str;
la[0] = ans;
yield
var ans = r(3,9);
var v1 = r(3,9);
var str = ans*v1+' / '+ v1
str = l[1] + ' = ' + str;
la[1] = ans;
yield
var ans = r(3,9);
var v1 = r(3,9);
var str = ans*v1+' / '+ v1
str = l[2] + ' = ' + str;
la[2] = ans;
yield
var str = l[0]+' + '+l[1]+' + '+l[2];
var ans = la[0] + la[1]+la[2];
>

//207
<calc:
var str = r(10,15)+' % '+r(3,9);
var ans = eval(str);
>
    
//218
<calc:
var ans = r(1,10);
var v1 = r(5);
var str = 'X'+' + '+v1+' = '+(v1+ans);
>

//219
<calc:
    var ans = rr(10);
    var v1 = r(5);
    var str = 'x'+' - '+v1+' = '+(ans-v1);
>

//220
<calc:
    var ans = rr(9);
    var v1 = r(9);
    var str = 'x'+' * '+v1+' = '+(ans*v1);
>
    
//221
<calc:
    var v1 = r(9);
    var ans = rr(9)*v1;
    var str = 'x'+' / '+v1+' = '+(ans/v1);
>

//222
<calc:
    var ans = rr(10);
    var v1 = r(10);
    var v2 = r(10);
    var str = 'x'+' + '+(v1+v2)+' = '+(v1+ans)+' + '+v2;
>
    
//221
<calc:
    var ans = rr(10);
    var v1 = r(15);
    var v2 = r(v1-1);
    var str = 'x'+' + '+(v1-v2)+' = '+(v1+ans)+' - '+v2;
>
    
//224
<calc:
    if (this._counter == 0) {
        var str = r(10, 50)+' + '+r(10, 50);
        var ans = eval(str);
    } else {
        var str = r(10)+' + '+r(10);
        var ans = eval(str);
    }
>
    
//225
<calc:
    if (this._counter == 0) {
        var v1 = r(50, 99);
        var str = v1+' - '+r(20, v1-1);
        var ans = eval(str);
    } else {
        var v1 = r(2,10);
        var str = v1+' - '+r(v1-1);
        var ans = eval(str);
    }
>
    
//226
<calc:
    if (this._counter < 2) {
        var str = r(10, 50)+' + '+r(10, 50);
        var ans = eval(str);
    } else {
        var str = r(10)+' + '+r(10);
        var ans = eval(str);
    }
>

//227
<calc:
    var str = r(10, 50)+' + '+r(10, 50);
    var ans = eval(str);
>

//228
<calc:
var v1 = r(50, 99);
var str = v1+' - '+r(20, v1-1);
var ans = eval(str);
>

//218
<calc0:
this._l=CalcManager.assignLiterals(1);
>
<calc:
var str = r(5, 15) + ' + ' + r(5, 15);
var ans = eval(str);
str = l[0] + ' = ' + str;
yield
var ans = r(5, 15);
var v1 = r(5, 15);
var str = l[0]+' + '+v1+' = '+(v1+ans);
>

//219
<calc0:
this._l=CalcManager.assignLiterals(1);
>
<calc:
var ans = r(5, 15);
var v1 = r(1, ans-1);
var str = l[0]+' = '+(ans+v1)+' - '+v1;
yield
var ans = r(5, 15);
var v1 = r(1, ans-1);
var str = l[0]+' - '+v1+' = '+(ans-v1);
>


//220
<calc0:
this._l=CalcManager.assignLiterals(1);
>
<calc:
var v1 = r(2, 9);
var v2 = r(2, 9);
var ans = v1*v2;
var str = l[0]+' = '+v1+' * '+v2;
yield
var v1 = r(2, 9);
var ans = r(2, 9);
var str = l[0]+' * '+v1+' = '+(ans*v1);
>

//221
<calc0:
this._l=CalcManager.assignLiterals(1);
>
<calc:
var v1 = r(2, 9);
var ans = r(2, 9);
var str = l[0]+' = '+v1*ans+' / '+v1;
yield
var v1 = r(2, 9);
var ans = r(2, 9)*v1;
var str = l[0]+' / '+v1+' = '+(ans/v1);
>

//222
<calc0:
this._l=CalcManager.assignLiterals(1);
>
<calc:
switch(r(4)){
    case 1:
        var ans = r(5, 15);
        var v1 = r(5, 15);
        var str = l[0]+' + '+v1+' = '+(v1+ans);
        break;
    case 2:
        var ans = r(5, 15);
        var v1 = r(1, ans-1);
        var str = l[0]+' - '+v1+' = '+(ans-v1);
        break;
    case 3:
        var v1 = r(2, 9);
        var ans = r(2, 9);
        var str = l[0]+' * '+v1+' = '+(ans*v1);
        break;
    default:
        var v1 = r(2, 9);
        var ans = r(2, 9)*v1;
        var str = l[0]+' / '+v1+' = '+(ans/v1);
        break;
}
>
    
//223
<calc0:
this._l=CalcManager.assignLiterals(1);
>
<calc:
var ans = r(15, 30);
var v1 = r(15, 30);
var str = l[0]+' + '+v1+' = '+(v1+ans);
yield
var ans = r(20, 30);
var v1 = r(10, ans-1);
var str = l[0]+' - '+v1+' = '+(ans-v1);
yield
var v1 = r(2, 13);
var ans = r(6, 9);
var str = l[0]+' * '+v1+' = '+(ans*v1);
yield
var v1 = r(2, 9);
var ans = r(8, 15)*v1;
var str = l[0]+' / '+v1+' = '+(ans/v1);
>
    
//230
<calc0:
this._l=CalcManager.assignLiterals(1);
>
<calc:
var ans = r(10, 20);
var v1 = r(5, ans-1);
var str = '?'+l[0]+' + '+'1'+' = '+(v1+1)+' + '+(ans-v1);
yield
var ans = r(10, 20);
var v1 = r(5, ans-1);
var str = '?'+l[0]+' - '+'1'+' = '+(v1-1)+' + '+(ans-v1);
>
    
//231
<calc0:
this._l=CalcManager.assignLiterals(1);
>
<calc:
var ans = r(30, 50);
var v1 = r(15, ans-1);
var str = '?'+l[0]+' + '+'1'+' = '+(v1+1)+' + '+(ans-v1);
yield
var ans = r(30, 50);
var v1 = r(15, ans-1);
var str = '?'+l[0]+' - '+'1'+' = '+(v1-1)+' + '+(ans-v1);
>
    
//232
<calc0:
this._l=CalcManager.assignLiterals(1);
>
<calc:
var ans = r(10, 20);
var v1 = r(5, ans-1);
var v2 = r(2,9);
var str = '?'+l[0]+' + '+v2+' = '+(v1+v2)+' + '+(ans-v1);
>

//233
<calc0:
this._l=CalcManager.assignLiterals(1);
>
<calc:
var v1 = r(10, 20);
var v2 = r(10, 20);
var v3 = r(2, 9);
var ans = v1 + v2;
var str = '?'+l[0]+' - '+v3+' = '+(v1-v3)+' + '+v2;
>

//234
<calc0:
this._l=CalcManager.assignLiterals(1);
>
<calc:
var ans = r(10, 20);
var v1 = r(5, ans-1);
var v2 = r(2,9);
var str = '?'+l[0]+' + '+v2+' = '+(v1+v2)+' + '+(ans-v1);
yield
var v1 = r(10, 20);
var v2 = r(10, 20);
var v3 = r(2, 9);
var ans = v1 + v2;
var str = '?'+l[0]+' - '+v3+' = '+(v1-v3)+' + '+v2;
>

//235
<calc0:
this._l=CalcManager.assignLiterals(1);
>
<calc:
var ans = r(30, 50);
var v1 = r(15, ans-10);
var v2 = r(2,9);
var str = '?'+l[0]+' + '+v2+' = '+(v1+v2)+' + '+(ans-v1);
yield
var ans = r(30, 50);
var v1 = r(15, ans-10);
var v2 = r(2, 9);
var str = '?'+l[0]+' - '+v2+' = '+(v1-v2)+' + '+(ans-v1);
>

//236
<calc0:
this._l=CalcManager.assignLiterals(3);
this._obj.addState(11);
>
<calc:
if (this._counter != 0){this._obj.removeState(11)};
var ans = r(3, 9);
var v1 = r(1, ans-1)
var str = '?'+l[0]+' = '+v1+' + '+(ans-v1);
la[0] = ans;
yield
this._obj.addState(11);
var ans = r(3, 9);
var v1 = r(1, ans-1)
var str = '?'+l[1]+' = '+v1+' + '+(ans-v1);
la[1] = ans;
yield
var ans = r(3, 9);
var v1 = r(1, ans-1)
var str = '?'+l[2]+' = '+v1+' + '+(ans-v1);
la[2] = ans;
yield
var ans = la[0]+la[1]+la[2];
var str = l[0]+' + '+l[1]+' + '+l[2];
>

//237
<calc0:
this._l=CalcManager.assignLiterals(3);
this._obj.addState(11);
>
<calc:
if (this._counter != 0){this._obj.removeState(11)};
var ans = r(3, 9);
var v1 = r(1, ans-1)
var str = '?'+l[0]+' = '+(v1+ans)+' - '+v1;
la[0] = ans;
yield
this._obj.addState(11);
var ans = r(3, 9);
var v1 = r(1, ans-1)
var str = '?'+l[1]+' = '+(v1+ans)+' - '+v1;
la[1] = ans;
yield
var ans = r(3, 9);
var v1 = r(1, ans-1)
var str = '?'+l[2]+' = '+(v1+ans)+' - '+v1;
la[2] = ans;
yield
var ans = la[0]+la[1]+la[2];
var str = l[0]+' + '+l[1]+' + '+l[2];
>
    
//238
<calc0:
this._l=CalcManager.assignLiterals(3);
this._obj.addState(11);
>
<calc:
if (this._counter != 0){this._obj.removeState(11)};
var ans = r(3, 9);
var v1 = r(1, ans-1)
var str = '?'+l[0]+' = '+v1+' + '+(ans-v1);
la[0] = ans;
yield
this._obj.addState(11);
var ans = r(3, 9);
var v1 = r(1, ans-1)
var str = '?'+l[1]+' = '+v1+' + '+(ans-v1);
la[1] = ans;
yield
var ans = r(3, 9);
var v1 = r(1, ans-1)
var str = '?'+l[2]+' = '+v1+' + '+(ans-v1);
la[2] = ans;
yield
var v1 = r(0, 2);
var v2 = r(0, 2);
var v3 = r(0, 2);
var str = l[v1]+' + '+l[v2]+' + '+l[v3];
var ans = la[v1]+la[v2]+la[v3];
>
    
//239
<calc0:
this._l=CalcManager.assignLiterals(3);
this._obj.addState(11);
>
<calc:
if (this._counter != 0){this._obj.removeState(11)};
var ans = r(3, 9);
var v1 = r(1, ans-1)
var str = '?'+l[0]+' = '+(v1+ans)+' - '+v1;
la[0] = ans;
yield
this._obj.addState(11);
var ans = r(3, 9);
var v1 = r(1, ans-1)
var str = '?'+l[1]+' = '+(v1+ans)+' - '+v1;
la[1] = ans;
yield
var ans = r(3, 9);
var v1 = r(1, ans-1)
var str = '?'+l[2]+' = '+(v1+ans)+' - '+v1;
la[2] = ans;
yield
var v1 = r(0, 2);
var v2 = r(0, 2);
var v3 = r(0, 2);
var str = l[v1]+' + '+l[v2]+' + '+l[v3];
var ans = la[v1]+la[v2]+la[v3];
>
    
//240
<calc0:
this._l=CalcManager.assignLiterals(4);
this._obj.addState(11);
>
<calc:
if (this._counter != 0){this._obj.removeState(11)};
var ans = r(3, 9);
var v1 = r(1, ans-1)
var str = '?'+l[0]+' = '+v1+' + '+(ans-v1);
la[0] = ans;
yield
this._obj.addState(11);
var ans = r(3, 9);
var v1 = r(1, ans-1)
var str = '?'+l[1]+' = '+v1+' + '+(ans-v1);
la[1] = ans;
yield
var ans = r(3, 9);
var v1 = r(1, ans-1)
var str = '?'+l[2]+' = '+v1+' + '+(ans-v1);
la[2] = ans;
yield
var ans = r(3, 9);
var v1 = r(1, ans-1)
var str = '?'+l[3]+' = '+v1+' + '+(ans-v1);
la[3] = ans;
yield
var ans = la[0]+la[1]+la[2]+la[3];
var str = l[0]+' + '+l[1]+' + '+l[2]+' + '+l[3];
>   

//241
<calc0:
this._l=CalcManager.assignLiterals(5);
this._obj.addState(11);
>
<calc:
if (this._counter != 0){this._obj.removeState(11)};
var ans = r(3, 9);
var v1 = r(1, ans-1)
var str = '?'+l[0]+' = '+v1+' + '+(ans-v1);
la[0] = ans;
yield
this._obj.addState(11);
var ans = r(3, 9);
var v1 = r(1, ans-1)
var str = '?'+l[1]+' = '+v1+' + '+(ans-v1);
la[1] = ans;
yield
var ans = r(3, 9);
var v1 = r(1, ans-1)
var str = '?'+l[2]+' = '+v1+' + '+(ans-v1);
la[2] = ans;
yield
var ans = r(3, 9);
var v1 = r(1, ans-1)
var str = '?'+l[3]+' = '+v1+' + '+(ans-v1);
la[3] = ans;
yield
var ans = r(3, 9);
var v1 = r(1, ans-1)
var str = '?'+l[4]+' = '+v1+' + '+(ans-v1);
la[4] = ans;
yield
var ans = la[0]+la[1]+la[2]+la[3]+la[4];
var str = l[0]+' + '+l[1]+' + '+l[2]+' + '+l[3]+' + '+l[4];
>
    
//242
<calc:
var ans = r(3, 9);
var v1 = r(9, 19)
var str = (ans*v1)+' / '+v1;
la[0] = ans;
yield
var ans = la[0]*9;
var v1 = r(9,ans-10);
var str = (ans-v1)+' + '+v1;
>

//243
<calc:
var ans = r(3, 9);
var v1 = r(9, 19)
var str = (ans*v1)+' / '+v1;
la[0] = ans;
yield
var ans = la[0]*9;
var v1 = r(9,ans-10);
var str = (ans+v1)+' - '+v1;
>

//244
<calc:
var v1 = r(80, 100);
var v2 = r(3, 9);
var str = v1+' % '+v2;
var ans = eval(str);
la[0] = ans;
yield
if (la[0]==0){la[0]=10};
var ans = la[0]*9;
var v1 = r(8,ans);
var str = (ans-v1)+' + '+v1;
>

//245
<calc:
var v1 = r(80, 100);
var v2 = r(3, 9);
var str = v1+' % '+v2;
var ans = eval(str);
la[0] = ans;
yield
if (la[0]==0){la[0]=10};
var ans = la[0]*9;
var v1 = r(8,ans);
var str = (ans+v1)+' - '+v1;
>

//246
<calc:
var v1 = r(3, 9);
var v2 = r(150, 200);
var str = (v2-v2%v1)+' / '+v1;
var ans = eval(str);
la[0] = ans;
yield
var ans = la[0]*9;
var v1 = r(9,ans-10);
var str = (ans-v1)+' + '+v1;
>

//247
<calc:
var v1 = r(100, 150);
var v2 = r(3, 9);
var str = v1+' % '+v2;
var ans = eval(str);
la[0] = ans;
yield
if (la[0]==0){la[0]=10};
var ans = la[0]*9;
var v1 = r(8,ans);
var str = (ans+v1)+' - '+v1;
>
    
//248
<calc:
var v1 = r(3, 9);
var v2 = r(150, 200);
var str = (v2-v2%v1)+' / '+v1;
var ans = eval(str);
yield
var v1 = r(100, 150);
var v2 = r(3, 9);
var str = v1+' % '+v2;
var ans = eval(str);
>

//249
<calc0:
this._l=CalcManager.assignLiterals(1);
>
<calc:
if (this._counter != 0){
    if (this._counter == 2){this._obj.removeState(11)};
    var v1 = rr(3, 9);
    var ans = la[0] + v1;
    var str = l[0]+' + '+v1;
} else {
    this._obj.addState(11);
    var ans = r(3, 9);
    var v1 = r(1, ans-1)
    var str = '?'+l[0]+' = '+v1+' + '+(ans-v1); 
    la[0] = ans;
};
>

//250
<calc0:
this._l=CalcManager.assignLiterals(1);
>
<calc:
if (this._counter != 0){
    if (this._counter == 2){this._obj.removeState(11)};
    var v1 = rr(3, 19);
    var ans = la[0] + v1;
    var str = l[0]+' + '+v1;
} else {
    this._obj.addState(11);
    var ans = r(3, 9);
    var v1 = r(1, ans-1)
    var str = '?'+l[0]+' = '+v1+' + '+(ans-v1); 
    la[0] = ans;
};
>

//251
<calc0:
    this._l=CalcManager.assignLiterals(1);
>
<calc:
    if (this._counter != 0){
        if (this._counter == 2){this._obj.removeState(11)};
        var v1 = rr(la[0]+1, la[0]+10);
        var ans = v1 - la[0];
        var str = v1+' - '+l[0];
    } else {
        this._obj.addState(11);
        var ans = r(3, 9);
        var v1 = r(1, ans-1)
        var str = '?'+l[0]+' = '+v1+' + '+(ans-v1); 
        la[0] = ans;
    };
>

//252
<calc0:
    this._l=CalcManager.assignLiterals(1);
>
<calc:
    if (this._counter != 0){
        if (this._counter == 2){this._obj.removeState(11)};
        var v1 = rr(11, 30);
        var ans = la[0] * v1;
        var str = l[0]+' * '+v1;
    } else {
        this._obj.addState(11);
        var ans = r(3, 9);
        var v1 = r(1, ans-1)
        var str = '?'+l[0]+' = '+v1+' + '+(ans-v1); 
        la[0] = ans;
    };
>

//253
<calc0:
    this._l=CalcManager.assignLiterals(2);
>
<calc:
    switch(this._counter){
        case 0:
            this._obj.addState(11);
        case 1:
            var v0 = this.counter_%2 == 0 ? 0 : 1;
            var ans = r(3, 9);
            var v1 = r(1, ans-1);
            var str = '?'+l[v0]+' = '+v1+' + '+(ans-v1); 
            la[v0] = ans;
            break;       
        case 3:
            this._obj.removeState(11);
        default:
            var v0 = this.counter_%2 == 0 ? 0 : 1;
            var v1 = rr(3, 9);
            var ans = la[v0] + v1;
            var str = l[v0]+' + '+v1;
    };
>
    
//254
<calc0:
    this._l=CalcManager.assignLiterals(2);
>
<calc:
    switch(this._counter){
        case 0:
            this._obj.addState(11);
        case 1:
            var v0 = this._counter%2 == 0 ? 0 : 1;
            var ans = r(3, 9);
            var v1 = r(1, ans-1);
            var str = '?'+l[v0]+' = '+v1+' + '+(ans-v1); 
            la[v0] = ans;
            break;       
        case 3:
            this._obj.removeState(11);
        default:
            var v0 = this._counter%2 == 0 ? 0 : 1;
            var v1 = rr(11, 30);
            var ans = la[v0] * v1;
            var str = l[v0]+' * '+v1;
    };
>

//255
<calc0:
    this._l=CalcManager.assignLiterals(1);
>
<calc:
    var ans = r(10, 20);
    var v1 = r(5, ans-1);
    var v2 = r(2,9);
    var str = (v1+v2)+' + '+(ans-v1)+' = '+'?'+l[0]+' + '+v2;
yield
    var v1 = r(10, 20);
    var v2 = r(10, 20);
    var v3 = r(2, 9);
    var ans = v1 + v2;
    var str = (v1-v3)+' + '+v2+' = '+'?'+l[0]+' - '+v3;
>
    
//256
<calc0:
    this._l=CalcManager.assignLiterals(1);
>
<calc:
    var v1 = r(2, 9);
    var v2 = r(2, 9);
    var v3 = r(2, 9);
    var str = v1+' + '+v2+' = '+'?'+l[0]+' / '+v3;
    var ans = (v1+v2)*v3;
yield
    var v1 = r(10, 40);
    var v2 = r(10, 40);
    var v3 = r(2, 9);
    v1 += v3-(v1+v2)%v3
    var str = v1+' + '+v2+' = '+'?'+l[0]+' * '+v3;
    var ans = (v1+v2)/v3;
>
    
//257
<calc0:
    this._l=CalcManager.assignLiterals(2);
    this._obj.addState(11);
>
<calc:
    if (this._counter != 0){this._obj.removeState(11)};
    var ans = r(10, 20);
    var v1 = r(5, ans-1);
    var v2 = r(2,9);
    var str = (v1+v2)+' + '+(ans-v1)+' = '+'?'+l[0]+' + '+v2;
    la[0] = ans;
yield
    this._obj.addState(11);
    var v1 = r(10, 20);
    var v2 = r(10, 20);
    var v3 = r(2, 9);
    var ans = v1 + v2;
    var str = (v1-v3)+' + '+v2+' = '+'?'+l[0]+' - '+v3;
    la[1] = ans;
yield
    var str = l[0]+' + '+l[1];
    var ans = la[0] + la[1];
>

//258
<calc0:
    this._l=CalcManager.assignLiterals(2);
    this._obj.addState(11);
>
<calc:
    if (this._counter != 0){this._obj.removeState(11)};
    var v1 = r(2, 9);
    var v2 = r(2, 9);
    var v3 = r(2, 9);
    var str = v1+' + '+v2+' = '+'?'+l[0]+' / '+v3;
    var ans = (v1+v2)*v3;
    la[0] = ans;
yield
    this._obj.addState(11);
    var v1 = r(10, 40);
    var v2 = r(10, 40);
    var v3 = r(2, 9);
    v1 += v3-(v1+v2)%v3
    var str = v1+' + '+v2+' = '+'?'+l[0]+' * '+v3;
    var ans = (v1+v2)/v3;
    la[1] = ans;
yield
    var str = l[0]+' + '+l[1];
    var ans = la[0] + la[1];
>

//259
<calc0:
    this._l=CalcManager.assignLiterals(3);
    this._obj.addState(11);
>
<calc:
    if (this._counter != 0){this._obj.removeState(11)};
    var ans = r(5, 15);
    var v1 = r(1, ans-3);
    var v2 = r(2,9);
    var str = (v1+v2)+' + '+(ans-v1)+' = '+'?'+l[0]+' + '+v2;
    la[0] = ans;
yield
    this._obj.addState(11);
    var ans = r(5, 15);
    var v1 = r(1, ans-3);
    var v2 = r(2,9);
    var str = (v1+v2)+' + '+(ans-v1)+' = '+'?'+l[1]+' + '+v2;
    la[1] = ans;
yield
    var ans = r(5, 15);
    var v1 = r(1, ans-3);
    var v2 = r(2,9);
    var str = (v1+v2)+' + '+(ans-v1)+' = '+'?'+l[2]+' + '+v2;
    la[2] = ans;
yield
    var str = l[0]+' + '+l[1]+' + '+l[2];
    var ans = la[0] + la[1] + la[2];
>
    
//260
<calc0:
    this._l=CalcManager.assignLiterals(3);
    this._obj.addState(11);
>
<calc:
    if (this._counter != 0){this._obj.removeState(11)};
    var ans = r(5, 25);
    var v1 = r(1, ans-3);
    var v2 = r(2,9);
    var str = (v1+v2)+' + '+(ans-v1)+' = '+'?'+l[0]+' + '+v2;
    la[0] = ans;
yield
    this._obj.addState(11);
    var ans = r(5, 25);
    var v1 = r(1, ans-3);
    var v2 = r(2,9);
    var str = (v1+v2)+' + '+(ans-v1)+' = '+'?'+l[1]+' + '+v2;
    la[1] = ans;
yield
    var ans = r(5, 25);
    var v1 = r(1, ans-3);
    var v2 = r(2,9);
    var str = (v1+v2)+' + '+(ans-v1)+' = '+'?'+l[2]+' + '+v2;
    la[2] = ans;
yield
    var str = l[0]+' + '+l[1]+' + '+l[2];
    var ans = la[0] + la[1] + la[2];
>

//262
<calc:
    var v1 = r(20, 50);
    var v2 = r(10, v1-2);
    var str = v1+' - '+v2;
    var ans = eval(str);
>

//263
<calc:
    var ans = 100 + (this._counter%2==0?100:0);
    var v1 = r(11, 89);
    var str = (ans-v1)+' + '+v1;
>
    
//264
<calc:
    var v1 = r(20, 90);
    var v2 = r(10, v1-2);
    var str = v1+' - '+v2;
    var ans = eval(str);
>

//265
<calc:
    var v1 = r(100, 999);
    var str = 999+' + '+v1;
    var ans = eval(str);
>
    
//266
<calc:
    var ans = r(1, 9)*100
    var v1 = r(11, ans-50);
    var str = (ans-v1)+' + '+v1;
>

//267
<calc:
    var v1 = r(20, 90);
    var v2 = r(10, v1-2);
    var str = v1+' - '+v2;
    var ans = eval(str);
yield
    var ans = r(10, 90)*10
    var v1 = r(11, ans-50);
    var str = (ans-v1)+' + '+v1;
>

//268
<calc:
    var str = r(11, 99)+' + '+r(11, 99);
    var ans = eval(str);
>

//269
<calc:
    var str = '('+r(1001, 9999)+' + '+r(1001, 9999)+')'+' % '+10;
    var ans = eval(str);
>

//270
<calc:
    var str = r(11, 99)+' + '+r(11, 99)+' + '+r(2, 9);
    var ans = eval(str);
>

//271
<calc:
    var str = '('+r(1001, 9999)+' + '+r(1001, 9999)+')'+' % '+100;
    var ans = eval(str);
>

//272
<calc:
    var str = r(11, 99)+' * '+r(2, 9);
    var ans = eval(str);
>

//273
<calc:
    var str = r(101, 899)+' + '+r(11, 99);
    var ans = eval(str);
>
    
//274
<calc:
    var str = r(50, 99)+' - '+r(11, 40);
    var ans = eval(str);
>

//275
<calc:
    var str = 999+' - '+r(999);
    var ans = eval(str);
>

//276
<calc:
    var v1 = r(190, 210);
    var v2 = r(11, 19);
    var str = (v1+(v2-v1%v2))+' / '+v2;
    var ans = eval(str);
>

//277
<calc:
    var str = 1000+' - '+r(999);
    var ans = eval(str);
>

//278
<calc:
    var str = 1000+' - '+r(99)+' + '+r(99);
    var ans = eval(str);
>
    
//279
<calc:
    var v1 = r(301, 999);
    var str = v1+' - '+r(100,v1-100);
    var ans = eval(str);
>
    
//280
<calc:
    switch(this._counter){
        case 0:
            var str = r(21, 59)+' + '+r(21, 59);
            var ans = eval(str);
            la[0] = ans;
            break;
        default:
            var v1 = Math.floor((r(la[0])+r(la[0])+r(la[0]))/3);
            var str = v1+' + '+(la[0]-v1);
            var ans = eval(str);
    };
>
    
//281
<calc:
    switch(this._counter){
        case 0:
            var str = r(121, 259)+' + '+r(121, 259);
            var ans = eval(str);
            la[0] = ans;
            break;
        default:
            var v1 = Math.floor((r(la[0])+r(la[0])+r(la[0]))/3);
            var str = v1+' + '+(la[0]-v1);
            var ans = eval(str);
    };
>

//282
<calc:
    switch(this._counter){
        case 0:
            var str = r(21, 59)+' + '+r(21, 59);
            var ans = eval(str);
            la[0] = ans;
            break;
        default:
            var v1 = Math.floor((r(la[0])+r(la[0])+r(la[0]))/3);
            if(2<v1){var v2 = r(-1, 1)}else{var v2 = 1};
            var str = (v1+v2)+' + '+(la[0]-v1);
            var ans = eval(str);
    };
>

//283
<calc:
    switch(this._counter){
        case 0:
            var str = r(121, 259)+' + '+r(121, 259);
            var ans = eval(str);
            la[0] = ans;
            break;
        default:
            var v1 = Math.floor((r(la[0])+r(la[0])+r(la[0]))/3);
            var v2 = (2 < v1 ? r(-1, 1) : 1);
            var str = (v1+v2)+' + '+(la[0]-v1);
            var ans = eval(str);
    };
>

//284
<calc:
    var v1 = 111*r(9);
    var v2 = Math.floor((r(v1)+r(v1)+r(v1))/3);
    var str = (v1-v2)+' + '+v2;
    var ans = eval(str);
>

//285
<calc:
    var v1 = [123, 234, 345, 456, 567, 678, 789, 891, 912][r(0,8)];
    var v2 = Math.floor((r(v1)+r(v1)+r(v1))/3);
    var str = (v1-v2)+' + '+v2;
    var ans = eval(str);
>

//286
<calc0:
    this._la[0] = rr(1, 5);
    this._la[1] = 1;
>
<calc:
    var ans = Math.pow(2,la[1])+la[0];
    var str = 2+'!'+(la[1])+' + '+la[0];
    la[1]++;
    if(la[1] == 6){la[1] = 1};
>

//287
<calc0:
    this._la[0] = rr(1, 5);
    this._la[1] = 1;
>
<calc:
    var ans = Math.pow(3,la[1])+la[0];
    var str = 3+'!'+(la[1])+' + '+la[0];
    la[1]++;
    if(la[1] == 6){la[1] = 1};
>

//288
<calc0:
    this._la[1] = 1;
>
<calc:
    var v1 = r(20);
    var ans = Math.pow(2,la[1])+v1;
    var str = 2+'!'+(la[1])+' + '+v1;
    la[1]++;
    if(la[1] == 6){la[1] = 1};
>

//289
<calc0:
    this._la[1] = 1;
>
<calc:
    var v1 = r(20);
    var ans = Math.pow(3,la[1])+v1;
    var str = 3+'!'+(la[1])+' + '+v1;
    la[1]++;
    if(la[1] == 6){la[1] = 1};
>

//290
<calc0:
    this._la[0] = 1;
    this._obj.addState(11);
>
<calc:
    if (la[0] == 8){this._obj.removeState(11)};
    var v1 = r(10);
    var ans = Math.pow(2,la[0])+v1;
    var str = 2+'!'+(la[0])+' + '+v1;
    la[0]++;
>

//291
<calc0:
    this._la[0] = 1;
    this._obj.addState(11);
>
<calc:
    if (la[0] == 8){this._obj.removeState(11)};
    var v1 = r(10);
    var ans = Math.pow(3,la[0])+v1;
    var str = 3+'!'+(la[0])+' + '+v1;
    la[0]++;
>

//292
<calc:
    var str = '( '+r(2, 10)+' + '+r(2, 10)+' ) * '+r(2, 9);
    var ans = eval(str);
>

//293
<calc:
    var str = '( '+r(2, 20)+' + '+r(2, 20)+' ) * '+r(2, 9);
    var ans = eval(str);
>

//294
<calc:
    var str = '( '+r(10, 20)+' + '+r(10, 20)+' ) * '+r(2, 9);
    var ans = eval(str);
>

//295
<calc:
    var v1 = r(90, 110);
    var v2 = r(5, 9);
    var v1 = v1 + (v2-v1%v2);
    var ans = v1/v2;
    var v3 = Math.round((r(v1)+r(v1))/2);
    var str = '( '+(v3)+' + '+(v1-v3)+' ) / '+v2;
>

//296
<calc:
    var str = '( '+r(10, 50)+' + '+r(10, 50)+' ) % '+r(5, 9);
    var ans = eval(str);
>

//297
<calc:
    var str = '( '+r(10, 50)+' + '+r(10, 50)+' ) % '+r(5, 9);
    var ans = eval(str);
>

/////////////////////////////////////////////////////////////////////
//298
<calc:
    var str = r(100, 200)+' + '+r(100, 200);
    var ans = eval(str);
>

//299
<calc:
    var str = r(100, 450)+' + '+r(100, 450);
    var ans = eval(str);
>

//300
<calc:
    var v1 = r(200, 300);
    var v2 = r(12, 15);
    var v1 = v1 + (v2-v1%v2);
    var ans = v1/v2;
    var str = v1+' / '+v2;
>

//301
<calc:
    var v1 = r(200, 400);
    var v2 = r(12, 19);
    var v1 = v1 + (v2-v1%v2);
    var ans = v1/v2;
    var str = v1+' / '+v2;
>

//302
<calc:
    var str = r(100, 950)+' + '+r(100, 950);
    var ans = eval(str);
>

//303
<calc:
    var str = r(1000, 9000)+' + '+r(100, 9000);
    var ans = eval(str);
>
/////////////////////////////////////////////////////

//305
<calc:
    var str = r(5)+' + '+r(5);
    var ans = eval(str);
>

//306
<calc:
    var v1 = r(5, 10);
    var v2 = r(v1);
    var str = v1+' - '+v2;
    var ans = eval(str);
>

//307
<calc:
    var str = r(2, 9)+' * '+r(2, 9);
    var ans = eval(str);
>

//308
<calc:
    var v1 = r(2, 9);
    var ans = r(2, 9);
    var str = (ans*v1)+' / '+v1;
>

//309
<calc:
    var str = r(10, 90)+' % '+r(2, 9);
    var ans = eval(str);
>

//310
<calc:
    var str = r(10, 20)+' + '+r(10, 20);
    var ans = eval(str);
>
//////////////////////////////////////////////////////

//311
<calc0:
this._l=CalcManager.assignLiterals(1);
>
<calc:
    var ans = r(1, 9);
    var v1 = r(1, 9);
    var str = '?'+l[0]+' + '+v1+' = '+(ans+v1);
>

//312
<calc:
    var ans = Math.pow(2, this._counter+1) % 10;
    var str = '2!'+(this._counter+1)+'  % 10';
>

//313
<calc:
    var ans = Math.pow(3, this._counter+1) % 10;
    var str = '3!'+(this._counter+1)+'  % 10';
>

//314
<calc:
    var str = '( '+r(101, 333)+' + '+r(101, 333)+' ) % 10';
    var ans = eval(str);
>

//315
<calc:
    var v1 = r(5);
    var ans = Math.pow(2, this._counter+1) % 10 + v1;
    var str = '2!'+(this._counter+1)+'  % 10 + '+v1;
>

//316
<calc:
    var v1 = r(10);
    var ans = Math.pow(3, this._counter+1) % 10 + v1;
    var str = '3!'+(this._counter+1)+'  % 10 + '+v1;
>

///////////////////////////////////////////////////////
//317
<calc:
    var ans = r(3)*11;
    var v1 = Math.round((r(ans)+r(ans))/2);
    var str = (ans-v1)+' + '+v1;
>

//318
<calc0:
    this._l=CalcManager.assignLiterals(2);
    this._obj.addState(11);
>
<calc:
    if (this._counter != 0){this._obj.removeState(11)};
    var str = r(5)+' + '+r(5);
    var ans = eval(str);
    str = '?'+l[0]+' = '+str;
    la[0] = ans;
yield
    this._obj.addState(11);
    var str = r(5)+' + '+r(5);
    var ans = eval(str);
    str = '?'+l[1]+' = '+str;
    la[1] = ans;
yield
    var ans = la[0]+la[1]
    var str = l[0]+' + '+l[1];
>

//319
<calc:
    var ans = r(6)*11;
    var v1 = Math.round((r(ans)+r(ans))/2);
    var str = (ans-v1)+' + '+v1;
>

//320
<calc0:
    this._l=CalcManager.assignLiterals(3);
    this._obj.addState(11);
>
<calc:
    if (this._counter != 0){this._obj.removeState(11)};
    var str = r(5)+' + '+r(5);
    var ans = eval(str);
    str = '?'+l[0]+' = '+str;
    la[0] = ans;
yield
    this._obj.addState(11);
    var str = r(5)+' + '+r(5);
    var ans = eval(str);
    str = '?'+l[1]+' = '+str;
    la[1] = ans;
yield
    var str = r(5)+' + '+r(5);
    var ans = eval(str);
    str = '?'+l[2]+' = '+str;
    la[2] = ans;
yield
    var ans = la[0]+la[1]+la[2];
    var str = l[0]+' + '+l[1]+' + '+l[2];
>

//321
<calc:
    var ans = r(9)*11;
    var v1 = Math.round((r(ans)+r(ans))/2);
    var str = (ans-v1)+' + '+v1;
>

//322
<calc0:
    this._l=CalcManager.assignLiterals(2);
    this._obj.addState(11);
>
<calc:
    if (this._counter != 0){this._obj.removeState(11)};
    var str = r(5)+' + '+r(5);
    var ans = eval(str);
    str = '?'+l[0]+' = '+str;
    la[0] = ans;
yield
    this._obj.addState(11);
    var ans = r(9)*11;
    var v1 = Math.round((r(ans)+r(ans))/2);
    var str = (ans-v1)+' + '+v1;
yield
    var str = r(5)+' + '+r(5);
    var ans = eval(str);
    str = '?'+l[1]+' = '+str;
    la[1] = ans;
yield
    var ans = r(9)*11;
    var v1 = Math.round((r(ans)+r(ans))/2);
    var str = (ans-v1)+' + '+v1;
yield
    var ans = la[0]+la[1]
    var str = l[0]+' + '+l[1];
>

//////////////////////////////////////////////////////////////
//323
<calc:
    var ans = r(2, 9);
    var v1 = r(11, 20);
    var str = (ans*v1)+' / '+v1;
>
    
//324
<calc:
    var ans = r(2, 9);
    var v1 = r(21, 30);
    var str = (ans*v1)+' / '+v1;
>

//325
<calc:
    var ans = r(2, 9);
    var v1 = r(31, 40);
    var str = (ans*v1)+' / '+v1;
>

//326
<calc0:
    this._l=CalcManager.assignLiterals(1);
>
<calc:
    var ans = r(2, 9);
    var str = '?'+l[0]+'!2 = '+ans*ans;
>     

//327
<calc0:
    this._la[0] = 1;
>
<calc:
    var ans = Math.pow(2, la[0]) % 100;
    var str = '2!'+la[0]+' % 100';
    la[0]++;
>
/////////////////////////////////////////////////
1  9
2  8 9
3  7 8 9
4  6 7 8 9
//328
<calc:
    var v1 = r(9);
    var v2 = r(10-v1,9);
    var str = v1+' + '+v2;
    var ans = eval(str);
>
1   2 3 4 5 6 7 8 9
2   3 4 5 6 7 8 9
3   4 5 6 7 8 9
//329
<calc:
    var v1 = r(8);
    var v2 = r(v1+1,9);
    var str = (v1+10)+' - '+v2;
    var ans = eval(str);
>

//330
<calc:
    var v1 = r(9);
    var v2 = r(10-v1,9);
    var v3 = r(9);
    var v4 = r(10-v3,9);
    var str = (v1+v3*10)+' + '+(v2+v4*10);
    var ans = eval(str);
>

//331
<calc:
    var v1 = r(8);
    var v2 = r(v1+1,9);
    var v3 = r(8);
    var v4 = r(v3+1,9);
    var str = (v1+10+(v3+10)*10)+' - '+(v2+v4*10);
    var ans = eval(str);
>

//332
<calc:
    var v1 = r(9);
    var v2 = r(10-v1,9);
    var v3 = r(9);
    var v4 = r(10-v3,9);
    var v5 = r(9);
    var v6 = r(10-v5,9);
    var str = (v1+v3*10+v5*100)+' + '+(v2+v4*10+v6*100);
    var ans = eval(str);
>

//333
<calc:
    var v1 = r(8);
    var v2 = r(v1+1,9);
    var v3 = r(8);
    var v4 = r(v3+1,9);
    var v5 = r(8);
    var v6 = r(v5+1,9);
    var str = (v1+10+(v3+10)*10+(v5+10)*100)+' - '+(v2+v4*10+v6*100);
    var ans = eval(str);
>

/////////////////////////////////////////////////////////////
//334
<calc0:
    this._l=CalcManager.assignLiterals(2);
    this._obj.addState(11);
>
<calc:
    if (this._counter != 0){this._obj.removeState(11)};
    var ans = r(2, 9);
    var v1 = r(1, ans-1)
    var str = '?'+l[0]+' = '+v1+' + '+(ans-v1);
    la[0] = ans;
yield
    this._obj._paramPlus[6] = 100;
    this._obj.addState(11);
    var ans = r(2, 9);
    var v1 = r(1, ans-1)
    var str = '?'+l[1]+' = '+v1+' + '+(ans-v1);
    la[1] = ans;
yield
    var ans = la[0]+la[1];
    var str = l[0]+' + '+l[1];
>

//335
<calc0:
    this._l=CalcManager.assignLiterals(2);
    this._obj.addState(11);
>
<calc:
    switch(this._counter){
        case 0:
            var ans = r(2, 9);
            var v1 = r(1, ans-1)
            var str = '?'+l[0]+' = '+v1+' + '+(ans-v1);
            la[0] = ans;
            break;
        case 1:
            this._obj._paramPlus[6] = 100;
            var ans = r(2, 9);
            var v1 = r(1, ans-1)
            var str = '?'+l[1]+' = '+v1+' + '+(ans-v1);
            la[1] = ans;
            break;
        case 10:
            this._obj.removeState(11);
            var ans = la[0]+la[1];
            var str = l[0]+' + '+l[1];
            break;
        default:
            var ans = r(2, 9);
            var v1 = r(1, ans-1)
            var str = v1+' + '+(ans-v1);
            break;
    }
>

//336, 338
<calc0:
    this._l=CalcManager.assignLiterals(2);
    this._obj.addState(11);
>
<calc:
    switch(this._counter){
        case 0:
            var ans = rr(2, 9);
            var v1 = r(1, ans-1)
            var str = '?'+l[0]+' = '+v1+' + '+(ans-v1);
            la[0] = ans;
            break;
        case 1:
            this._obj._paramPlus[6] = 100;
            var ans = rr(2, 9);
            var v1 = r(1, ans-1)
            var str = '?'+l[1]+' = '+v1+' + '+(ans-v1);
            la[1] = ans;
            break;
        case 10:
            var ans = la[0]+la[1];
            var str = l[0]+' + '+l[1];
            break;
        case 11:
            this._obj.removeState(11);
        default:
            var str = r(2,9)+' * '+r(2,9);
            var ans = eval(str);
            break;
    }
>

//337
<calc0:
    this._l=CalcManager.assignLiterals(3);
    this._obj.addState(11);
>
<calc:
    if (this._counter != 0){this._obj.removeState(11)};
    var ans = r(2, 9);
    var v1 = r(1, ans-1)
    var str = '?'+l[0]+' = '+v1+' + '+(ans-v1);
    la[0] = ans;
yield
    this._obj._paramPlus[6] = 100;
    this._obj.addState(11);
    var ans = r(2, 9);
    var v1 = r(1, ans-1)
    var str = '?'+l[1]+' = '+v1+' + '+(ans-v1);
    la[1] = ans;
yield
    var ans = r(2, 9);
    var v1 = r(1, ans-1)
    var str = '?'+l[2]+' = '+v1+' + '+(ans-v1);
    la[2] = ans;
yield
    var v1 = r(0, 2);
    var v2 = r(0, 2);
    var v3 = r(0, 2);
    var ans = la[v1]+la[v2]+la[v3];
    var str = l[v1]+' + '+l[v2]+' + '+l[v3];
>

//338
<calc0:
    this._l=CalcManager.assignLiterals(2);
    this._obj.addState(11);
>
<calc:
    switch(this._counter){
        case 0:
            var ans = rr(2, 9);
            var v1 = r(1, ans-1)
            var str = '?'+l[0]+' = '+v1+' + '+(ans-v1);
            la[0] = ans;
            break;
        case 1:
            this._obj._paramPlus[6] = 100;
            var ans = rr(2, 9);
            var v1 = r(1, ans-1)
            var str = '?'+l[1]+' = '+v1+' + '+(ans-v1);
            la[1] = ans;
            break;
        case 15:
            var ans = la[0]+la[1];
            var str = l[0]+' + '+l[1];
            break;
        case 16:
            this._obj.removeState(11);
        default:
            var op = this._counter % 2 == 0 ? ' + ' : ' * ';
            var str = r(2,9)+op+r(2,9);
            var ans = eval(str);
            break;
    }
>
    
//339
<calc0:
    this._l=CalcManager.assignLiterals(5);
    this._obj.addState(11);
>
<calc:
    if (this._counter != 0){this._obj.removeState(11)};
    var ans = rr(2, 9);
    var v1 = r(1, ans-1)
    var str = '?'+l[0]+' = '+v1+' + '+(ans-v1);
    la[0] = ans;
yield
    this._obj._paramPlus[6] = 100;
    this._obj.addState(11);
    var ans = rr(2, 9);
    var v1 = r(1, ans-1)
    var str = '?'+l[1]+' = '+v1+' + '+(ans-v1);
    la[1] = ans;
yield
    var ans = rr(2, 9);
    var v1 = r(1, ans-1)
    var str = '?'+l[2]+' = '+v1+' + '+(ans-v1);
    la[2] = ans;
yield
    var ans = rr(2, 9);
    var v1 = r(1, ans-1)
    var str = '?'+l[3]+' = '+v1+' + '+(ans-v1);
    la[3] = ans;
yield
    var ans = rr(2, 9);
    var v1 = r(1, ans-1)
    var str = '?'+l[4]+' = '+v1+' + '+(ans-v1);
    la[4] = ans;
yield
    var v1 = r(0, 4);
    var v2 = r(0, 4);
    var v3 = r(0, 4);
    var ans = la[v1]+la[v2]+la[v3];
    var str = l[v1]+' + '+l[v2]+' + '+l[v3];
>

// Tier7 //////////////////////////////////////////////////

//341
<calc:
    var v1 = r(20);
    var v2 = r(20);
    var str = '| '+v1+' - '+v2+' |';
    var ans = v1-v2;
>

//342
<calc:
    var v1 = r(10);
    var v2 = r(10);
    var v3 = r(10);
    var op1 = r(2)==1 ? ' + ' : ' - ';
    var op2 = r(2)==1 ? ' + ' : ' - ';
    var str = v1+op1+v2+op2+v3;
    var ans = eval(str);
    str = '| '+str+' |';
>

//343
<calc:
    var str = r(10, 20)+' * '+r(2, 9);
    var ans = eval(str);
>

//344
<calc0:
    this._l=CalcManager.assignLiterals(1);
>
<calc:
    var str = r(10, 20)+' * '+r(2, 9);
    var ans = eval(str);
    str = '?'+l[0]+' = '+str;
    la[0] = ans;
yield
    var v1 = r(3)*10;
    var str = '| '+v1+' - '+l[0]+' |';
    var ans = v1-la[0];
>

//345
<calc:
    var v1 = this._counter*111;
    var v2 = r(9)*11;
    var str = v2+' - '+v1;
    var ans = eval(str);
    str = '| '+str+' |';
>

//346
<calc0:
    this._l=CalcManager.assignLiterals(1);
>
<calc:
    var str = r(10, 50)+' * '+r(2, 9);
    var ans = eval(str);
    str = '?'+l[0]+' = '+str;
    la[0] = ans;
yield
    var v1 = r(50);
    var str = '| '+v1+' - '+l[0]+' |';
    var ans = v1-la[0];
>

//////////////////////////////////////////////////////////////

//347
<calc:
    var str = r(10, 20)*5+' + '+r(10, 20)*5;
    var ans = eval(str);
>

//348
<calc:
    var str = r(10, 30)*3+' + '+r(10, 30)*3;
    var ans = eval(str);
>

//349
<calc:
    var str = r(10, 30)*4+' + '+r(10, 30)*4;
    var ans = eval(str);
>

//350
<calc:
    var str = r(100, 200)*5+' + '+r(100, 200)*5;
    var ans = eval(str);
>

//351
<calc:
    var str = r(10, 90)*9+' + '+r(10, 90)*9;
    var ans = eval(str);
>

//352
<calc:
    var v1 = this._obj.hp+(this._counter==0 ? r(1000) : 0);
    var str = v1+' * '+2;
    var ans = eval(str);
>

////////////////////////////////////////////////////////////

//353
<calc0:
    this._l=CalcManager.assignLiterals(1);
>
<calc:
    var v1 = r(10, 20);
    var v2 = r(3, 9);
    var ans = r(3, 20)*v2;
    var str = (ans/v2+v1)+' = ?'+l[0]+' / '+v2+' + '+v1
>

//354
<calc0:
    this._l=CalcManager.assignLiterals(1);
>
<calc:
    var ans = r(3, 9);
    var v1 = r(10, 20);
    var v2 = r(3, 9);
    var str = (ans*v2+v1)+' = '+v1+' + '+'?'+l[0]+' * '+v2; 
>

//355
<calc0:
    this._l=CalcManager.assignLiterals(1);
>
<calc:
    var ans = r(3, 9);
    var v1 = r(ans*ans);
    var str = '?'+l[0]+'!2'+' + '+v1+' = '+(ans*ans+v1);
>

//356
<calc0:
    this._l=CalcManager.assignLiterals(1);
>
<calc:
    var ans = Math.pow(r(3, 9), 2);
    var v1 = r(11, 99);
    var str = '?'+l[0]+'!(! !1! !/ !2!) '+' + '+v1+' = '+(Math.sqrt(ans)+v1);
>

//357
<calc0:
    this._l=CalcManager.assignLiterals(1);
>
<calc:
    var ans = r(3, 9);
    var v2 = r(2, 9);
    var str = v2+' * ?'+l[0]+'!2'+' = '+(v2*ans*ans);
>

//358
<calc0:
    this._l=CalcManager.assignLiterals(2);
    this._obj.addState(11);
>
<calc:
    if (this._counter != 0){this._obj.removeState(11)};
    var v1 = r(10, 20);
    var v2 = r(3, 9);
    var ans = r(3, 20)*v2;
    la[0] = ans;
    var str = (ans/v2+v1)+' = ?'+l[0]+' / '+v2+' + '+v1
yield
    this._obj.addState(11);
    var ans = r(3, 9);
    la[1] = ans;
    var v1 = r(10, 20);
    var v2 = r(3, 9);
    var str = (ans*v2+v1)+' = '+v1+' + '+'?'+l[1]+' * '+v2;
yield
    var str = l[0]+' + '+l[1];
    var ans = la[0]+la[1];
>
    
/////////////////////////////////////////////////////////////////

//359
<calc0:
    this._l=CalcManager.assignLiterals(3);
    this._obj.addState(11);
>
<calc:
    if (this._counter != 0){this._obj.removeState(11)};
    var str = r(5)+' + '+r(5);
    var ans = eval(str);
    str = '?'+l[0]+' = '+str;
    la[0] = ans;
yield
    this._obj.addState(11);
    var str = r(5)+' + '+r(5);
    var ans = eval(str);
    str = '?'+l[1]+' = '+str;
    la[1] = ans;
yield
    var str = r(5)+' + '+r(5);
    var ans = eval(str);
    str = '?'+l[2]+' = '+str;
    la[2] = ans;
yield
    var ma = [' + ', ' - ', ' * '];
    var m1 = ma.sample();
    var m2 = ma.sample();
    var str = l[0]+m1+l[1]+m2+l[2];
    var ans = eval(la[0]+m1+la[1]+m2+la[2]);
    if (ans < 0) {str = '| '+str+' |'};
>

//360
<calc0:
    this._l=CalcManager.assignLiterals(4);
    this._obj.addState(11);
>
<calc:
    if (this._counter != 0){this._obj.removeState(11)};
    var str = r(5)+' + '+r(5);
    var ans = eval(str);
    str = '?'+l[0]+' = '+str;
    la[0] = ans;
yield
    this._obj.addState(11);
    var str = r(5)+' + '+r(5);
    var ans = eval(str);
    str = '?'+l[1]+' = '+str;
    la[1] = ans;
yield
    var str = r(5)+' + '+r(5);
    var ans = eval(str);
    str = '?'+l[2]+' = '+str;
    la[2] = ans;
yield
    var str = r(5)+' + '+r(5);
    var ans = eval(str);
    str = '?'+l[3]+' = '+str;
    la[3] = ans;
yield
    var m1 = [' + ', ' - ', ' * '].sample();
    var str = l[0]+m1+l[1]
    var ans = eval(la[0]+m1+la[1]);
    if (ans < 0) {str = '| '+str+' |'};
yield
    var m1 = [' + ', ' - ', ' * '].sample();
    var str = l[2]+m1+l[3];
    var ans = eval(la[2]+m1+la[3]);
    if (ans < 0) {str = '| '+str+' |'};
>

//361
<calc0:
    this._l=CalcManager.assignLiterals(3);
    this._obj.addState(11);
>
<calc:
    if (this._counter != 0){this._obj.removeState(11)};
    var str = r(5)+' + '+r(5);
    var ans = eval(str);
    str = '?'+l[0]+' = '+str;
    la[0] = ans;
yield
    this._obj.addState(11);
    var str = r(5)+' + '+r(5);
    var ans = eval(str);
    str = '?'+l[1]+' = '+str;
    la[1] = ans;
yield
    var str = r(5)+' + '+r(5);
    var ans = eval(str);
    str = '?'+l[2]+' = '+str;
    la[2] = ans;
yield
    var ma = [' + ', ' - ', ' * '].sample();
    var v1 = rr(0, 2);
    var v2 = rr(0, 2);
    var str = l[v1]+ma+l[v2];
    var ans = eval(la[v1]+ma+la[v2]);
    if (ans < 0) {str = '| '+str+' |'};
yield
    var ma = [' + ', ' - ', ' * '].sample();
    var v1 = rr(0, 2);
    var v2 = rr(0, 2);
    var str = l[v1]+ma+l[v2];
    var ans = eval(la[v1]+ma+la[v2]);
    if (ans < 0) {str = '| '+str+' |'};
yield
    var ma = [' + ', ' - ', ' * '].sample();
    var v1 = rr(0, 2);
    var v2 = rr(0, 2);
    var str = l[v1]+ma+l[v2];
    var ans = eval(la[v1]+ma+la[v2]);
    if (ans < 0) {str = '| '+str+' |'};
>

//362
<calc0:
    this._l=CalcManager.assignLiterals(3);
    this._obj.addState(11);
>
<calc:
    if (this._counter != 0){this._obj.removeState(11)};
    var str = r(5)+' + '+r(5);
    var ans = eval(str);
    str = '?'+l[0]+' = '+str;
    la[0] = ans;
yield
    this._obj.addState(11);
    var str = r(5)+' + '+r(5);
    var ans = eval(str);
    str = '?'+l[1]+' = '+str;
    la[1] = ans;
yield
    var str = r(5)+' + '+r(5);
    var ans = eval(str);
    str = '?'+l[2]+' = '+str;
    la[2] = ans;
yield
    var ma = [' + ', ' - ', ' * '];
    var v1 = r(0, 2);
    var v2 = r(0, 2);
    var v3 = r(0, 2);
    var v4 = r(0, 2);
    var m1 = ma.sample();
    var m2 = ma.sample();
    var m3 = ma.sample();
    var str = l[v1]+m1+l[v2]+m2+l[v3]+m3+l[v4];
    var ans = eval(la[v1]+m1+la[v2]+m2+la[v3]+m3+la[v4]);
    if (ans < 0) {str = '| '+str+' |'};
>

//363
<calc0:
    this._l=CalcManager.assignLiterals(5);
    this._obj.addState(11);
>
<calc:
    if (this._counter != 0){this._obj.removeState(11)};

    var aa = [5, 6, 7, 8, 9];
    for (var i=0 ; i<5 ; i++){
        la[i]=aa.sample();
    }
    var v1 = r(la[0]-1);
    var str = v1+' + '+(la[0]-v1);
    var ans = eval(str);
    str = '?'+l[0]+' = '+str;
yield
    this._obj.addState(11);
    var v1 = r(la[1]-1);
    var str = v1+' + '+(la[1]-v1);
    var ans = eval(str);
    str = '?'+l[1]+' = '+str;
yield
    var v1 = r(la[2]-1);
    var str = v1+' + '+(la[2]-v1);
    var ans = eval(str);
    str = '?'+l[2]+' = '+str;
yield
    var v1 = r(la[3]-1);
    var str = v1+' + '+(la[3]-v1);
    var ans = eval(str);
    str = '?'+l[3]+' = '+str;
yield
    var v1 = r(la[4]-1);
    var str = v1+' + '+(la[4]-v1);
    var ans = eval(str);
    str = '?'+l[4]+' = '+str;
yield
    var m1 = [' + ', ' - ', ' * '].sample();
    var str = l[0]+m1+l[1]
    var ans = eval(la[0]+m1+la[1]);
    if (ans < 0) {str = '| '+str+' |'};
yield
    var ma = [' + ', ' - ', ' * '];
    var m1 = ma.sample();
    var m2 = ma.sample();
    var str = l[2]+m1+l[3]+m2+l[4];
    var ans = eval(la[2]+m1+la[3]+m2+la[4]);
    if (ans < 0) {str = '| '+str+' |'};
>

//364
<calc0:
    this._l=CalcManager.assignLiterals(5);
    this._obj.addState(11);
>
<calc:
    if (this._counter != 0){this._obj.removeState(11)};

    var aa = [5, 6, 7, 8, 9];
    for (var i=0 ; i<5 ; i++){
        la[i]=aa.sample();
    }
    var v1 = r(la[0]-1);
    var str = v1+' + '+(la[0]-v1);
    var ans = eval(str);
    str = '?'+l[0]+' = '+str;
yield
    this._obj.addState(11);
    var v1 = r(la[1]-1);
    var str = v1+' + '+(la[1]-v1);
    var ans = eval(str);
    str = '?'+l[1]+' = '+str;
yield
    var v1 = r(la[2]-1);
    var str = v1+' + '+(la[2]-v1);
    var ans = eval(str);
    str = '?'+l[2]+' = '+str;
yield
    var v1 = r(la[3]-1);
    var str = v1+' + '+(la[3]-v1);
    var ans = eval(str);
    str = '?'+l[3]+' = '+str;
yield
    var v1 = r(la[4]-1);
    var str = v1+' + '+(la[4]-v1);
    var ans = eval(str);
    str = '?'+l[4]+' = '+str;
yield
    var v1 = rr(0, 4);
    var v2 = rr(0, 4);
    var m1 = [' + ', ' - ', ' * '].sample();
    var str = l[v1]+m1+l[v2]
    var ans = eval(la[v1]+m1+la[v2]);
    if (ans < 0) {str = '| '+str+' |'};
yield
    var v1 = rr(0, 4);
    var v2 = rr(0, 4);
    var v3 = rr(0, 4);
    var ma = [' + ', ' - ', ' * '];
    var m1 = ma.sample();
    var m2 = ma.sample();
    var str = l[v1]+m1+l[v2]+m2+l[v3];
    var ans = eval(la[v1]+m1+la[v2]+m2+la[v3]);
    if (ans < 0) {str = '| '+str+' |'};
>
////////////////////////////////////////////////////////////////
//365
<calc:
    var v1 = Math.pow(2, 10);
    var vc = this._counter;
    var v2 = r(vc*10, vc*10+10);
    var str = '2!10 + '+v2;
    var ans = v1 + v2;
>

//366
<calc:
    var v1 = Math.pow(2, 10);
    var vc = this._counter;
    var v2 = r(vc*10, vc*10+10);
    var str = '2!10 - '+v2;
    var ans = v1 - v2;
    if (ans < 0) {str = '| '+str+' |'};
>

//366
<calc:
    var v1 = Math.pow(2, 10);
    var vc = this._counter;
    var v2 = vc*200;
    var str = '2!10 - '+v2;
    var ans = v1 - v2;
    if (ans < 0) {str = '| '+str+' |'};
>

//367
<calc:
    var v1 = Math.pow(3, 10);
    var vc = this._counter;
    var v2 = r(vc*10, vc*10+10);
    var str = '3!10 + '+v2;
    var ans = v1 + v2;
>

//368
<calc:
    var v1 = Math.pow(3, 10);
    var vc = this._counter;
    var v2 = r(vc*10, vc*10+10);
    var str = '3!10 - '+v2;
    var ans = v1 - v2;
    if (ans < 0) {str = '| '+str+' |'};
>

//369
<calc:
    var v0 = rr(5, 10);
    var v1 = Math.pow(2, v0);
    var vc = this._counter;
    var v2 = r(vc*10, vc*10+10);
    var str = '2!'+v0+' + '+v2;
    var ans = v1 + v2;
>

//370
<calc:
    var v0 = rr(5, 10);
    var v1 = Math.pow(3, v0);
    var vc = this._counter;
    var v2 = r(vc*10, vc*10+50);
    var str = '2!'+v0+' + '+v2;
    var ans = v1 + v2;
>

/////////////////////////////////////////////////////////

//371
<calc:
    var v0 = r(6, 19);
    var v1 = r(100, 200);
    v1 = v1-v1%v0;
    var str = v1+' / '+v0;
    var ans = eval(str);
>

//372
<calc:
    var str = r(100, 200)+' % '+r(6, 19);
    var ans = eval(str);
>

//373
<calc0:
    this._l=CalcManager.assignLiterals(2);
    this._obj.addState(11);
>
<calc:
    if (this._counter != 0){this._obj.removeState(11)};
    var str = r(100)+' + '+r(100);
    var ans = eval(str);
    str = '?'+l[0]+' = '+str;
    la[0] = ans;
yield
    this._obj.addState(11);
    var str = r(100)+' + '+r(100);
    var ans = eval(str);
    str = '?'+l[1]+' = '+str;
    la[1] = ans;
yield
    var str = l[0]+' + '+l[1];
    var ans = eval(la[0]+la[1]);
>

//374
<calc:
    var str = r(100, 999)+' * '+r(2, 9);
    var ans = eval(str);
>

//375
<calc0:
    this._l=CalcManager.assignLiterals(2);
    this._obj.addState(11);
>
<calc:
    if (this._counter != 0){this._obj.removeState(11)};
    var str = r(100)+' - '+r(100);
    var ans = eval(str);
    if (ans < 0) {str = '| '+str+' |'};
    str = '?'+l[0]+' = '+str;
    la[0] = ans;
yield
    this._obj.addState(11);
    var str = r(100)+' - '+r(100);
    var ans = eval(str);
    if (ans < 0) {str = '| '+str+' |'};
    str = '?'+l[1]+' = '+str;
    la[1] = ans;
yield
    var str = l[0]+' - '+l[1];
    var ans = eval(la[0]-la[1]);
    if (ans < 0) {str = '| '+str+' |'};
>

//376
<calc:
    var str = r(1000, 9999)+' * '+r(2, 9);
    var ans = eval(str);
yield
    var v0 = r(6, 19);
    var v1 = r(100, 999);
    v1 = v1-v1%v0;
    var str = v1+' / '+v0;
    var ans = eval(str);
>

//377
<calc0:
    this._l=CalcManager.assignLiterals(2);
    this._obj.addState(11);
>
<calc:
    if (this._counter != 0){this._obj.removeState(11)};
    var str = r(12, 99)+' * '+r(2, 9);
    var ans = eval(str);
    str = '?'+l[0]+' = '+str;
    la[0] = ans;
yield
    this._obj.addState(11);
    var str = r(12, 99)+' * '+r(2, 9);
    var ans = eval(str);
    str = '?'+l[1]+' = '+str;
    la[1] = ans;
yield
    var str = l[0]+' + '+l[1]+' * '+10;
    var ans = eval(la[0]+la[1]*10);
>

//378
<calc0:
    this._l=CalcManager.assignLiterals(2);
    this._obj.addState(11);
>
<calc:
    if (this._counter != 0){this._obj.removeState(11)};
    var str = r(12, 99)+' * '+r(2, 9);
    var ans = eval(str);
    str = '?'+l[0]+' = '+str;
    la[0] = ans;
yield
    this._obj.addState(11);
    var str = r(12, 99)+' * '+r(2, 9);
    var ans = eval(str);
    str = '?'+l[1]+' = '+str;
    la[1] = ans;
yield
    var str = r(1, 5)+' + '+r(1, 5);
    var ans = eval(str); 
yield
    var str = l[0]+' + '+l[1]+' * '+10;
    var ans = eval(la[0]+la[1]*10);
>

//////////////////////////////////////////////

//407
<calc:
    var str = r(12, 99)+' * '+r(12, 99);
    var ans = eval(str);
>