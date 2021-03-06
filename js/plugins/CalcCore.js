//=============================================================================
// CalcCore.js
//=============================================================================

/*:
 * @Calc game.
 * @author Suppon
 *
 * @help This plugin does not provide plugin commands.
 */

var VERSION = 'V0.60(2016/01/31  7:11)';
//var CalcWaitingTime = 20000;
var CalcWaitingBaseTime = 25000;

var RankingClass = [
    '八級', '七級', '六級', '五級', '四級', '三級', '準二級', '二級', '準一級', '一級',
    '初段', '二段', '三段', '四段', '五段', '六段', '七段', '八段', '九段', '十段'
];

var FontStyles = {
    style00 : { //テンプレート
        fontFace     : null,
        fontSize     : null,
        fontItalic   : null,
        textColor    : null,
        outlineColor : null,
        outlineWidth : null
    },
    style01 : { //タイトル
        fontFace     : null,
        fontSize     : 24,
        fontItalic   : null,
        textColor    : null,
        outlineColor : null,
        outlineWidth : 2
    },
    style02 : { //ranking title
        fontFace     : null,
        fontSize     : 48,
        fontItalic   : null,
        textColor    : null,
        outlineColor : null,
        outlineWidth : null
    },
    style03 : { //ranking header
        fontFace     : null,
        fontSize     : 28,
        fontItalic   : null,
        textColor    : '#2e9393',
        outlineColor : null,
        outlineWidth : null
    },
    style04 : { //ranking subtitle
        fontFace     : null,
        fontSize     : 28,
        fontItalic   : null,
        textColor    : '#c7ff90',
        outlineColor : null,
        outlineWidth : null
    },
    style05 : { //sprite dificulty
        fontFace     : 'MyFont001',
        fontSize     : 32,
        fontItalic   : null,
        textColor    : null,
        outlineColor : 'rgba(0, 0, 0, 1)',
        outlineWidth : 6
    },
    style06 : { //sprite enemy name label
        fontFace     : null,
        fontSize     : 20,
        fontItalic   : null,
        textColor    : null,
        outlineColor : 'rgba(0, 0, 0, 1)',
        outlineWidth : 6
    },
    style07 : { //sprite formula font style base
        fontFace     : 'MyFont001',
        fontSize     : null,
        fontItalic   : null,
        textColor    : null,
        outlineColor : 'rgba(0, 0, 0, 1)',
        outlineWidth : 6
    },
    style08 : { //sprite skill formula style 01
        fontFace     : 'MyFont001',
        fontSize     : 24,
        fontItalic   : null,
        textColor    : null,
        outlineColor : 'rgba(0, 0, 0, 1)',
        outlineWidth : 6
    },
    style09 : { //sprite skill formula style 02
        fontFace     : 'MyFont001',
        fontSize     : 24,
        fontItalic   : null,
        textColor    : 'rgb(100, 100, 100)',
        outlineColor : 'rgba(0, 0, 0, 1)',
        outlineWidth : 6
    },
    style10 : { // sprite enemy formula style 02
        fontFace     : 'MyFont001',
        fontSize     : null,
        fontItalic   : null,
        textColor    : 'rgb(100, 100, 255)',
        outlineColor : 'rgba(0, 0, 0, 1)',
        outlineWidth : 6
    },
    style11 : { // sprite enemy formula style 03
        fontFace     : 'MyFont001',
        fontSize     : 20,
        fontItalic   : null,
        textColor    : null,
        outlineColor : 'rgba(0, 0, 0, 1)',
        outlineWidth : 4
    },
    style12 : { //judgement
        fontFace     : 'MyFont001',
        fontSize     : 48,
        fontItalic   : null,
        textColor    : null, //おのおの指定
        outlineColor : null,
        outlineWidth : 8
    },
    style13 : { //certificate draw head, rank
        fontFace     : null,
        fontSize     : 40,
        fontItalic   : null,
        textColor    : '#000000',
        outlineColor : 'rgb(51, 51, 51)',
        outlineWidth : 3
    },
    style14 : { //certificate draw name, content, date, difficulty, score, rate....
        fontFace     : null,
        fontSize     : 24,
        fontItalic   : null,
        textColor    : '#000000',
        outlineColor : 'rgb(51, 51, 51)',
        outlineWidth : 1
    }
}

var DifficultyText = ['','Regular', 'Speedy', '', 'Catastrophe'];
var DifficultyTextEx = ['','Easy', 'Normal', 'Hard', 'Hell']
//test4 = function(){
//    CalcManager.saveRanking();
//}
//
//test5 = function(){
//    CalcManager.loadRanking();
//}

Input.keyRemapForCalc = function(){
    Input.keyMapperBack = JSON.parse(JSON.stringify(Input.keyMapper));
    for (var i = 0; i < 10; i++){
        Input.keyMapper[i+96] = i.toString();
    }
    Input.keyMapper[8] = 'escape';
    Input.keyMapper[13] = 'Enter';
    //ConfigManager.keyMapper[189] = '-';
    Input.keyMapper[121] = 'forced';
}

Input.restoreKeyMapper = function(){
    Input.keyMapper = Input.keyMapperBack;
}


Bitmap.prototype.applyFontStyle = function(styleData){
    this.fontFace = styleData.fontFace || this.fontFace;
    this.fontSize = styleData.fontSize || this.fontSize;
    this.fontItalic = styleData.fontItalic || this.fontItalic;
    this.textColor = styleData.textColor || this.textColor;
    this.outlineColor = styleData.outlineColor || this.outlineColor;
    this.outlineWidth = styleData.outlineWidth || this.outlineWidth;
}

var _Graphics_createAllElements = Graphics._createAllElements;
Graphics._createAllElements = function() {
    _Graphics_createAllElements.call(this);
    this._createMyFonts();//★
};

Graphics._createMyFonts = function(){
    this.loadFont('MyFont001', 'fonts/arialbd.ttf');
}

var _WindowLayer_initialize = WindowLayer.prototype.initialize;
WindowLayer.prototype.initialize = function() {
    _WindowLayer_initialize.call(this);
    this._slideInRequested = false;
};

var _WindowLayer_update = WindowLayer.prototype.update;
WindowLayer.prototype.update = function() {
    _WindowLayer_update.call(this);
    this.updateSlideIn()
};

WindowLayer.prototype.updateSlideIn = function(){
    if(this._slideInRequested){
        this._slideInRequested = false;
        this.x = Graphics.width+200;
    }
    if(this.x > 0){
        this.x -= 15; //移動速度
        if(this.x < 0){
            this.x = 0;
        }
    }
}

//起動時の処理
//var _Scene_Boot_create = Scene_Boot.prototype.create;
//Scene_Boot.prototype.create = function() {
//    _Scene_Boot_create.call(this);
//};

//ニューゲーム時の処理
var _DataManager_setupNewGame = DataManager.setupNewGame;
DataManager.setupNewGame = function() {
    _DataManager_setupNewGame.call(this);
    $gameSwitches.setValue(111, $gameTemp.isPlaytest());
    CalcManager._rankPosition = 0;
    CalcManager.initRankingData();
};
var _DataManager_makeSavefileInfo = DataManager.makeSavefileInfo;
DataManager.makeSavefileInfo = function() {
    var info = _DataManager_makeSavefileInfo.call(this);
    var actor = $gameActors.actor(11);
    var playerRank = CalcManager.OjbOfRankingModeChoice().playerRank;
    var text = actor.name()+'  Lv'+actor._level+'  '+playerRank;
    info.difficultyText = DifficultyTextEx[$gameVariables.value(147)];
    info.title = text;
    return info;
};

BattleManager.onEncounter = function() {
    return;
};

BattleManager.displayStartMessages = function() {
    return;
};

BattleManager.actor = function(){
    return null;
};

var _BattleManager_update = BattleManager.update;
BattleManager.update = function(){
    _BattleManager_update.call(this);
    if (this._phase == 'calcTurn'){
        if (BattleManager._actionBattlers.length > 0){
            BattleManager.updateTurn();
        }
        if (CalcManager._escapeReady){
            this.processEscape();
            CalcManager._escapeReady = false;
        }
    }
}

BattleManager.endTurn = function(){
    this._phase = 'calcTurn';
}

var _BattleManager_invokeAction = BattleManager.invokeAction;
BattleManager.invokeAction = function(subject, target){
    _BattleManager_invokeAction.call(this, subject, target);
}

BattleManager.makeEscapeRatio = function() {
    //this._escapeRatio = 0.5 * $gameParty.agility() / $gameTroop.agility();
    this._escapeRatio = 10;
};

var _BattleManager_processEscape = BattleManager.processEscape;
BattleManager.processEscape = function() {
    if(BattleManager.checkBattleEnd()){return};
    this.stopCalc();
    return _BattleManager_processEscape.call(this);
};

var _BattleManager_processVictory = BattleManager.processVictory;
BattleManager.processVictory = function(){
    this.stopCalc();
    _BattleManager_processVictory.call(this);
}

var _BattleManager_processDefeat = BattleManager.processDefeat;
BattleManager.processDefeat = function(){
    this.stopCalc();
    _BattleManager_processDefeat.call(this);
}

BattleManager.stopCalc = function(){
    Input.restoreKeyMapper();//abcd
    SceneManager._scene._calcInputWindow.visible = false;
    SceneManager._scene._calcInputWindow.deactivate();
    SceneManager._scene._calcInputDisplayWindow.visible = false;
    $gameParty.cancelCalcTarget();
}

SoundManager.playLevelUp = function() {
    //this.playSystemSound(23);
    var se = {name: "Up4", pan: 0, pitch: 100, volume: 90};
    AudioManager.playStaticSe(se);
};

SoundManager.playSpeaking = function(p) {
    var se = {name: "Speaking", pan: 0, pitch: r(p-40,p+40), volume: 90};
    AudioManager.playStaticSe(se);
};

function CalcManager() {
    throw new Error('This is a static class');
};

CalcManager._currentInput = '';
CalcManager._emptyAnswer = 0;
CalcManager._calcInputWindow = null;
CalcManager._calcInputDisplayWindow = null;
CalcManager._scene = null;
CalcManager._rankPosition = 0;
CalcManager._escapeReady = false;

CalcManager.calcWaitingTime = function(){
    if(this.isRankingMode()){
        switch(this.difficulty()){
            case 2:
                return Math.round(CalcWaitingBaseTime*0.8);
                break;
            case 4:
                return Math.round(CalcWaitingBaseTime*0.6);
                break;
            default:
                return CalcWaitingBaseTime;
                break;
        }
    } else {
        switch($gameVariables.value(147)){
            case 1:
                return CalcWaitingBaseTime*2;//easy
                break;
            case 3:
                return Math.round(CalcWaitingBaseTime*0.5);//hard
                break;
            case 4:
                return Math.round(CalcWaitingBaseTime*0.25);//hell
                break;
            default:
                return CalcWaitingBaseTime;
                break;
        }
    }
}

CalcManager.difficulty = function(){
    if ($gameVariables){
        if (this.isRankingMode()){
            return ($gameVariables.value(105) == 0 ? 1 : $gameVariables.value(105));
        }
    }
    return 1;
}

CalcManager.setDifficulty = function(difficulty){
    $gameVariables.setValue(105, difficulty);
}

CalcManager.initRankingData = function(){
    var floors = []
    for(var i=0; i < RankingClass.length+1; i++){
        floors.push(this.makeFloorData());
    }
    
    $gameSystem._rankingData ={
        floors:floors,
        version:VERSION,
        difficulty:1
    }
}

CalcManager.makeFloorData = function(){
    var floordatas = {
        played:false,
        cleared:0,
        playDatas:[]
    };
    return floordatas;
}

CalcManager.isRankingMode = function(){
    return this.rankingModeClass() > 0;
}

CalcManager.rankingModeClass = function(){
    return $gameVariables.value(101);
}

CalcManager.applyData = function(rankingData){
    $gameSystem._rankingData = rankingData;
}

CalcManager.setupNewGame = function(){
    Score._currentScore = 0;
    Score._attackNumber = 0;
}

CalcManager.startBattle = function(){
    this._literalOrder = 0;
    this._reservedAction = 0;
    this._emptyAnswer = 0;
    this._escapeReady = false;
    this._countForState = 0;
}

CalcManager.OjbOfRankingModeChoice = function(){
    var items = [];
    var pr = '';
    for(var i=0; i < RankingClass.length; i++){
        var text = RankingClass[i];
        if(!$gameSystem._rankingData.floors[i+1]){
            $gameSystem._rankingData.floors[i+1] = CalcManager.makeFloorData();
        }
        if($gameSystem._rankingData.floors[i+1].cleared === 4){
            text += ' (Super Hard クリア済み)';
        } else if ($gameSystem._rankingData.floors[i+1].cleared === 2){
            text += ' (Hard クリア済み)';
        } else if ($gameSystem._rankingData.floors[i+1].cleared){
            text += ' (クリア済み)';
        }
        if($gameSystem._rankingData.floors[i+1].cleared > 0){
            pr = RankingClass[i];
        }
        items.push(text);
    }
    var obj = {items:items, 
               variableId:101, 
               caption:'階級を選んでください。', 
               enabledList:this.makeEnabledList(),
               playerRank:pr
              };

    return obj;
}

CalcManager.makeEnabledList = function(){
    var enabledList = []
    for(var i=0; i < RankingClass.length; i++){
        switch(i){
            case 6: case 7:
                enabledList.push($gameSwitches.value(163)?true:false);
                break;
            case 8: case 9:
                enabledList.push($gameSwitches.value(164)?true:false);
                break;
            case 10: case 11:
                enabledList.push($gameSwitches.value(165)?true:false);
                break;
            case 12: case 13:
                enabledList.push($gameSwitches.value(166)?true:false);
                break;
            case 14: case 15:
                enabledList.push($gameSwitches.value(167)?true:false);
                break;
            case 16: case 17:
                enabledList.push($gameSwitches.value(168)?true:false);
                break;
            case 18: case 19:
                enabledList.push($gameSwitches.value(169)?true:false);
                break;
            default:
                enabledList.push(true);
                break;
        }
    }
    return enabledList;
}

CalcManager.update = function(){
    if(BattleManager._phase == 'calcTurn'){
        this._countForState++;
        if(this._countForState>30){
            $gameParty.updateStateTurns();
            $gameTroop.updateStateTurns();
            this._countForState = 0;
        }
        $gameTroop.countCalcWaiting();
    }
}

CalcManager.input = function(symbol){
    if (symbol === 'forced' && Utils.isOptionValid('test')){
        if(!$gameTroop.isAllDead()){
            this.forcedRightAnswer();
            return;
        }
    }
    if (symbol === 'Enter'){
        if(!$gameTroop.isAllDead()){this.checkSkillAnswer()}
    } else if (symbol === 'BS'){
        this._currentInput = 
            this._currentInput.substr(0, this._currentInput.length-1)
        this._calcInputDisplayWindow.refresh(this._currentInput);
    } else if (!isNaN(symbol)){
        if(this._currentInput.length > 10){
            SoundManager.playBuzzer();
        } else {
            SoundManager.playCursor();
            this._currentInput += symbol;
            this._calcInputDisplayWindow.refresh(this._currentInput);
            if(!$gameTroop.isAllDead()){this.checkAnswer()};
        }
    };
};

CalcManager.forcedRightAnswer = function(){
    this.processRightAnswer(this.maxWaitingEnemy());
}

CalcManager.maxWaitingEnemy = function(){
    var maxCalcWaiting = -1000000000;
    var bingoEnemy = null
    $gameTroop.aliveMembers().forEach(function(enemy){
        if (!enemy._isInputCalcLocked){
            if(maxCalcWaiting < enemy._calcWaiting){
                maxCalcWaiting = enemy._calcWaiting;
                bingoEnemy = enemy;
            }
        }
    },this);
    return bingoEnemy;
}

CalcManager.checkAnswer = function(){
    var bingo = false;
    var maxCalcWaiting = -1000000000;
    var bingoEnemy = null;
    //一番攻撃するまでの時間が短いエネミーをターゲットとする。
    $gameTroop.aliveMembers().forEach(function(enemy){
        if (enemy._formula._answer.toString() === this._currentInput
           && !enemy._isInputCalcLocked){
            bingo = true
            if(maxCalcWaiting < enemy._calcWaiting){
                maxCalcWaiting = enemy._calcWaiting;
                bingoEnemy = enemy;
            }
        }
    },this)
    if (bingo){
        this.processRightAnswer(bingoEnemy)
    } else {
        if (this._currentInput == '0'){
            this._currentInput = '';
            this._calcInputDisplayWindow.refresh(this._currentInput);
        }
    }
};

CalcManager.checkSkillAnswer = function(){
    var skillUsers = $gameParty.movableMembers().filter(function(actor){
        return actor.canUseSkill();
        });
    var bingos = skillUsers.filter(function(actor){
        return (actor._formula._answer.toString() === this._currentInput
       && !actor._isInputCalcLocked)},this)
    if(bingos[0]){
        this.processRightAnswer(bingos[0]);//アクタースキル発動
    } else {
        this.checkEmptyAnswer();
    }

};

CalcManager.checkEmptyAnswer = function(){
    //CalcManager.processWrongAnswer();
    if(this._currentInput === ''){
        this._emptyAnswer++;
        if(this._emptyAnswer == 2){
            Score._attackNumber++;
            $gameTroop.resetFormula();
        } else if (this._emptyAnswer == 4 && !this.isRankingMode()){
            this._escapeReady = true;
        }
    }else {
        this._emptyAnswer = 0;
    }
    CalcManager.processWrongAnswer();
}

CalcManager.processRightAnswer = function(battler){
    this._emptyAnswer = 0;
    this._currentInput = '';
    this._calcInputDisplayWindow.refresh(this._currentInput);
    SoundManager.playUseSkill();
    this.reserveActorAction(battler);
    battler.processRightAnswer();
    if(battler.isActor()){
        var skillName = $dataSkills[battler._calcSkillId].name;
    }
    this._scene.popupJudgement(battler.isEnemy()? 'GOOD!!' : skillName);
    //this._currentInput = '';
}

CalcManager.processWrongAnswer = function(){
    SoundManager.playBuzzer();
    var count = this._currentInput === '';
    this._scene.popupJudgement(count ? 'BAD!!':'No Hit!');
    this._currentInput = '';
    this._calcInputDisplayWindow.refresh(this._currentInput);
    SoundManager.playBuzzer();
    if (count){
        $gameTroop.aliveMembers().forEach(function(enemy){
            enemy._calcWaiting += Math.ceil(this.calcWaitingTime()/3);
        },this)
    }
}

CalcManager.reserveActorAction = function(battler){
    if ($gameParty.movableMembers().length == 0){
        BattleManager.processDefeat();
        return;
    }
    if(battler.isEnemy()){
        this.reserveActorActionNormalAttack(battler);
    } else {
        this.reserveActorActionSkill(battler);
    }
}

CalcManager.reserveActorActionNormalAttack = function(enemy){
    $gameParty.movableMembers().forEach(function(actor){
        actor._calcTarget = enemy;
        actor.addActions();
        actor._actions.forEach(function(action){
            action._targetIndex = enemy.index();
        })
        BattleManager._actionBattlers.push(actor);
    })
};

CalcManager.reserveActorActionSkill = function(actor){
    actor.addSkillActions(actor._calcSkillId);
    BattleManager._actionBattlers.push(actor);
}

CalcManager.Literals = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
    'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
]

CalcManager.assignLiterals = function(n){
    var result = [];
    for(var i=0; i<n; i++){
        if (this._literalOrder > CalcManager.Literals.length){
            window.alert('this._literalOrder is over!');
        }
        result.push(this.Literals[this._literalOrder]);
        this._literalOrder++;
    }
    return result;
}

CalcManager.updateRankingData = function(cleared){
    var datas = $gameSystem._rankingData.floors[this.rankingModeClass()].playDatas;
    var data = {
        score      : Score._currentScore,
        scoreRate  : Score.scoreRate(),
        date       : new Date(),
        name       : $gameActors.actor(10).name(),
        difficulty : this.difficulty()
    }
    datas.push(data);
    datas.sort(function(a,b){
        if(a.score > b.score){return -1};
        if(a.score < b.score){return 1}
        return 0;
    })
    CalcManager._rankPosition = datas.indexOf(data)+1;
    if(cleared){
        var flag = $gameSystem._rankingData.floors[this.rankingModeClass()].cleared
        if(flag === true || flag === false){
            $gameSystem._rankingData.floors[this.rankingModeClass()].cleared = this.difficulty();
        } else if (flag < this.difficulty()){
            $gameSystem._rankingData.floors[this.rankingModeClass()].cleared = this.difficulty();
        }

    }
    if(datas.length > 10){
        datas.length = 10;
    }
    $gameSystem._rankingData.difficulty = this.difficulty();
    //this.saveRanking();
}

CalcManager.displayScore = function(){
    CalcManager._difficultySprite = new Sprite_Difficulty();
    Score._currentScoreSprite = new Sprite_Score();
    SceneManager._scene.addChild(CalcManager._difficultySprite);
    SceneManager._scene.addChild(Score._currentScoreSprite);
}

CalcManager.disposeScore = function(){
    SceneManager._scene.removeChild(CalcManager._difficultySprite);
    SceneManager._scene.removeChild(Score._currentScoreSprite);
}

function Score() {
    throw new Error('This is a static class');
};

Score._currentScore = 0;
Score._currentScoreSprite = null;//new Sprite_Score();
Score.MaxHitScore = 100;
Score.MinHitScore = 10;
Score._popupScoreOn = false;
Score._attackNumber = 0;

Score.isPopupScoreOn = function(){
    return CalcManager.isRankingMode();
}

Score.addScore = function(addPoint){
    this._currentScore += addPoint;
    this._currentScoreSprite.refresh();
}

Score.scoreRate = function(){
    if(this._attackNumber == 0){
        return 0;
    }else{
        return this._currentScore/this._attackNumber;
    }
}


var _Scene_Base_start = Scene_Base.prototype.start;
Scene_Base.prototype.start = function() {
    _Scene_Base_start.call(this);
    if(this.constructor == Scene_Map || this.constructor == Scene_Battle){
        if(CalcManager.isRankingMode()){
            CalcManager.displayScore();
        }
    }
};

var _Scene_Base_terminate = Scene_Base.prototype.terminate;
Scene_Base.prototype.terminate = function() {
    _Scene_Base_terminate.call(this);
    if(this.children.contains(Score._currentScoreSprite)){
        CalcManager.disposeScore();
    }
};

var _Scene_Title_drawGameTitle = Scene_Title.prototype.drawGameTitle;
Scene_Title.prototype.drawGameTitle = function(){
    _Scene_Title_drawGameTitle.call(this);
    this._gameTitleSprite.bitmap.applyFontStyle(FontStyles.style01);
    this._gameTitleSprite.bitmap.drawText(VERSION, 0, 0, Graphics.width, 24, 'left');
}

var _Scene_Title_commandNewGame = Scene_Title.prototype.commandNewGame;
Scene_Title.prototype.commandNewGame = function() {
    CalcManager.setupNewGame();
    _Scene_Title_commandNewGame.call(this);
};

var _Scene_Map_createMapNameWindow = Scene_Map.prototype.createMapNameWindow;
Scene_Map.prototype.createMapNameWindow = function() {
    _Scene_Map_createMapNameWindow.call(this);
    this._mapNameWindow.y += 30;
};

Window_MapName.prototype.open = function() {
    this.refresh();
    this._showCount = 300;
};

Window_MapName.prototype.windowWidth = function() {
    return ($gameMap.mapId() == 42 ? 560 : 360);
};

Scene_Map.prototype.startEncounterEffect = function() {
    //this._spriteset.hideCharacters();
    this._encounterEffectDuration = this.encounterEffectSpeed();
};

var _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function(){
    _Scene_Menu_createCommandWindow.call(this);
    this._commandWindow.setHandler('calcSkill',this.commandPersonal.bind(this));
    this._commandWindow.setHandler('fastTravel',this.commandFastTravel.bind(this));
    this._commandWindow.setHandler('status',    this.commandChangeView.bind(this));
}


Scene_Menu.prototype.createGoldWindow = function() {
    this._goldWindow = new Window_Gold2(0, 0);
    this._goldWindow.y = this._commandWindow.height;
    this.addWindow(this._goldWindow);
};

Scene_Menu.prototype.commandChangeView = function(){
    this._statusWindow._anotherView = !this._statusWindow._anotherView;
    this._statusWindow.refresh();
    this._commandWindow.activate();
}

var _Scene_Menu_onPersonalOk = Scene_Menu.prototype.onPersonalOk;
Scene_Menu.prototype.onPersonalOk = function() {
    if(this._commandWindow.currentSymbol() == 'calcSkill'){
        SceneManager.push(Scene_CalcSkill);
        return;
    }
    _Scene_Menu_onPersonalOk.call(this);
};

Scene_Menu.prototype.commandFastTravel = function(){
    var obj = {variableId:143,
               caption:'行き先を選んでください。'}
    this._commandWindow.activate();
    var w = new Window_FastTravelChoice(obj);
}

function Scene_CalcSkill() {
    this.initialize.apply(this, arguments);
}

Scene_CalcSkill.prototype = Object.create(Scene_Skill.prototype);
Scene_CalcSkill.prototype.constructor = Scene_CalcSkill;

Scene_CalcSkill.prototype.onItemOk = function() {
    this.actor().setLastMenuSkill(this.item());
    this.determineItem();
};

Scene_CalcSkill.prototype.determineItem = function(){
    this.actor().setCalcSkillItem(this.item());
    var name = this.item().name + 'をセットしました。'
    var obj = {items:[name], 
               variableId:0, 
               caption:' ', 
              };
    this.activateItemWindow();
    var w = new Window_InstantCommand(obj);
}

var _Scene_Battle_start = Scene_Battle.prototype.start;
Scene_Battle.prototype.start = function(){
    _Scene_Battle_start.call(this);
    CalcManager.startBattle();
    CalcManager._scene = this;
    if ($gameSwitches.value(115)){
        this.commandFight();
    }
};

var _Scene_Battle_createAllWindow = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function(){
    this.createCalcInputWindow();
    _Scene_Battle_createAllWindow.call(this);
    this._statusWindow.x = this._calcInputWindow.width;
}

var _Scene_Battle_createStatusWindow = Scene_Battle.prototype.createStatusWindow;
Scene_Battle.prototype.createStatusWindow = function() {
    _Scene_Battle_createStatusWindow.call(this);
    this._statusWindow.visible = false;
};

Scene_Battle.prototype.createCalcInputWindow = function(){
    this._calcInputWindow = new Window_CalcInput();
    this._calcInputWindow.deactivate();
    this._calcInputWindow.visible = false;
    this._calcInputDisplayWindow = new Window_CalcInputDisplay();
    this._calcInputDisplayWindow.visible = false;
    this._calcInputDisplayWindow.y = this._calcInputWindow.y + 36;
    this.addWindow(this._calcInputWindow);
    this.addWindow(this._calcInputDisplayWindow);
    CalcManager._calcInputWindow = this._calcInputWindow;
    CalcManager._calcInputDisplayWindow = this._calcInputDisplayWindow;
};

var _Scene_Battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function(){
    _Scene_Battle_update.call(this);
    CalcManager.update();
}

Scene_Battle.prototype.updateWindowPositions = function() {
    return;
};

Scene_Battle.prototype.commandFight = function(){
    this._statusWindow.visible = true;
    this.startCalcTurn();
    this._calcInputWindow.visible = true;
    this._calcInputDisplayWindow.visible = true;
    Input.keyRemapForCalc(); //abcd
    Input._latestButton = 'null';
    this._calcInputWindow.activate();
    CalcManager._currentInput = '';//★171119
    $gameParty.clearActions();
    $gameTroop.clearActions();
};

Scene_Battle.prototype.startCalcTurn = function(){
    $gameTroop.makeFormula();
    $gameParty.makeSkillFormula();
    BattleManager._phase = 'calcTurn';
    this._calcInputWindow.activate();
    this.endCommandSelection();
    this._partyCommandWindow.close();
    this._partyCommandWindow.deactivate();
    $gameTroop.disappearNameLabel();
}

Scene_Battle.prototype.popupJudgement = function(judgement){
    var sprite = new Sprite_Judgement(judgement);
    sprite.x = Graphics.width/2;
    sprite.y = sprite.height;
    this._spriteset.addChild(sprite);
}

function Scene_RankingResult() {
    this.initialize.apply(this, arguments);
}

Scene_RankingResult.prototype = Object.create(Scene_Base.prototype);
Scene_RankingResult.prototype.constructor = Scene_RankingResult;

Scene_RankingResult.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
};

Scene_RankingResult.prototype.create = function() {
    Scene_Base.prototype.create.call(this);    
    this.createBackground();
    this.createHeaderSprites();
    this.createResultSprites();
};

Scene_RankingResult.prototype.createBackground = function() {
    var bitmap = ImageManager.loadTitle1('Book')
    this._backSprite1 = new Sprite(bitmap);
    this._backSprite1.setColorTone([0, 0, 0, -150]);
    this.addChild(this._backSprite1);
};

Scene_RankingResult.prototype.createHeaderSprites = function(){
    var bitmap1 = this.titleBitmap();
    var bitmap2 = this.headerBitmap();
    var bitmap3 = this.subtitleBitmap();
    this._titleSprite = new Sprite(bitmap1);
    this._headerSprite = new Sprite(bitmap2);
    this._subtitleSprite = new Sprite(bitmap3);
    this._titleSprite.y = 20;
    this._subtitleSprite.y = 75;
    this._headerSprite.y = 125;
    this.addChild(this._titleSprite);
    this.addChild(this._headerSprite);
    this.addChild(this._subtitleSprite);
}

Scene_RankingResult.prototype.titleBitmap = function(){
    var width = Graphics.width;
    var height = 48;
    var bitmap = new Bitmap(width, height);
    bitmap.applyFontStyle(FontStyles.style02);
    var text = RankingClass[CalcManager.rankingModeClass()-1] + '  順位表';
    bitmap.drawText(text, 0, 0, width, height, 'center')
    return bitmap;
}

Scene_RankingResult.prototype.headerBitmap = function(){
    var width = Graphics.width;
    var height = 32;
    var bitmap = new Bitmap(width, height);
    bitmap.applyFontStyle(FontStyles.style03);
    bitmap.drawText('順位', width*1/6, 2, width/6, height, 'left');
    bitmap.drawText('名前', width*2/6-30, 2, width/6+30, height, 'left');
    bitmap.drawText('得点', width*3/6, 2, width/6, height, 'left');
    bitmap.drawText('得点率', width*4/6, 2, width/6, height, 'left');
    return bitmap;
}

Scene_RankingResult.prototype.subtitleBitmap = function(){
    var width = Graphics.width;
    var height = 32;
    var bitmap = new Bitmap(width, height);
    bitmap.applyFontStyle(FontStyles.style04);
    var number = $gameSystem._rankingData.floors[CalcManager.rankingModeClass()].playDatas.length;
    var text = 'あなたは '+number+'人中、'+CalcManager._rankPosition+'位でした。';
    if(CalcManager._rankPosition < 4){
        text = 'おめでとうございます!! ' + text;
    }
    bitmap.drawText(text, 0, 2, width, height, 'center');
    return bitmap;
}

Scene_RankingResult.prototype.createResultSprites = function(){
    var width = Graphics.width;
    var height = 24;
    for(var i=0; i<11; i++){
        var data = $gameSystem._rankingData.floors[CalcManager.rankingModeClass()].playDatas[i];
        if(!data){break};
        if(i==10 && CalcManager._rankPosition < 11){
            break
        } else if (i==10 && CalcManager._rankPosition > 10){
            var r = CalcManager._rankPosition - 1;
            data = $gameSystem._rankingData.floors[CalcManager.rankingModeClass()].playDatas[r];
        };
        var bitmap = new Bitmap(width, 28);
        if(i<3){
            bitmap.outlineColor = 'rgb(0, 0, 0)';
            bitmap.fontBold = true;
        };
        var rank = i < 10 ? i+1 :  CalcManager._rankPosition;
        bitmap.drawText(rank+' 位', width*1/6, 2, width/6, height, 'left');
        bitmap.drawText(data.name, width*2/6-30, 2, width/6+30, height, 'left');
        //var score = (i==10? Score._currentScore:data.score);
        bitmap.drawText(data.score, width*3/6, 2, width/6, height, 'left');
        //var scoreRate = (i==10? Score.scoreRate():data.scoreRate);
        bitmap.drawText(data.scoreRate.toFixed(2)+' %', width*4/6, 0, width/6, height, 'left');
        var difficulty = 1;
        if (data.difficulty){
            difficulty = data.difficulty;
        }
        difficulty = DifficultyText[difficulty];
        bitmap.drawText(difficulty, width*5/6, 0, width/7, height, 'center');
        if(rank == CalcManager._rankPosition){
            bitmap.drawText('今回→', width*0/6, 2, width/6, height, 'center');
        }
        if(rank == CalcManager._rankPosition && rank < 10){
            var sprite = new Sprite_StandOut(bitmap);
        } else {
            var sprite = new Sprite(bitmap);
        }
        sprite.y = 170+i*40;
        this.addChild(sprite);
    }
}

Scene_RankingResult.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    this.playMusic();
    this.startFadeIn(this.slowFadeSpeed(), false);
};

Scene_RankingResult.prototype.update = function() {
    if (this.isActive() && !this.isBusy() && this.isTriggered()) {
        SceneManager.pop();
    }
    Scene_Base.prototype.update.call(this);
};

Scene_RankingResult.prototype.isTriggered = function() {
    return Input.isTriggered('ok') || TouchInput.isTriggered();
};

Scene_RankingResult.prototype.stop = function() {
    Scene_Base.prototype.stop.call(this);
    this.fadeOutAll();
};

Scene_RankingResult.prototype.terminate = function() {
    Scene_Base.prototype.terminate.call(this);
    AudioManager.stopAll();
};

Scene_RankingResult.prototype.playMusic = function() {
    AudioManager.stopAll();
    AudioManager.playBgm({name:'Ship3', pan:0, pitch:100, volume:90});
};

Sprite_Animation.prototype.startScreenFlash = function(color, duration) {
};


Sprite_Battler.prototype.updateBitmap = function() {
    this.updateFormula();
};

Sprite_Battler.prototype.setupDamagePopup = function() {
    if (this._battler.isDamagePopupRequested()) {
        if (this._battler.isSpriteVisible()) {
            var sprite = new Sprite_Damage();
            var accumulation = this.calcAccumulation();//★
            sprite.x = this.x + this.damageOffsetX();
            sprite.y = this.y + this.damageOffsetY();
            sprite.setup(this._battler, accumulation);
            this._damages.push(sprite);
            this.parent.addChild(sprite);
        }
        this._battler.clearDamagePopup();
        this._battler.clearResult();
    }
};

Sprite_Battler.prototype.calcAccumulation = function(){
    var damageSprite = this._damages[this._damages.length-1]
    if(damageSprite){
        if(damageSprite._hpDamageValue>0 & damageSprite._duration>70){
            damageSprite.parent.removeChild(damageSprite);
            return damageSprite._hpDamageValue;
        }
    }else{
        return 0;
    }
}


Sprite_Battler.prototype.updateFormula = function(){
    if($gameTroop.isEventRunning()){return};
    if (this._battler._formulaHitEffectRequested){
        this.hitEffectFormula();
        this._battler._formulaHitEffectRequested = false;
    }
    if (this._battler._formulaSkillEffectRequested){
        this.skillEffectFormula();
        this._battler._formulaSkillEffectRequested = false;
    }
    if (this._battler._makeFormulaRequested && this._battler.isAppeared()){
        this._battler._formula.makeFormula();
        this.makeFormulaSprite();
        this._battler._makeFormulaRequested = false;
        this._battler._isInputCalcLocked = false;
    }
    if (this._battler._resetFormulaRequested && this._battler.isAppeared()){
        //this._battler._formula.reset();
        this._battler._formula.makeFormula();
        this.resetEffectFormula();
        this._battler._resetFormulaRequested = false;
        this.makeFormulaSprite();
    }
}

Sprite_Battler.prototype.makeFormulaSprite = function(){
    if (this._battler.isActor()){
        var sprite = new Sprite_SkillFormula();
    } else {
        var sprite = new Sprite_EnemyFormula();
    }
    var string = this._battler._formula._formulaString;
    this._formulaSprite = sprite;
    this._formulaSprite._battler = this._battler;
    sprite.setFormulaString(string);
    this.formulaSpritePositioning();
    this.parent.addChild(sprite);
}

Sprite_Battler.prototype.formulaSpritePositioning = function(){
    var dx = this._battler.isActor() ? 100 : -this._formulaSprite._widthSum/2//-this.width/2;
    var dy = this._battler.isActor() ? -24 : 0;
    this._formulaSprite.x = this.x + dx;
    this._formulaSprite.y = this.y - 16 + dy;
    var protrusion = this._formulaSprite.x - this._formulaSprite.width/2;
    if (protrusion < 0){
        this._formulaSprite.x -= protrusion;
    }
}

Sprite_Battler.prototype.hitEffectFormula = function(){
    this._formulaSprite.startHitEffect();
}

Sprite_Battler.prototype.skillEffectFormula = function(){
    this._formulaSprite.startSkillEffect();
}

Sprite_Battler.prototype.resetEffectFormula = function(){
    this._formulaSprite.startResetEffect();
}

var _Sprite_Actor_setActorHome = Sprite_Actor.prototype.setActorHome;
Sprite_Actor.prototype.setActorHome = function(index) {
    _Sprite_Actor_setActorHome.call(this,index);
    var length = $gameParty.members().length;
    var x = 600-20 + 5*20*(index+1)/(1+length);
    var y = 280-48 + 5*48*(index+1)/(1+length);
    this.setHome(x,y);
    var actor = this._battler;
    actor._sprite = this;
};

Sprite_Actor.prototype.moveToStartPosition = function() {
    this.startMove(0, 0, 0);
};

var _Sprite_Enemy_initialize = Sprite_Enemy.prototype.initialize;
Sprite_Enemy.prototype.initialize = function(battler) {
    _Sprite_Enemy_initialize.call(this, battler);
    this._nameLabel = new Sprite_EnemyNameLabel(this._battler);
    this.addChild(this._nameLabel);
};

Sprite_Enemy.prototype.damageOffsetY = function() {
    return -36;
};

Sprite_Enemy.prototype.damageOffsetX = function() {
    return 8;
};

var _Sprite_Damage_initialize = Sprite_Damage.prototype.initialize;
Sprite_Damage.prototype.initialize = function() {
    _Sprite_Damage_initialize.call(this);
    this._hpDamageValue = 0; 
};

Sprite_Damage.prototype.setup = function(target, ac) {
    var accumulation = ac ? ac : 0;
    if(Score.isPopupScoreOn()){ //段位認定モード時
        this.setupScore(target);
    } else {
        var result = target.result();
        if (result.missed || result.evaded) {
            this.createMiss();
        } else if (result.hpAffected) {
            this._hpDamageValue = result.hpDamage + accumulation;//★
            this.createDigits(0, this._hpDamageValue);//★
        } else if (target.isAlive() && result.mpDamage !== 0) {
            this.createDigits(2, result.mpDamage);
        }
        if (result.critical) {
            this.setupCriticalEffect();
        }
    }
};

Sprite_Damage.prototype.setupScore = function(target){
    var result = target.result();
    if(target.isEnemy() && result.hpDamage>0){
        this._duration = 180;
        this.createDigits(0, target._popupScore)
        Score._attackNumber++;
        Score.addScore(target._popupScore);
        target._popupScore = 0;
    }
}

var _Sprite_Damage_update = Sprite_Damage.prototype.update;
Sprite_Damage.prototype.update = function() {
    _Sprite_Damage_update.call(this);
    if(Score.isPopupScoreOn()){
        this.y -= 0.5;
        if(this._duration < 90){
            this.opacity -= 3
        }
    }
};

var _Sprite_Damage_updateChild = Sprite_Damage.prototype.updateChild;
Sprite_Damage.prototype.updateChild = function(sprite) {
    if(Score.isPopupScoreOn()){
        sprite.setBlendColor(this._flashColor);
    }else{
        _Sprite_Damage_updateChild.call(this, sprite);
    }
};

function Sprite_Difficulty(){
    this.initialize.apply(this, arguments);
}

Sprite_Difficulty.prototype = Object.create(Sprite_Base.prototype);
Sprite_Difficulty.prototype.constructor = Sprite_Difficulty;

Sprite_Difficulty.prototype.initialize = function(){
    Sprite_Base.prototype.initialize.call(this);
    this.y = 5;
    this.refresh();
}

Sprite_Difficulty.prototype.refresh = function(){
    var string = DifficultyText[CalcManager.difficulty()];
    var bitmap = new Bitmap(1,1);
    var width = 300;
    bitmap.applyFontStyle(FontStyles.style05);
    var height = bitmap.fontSize+10;
    bitmap.resize(width, height);
    bitmap.drawText(string, 0, 0, width, height, 'right');
    this.width = bitmap.width;
    this.height = bitmap.height;
    this.bitmap = bitmap;
    this.x = Graphics.width - this.width - 5;
}

function Sprite_Score(){
    this.initialize.apply(this, arguments);
}

Sprite_Score.prototype = Object.create(Sprite_Base.prototype);
Sprite_Score.prototype.constructor = Sprite_Score;

Sprite_Score.prototype.initialize = function(){
    Sprite_Base.prototype.initialize.call(this);
    this.x = 5;
    this.y = 5;
    this.refresh();
}

Sprite_Score.prototype.refresh = function(){
    var string = 'Score : '+Score._currentScore.toString();
    var bitmap = new Bitmap(1,1);
    var width = bitmap.measureTextWidth(string)+32;
    bitmap.applyFontStyle(FontStyles.style05);
    var height = bitmap.fontSize;
    bitmap.resize(width, height);
    bitmap.drawText(string, 6, 0, width, height, 'left');
    this.width = bitmap.width;
    this.height = bitmap.height;
    this.bitmap = bitmap;
}

function Sprite_EnemyNameLabel(){
    this.initialize.apply(this, arguments);
}

Sprite_EnemyNameLabel.prototype = Object.create(Sprite_Base.prototype);
Sprite_EnemyNameLabel.prototype.constructor = Sprite_EnemyNameLabel;

Sprite_EnemyNameLabel.prototype.initialize = function(battler){
    Sprite_Base.prototype.initialize.call(this);
    this._battler = battler;
    this._effectDuration = 0;
    this._effectType = '';
    this.makeBitmap(this._battler.name());
    var scale = battler.enemy().meta.scale;
    if (scale){
        this.scale.x /= scale;
        this.scale.y /= scale;
    }
}

Sprite_EnemyNameLabel.prototype.makeBitmap = function(name){
    var bitmap = new Bitmap(1,1);
    var width = bitmap.measureTextWidth(name)+16;
    bitmap.applyFontStyle(FontStyles.style06);
    var height = bitmap.fontSize;
    bitmap.resize(width, height);
    bitmap.drawText(name, 0, 0, width, height, 'center');
    this.width = bitmap.width;
    this.height = bitmap.height;
    this.bitmap = bitmap;
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
}

Sprite_EnemyNameLabel.prototype.update = function(){
    Sprite_Base.prototype.update.call(this);
    if (this._effectType == ''){
        if(this._battler._calcTurn){this._effectType = 'disappear'}
    }
    if (this._effectType == 'disappear'){
        this.updateDisappear();
        return;
    }
    if (this._battler.isDead()){this.dispose()};
}

Sprite_EnemyNameLabel.prototype.updateDisappear = function(){
    if (this._effectDuration > this.height){
        this.dispose();
        return;
    }
    //消さないこと！
    //this.setFrame(0, -this._effectDuration, this.width, this.height);
    this.setFrame(0, 0, this.width, this.height-this._effectDuration);
    this._effectDuration++;
}

function Sprite_Formula(){
    this.initialize.apply(this, arguments);
}

Sprite_Formula.prototype = Object.create(Sprite_Base.prototype);
Sprite_Formula.prototype.constructor = Sprite_Formula;

Sprite_Formula.prototype.initialize = function(){
    Sprite_Base.prototype.initialize.call(this);
    this._battler = null;
    this._effectDuration = 0;
    this._effectType = '';
    this._blinking = 1;
    this.visible = false;
}

Sprite_Formula.prototype.setFormulaString = function(string){
}

Sprite_Formula.prototype.startAppearEffect = function(){
    this._effectDuration = 0;
    this._effectType = 'appear';
    //消さないこと！
    //this.setFrame(0,-this.height,this.width,this.height);
//    if(this._battler.isActor()){
//        this.setFrame(0,0,this.width,this.height);
//    } else {
//        this.children.forEach(function(sprite){
//            sprite.setFrame(0,0,sprite.width,sprite.height);
//        })
//    }
}

Sprite_Formula.prototype.startHitEffect = function(){
    this._effectDuration = 0;
    this._effectType = 'hit';
}

Sprite_Formula.prototype.startSkillEffect = function(){
    this._effectDuration = 0;
    this._effectType = 'skill';
}

Sprite_Formula.prototype.startResetEffect = function(){
    this._effectDuration = 0;
    this._effectType = 'disappear';
}

Sprite_Formula.prototype.update = function(){
    Sprite_Base.prototype.update.call(this);
    if (this._effectType == 'hit'){
        this.updateHitEffect();
        return;
    }
    if (this._effectType == 'skill'){
        this.updateSkillEffect();
        return;
    }
    if (this._effectType == 'disappear'){
        this.updateDisappearEffect();
        return;
    }
    if (this._effectType == 'appear' && this._battler.isAlive()){
        this.updateAppearEffect();
        return;
    }
    if (Graphics.frameCount % 5 == 0){
        this.updateColorTone();
    }
    if (this._battler.isDead()){this.dispose()};
}

Sprite_Formula.prototype.updateAppearEffect = function(){
    var frameY = this._effectDuration*3;
    if (frameY > this.bitmap.height){
        //frameY = this.bitmap.height;
        this._effectType = '';
    }
    this.visible = true;
}

Sprite_Formula.prototype.updateDisappearEffect = function(){
    var frameY = this.bitmap.height-this._effectDuration*3
    if (frameY < 0){
        this.dispose();
    }
    //消さないこと！
    //this.setFrame(0,frameY,this.width,this.height);
    this.setFrame(0,0,this.width,frameY);
    this._effectDuration++;
}

Sprite_Formula.prototype.updateHitEffect = function(){
    this._effectDuration++;
    var d = 10 - this._effectDuration*0.7;
    this.children.forEach(function(sprite){
        sprite.x -= sprite.sx;
        sprite.y =(d * d)-100;
    },this);
    if (this._effectDuration > 100) {
        this.dispose();
    }
}

Sprite_Formula.prototype.updateSkillEffect = function(){
    this._effectDuration++;
    this.rotation += 0.5;
    this.scale.x += 0.1;
    this.scale.y += 0.1;
    this.opacity -= 5;
    if (this._effectDuration > 100) {
        this.dispose();
    }
}

Sprite_Formula.prototype.updateColorTone = function(){
}

function Sprite_SkillFormula(){
    this.initialize.apply(this, arguments);
}

Sprite_SkillFormula.prototype = Object.create(Sprite_Formula.prototype);
Sprite_SkillFormula.prototype.constructor = Sprite_SkillFormula;

Sprite_SkillFormula.prototype.setFormulaString = function(string){
    if(!this._battler.haveCalcSkill()){return};
    var skillName = this._battler._formula.skillName();
    var bitmap = new Bitmap(1,1);
    var width = Math.max(bitmap.measureTextWidth(string),
                        bitmap.measureTextWidth(skillName))+50;    
    var fontStyle = this._battler.canUseSkill() ? FontStyles.style08: FontStyles.style09;
    bitmap.applyFontStyle(fontStyle);
    var height = bitmap.fontSize*3;
    bitmap.resize(width, height);
    var y = bitmap.fontSize;
    var align = 'center';
    bitmap.drawText(string, 6, y, width, height, align);
    bitmap.drawText(skillName, 6, 0, width, height, align);
    this.width = bitmap.width;
    this.height = bitmap.height;
    this.bitmap = bitmap;
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.startAppearEffect();
}

Sprite_SkillFormula.prototype.updateAppearEffect = function(){
    Sprite_Formula.prototype.updateAppearEffect.call(this);
    this.setFrame(0,0,this.width,this._effectDuration*3);
    this._effectDuration++;
}

function Sprite_EnemyFormula(){
    this.initialize.apply(this, arguments);
}

Sprite_EnemyFormula.prototype = Object.create(Sprite_Formula.prototype);
Sprite_EnemyFormula.prototype.constructor = Sprite_EnemyFormula;

Sprite_EnemyFormula.prototype.initialize = function(){
    Sprite_Formula.prototype.initialize.call(this);
    this._widthSum = 0;
}

Sprite_EnemyFormula.prototype.setFormulaString = function(string){
    var x = 0;
    var pow = false
    for (i = 0; i < string.length; i++) {
        var c = string.charAt(i);
        switch (c){
            case '?':
                var fontStyle = FontStyles.style10;
                i++;
                c = string.charAt(i);
                break;
            case '!':
                var fontStyle = FontStyles.style11;
                i++;
                c = string.charAt(i);
                pow = true;
                break;
            default :
                if(pow && isNaN(c)){pow = false};
                if(pow){
                    var fontStyle = FontStyles.style11;
                } else {
                    var fontStyle = FontStyles.style07;
                }
                break;
        }
        var bitmap = new Bitmap(1,1);
        bitmap.applyFontStyle(fontStyle);
        var width = Math.max(bitmap.measureTextWidth(c),10);
        bitmap.resize(width+24, bitmap.fontSize);
        bitmap.drawText(c, 6, 0, bitmap.width, bitmap.height, 'center');
        var sprite = new Sprite(bitmap);
        this.addChild(sprite);
        sprite.x = x;
        if(fontStyle.fontSize == 20){
            sprite.y -= 16;
        };
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;
        x += width;
        this._widthSum += width;
        var stringWidth = bitmap.measureTextWidth(string);
        sprite.sx = -(x - stringWidth/2)/10;
    }
    this.bitmap = new Bitmap(1, 28);
    this.startAppearEffect();
}

Sprite_EnemyFormula.prototype.updateAppearEffect = function(){
    Sprite_Formula.prototype.updateAppearEffect.call(this);
    this.children.forEach(function(sprite){
        var adjust = sprite.bitmap.fontSize == 20 ? 12 : 0;
        sprite.y = 28 - this._effectDuration*2 - adjust;
        sprite.setFrame(0,0,sprite.width,this._effectDuration*3);
    },this);
    this._effectDuration++;
}

Sprite_EnemyFormula.prototype.updateColorTone = function(){
    var g = 2*this._battler._calcWaiting/CalcManager.calcWaitingTime();
    var ga = (g-0.5)*255;
    this._blinking *= -1;
    this.children.forEach(function(sprite){
        if (g < 0.5){
            sprite.setColorTone([0, 0, 0, 0]);
        } else if (g < 1.5){
            sprite.setColorTone([0, -ga, -ga, 0]);
        } else {
            var b = this._blinking;
            sprite.setColorTone([0, -(1-b)*255, -(1-b)*255, 0]);
        }
    },this);
}

function Sprite_Judgement(){
    this.initialize.apply(this, arguments);
}

Sprite_Judgement.prototype = Object.create(Sprite_Base.prototype);
Sprite_Judgement.prototype.constructor = Sprite_Judgement;

Sprite_Judgement.prototype.initialize = function(judgement){
    this._duration = 0;
    Sprite_Base.prototype.initialize.call(this);
    var bitmap = this.makeBitmap(judgement);
    this.width = bitmap.width;
    this.height = bitmap.height;
    this.bitmap = bitmap;
    this.scale.x = 6.0;
    this.scale.y = 5;
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
}

Sprite_Judgement.prototype.makeBitmap = function(judgement){
    var bitmap = new Bitmap;
    bitmap.applyFontStyle(FontStyles.style12);
    bitmap.resize(bitmap.measureTextWidth(judgement), bitmap.fontSize)
    switch(judgement){
        case 'GOOD!!':
            bitmap.textColor = '#99FF33';
            break;
        case 'BAD!!':
            bitmap.textColor = '#FF0000';
            break;
        default:
            bitmap.textColor = '#f4b323';
            break;
    }
    bitmap.drawText(judgement, 0, 0, bitmap.width, bitmap.height, 'center');
    return bitmap;
}

Sprite_Judgement.prototype.update = function(){
    Sprite_Base.prototype.update.call(this);
    if (this.scale.y > 2){
        this.scale.x -= 0.5;
        this.scale.y -= 0.5;
    }else if (this._duration > 100){
        this.dispose();
    }
    this._duration++;
}

function Sprite_Certificate(){
    this.initialize.apply(this, arguments);
}

Sprite_Certificate.prototype = Object.create(Sprite_Base.prototype);
Sprite_Certificate.prototype.constructor = Sprite_Certificate;

Sprite_Certificate.prototype.initialize = function(){
    Sprite_Base.prototype.initialize.call(this);
    this._effectDuration = 0;
    this._effect = 'appear';
    this.width = Math.ceil(Graphics.height*0.76);
    this.height = Graphics.height;
    this.x = Graphics.width/2-this.width/2;
    this._padding = 80;
    this._nextY = 80;
    this.makeBitmap();
    this.makeForeFrame();
    this.y = -this.height;
    SceneManager._scene._spriteset.addChildAt(this, 3);
    
}

Sprite_Certificate.prototype.update = function(){
    Sprite_Base.prototype.update.call(this);
    if(this._effect == 'appear'){
        this.y += 15;
        if(this.y > 0){
            this.y = 0;
            this._effect = '';
        }
    }
}

Sprite_Certificate.prototype.makeBitmap = function(){
    this.bitmap = new Bitmap(this.width, this.height);
    this.bitmap.fillAll('#FFFFFF');
    this.drawHead(); //認定証
    this.drawRank(); //○級
    this.drawName();
    this.drawContent();
    this.drawDate();
    this.drawDifficulty();
    this.drawScore();
    this.drawScoreRate();
    this.drawAssociation();
    this.drawSignature();
    this.drawSeal();
}

Sprite_Certificate.prototype.drawHead = function(){
    var bitmap = this.bitmap;
    bitmap.applyFontStyle(FontStyles.style13);
    bitmap.drawText('認定証', this._padding, this._nextY, this.width-this._padding*2, 32, 'center');
    this._nextY += bitmap.fontSize + 20
}

Sprite_Certificate.prototype.drawRank = function(){
    var bitmap = this.bitmap;
    bitmap.applyFontStyle(FontStyles.style13);
    var text = RankingClass[CalcManager.rankingModeClass()-1]
    bitmap.drawText(text, this._padding, this._nextY, this.width-this._padding*2, 32, 'center');
    this._nextY += bitmap.fontSize + 10
}

Sprite_Certificate.prototype.drawName = function(){
    var bitmap = this.bitmap;
    bitmap.applyFontStyle(FontStyles.style14);
    var name = $gameParty.members()[0].name() + ' 殿';
    bitmap.fontItalic = true;
    bitmap.drawText(name, this._padding, this._nextY, this.width-this._padding*2, 32, 'left');
    bitmap.fontItalic = false;
    this._nextY += bitmap.fontSize + 30;
}

Sprite_Certificate.prototype.drawContent = function(){
    var bitmap = this.bitmap;
    bitmap.applyFontStyle(FontStyles.style14);
    var text = '  貴殿の頑張りに免じて'
    bitmap.drawText(text, this._padding, this._nextY, this.width-this._padding*2, 32, 'left');
    this._nextY += bitmap.fontSize + 10
    var text = '頭書の資格を認定しちゃおう。'
    bitmap.drawText(text, this._padding, this._nextY, this.width-this._padding*2, 32, 'left');
    this._nextY += bitmap.fontSize*2 + 10
}

Sprite_Certificate.prototype.drawDate = function(){
    var bitmap = this.bitmap;
    bitmap.applyFontStyle(FontStyles.style14);
    var date = new Date();
    var dates = date.getFullYear() + '年 ';
    dates += (date.getMonth()+1) + '月 ';
    dates += date.getDate() + '日 ' ;
    bitmap.drawText(dates, this._padding, this._nextY, this.width-this._padding*2, 32, 'left');
    this._nextY += bitmap.fontSize + 10
}

Sprite_Certificate.prototype.drawDifficulty = function(){
    var bitmap = this.bitmap;
    bitmap.applyFontStyle(FontStyles.style14);
    var text = '難易度 : '+DifficultyText[CalcManager.difficulty()];
    bitmap.drawText(text, this._padding, this._nextY, this.width-this._padding*2, 32, 'left');
    this._nextY += bitmap.fontSize + 10
}


Sprite_Certificate.prototype.drawScore = function(){
    var bitmap = this.bitmap;
    bitmap.applyFontStyle(FontStyles.style14);
    var score = '得点 ' +Score._currentScore.toString();
    bitmap.drawText(score, this._padding, this._nextY, this.width-this._padding*2, 32, 'left');
    this._nextY += bitmap.fontSize + 10
}

Sprite_Certificate.prototype.drawScoreRate = function(){
    var bitmap = this.bitmap;
    bitmap.applyFontStyle(FontStyles.style14);
    var score = '得点率 ' +Score.scoreRate().toFixed(2).toString() + ' %';
    bitmap.drawText(score, this._padding, this._nextY, this.width-this._padding*2, 32, 'left');
    this._nextY += bitmap.fontSize + 10
}


Sprite_Certificate.prototype.drawAssociation = function(){
    var bitmap = this.bitmap;
    var style = FontStyles.style14;
    bitmap.applyFontStyle(style);
    bitmap.fontSize = 18;
    var text = 'カルドラ段位認定協会';
    bitmap.drawText(text, this._padding, this._nextY, this.width-this._padding*2, 32, 'center');
    this._nextY += bitmap.fontSize + 10;
}

Sprite_Certificate.prototype.drawSignature = function(){
    var bitmap = this.bitmap;
    bitmap.applyFontStyle(FontStyles.style14);
    var text = '副会長 シハーン';
    bitmap.drawText(text, this._padding, this._nextY, this.width-this._padding*2, 32, 'right');
    this._nextY += bitmap.fontSize + 10;
}

Sprite_Certificate.prototype.makeForeFrame = function(){
    var sprite = new Sprite(ImageManager.loadTitle2('Floral'));
    sprite.scale.x = 0.7;
    sprite.scale.y = 0.7;
    sprite.x += this.width-18;
    sprite.y += 28;
    sprite.opacity = 200;
    sprite.rotation  = Math.PI/2;
    this.addChild(sprite);
}

Sprite_Certificate.prototype.drawSeal = function(){
    var iconIndex = 3;
    var sprite = new Sprite(ImageManager.loadSystem('Seal'));
    this.addChild(sprite);
    sprite.scale.x = 0.3;
    sprite.scale.y = 0.3;
    sprite.opacity = 180;
    sprite.x = 350;
    sprite.y = 490;
}

function Sprite_StandOut(){
    this.initialize.apply(this, arguments);
}

Sprite_StandOut.prototype = Object.create(Sprite.prototype);
Sprite_StandOut.prototype.constructor = Sprite_StandOut;

Sprite_StandOut.prototype.update = function(){
    Sprite.prototype.update.call(this);
    if(Graphics.frameCount % 5 == 0){
        this.setColorTone([r(255), r(255), r(255), 0]);
    }
}

var _Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _Game_System_initialize.call(this);
    this._rankingData = null;
};

var _Game_Map_displayName = Game_Map.prototype.displayName;
Game_Map.prototype.displayName = function() {
    if (this.mapId()==42){
        var name = $gameActors.actor(10).name();
        return (name +'の家 ハウスレベル '+$gameVariables.value(104));
    }
    if ($gameVariables.value(113)>0){
        return $gameVariables.value($gameVariables.value(113)+120);
    }
    return _Game_Map_displayName.call(this);
};

Game_BattlerBase.prototype.isEquipWtypeOk = function(wtypeId) {
    if(this.isEnemy()){return false};
    if(!this.currentClass().meta.altWtype){return false};
    return this.currentClass().meta.altWtype.contains(wtypeId);
};

Game_BattlerBase.prototype.canEquipWeapon = function(item) {
    var wtypeId = (item.meta.altWtypeId || 0)
    return this.isEquipWtypeOk(wtypeId) && !this.isEquipTypeSealed(item.etypeId);
};

var _Game_BattlerBase_attackSkillId = Game_BattlerBase.prototype.attackSkillId;
Game_BattlerBase.prototype.attackSkillId = function() {
    if (CalcManager.isRankingMode()){
        return 11;
    } else {
        return _Game_BattlerBase_attackSkillId.call(this);
    }
};

Game_BattlerBase.prototype.isMovableLeader = function(){
    return this.index() == this.friendsUnit().movableLeader().index();
}

var _Game_Battler_initMembers = Game_Battler.prototype.initMembers
Game_Battler.prototype.initMembers = function(){
    _Game_Battler_initMembers.call(this);
    this._makeFormulaRequested = false;
    this._formula = null;
    this._isInputCalcLocked = false;
    this._formulaHitEffectRequested = false;
    this._formulaSkillEffectRequested = false;
    this._calcWaiting = 0;
    this._calcTarget = null;
    this._popupScore = 0;
    this._calcTurn = false;
}

Game_Battler.prototype.makeFormula = function(){
    if(!this._formula){this._formula = new Calc_Formula(this)}
    this._makeFormulaRequested = true;
}

Game_Battler.prototype.addActions = function(){
    if (true) { //this.canMove()
        var actionTimes = this.makeActionTimes();
        //this._actions = [];
        for (var i = 0; i < actionTimes; i++) {
            this._actions.push(new Game_Action(this));
        }
    }
}

Game_Actor.prototype.removeState = function(stateId) {
    if(stateId == 1 && BattleManager._phase == 'calcTurn' && this.isDead()){
        this.makeFormula();
    }
    Game_Battler.prototype.removeState.call(this, stateId);
};

var _Game_Actor_levelUp = Game_Actor.prototype.levelUp;
Game_Actor.prototype.levelUp = function() {
    SoundManager.playLevelUp()
    _Game_Actor_levelUp.call(this);
};

Game_Actor.prototype.displayLevelUp = function(newSkills) {
    if(!$gameParty.members().contains(this)){
        return;
    }
    if(this.actorId() == 11){
        var text = TextManager.levelUp.format(this._name, TextManager.level, this._level);
        $gameMessage.newPage();
        $gameMessage.add(text);
    }
        newSkills.forEach(function(skill) {
        $gameMessage.add(TextManager.obtainSkill.format(this._name, skill.name));
    },this);
};

Game_Actor.prototype.addActions = function(){
    Game_Battler.prototype.addActions.call(this);
    this.makeAutoBattleActions();
    this._actions.forEach(function(action){
        action._calcLinkedEnemy = this._calcTarget;
    },this)
}

Game_Actor.prototype.addSkillActions = function(skillId){
    Game_Battler.prototype.addActions.call(this);
    this.makeAutoBattleActions(skillId);
}

//var _Game_Actor_makeAutoBattleActions = Game_Actor.prototype.makeAutoBattleActions;
Game_Actor.prototype.makeAutoBattleActions = function(skillId){
    var action = new Game_Action(this);
    if(skillId){
        if (skillId == 29){
            $gameParty.members().forEach(function(actor){
                actor.gainHp(9999);
            })
        }
        action.setSkill(skillId);
        action.evaluate();
        if(action.item().scope==1){
            action._targetIndex = CalcManager.maxWaitingEnemy().index();
        }
        var enemies = [];
        if(action.isForOpponent() && action.isAffectCalcWaiting()){
            if(action.isForAll()){
                enemies = $gameTroop.aliveMembers();
            } else {
                enemies.push($gameTroop.members()[action._targetIndex]);
            }
        }
        enemies.forEach(function(enemy){
            enemy.setCalcWaiting(-CalcWaitingBaseTime);
        })
        if(skillId==18){
            $gameTroop.resetFormula();
        }
    } else {
        action.setAttack();
    }
    this.setAction(0, action);
}

Game_Action.prototype.isAffectCalcWaiting = function(){
    return this.item().meta.affectCalcWaiting;
}

Game_Action.prototype.executeHpDamage = function(target, value) {
    if (this.isDrain()) {
        value = Math.min(target.hp, value);
    }
    this.makeSuccess(target);
    target.gainHp(-value);
    //if (value > 0) {
        target.onDamage(value);
    //}
    this.gainDrainedHp(value);
};


var _Game_Actor_removeCurrentAction = Game_Actor.prototype.removeCurrentAction;
Game_Actor.prototype.removeCurrentAction = function(){
    var action = this._actions.shift();
    var enemy = action._calcLinkedEnemy;
    if(this._isInputCalcLocked){
        this.makeFormula()
    }
    if(!enemy){return};
    if(enemy.isAlive() && enemy._isInputCalcLocked){
        enemy.makeFormula();
    }
}

Game_Actor.prototype.cancelCalcTarget = function(){
    this._calcTarget = null;
    this._sprite = null;
    this._formula = null;
}

Game_Actor.prototype.setCalcSkillItem = function(item){
    this._calcSkillId = item.id;
}

Game_Actor.prototype.calcSkill = function(){
    if(!this._calcSkillId){
        this._calcSkillId = this._skills.filter(function(id){
            var n = $dataSkills[id].occasion
            return (n==0||n==1);
        })[0];
    }
    return (this._calcSkillId? $dataSkills[this._calcSkillId]:null)
}

Game_Actor.prototype.haveCalcSkill = function(){
    return isNaN(this.calcSkill());
}

Game_Actor.prototype.canUseSkill = function(){
    if(this.haveCalcSkill() && this.canMove()){
        return this.calcSkill().mpCost <= this.mp;
    }
    return false;
}

//★残しておく
//Game_Actor.prototype.performAttack = function() {
//    var weapons = this.weapons();
//    console.log(1886, weapons);
//    var wtypeId = weapons[0] ? (weapons[0].meta.altWtypeId? weapons[0].meta.altWtypeId : weapons[0].wtypeId) : 0;
//    var attackMotion = $dataSystem.attackMotions[wtypeId];
//    if (attackMotion) {
//        console.log(1889, attackMotion.type)
//        if (attackMotion.type === 0) {
//            this.requestMotion('thrust');
//        } else if (attackMotion.type === 1) {
//            this.requestMotion('swing');
//        } else if (attackMotion.type === 2) {
//            this.requestMotion('missile');
//        }
//        this.startWeaponAnimation(attackMotion.weaponImageId);
//    }
//};

Game_Actor.prototype.processRightAnswer = function(){
    this._isInputCalcLocked = true;
    this._formulaSkillEffectRequested = true;
}

var _Game_Enemy_setup = Game_Enemy.prototype.setup;
Game_Enemy.prototype.setup = function(enemyId, x, y) {
    _Game_Enemy_setup.call(this, enemyId, x, y);
    this._hitBaseScore = CalcWaitingBaseTime//CalcManager.calcWaitingTime();
};

Game_Enemy.prototype.addActions = function(){
    Game_Battler.prototype.addActions.call(this);
    if (this.numActions() > 0) {
        var actionList = this.enemy().actions.filter(function(a) {
            return this.isActionValid(a);
        }, this);
        if (actionList.length > 0) {
            this.selectAllActions(actionList);
        }
    }
    BattleManager._actionBattlers.push(this);
}

var _Game_Enemy_transform = Game_Enemy.prototype.transform;
Game_Enemy.prototype.transform = function(enemyId) {
    _Game_Enemy_transform.call(this, enemyId);
    this._formula.initialize(this);
    this.resetFormula();
};


Game_Enemy.prototype.processRightAnswer = function(){
    if(this._hitBaseScore < 0){
        this._hitBaseScore = 0;
    }
    //var score = Math.ceil((this._hitBaseScore/CalcManager.calcWaitingTime())*100)
    var score = Math.ceil((this._hitBaseScore/CalcWaitingBaseTime)*100)
    this._popupScore = score.clamp(Score.MinHitScore, Score.MaxHitScore);
    this._hitBaseScore = CalcWaitingBaseTime//CalcManager.calcWaitingTime();
    this._calcWaiting = 0;
    this._isInputCalcLocked = true;
    this._formulaHitEffectRequested = true;
}

Game_Enemy.prototype.setCalcWaiting = function(n){
    this._calcWaiting += n;
}

Game_Enemy.prototype.countCalcWaiting = function(){
    this._calcWaiting += this.agi*CalcManager.difficulty();
    this._hitBaseScore -= this.agi;
    if(this._calcWaiting > CalcManager.calcWaitingTime()){
        this.addActions()
        this._calcWaiting -= CalcManager.calcWaitingTime();
    }
}

Game_Enemy.prototype.resetFormula = function(){
    this._formula._counter = 0;
    if(!this._isInputCalcLocked){
        this._resetFormulaRequested = true;
    }
}

Game_Unit.prototype.movableLeader = function(){
    return this.movableMembers()[0];
}

Game_Unit.prototype.updateStateTurns = function(){
    this.aliveMembers().forEach(function(member){
        member.updateStateTurns();
        member.removeStatesAuto(2);
    })
}

Game_Party.prototype.canChat =function(){
    var i = $gameMap._interpreter;
    var key = [i._mapId, i._eventId, 'E']
    if($gameSelfSwitches.value(key)){
        return false;
    }
    
    for(var i=0; i < arguments.length; i++){
        if(!this._actors.contains(arguments[i])){
            return false;
        }
    }
    $gameSelfSwitches.setValue(key, true);
    return true;
}

Game_Troop.prototype.resetFormula = function(){
    this.aliveMembers().forEach(function(enemy){
        enemy.resetFormula();
        enemy._hitBaseScore -= Math.ceil(CalcManager.calcWaitingTime()*2/3)
    });
}


Game_Troop.prototype.disappearNameLabel = function(){
    this.members().forEach(function(enemy){
        enemy._calcTurn = true;
    })
}

Game_Troop.prototype.makeFormula = function(){
    this.members().forEach(function(enemy){
        enemy.makeFormula();
    })
}

Game_Troop.prototype.onBattleStart = function() {
    Game_Unit.prototype.onBattleStart.call(this);
    //攻撃タイミングずらしの調整
    var s = this.members().length;
    for(var i = 0; i < s; i++){
        this.members()[i]._calcWaiting -= Math.floor(i*CalcManager.calcWaitingTime()/s);
    }
};

Game_Troop.prototype.countCalcWaiting = function(){
    this.aliveMembers().forEach(function(enemy){
        if(!enemy._isInputCalcLocked){
            enemy.countCalcWaiting();
        }
    })
}

Game_Troop.prototype.smoothTarget = function(index){
    return this.members()[index];
}

var _Game_Troop_goldTotal = Game_Troop.prototype.goldTotal;
Game_Troop.prototype.goldTotal = function() {
    if (CalcManager.isRankingMode()){
        var gold = _Game_Troop_goldTotal.call(this)*2;
        return Math.round(gold * CalcManager.difficulty() * CalcManager.difficulty());
    } else {return _Game_Troop_goldTotal.call(this)}
};

Game_Unit.prototype.answers = function(){
    var a = [];
    this.members().forEach(function(enemy){
        if (enemy._formula){
            a.push(enemy._formula._answer);
        }
    })
    return a;
}

Game_Party.prototype.makeSkillFormula = function(){
    this.members().forEach(function(actor){
        actor.makeFormula();
    })
}

Game_Party.prototype.cancelCalcTarget = function(){
    this.members().forEach(function(actor){
        actor.cancelCalcTarget();
    });
}

var _Game_Party_gainItem = Game_Party.prototype.gainItem;
Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
    if(item){
        var type = '';
        if(DataManager.isItem(item)){type = 'i'};
        if(DataManager.isWeapon(item)){type = 'w'};
        if(DataManager.isArmor(item)){type = 'a'};
        $gameVariables.setValue(117, '\x1bi'+type+'['+item.id+']')
    }
    _Game_Party_gainItem.call(this, item, amount, includeEquip);
};

var _Game_Player_initMembers = Game_Player.prototype.initMembers;
Game_Player.prototype.initMembers = function() {
    _Game_Player_initMembers.call(this);
    this._reverseMove = false;
};

var _Game_Player_forceMoveRoute = Game_Player.prototype.forceMoveRoute;
Game_Player.prototype.forceMoveRoute = function(moveRoute) {
    if (this._reverseMove){
        this.reverseRoute(moveRoute);
    }
    _Game_Player_forceMoveRoute.call(this, moveRoute);
};

Game_Player.prototype.reverseRoute = function(moveRoute){
    moveRoute.list.reverse();
        moveRoute.list.forEach(function(r){
            switch(r.code){
                case 1: case 2: case 3: case 4:
                    r.code = 5 - r.code;
                    break;
                case 5: case 6: case 7: case 8:
                    r.code = 9 - r.code;
                    break
            }
        })
    moveRoute.list.push(moveRoute.list.shift());
}

var _Game_Event_initMembers = Game_Event.prototype.initMembers;
Game_Event.prototype.initMembers = function() {
    _Game_Event_initMembers.call(this);
    this._forCalcBattle = false;
    this._trasporter = false;
};

var _Game_Event_meetsConditions = Game_Event.prototype.meetsConditions;
Game_Event.prototype.meetsConditions = function(page) {
    var c = page.conditions;
    if (c.switch1Valid) {
        this._forCalcBattle = (41 <= c.switch1Id && c.switch1Id <= 60);
    }
    return _Game_Event_meetsConditions.call(this, page);
};

var _Game_Event_update = Game_Event.prototype.update;
Game_Event.prototype.update = function() {
    _Game_Event_update.call(this);
    if (this._trasporter){
        Game_Vehicle.prototype.syncWithPlayer.call(this);
    }
};

function Calc_Formula() {
    this.initialize.apply(this, arguments);
}

Calc_Formula.prototype.initialize = function(obj){
    this._obj = obj;
    this._script = null;
    this._formulaString = '';
    this._answer = null;
    this._counter = 0;
    this._script = '';
    this._formulaGenerator = null;
    this._l = [];//文字式の文字
    this._la = [];//文字式の文字の値
    this._v = [];//その他の内部変数
    this._scripts = [];
    if (obj.isEnemy()){
        this._script0 = $dataEnemies[obj._enemyId].meta.calc0;
        this._scripts = $dataEnemies[obj._enemyId].meta.calc.split('yield');
        eval(this._script0);
    }else{ //アクタースキルの時
        if(obj.calcSkill()){
            this._script0 = obj.calcSkill().meta.calc0;
            this._scripts = obj.calcSkill().meta.calc.split('yield');
            eval(this._script0);
        }
    }
};

//Calc_Formula.prototype.reset = function(){
//    this.initialize(this._obj);
//}

Calc_Formula.prototype.makeFormula = function(){
    if(this._scripts.length == 0){return};
    var l = this._l;
    var la = this._la;
    var v = this._v
    var string = this._scripts[this._counter % this._scripts.length];
    string += 'var yieldObject = {a:ans, s:str, v:v, l:l, la:la}'
    var answers = this._obj.friendsUnit().answers();
    for (var i=0; i<5; i++){
        eval(string);
        if (!answers.contains(Math.abs(yieldObject.a))){
            break;
        }
        if (i==4){console.log('juufuku')}
    }
    this._answer = Math.abs(yieldObject.a);
    this._formulaString = yieldObject.s;
    this._l = yieldObject.l;
    this._la = yieldObject.la;
    this._v = yieldObject.v;
    this._counter++;
}

Calc_Formula.prototype.skillName = function(){
    if(this._obj.isActor()){
        if(this._obj.calcSkill()){
            return this._obj.calcSkill().name;
        }
    }
    return null;
}

Window_MenuCommand.prototype.addMainCommands = function() {
    var enabled = this.areMainCommandsEnabled() && !CalcManager.isRankingMode();
    var enabled2 = $gameSwitches.value(118);
    var enabled3 = $gameParty._actors.contains(13);
    this.addCommand('ファストトラベル', 'fastTravel', enabled2);//★
    if (this.needsCommand('item')) {
        this.addCommand(TextManager.item, 'item', enabled);
    }
    if (this.needsCommand('skill')) {
        this.addCommand(TextManager.skill, 'skill', enabled3);
        this.addCommand('バトルスキル', 'calcSkill', enabled);
    }
    if (this.needsCommand('equip')) {
        this.addCommand(TextManager.equip, 'equip', enabled);
    }
    if (this.needsCommand('status')) {
        this.addCommand(TextManager.status, 'status', enabled);
    }
};

var _Scene_Menu_commandPersonal = Scene_Menu.prototype.commandPersonal;
Scene_Menu.prototype.commandPersonal = function() {
    if (this._commandWindow.currentSymbol() == 'skill'){
        $gameParty.setMenuActor($gameActors.actor(13));
        SceneManager.push(Scene_Skill);  
    }
    _Scene_Menu_commandPersonal.call(this);
    
//    this._statusWindow.setFormationMode(false);
//    this._statusWindow.selectLast();
//    this._statusWindow.activate();
//    this._statusWindow.setHandler('ok',     this.onPersonalOk.bind(this));
//    this._statusWindow.setHandler('cancel', this.onPersonalCancel.bind(this));
};

var _Scene_Skill_start = Scene_Skill.prototype.start;
Scene_Skill.prototype.start = function() {
    _Scene_Skill_start.call(this);
    this.commandSkill();
    this._skillTypeWindow.deactivate();
};

Scene_Skill.prototype.onItemCancel = function() {
    //this._itemWindow.deselect();
    //this._skillTypeWindow.activate();
    this.popScene();
};

Window_EquipStatus.prototype.numVisibleRows = function() {
    return 5;
};

var _Window_EquipStatus_drawItem = Window_EquipStatus.prototype.drawItem;
Window_EquipStatus.prototype.drawItem = function(x, y, paramId) {
    switch (paramId) {
            case 2 : case 3 : break;
            case 4 : paramId = 0; break;
            case 5 : paramId = 1; break;
            default : return; break;
    }
    _Window_EquipStatus_drawItem.call(this, x, y, paramId);
};

var _Window_Message_processCharacter = Window_Message.prototype.processCharacter;
Window_Message.prototype.processCharacter = function(textState){
    if(this._maleSpeaking){SoundManager.playSpeaking(80)};
    if(this._femaleSpeaking){SoundManager.playSpeaking(120)};
    _Window_Message_processCharacter.call(this,textState);
}

var _Window_Message_processEscapeCharacter = Window_Message.prototype.processEscapeCharacter;
Window_Message.prototype.processEscapeCharacter = function(code, textState) {
    _Window_Message_processEscapeCharacter.call(this, code, textState);
    switch (code) {
    case 'MV': //male voice
        this._maleSpeaking = true;
        break;
    case 'FV': //female voice
        this._femaleSpeaking = true;
        break;
    }
};

var _Window_Message_clearFlags = Window_Message.prototype.clearFlags;
Window_Message.prototype.clearFlags = function() {
    _Window_Message_clearFlags.call(this);
    this._maleSpeaking = false;
    this._femaleSpeaking = false;
};

function Window_Gold2() {
    this.initialize.apply(this, arguments);
}

Window_Gold2.prototype = Object.create(Window_Gold.prototype);
Window_Gold2.prototype.constructor = Window_Gold2;

Window_Gold2.prototype.windowHeight = function() {
    return this.fittingHeight(5)+12;
};

Window_Gold2.prototype.refresh = function() {
    var lineHeight = this.lineHeight();
    var x = this.textPadding();
    var width = this.contents.width - this.textPadding() * 2;
    this.contents.clear();
    this.drawCurrencyValue(this.value(), this.currencyUnit(), x, lineHeight * 4 + 12, width);
    
    var actor = $gameActors.actor(11);
    //var lineHeight = this.lineHeight();
    var expTotal = TextManager.expTotal.format(TextManager.exp);
    var expNext = TextManager.expNext.format(TextManager.level);
    var value1 = actor.currentExp();
    var value2 = actor.nextRequiredExp();
    this.changeTextColor(this.systemColor());
    this.drawText(expTotal, x, lineHeight * 0, width);
    this.drawText(expNext, x, lineHeight * 2, width);
    this.resetTextColor();
    this.drawText(value1, x, lineHeight * 1, width, 'right');
    this.drawText(value2, x, lineHeight * 3, width, 'right');
};

var _Window_SkillList_isEnabled = Window_SkillList.prototype.isEnabled;
Window_SkillList.prototype.isEnabled = function(item) {
    if(SceneManager._scene.constructor == Scene_CalcSkill){
        return true;
    }
    return _Window_SkillList_isEnabled.call(this, item);
};


function Window_CalcInput() {
    this.initialize.apply(this, arguments);
};

Window_CalcInput.prototype = Object.create(Window_Selectable.prototype);
Window_CalcInput.prototype.constructor = Window_CalcInput;

Window_CalcInput.ITEM =
    ['7', '8', '9', 'Enter', '', '',
     '4', '5', '6', '', '', '',
     '1', '2', '3', '', '', '',
     '0', '', 'BS','', '', ''];

Window_CalcInput.prototype.initialize = function(){
    var x = 0;
    var width = 400;
    var height = this.windowHeight();
    var y = Graphics.height - height;
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._index = 7;
    this.refresh();
    this.updateCursor();
};

Window_CalcInput.prototype.spacing = function() {
    return 0;
};
Window_CalcInput.prototype.maxCols = function(){
    return 6;
};

Window_CalcInput.prototype.maxItems = function(){
    return 24;
};

Window_CalcInput.prototype.numVisibleRows = function(){
    return 4;
};

Window_CalcInput.prototype.enterRect = function(rect){
    rect.width *= 3;
    rect.height *= 4;
    return rect;
};

Window_CalcInput.prototype.zeroRect = function(rect){
    rect.width *= 2;
    return rect;
};

Window_CalcInput.prototype.windowHeight = function() {
    return this.fittingHeight(this.numVisibleRows());
};

Window_CalcInput.prototype.numVisibleRows = function() {
    return Math.ceil(this.maxItems() / this.maxCols());
};

Window_CalcInput.prototype.itemRect = function(index){
    index = (this.isEnterIndex(index)? 3 : index);
    index = (this.isZeroIndex(index)? 18 : index);
//    if (this.isEnterIndex(index)){
//        index = 3;
//    };
    var rect = Window_Selectable.prototype.itemRect.call(this, index);
    //if (index === 3) {rect = this.enterRect(rect)};
    rect = (index == 3 ? this.enterRect(rect) : rect);
    rect = (index == 18 ? this.zeroRect(rect) : rect);
    return rect;
};

Window_CalcInput.prototype.isEnterIndex = function(index){
    return [4, 5, 9, 10, 11, 15, 16, 17, 21, 22, 23].contains(index);
};

Window_CalcInput.prototype.isZeroIndex = function(index){
    return [19].contains(index);
};

Window_CalcInput.prototype.drawItem = function(index){
    //this.contents.fontFace = 'MyFont001';
    this.contents.applyFontStyle(FontStyles.style07);
    this.drawItemRect(index);
    //if (index % 6 - 3 > 0){return};
    var rect = this.itemRectForText(index);
    var d = (index==3? this.itemHeight()*2:0)
    this.drawText(Window_CalcInput.ITEM[index], rect.x, rect.y + d, rect.width, 'center');
};

Window_CalcInput.prototype.drawItemRect = function(index) {
    var rect = this.itemRect(index);
    switch($gameVariables.value(147)){
        case 1:
            var color = '#534208';
            break;
        case 2:
            var color = '#25214d';
            break;
        case 3:
            var color = '#6f0303';
            break;
        case 4:
            var color = '#265c04';
            break;
        default:
            var color = '#534208';
            break;
    }
    if (this.isEnterIndex(index) || this.isZeroIndex(index)){return};
    this.drawRect(rect.x+1, rect.y+1, rect.width-2, rect.height-2, color);
};

Window_CalcInput.prototype.drawRect = function(dx, dy, dw, dh, color) {
    this.changePaintOpacity(false);
    this.contents.fillRect(dx, dy, dw, dh, color);
    this.changePaintOpacity(true);
};

Window_CalcInput.prototype.cursorRight = function(wrap){
    if(![3,9,15,21].contains(this.index())){
        Window_Selectable.prototype.cursorRight.call(this, wrap);
    }
}

Window_CalcInput.prototype.cursorLeft = function(wrap){
    if(![0,6,12,18].contains(this.index())){
        Window_Selectable.prototype.cursorLeft.call(this, wrap);
    }
}

Window_CalcInput.prototype.callOkHandler = function(){
    var symbol = Window_CalcInput.ITEM[this._index];
    if (this.isEnterIndex(this._index)){
        symbol = 'Enter';
    }; 
    if (this.isZeroIndex(this._index)){
        symbol = '0';
    }; 
    CalcManager.input(symbol);
    if (TouchInput.date < Input.date) {
        this._index = 7;
    }
    this.activate();
};

Window_CalcInput.prototype.callCancelHandler = function(){
    CalcManager.input('BS');
    if (TouchInput.date < Input.date) {
        this._index = 7;
    }
    this.activate();
};

Window_CalcInput.prototype.activate = function() {
    if (BattleManager._phase != 'battleEnd'){
        Window_Selectable.prototype.activate.call(this);
    }
};

Window_CalcInput.prototype.isOkEnabled = function() {
    return true;
};

Window_CalcInput.prototype.isCancelEnabled = function() {
    return true;
};

Window_CalcInput.prototype.onTouch = function(triggered) {
    var lastIndex = this.index();
    var x = this.canvasToLocalX(TouchInput.x);
    var y = this.canvasToLocalY(TouchInput.y);
    var hitIndex = this.hitTest(x, y);
    if (hitIndex >= 0) {
        if (true) {
            if (triggered && this.isTouchOkEnabled()) {
                this.select(hitIndex)
                this.processOk();
                //this._flickStartX = x;
                //this._flickStartY = y;
                this._touchPressed = true;
            }
        } 
    } else if (this._stayCount >= 10) {
        if (y < this.padding) {
            this.cursorUp();
        } else if (y >= this.height - this.padding) {
            this.cursorDown();
        }
    }
    if (this.index() !== lastIndex) {
        SoundManager.playCursor();
    }
};

Window_CalcInput.prototype.update = function(){
    if($gameTroop.isEventRunning()){return};
    if (this.active){
        this.processQuickEnter();
        //this.processFlick();
        this.processNumKey();
        this.processByGamepad();
    }
    Window_Selectable.prototype.update.call(this);
}

Window_CalcInput.prototype.processNumKey = function(){
    if (Input._pressedTime === 0 && this.active && Input._latestButton){
        CalcManager.input(Input._latestButton);
    }
}

Window_CalcInput.prototype.processQuickEnter = function(){
    if (TouchInput.isCancelled() && TouchInput.isPressed()){
        CalcManager.input('Enter');
    }
}

Window_CalcInput.prototype.processByGamepad = function(){
    if (Input.isTriggered('pageup')){
        CalcManager.input('0');
        this.select(7);
    } else if (Input.isTriggered('pagedown')){
        CalcManager.input('Enter');
        this.select(7);
    }
}

Window_CalcInput.prototype.playOkSound = function(){
}


function Window_CalcInputDisplay() {
    this.initialize.apply(this, arguments);
};

Window_CalcInputDisplay.prototype = Object.create(Window_Base.prototype);
Window_CalcInputDisplay.prototype.constructor = Window_CalcInputDisplay;

Window_CalcInputDisplay.prototype.initialize = function(){
    Window_Base.prototype.initialize.call(this, 212, 0, 158, this.lineHeight());
    this.refresh();
    this.deactivate();
    this._windowFrameSprite.visible = false;
};

Window_CalcInputDisplay.prototype.standardPadding = function() {
    return 0;
};

Window_CalcInputDisplay.prototype.textPadding = function() {
    return 0;
};

Window_CalcInputDisplay.prototype.refresh = function(string){
    this.contents.clear();
    this.contents.applyFontStyle(FontStyles.style07);
    this.drawText(string, 6, 0, this.width-12, 'right');
};

var _Window_PartyCommand_windowWidth = Window_PartyCommand.prototype.windowWidth;
Window_PartyCommand.prototype.windowWidth = function() {
    if(CalcManager.isRankingMode){return Graphics.width}
    return _Window_PartyCommand_windowWidth.call(this);
};

var _Window_PartyCommand_makeCommandList = Window_PartyCommand.prototype.makeCommandList;
Window_PartyCommand.prototype.makeCommandList = function() {
    if(CalcManager.isRankingMode){
        this.addCommand(TextManager.fight,  'fight');
    } else {
        _Window_PartyCommand_makeCommandList.call(this);
    }
    
};

Window_PartyCommand.prototype.drawItem = function(index) {
    if(CalcManager.isRankingMode){
        var width = this.contentsWidth();
        var y = this.contentsHeight()/2-this.lineHeight()/2;
        this.drawText(this.commandName(index), 0, y, width, 'center');
    }
};

Window_PartyCommand.prototype.itemRect = function(index){
    if(CalcManager.isRankingMode){
        var rect = new Rectangle();
        rect.width = this.contentsWidth();
        rect.height = this.contentsHeight();
        rect.x = 0;
        rect.y = 0;
        return rect;
    }
}

var _Window_MenuStatus_initialize = Window_MenuStatus.prototype.initialize;
Window_MenuStatus.prototype.initialize = function(x, y) {
    this._anotherView = false; //攻撃力、防御力、装備表示用
    _Window_MenuStatus_initialize.call(this, x, y);
};

Window_MenuStatus.prototype.drawActorSimpleStatus = function(actor, x, y, width) {
    if(this._anotherView){
        this.drawAnotherView(actor, x, y, width);
        return;
    }
    var lineHeight = this.lineHeight();
    var x2 = x + 180;
    var width2 = Math.min(200, width - 180 - this.textPadding());
    this.drawActorName(actor, x, y);
    this.drawActorLevel(actor, x, y + lineHeight * 1);
    //this.drawActorIcons(actor, x, y + lineHeight * 2);
    this.drawActorSkill(actor, x, y + lineHeight * 2, width);
    //this.drawActorClass(actor, x2, y);
    this.drawActorHp(actor, x2, y + lineHeight * 0, width2);
    this.drawActorMp(actor, x2, y + lineHeight * 1, width2);
};

Window_MenuStatus.prototype.drawActorSkill = function(actor, x, y, width) {
    var skill = actor.calcSkill();
    if (skill) {
        this.drawItemName(skill, x, y, width - 4);
        this.drawSkillCost(actor, skill, x+this.textWidth(skill.name)+48, y, width - 4);
        this.changePaintOpacity(1);
    }
};

Window_MenuStatus.prototype.drawSkillCost = function(actor, skill, x, y, width) {
    if (actor.skillTpCost(skill) > 0) {
        this.changeTextColor(this.tpCostColor());
        this.drawText(actor.skillTpCost(skill), x, y, width, 'left');
    } else if (actor.skillMpCost(skill) > 0) {
        this.changeTextColor(this.mpCostColor());
        this.drawText(actor.skillMpCost(skill), x, y, width, 'left');
    }
};

Window_MenuStatus.prototype.drawAnotherView = function(actor, x, y, width){
    var lineHeight = this.lineHeight();
    var x2 = x + 180;
    var x3 = x + 280;
    var width2 = Math.min(200, width - 180 - this.textPadding());
    this.drawActorName(actor, x, y);
    this.drawActorClass(actor, x2, y);
    this.drawItemName(actor.equips()[0], x, y + lineHeight * 1);
    this.drawItemName(actor.equips()[2], x, y + lineHeight * 2);
    this.drawIcon(97, x3, y + lineHeight * 1);
    this.drawText(actor.param(2), x3 + 32, y + lineHeight * 1, 48, 'right');
    this.drawIcon(81, x3, y + lineHeight * 2);
    this.drawText(actor.param(3), x3 + 32, y + lineHeight * 2, 48, 'right');
}

var _Window_SavefileList_drawPlaytime = Window_SavefileList.prototype.drawPlaytime;
Window_SavefileList.prototype.drawPlaytime = function(info, x, y, width) {
    _Window_SavefileList_drawPlaytime.call(this, info, x, y, width);
    if (info.difficultyText) {
        this.drawText(info.difficultyText, x, y, width, 'reft');
    }
};

Window_BattleStatus.prototype.windowWidth = function() {
    return Graphics.boxWidth - 400;
};

Window_BattleStatus.prototype.gaugeAreaWidth = function() {
    return 200;
};

Window_BattleStatus.prototype.drawGaugeAreaWithoutTp = function(rect, actor) {
    this.drawActorHp(actor, rect.x + 0, rect.y, 90);
    this.drawActorMp(actor, rect.x + 100,  rect.y, 90);
};

var _Window_BattleLog_initialize = Window_BattleLog.prototype.initialize;
Window_BattleLog.prototype.initialize = function() {
    _Window_BattleLog_initialize.call(this);
    this.visible = false;
};

Window_BattleLog.prototype.startAction = function(subject, action, targets) {
    var item = action.item();
    var id = item.animationId;
    if(subject.isEnemy() && ([1,3,4,5,11].contains(item.id))){ //[]内は代替アニメーションスキルID
        if(subject.enemy().meta.AttackAnimationId){
            var id = subject.enemy().meta.AttackAnimationId;
        }
    }
    var item = action.item();
    this.push('performActionStart', subject, action);
    this.push('waitForMovement');
    this.push('performAction', subject, action);
    if(item.id != 1 || subject.isEnemy() || subject.isActor() && subject.isMovableLeader() && item.id == 1){
        this.push('showAnimation', subject, targets.clone(), id);
    }
    this.displayAction(subject, item);
};

function Window_FaceChoice() {
    this.initialize.apply(this, arguments);
}

Window_FaceChoice.prototype = Object.create(Window_Selectable.prototype);
Window_FaceChoice.prototype.constructor = Window_FaceChoice;

Window_FaceChoice.FaceList = ['Actor1', 'Actor2', 'Actor3', 'Package1', 'Package2'];
Window_FaceChoice.SVActorList = [
    'Actor1_1', 'Actor1_2', 'Actor1_3', 'Actor1_4',
    'Actor1_5', 'Actor1_6', 'Actor1_7', 'Actor1_8',
    'Actor2_1', 'Actor2_2', 'Actor2_3', 'Actor2_4',
    'Actor2_5', 'Actor2_6', 'Actor2_7', 'Actor2_8',
    'Actor3_1', 'Actor3_2', 'Actor3_3', 'Actor3_4',
    'Actor3_5', 'Actor3_6', 'Actor3_7', 'Actor3_8',
    'Package1_1', 'Package1_2', 'Package1_3', 'Package1_4',
    'Package1_5', 'Package1_6', 'Package1_7', 'Package1_8',
    'Package2_1', 'Package2_2', 'Package2_3', 'Package2_4',
    'Package2_5', 'Package2_6', 'Package2_7', 'Package2_8'];
Window_FaceChoice.nameList = [
    'ハロルド', 'ブリジット', 'ダニエル', 'ジャネット',
    'バスコ', 'ベリンダ', 'クラウス', 'テレーゼ',
    'ヴィクトール', 'カロリーネ', 'ニコ', 'アマリア',
    'バルドメロ', 'イサドラ', 'ルキウス', 'ロザンナ',
    'エッツィオ', 'ポーラ', 'ジョゼフ', 'ユリアーネ',
    'サイモン', 'オリビア', 'ディルク', 'マーシャ',
    'アルド', 'ニナ', 'ロブ', 'ハヤテマル',
    'アイセル', 'ディララ', 'グスタフ', '夜一',
    'ソフィー', 'フリスト', 'アクジャ', 'フランツ',
    'オルハン', 'マリー', 'チムグ', 'B2'];

Window_FaceChoice.prototype.initialize = function(){
    var x = Graphics.width/2-this.windowWidth()/2;
    var y = Graphics.height/2-(144*3+18*2)/2+this.lineHeight();
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
    this.select(0);
    this.height = 144*3+this.standardPadding()*2;
    this.makeCaptionSprite();
    SceneManager._scene._active = false;
    this.activate();
    
}

Window_FaceChoice.prototype.windowWidth = function(){
    return 144*4+this.standardPadding()*2;
}

Window_FaceChoice.prototype.windowHeight = function(){
    return 144*2*Window_FaceChoice.FaceList.length+this.standardPadding()*2;
}

Window_FaceChoice.prototype.maxCols = function() {
    return 4;
};

Window_FaceChoice.prototype.maxItems = function() {
    return Window_FaceChoice.SVActorList.length;
};

Window_FaceChoice.prototype.spacing = function() {
    return 0;
};

Window_FaceChoice.prototype.itemHeight = function() {
    return 144;
};

Window_FaceChoice.prototype.drawItem = function(index){
    var rect = this.itemRect(index);
    var faceName = this.faceName(index);
    var faceIndex = index % 8;
    this.drawFace(faceName, faceIndex, rect.x, rect.y, rect.width, rect.height);
}

Window_FaceChoice.prototype.faceName = function(index){
    return Window_FaceChoice.FaceList[Math.floor(index/8)];
}

Window_FaceChoice.prototype.makeCaptionSprite = function(){
    var string = ('容姿を選んでください。')
    this._captionSprite = new Sprite_Caption(string, this.y);
    SceneManager._scene.addChild(this._captionSprite);
}

Window_FaceChoice.prototype.isOkEnabled = function() {
    return true;//this.isHandled('ok');
};

Window_FaceChoice.prototype.isTouchOkEnabled = function() {
    return true;//this.isOkEnabled();
};



Window_FaceChoice.prototype.callOkHandler = function() {
    var faceName = this.faceName(this.index());
    var actor = $gameActors.actor(10);
    for (var i=10; i<12; i++){
        $gameActors.actor(i).setFaceImage(faceName, this.index()%8);
        $gameActors.actor(i).setCharacterImage(faceName, this.index()%8);
        $gameActors.actor(i).setBattlerImage(Window_FaceChoice.SVActorList[this.index()]);
        $gameActors.actor(i).setName(Window_FaceChoice.nameList[this.index()]);
    }
    this.close();
    SceneManager._scene._active = true;
    $gamePlayer.refresh();
    $gameSwitches.setValue(1, true);
    Window_Selectable.prototype.callOkHandler.call(this);
    
};

Window_FaceChoice.prototype.close = function(){
    this._captionSprite.startDispose();
    Window_Base.prototype.close.call(this);
}

Window_FaceChoice.prototype.updateClose = function(){
    Window_Base.prototype.updateClose.call(this);
    if (this.isClosed()){
        this.dispose();
    }
}

//隠し通路に関するコード
var _Game_Player_executeMove = Game_Player.prototype.executeMove;
Game_Player.prototype.executeMove = function(direction) {
    var x = $gameMap.roundXWithDirection(this._x, direction);
    var y = $gameMap.roundYWithDirection(this._y, direction);
    if($gameMap.regionId(x, y) == 255){
        this._opacity = 0;
        this._followers.hide()
    }
    _Game_Player_executeMove.call(this, direction);
};

var _Game_Player_updateNonmoving = Game_Player.prototype.updateNonmoving
Game_Player.prototype.updateNonmoving = function(wasMoving) {
    _Game_Player_updateNonmoving.call(this, wasMoving);
    if(wasMoving){
        if($gameMap.regionId(this._x, this._y) == 254){
            this._followers.synchronize(this._x, this._y, this.direction())
            this._opacity = 255;
            this._followers.show()
        }
    }
};






//})();
