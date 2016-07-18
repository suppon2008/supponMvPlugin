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
var CalcWaitingTime = 20000;
//var RankingClass = [
//    '八級', '七級', '六級', '五級', '四級', '三級', '準二級', '二級', '準一級', '一級',
//    '初段', '二段', '三段', '四段', '五段', '六段', '七段', '八段', '九段', '皆伝'
//]

var RankingClass = [
    '八級', '七級', '六級', '五級', '四級', '三級', '準二級', '二級', '準一級', '一級',
    '初段', '二段', '三段', '四段', '五段', '六段', '七段', '八段', '九段', '十段'
]

var DifficultyText = ['','Normal', 'Hard', '', 'Super Hard']

//test4 = function(){
//    CalcManager.saveRanking();
//}
//
//test5 = function(){
//    CalcManager.loadRanking();
//}

var _Graphics_createAllElements = Graphics._createAllElements;
Graphics._createAllElements = function() {
    _Graphics_createAllElements.call(this);
    this._createMyFonts();//★
};

Graphics._createMyFonts = function(){
    this.loadFont('MyFont001', 'fonts/arialbd.ttf');
}

//起動時の処理
var _Scene_Boot_create = Scene_Boot.prototype.create;
Scene_Boot.prototype.create = function() {
    _Scene_Boot_create.call(this);
    //Score._currentScoreSprite = new Sprite_Score();
    //Score._currentScoreSprite.alpha = 0;
    CalcManager.initRankingData();
    CalcManager.loadRanking();
    //CalcManager._difficultySprite = new Sprite_Difficulty();
    //CalcManager._difficultySprite.alpha = 0;
};

//ニューゲーム時の処理
var _DataManager_setupNewGame = DataManager.setupNewGame;
DataManager.setupNewGame = function() {
    _DataManager_setupNewGame.call(this);
    Score._currentScoreSprite = new Sprite_Score();
    CalcManager._difficultySprite = new Sprite_Difficulty();
    //$gameVariables.setValue(101, CalcManager._rankingModeClass);
    //$gameSwitches.setValue(101, CalcManager.isRankingMode());
    $gameSwitches.setValue(111, $gameTemp.isPlaytest());
    CalcManager._rankPosition = 0;
};

var _BattleManager_onEncounter = BattleManager.onEncounter;
BattleManager.onEncounter = function() {
    if (CalcManager.isOn()){return};
    _BattleManager_onEncounter.call(this);
};

var _BattleManager_displayStartMessages = BattleManager.displayStartMessages;
BattleManager.displayStartMessages = function() {
    if (CalcManager.isOn()){return};
    _BattleManager_displayStartMessages.call(this);
};

var _BattleManager_actor = BattleManager.actor;
BattleManager.actor = function(){
    if (CalcManager.isOn()){return null};
    _BattleManager_isInputting.call(this);
};

var _BattleManager_update = BattleManager.update;
BattleManager.update = function(){
    _BattleManager_update.call(this);
    if (this._phase == 'calcTurn'){
        if (BattleManager._actionBattlers.length > 0){
            BattleManager.updateTurn();
        }
    }
}

var _BattleManager_endTurn = BattleManager.endTurn;
BattleManager.endTurn = function(){
    if(CalcManager.isOn()){
        this._phase = 'calcTurn';
    } else {_BattleManager_endTurn.call(this)} 
}

var _BattleManager_invokeAction = BattleManager.invokeAction;
BattleManager.invokeAction = function(subject, target){
    _BattleManager_invokeAction.call(this, subject, target);
}

var _BattleManager_processVictory = BattleManager.processVictory;
BattleManager.processVictory = function(){
    this.stopCalc();
    if(CalcManager.isRankingMode()){
        $gameParty.removeBattleStates();
        $gameParty.performVictory();
        this.playVictoryMe();
        this.replayBgmAndBgs();
        this.makeRewards();
        this.displayVictoryMessage();
        this.displayRewards();
        this.gainRewards();
        this.endBattle(0);
    } else {
        _BattleManager_processVictory.call(this);
    }
}
var _BattleManager_gainRewards = BattleManager.gainRewards;
BattleManager.gainRewards = function() {
    if(CalcManager.isRankingMode()){
        this.gainGold();
    } else {
        _BattleManager_gainRewards.call(this);
    }
};

//var _BattleManager_displayRewards = BattleManager.displayRewards;
//BattleManager.displayRewards = function() {
//    if(CalcManager.isRankingMode){return}
//    _BattleManager_displayRewards.call(this);
//};

var _BattleManager_processDefeat = BattleManager.processDefeat;
BattleManager.processDefeat = function(){
    if(CalcManager.isOn){
        this.stopCalc();
    }
    _BattleManager_processDefeat.call(this);
}

BattleManager.stopCalc = function(){
    ConfigManager.restoreKeyMapper();
    SceneManager._scene._calcInputWindow.visible = false;
    SceneManager._scene._calcInputWindow.deactivate();
    SceneManager._scene._calcInputDisplayWindow.visible = false;
    $gameParty.cancelCalcTarget();
}

var _StorageManager_localFilePath = StorageManager.localFilePath;
StorageManager.localFilePath = function(savefileId) {
    if(savefileId == -2){
        return this.localFileDirectoryPath() + 'ranking.rpgsave';
    }
    return _StorageManager_localFilePath.call(this,savefileId);
};

var _StorageManager_webStorageKey = StorageManager.webStorageKey;
StorageManager.webStorageKey = function(savefileId) {
    if(savefileId == -2){
        return 'RPG Ranking';
    }
    return _StorageManager_webStorageKey.call(this,savefileId);
};

function CalcManager() {
    throw new Error('This is a static class');
};

CalcManager._isOn = true;
//CalcManager._rankingModeClass = 0;
CalcManager._currentInput = '';
CalcManager._emptyAnswer = 0;
CalcManager._calcInputWindow = null;
CalcManager._calcInputDisplayWindow = null;
CalcManager._scene = null;
//CalcManager.WaitingTime = CalcWaitingTime;
CalcManager._rankingData = {};
CalcManager._rankPosition = 0;
//CalcManager._difficulty = 1;

CalcManager.difficulty = function(){
    return ($gameVariables.value(105) == 0 ? 1 : $gameVariables.value(105));
}

CalcManager.setDifficulty = function(difficulty){
    $gameVariables.setValue(105, difficulty);
}

CalcManager.initRankingData = function(){
    var floors = []
    for(var i=0; i < RankingClass.length+1; i++){
        floors.push(this.makeFloorData());
    }
    this._rankingData ={
        floors:floors,
        version:VERSION,
        difficulty:1
    }
    console.log(this._rankingData);
}

CalcManager.makeFloorData = function(){
    var floordatas = {
        played:false,
        cleared:0,
        playDatas:[]
    };
    return floordatas;
}

CalcManager.isOn = function(){
    return this._isOn;
};

CalcManager.isRankingMode = function(){
    return this.rankingModeClass() > 0;
}

CalcManager.rankingModeClass = function(){
    return $gameVariables.value(101);
}

CalcManager.saveRanking = function(){
    StorageManager.save(-2, JSON.stringify(this._rankingData));
}

CalcManager.loadRanking = function(){
    var json;
    var rankingData = {};
    try {
        json = StorageManager.load(-2);
    } catch (e) {
        console.log('nasi');
        console.error(e);
    }
    if (json) {
        console.log('Ranking data loaded')
        rankingData = JSON.parse(json);
        this.applyData(rankingData);
    }
    //this.applyData(rankingData);
}

CalcManager.applyData = function(rankingData){
    this._rankingData = rankingData;
//    if(rankingData.difficulty){
//        this._difficulty = rankingData.difficulty;
//    } else {this._difficulty = 1}
}

CalcManager.setupNewGame = function(){
    Score._currentScore = 0;
    Score._attackNumber = 0;
}

CalcManager.startBattle = function(){
    this._literalOrder = 0;
    this._reservedAction = 0;
    this._actionOrderOfActor = -1;
}

CalcManager.OjbOfRankingModeChoice = function(){
    var items = [];
    for(var i=0; i < RankingClass.length; i++){
        var text = RankingClass[i];
        if(!CalcManager._rankingData.floors[i+1]){
            console.log('new ranking data made');
            CalcManager._rankingData.floors[i+1] = CalcManager.makeFloorData();
        }
        if(CalcManager._rankingData.floors[i+1].cleared === 4){
            text += ' (Super Hard クリア済み)';
        } else if (CalcManager._rankingData.floors[i+1].cleared === 2){
            text += ' (Hard クリア済み)';
        } else if (CalcManager._rankingData.floors[i+1].cleared){
            text += ' (クリア済み)';
        }
        items.push(text);
    }
    var obj = {items:items, 
               variableId:101, 
               caption:'階級を選んでください。', 
              };

    return obj;
}



CalcManager.update = function(){
    if(BattleManager._phase == 'calcTurn'){
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
        if(!$gameTroop.isAllDead()){this.checkAnswer()}
        }
    else if (symbol === 'BS'){
        this._currentInput = 
            this._currentInput.substr(0, this._currentInput.length-1)
        } else if (symbol === '-'){
        if(this._currentInput[0] === '-'){
            this._currentInput = this._currentInput.slice(1);
        } else {
            this._currentInput = '-' + this._currentInput;
        }
    } else if (!isNaN(symbol)){
        if(this._currentInput.length > 10){
            SoundManager.playBuzzer();
        } else {
            SoundManager.playCursor();
            this._currentInput += symbol
        }
    };
    this._calcInputDisplayWindow.refresh(this._currentInput);
};

CalcManager.forcedRightAnswer = function(){
    var maxCalcWaiting = -1000000000;
    var bingoEnemy = null
    $gameTroop.aliveMembers().forEach(function(enemy){
        if (!enemy._isInputCalcLocked){
            if(maxCalcWaiting < enemy._calcWaiting){
                maxCalcWaiting = enemy._calcWaiting;
                bingoEnemy = enemy;
            }
        }
    },this)
    this.processRightAnswer(bingoEnemy)
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
    if (bingo){this.processRightAnswer(bingoEnemy)}
    else {
        this.checkEmptyAnswer();
        CalcManager.processWrongAnswer();
        this._currentInput = '';
    }
};

CalcManager.checkEmptyAnswer = function(){
    if(this._currentInput === ''){
        this._emptyAnswer++;
        if(this._emptyAnswer == 2){
            Score._attackNumber++;
            this._emptyAnswer = 0;
            $gameTroop.aliveMembers().forEach(function(enemy){
                enemy.resetFormula();
                enemy._hitBaseScore -= Math.ceil(CalcWaitingTime*2/3)
            })
        }
    }else {
        this._emptyAnswer = 0;
    }
}

CalcManager.processRightAnswer = function(enemy){
    SoundManager.playUseSkill();
    this.reserveActorAction(enemy);
    enemy.processRightAnswer();
    this._scene.popupJudgement('GOOD!!');
    this._currentInput = '';
}

CalcManager.processWrongAnswer = function(){
    SoundManager.playBuzzer();
    this._scene.popupJudgement('BAD!!');
    //this._currentInput = '';
    $gameTroop.aliveMembers().forEach(function(enemy){
        enemy._calcWaiting += Math.ceil(CalcWaitingTime/3);
    })
}

CalcManager.reserveActorAction = function(enemy){
    var actor = this.nextActor();
    if(!actor){return};
    actor._calcTarget = enemy;
    actor.addActions();
    actor._actions.forEach(function(action){
        action._targetIndex = enemy.index();
    })
    BattleManager._actionBattlers.push(actor);
}

CalcManager.nextActor = function(){
    var actor = null;
    var n = $gameParty.members().length;
    for (var i=0; i<n; i++){
        this._actionOrderOfActor++;
        actor = $gameParty.members()[this._actionOrderOfActor % n]
        if (actor.canMove()){
            this._actionOrderOfActor = actor.index();
            return actor;
        }
    }
    if (actor === null){
        BattleManager.processDefeat();
    }
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
    var datas = this._rankingData.floors[this.rankingModeClass()].playDatas;
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
        var flag = this._rankingData.floors[this.rankingModeClass()].cleared
        if(flag === true || flag === false){
            this._rankingData.floors[this.rankingModeClass()].cleared = this.difficulty();
        } else if (flag < this.difficulty()){
            this._rankingData.floors[this.rankingModeClass()].cleared = this.difficulty();
        }

    }
    if(datas.length > 1000){
        datas.length = 1000;
    }
    this._rankingData.difficulty = this.difficulty();
    this.saveRanking();
}

function Score() {
    throw new Error('This is a static class');
};

Score._currentScore = 0;
Score._currentScoreSprite = null;//new Sprite_Score();
Score.MaxHitScore = 100;
Score.MinHitScore = 10;
Score._popupScoreOn = true;
Score._attackNumber = 0;

Score.isPopupScoreOn = function(){
    return this._popupScoreOn;
}

Score.addScore = function(addPoint){
    //this._hitScore = (this._hitScore - this.agi).clamp(Score.MinHitScore, Score.MaxHitScore);
    //this._currentScore += addPoint.clamp(Score.MinHitScore, Score.MaxHitScore);
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

var _Scene_Base_terminate = Scene_Base.prototype.terminate;
Scene_Base.prototype.terminate = function() {
    _Scene_Base_terminate.call(this);
    if(this.children.contains(Score._currentScoreSprite)){
        this.removeChild(Score._currentScoreSprite);
    }
    if(this.children.contains(CalcManager._difficultySprite)){
        this.removeChild(CalcManager._difficultySprite);
    }
};

var _Scene_Title_drawGameTitle = Scene_Title.prototype.drawGameTitle;
Scene_Title.prototype.drawGameTitle = function(){
    _Scene_Title_drawGameTitle.call(this);
    this._gameTitleSprite.bitmap.fontSize = 24;
    this._gameTitleSprite.bitmap.outlineWidth = 2
    this._gameTitleSprite.bitmap.drawText(VERSION, 0, 0, Graphics.width, 24, 'left');
}

//var _Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
Scene_Title.prototype.createCommandWindow = function() {
    this._commandWindow = new Window_TitleCommand();
    this._commandWindow.setHandler('newGame',  this.commandNewGame.bind(this));
    this._commandWindow.setHandler('continue', this.commandContinue.bind(this));
    this._commandWindow.setHandler('options',  this.commandOptions.bind(this));
    //this._commandWindow.setHandler('rankingMode', this.commandRankingMode.bind(this));
    this.addWindow(this._commandWindow);
};

var _Scene_Title_commandNewGame = Scene_Title.prototype.commandNewGame;
Scene_Title.prototype.commandNewGame = function() {
    CalcManager.setupNewGame();
    _Scene_Title_commandNewGame.call(this);
};

//Scene_Title.prototype.commandNewGameX = function(){
//    var items = [];
//    var obj = {items:items,
//               caption:'こちらはまだ制作中です。段位認定試験を選択してください。', 
//              };
//
//    this._instantWindow = new Window_InstantCommand(obj);
//    this._instantWindow.setHandler('ok', this.cancelRankingSelect.bind(this));
//    this._instantWindow.setHandler('cancel', this.cancelRankingSelect.bind(this));
//}

//後で消す★
//Scene_Title.prototype.commandRankingMode = function(){
//    var items = [];
//    for(var i=0; i < RankingClass.length; i++){
//        var text = RankingClass[i];
//        if(!CalcManager._rankingData.floors[i+1]){
//            console.log('new ranking data made');
//            CalcManager._rankingData.floors[i+1] = CalcManager.makeFloorData();
//        }
//        if(CalcManager._rankingData.floors[i+1].cleared === 4){
//            text += ' (Super Hard クリア済み)';
//        } else if (CalcManager._rankingData.floors[i+1].cleared === 2){
//            text += ' (Hard クリア済み)';
//        } else if (CalcManager._rankingData.floors[i+1].cleared){
//            text += ' (クリア済み)';
//        }
//        items.push(text);
//    }
//    var obj = {items:items, 
//               variableId:1, 
//               caption:'階級を選んでください。', 
//              };
//
//    this._instantWindow = new Window_InstantCommand(obj);
//    //this._instantWindow.setHandler('ok', this.startRankingMode.bind(this));
//    //this._instantWindow.setHandler('cancel', this.cancelRankingSelect.bind(this));
//}

//Scene_Title.prototype.startRankingMode = function(){
//    CalcManager._rankingModeClass = $gameVariables.value(1);
//    //Scene_Title.prototype.commandNewGame.call(this);
//    this.commandNewGame();
//}

//Scene_Title.prototype.cancelRankingSelect = function(){
//    this._commandWindow.open();
//    this._commandWindow.activate();
//}

var _Scene_Map_start = Scene_Map.prototype.start;
Scene_Map.prototype.start = function() {
    _Scene_Map_start.call(this);
    var id = $gameMap.mapId();
    if (10 <= id && id <= 40){
        this.addChild(Score._currentScoreSprite);
        this.addChild(CalcManager._difficultySprite);
    }
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

var _Scene_Battle_start = Scene_Battle.prototype.start;
Scene_Battle.prototype.start = function(){
    _Scene_Battle_start.call(this);
    CalcManager.startBattle();
    CalcManager._scene = this;
};

var _Scene_Battle_createDisplayObjects = Scene_Battle.prototype.createDisplayObjects;
Scene_Battle.prototype.createDisplayObjects = function() {
    _Scene_Battle_createDisplayObjects.call(this);
    if(CalcManager.isRankingMode()){
        this.addChild(Score._currentScoreSprite);
        this.addChild(CalcManager._difficultySprite);
    }
};

var _Scene_Battle_createAllWindow = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function(){
    _Scene_Battle_createAllWindow.call(this);
    this.createCalcInputWindow();
    //this.createCalcInputDisplayWindow();
}

var _Scene_Battle_createStatusWindow = Scene_Battle.prototype.createStatusWindow;
Scene_Battle.prototype.createStatusWindow = function() {
    _Scene_Battle_createStatusWindow.call(this);
    this._statusWindow.visible = false;
    this._statusWindow.makeMiniGauge();
};

Scene_Battle.prototype.createCalcInputWindow = function(){
    this._calcInputWindow = new Window_CalcInput();
    this._calcInputWindow.deactivate();
    this._calcInputWindow.visible = false;
    this._calcInputDisplayWindow = new Window_CalcInputDisplay();
    this._calcInputDisplayWindow.visible = false;
    this._calcInputDisplayWindow.y = this._calcInputWindow.y;
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

var _Scene_Battle_commandFight = Scene_Battle.prototype.commandFight;
Scene_Battle.prototype.commandFight = function(){
    if (CalcManager.isOn()){
        this._statusWindow.visible = false;
        this.startCalcTurn();
        this._calcInputWindow.visible = true;
        this._calcInputDisplayWindow.visible = true;
        ConfigManager.keyRemapForCalc();
        Input._latestButton = 'null';
        this._calcInputWindow.activate();
        $gameParty.clearActions();
        $gameTroop.clearActions();
    } else {
        _Scene_Battle_commandFight.call(this);
    }
};

Scene_Battle.prototype.startCalcTurn = function(){
    $gameTroop.makeFormula();
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
    //sprite.x = x + this._calcInputDisplayWindow.width/2;
    //sprite.y = y + this._calcInputDisplayWindow.height*2;
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
    //this.createWindowLayer();
    //this.createDummyWindow();
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
    bitmap.fontSize = 48;
    var text = RankingClass[CalcManager.rankingModeClass()-1] + '  順位表'
    bitmap.drawText(text, 0, 0, width, height, 'center')
    return bitmap;
}

Scene_RankingResult.prototype.headerBitmap = function(){
    var width = Graphics.width;
    var height = 32;
    var bitmap = new Bitmap(width, height);
    bitmap.textColor = '#2e9393';
    bitmap.fontSize = 28;
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
    bitmap.textColor = '#c7ff90';
    bitmap.fontSize = 28;
    var number = CalcManager._rankingData.floors[CalcManager.rankingModeClass()].playDatas.length;
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
        var data = CalcManager._rankingData.floors[CalcManager.rankingModeClass()].playDatas[i];
        if(!data){break};
        if(i==10 && CalcManager._rankPosition < 11){
            break
        } else if (i==10 && CalcManager._rankPosition > 10){
            var r = CalcManager._rankPosition - 1;
            data = CalcManager._rankingData.floors[CalcManager.rankingModeClass()].playDatas[r];
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
//        if(i==10){
//            difficulty = CalcManager._difficulty;
//        } else {
//            if (data.difficulty){
//                difficulty = data.difficulty;
//            } else {
//                difficulty = 1;
//            }
//        }
        if (data.difficulty){
            difficulty = data.difficulty;
        }
        switch(difficulty){
            case 2:
                var difficulty = 'Hard';
                break;
            case 4:
                var difficulty = 'Super Hard';
                break;
            default:
                var difficulty = '';
                break;
        }
        bitmap.drawText(difficulty, width*5/6, 0, width/7, height, 'center');
        if(rank == CalcManager._rankPosition){
            bitmap.drawText('あなた→', width*0/6, 2, width/6, height, 'center');
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

//Scene_RankingResult.prototype.createDummyWindow = function() {
//    var items = [];
//    var obj = {items:items,
//               caption:'あなたの順位は'+CalcManager._rankPosition+'位です。',
//              };
//    this._dummyWindow = new Window_InstantCommand(obj)
//    this._dummyWindow.setHandler('ok',     this.goToNextScene.bind(this));
//    this._dummyWindow.setHandler('cancel', this.goToNextScene.bind(this));
//    this.addWindow(this._dummyWindow);
//};


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
//    this._screenFlashDuration = duration;
//    if (this._screenFlashSprite) {
//        this._screenFlashSprite.setColor(color[0], color[1], color[2]);
//        this._screenFlashSprite.opacity = color[3];
//    }
};

var _Sprite_Battler_updateMain = Sprite_Battler.prototype.updateMain;
Sprite_Battler.prototype.updateMain = function() {
    if (!CalcManager.isOn()){
        _Sprite_Battler_updateMain.call(this);
        return;
    }
    if (this._battler.isSpriteVisible()) {
        this.updateBitmap();
        this.updateFrame();
        this.updateFormula();
    }
    this.updateMove();
    this.updatePosition();
};

Sprite_Battler.prototype.updateFormula = function(){
    if (this._battler._formulaHitEffectRequested){
        //this.hideFormulaSprite();
        this.hitEffectFormula();
        this._battler._formulaHitEffectRequested = false;
    }
    if (this._battler._makeFormulaRequested){
        this._battler._formula.makeFormula();
        this.makeFormulaSprite();
        this._battler._makeFormulaRequested = false;
        this._battler._isInputCalcLocked = false;
    }
    if (this._battler._resetFormulaRequested){
        this._battler._formula.makeFormula();
        this.resetEffectFormula();
        this._battler._resetFormulaRequested = false;
        this.makeFormulaSprite();
    }
//        if (this._battler._formulaHitEffectRequested){
//            //this.hideFormulaSprite();
//            this.hitEffectFormula();
//            this._battler._formulaHitEffectRequested = false;
//        }
}

Sprite_Battler.prototype.makeFormulaSprite = function(){
    var sprite = new Sprite_Formula();
    var string = this._battler._formula._formulaString;
    sprite.setFormulaString(string);
    this._formulaSprite = sprite;
    this._formulaSprite._battler = this._battler;
    sprite.x = this.x;
    sprite.y = this.y - 16;
    this.parent.addChild(sprite);
}

Sprite_Battler.prototype.hitEffectFormula = function(){
    this._formulaSprite.startHitEffect();
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
    
//    actor._homeX = 648 + index * 32 + index*32*3/(1+length);
//    actor._homeY = 280 + index * 48 + index*48*3/(1+length);
    //this.setHome(600 + index * 32, 280 + index * 48);
};

var _Sprite_Enemy_initialize = Sprite_Enemy.prototype.initialize;
Sprite_Enemy.prototype.initialize = function(battler) {
    _Sprite_Enemy_initialize.call(this, battler);
    this._nameLabel = new Sprite_EnemyNameLabel(this._battler);
    this.addChild(this._nameLabel);
};

//var _Sprite_Enemy_initMembers = Sprite_Enemy.prototype.initMembers;
//Sprite_Enemy.prototype.initMembers = function() {
//    _Sprite_Enemy_initMembers.call(this);
//    this._nameLabel.scale.x /= this.scale.x;
//    this._nameLabel.scale.y /= this.scale.y;
//};




var _Sprite_Damage_setup = Sprite_Damage.prototype.setup;
Sprite_Damage.prototype.setup = function(target) {
    if(target.result().hpAffected){
        console.log('Damage = ', target.result().hpDamage);
    }
    if(Score.isPopupScoreOn()){
        var result = target.result();
        if(target.isEnemy() && result.hpDamage>0){
            this._duration = 180;
            this.createDigits(0, target._popupScore)
            Score._attackNumber++;
            Score.addScore(target._popupScore);
            target._popupScore = 0;
        }
    } else {
        _Sprite_Damage_setup.call(this);
    }
};

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
        _Sprite_Damage_updateChild.call(this);
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
    var width = 300
    bitmap.fontSize = 32;
    var height = bitmap.fontSize+10;
    bitmap.resize(width, height);
    bitmap.outlineColor = 'rgba(0, 0, 0, 1)';
    bitmap.outlineWidth = 6;
    bitmap.fontFace = 'MyFont001';
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
    bitmap.fontSize = 32;
    var height = bitmap.fontSize;
    bitmap.resize(width, height);
    bitmap.outlineColor = 'rgba(0, 0, 0, 1)';
    bitmap.outlineWidth = 6;
    bitmap.fontFace = 'MyFont001';
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
    bitmap.fontSize = 20;
    var height = bitmap.fontSize;
    bitmap.resize(width, height);
    bitmap.outlineColor = 'rgba(0, 0, 0, 1)';
    bitmap.outlineWidth = 6;
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
        //this.updateHitEffect();
        return;
    }
    if (this._battler.isDead()){this.dispose()};
}

Sprite_EnemyNameLabel.prototype.updateDisappear = function(){
    if (-this._effectDuration*1.5 < -this.height){
        this.dispose();
        return;
    }
    this.setFrame(0,-this._effectDuration*1.5,this.width,this.height);
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
}

Sprite_Formula.prototype.setFormulaString = function(string){
    var bitmap = new Bitmap(1,1);
    var width = bitmap.measureTextWidth(string)+16;
    bitmap.fontSize = 32;
    var height = bitmap.fontSize;
    bitmap.resize(width, height);
    bitmap.fontFace = 'MyFont001';
    bitmap.outlineColor = 'rgba(0, 0, 0, 1)';
    bitmap.outlineWidth = 6;
    bitmap.drawText(string, 0, 0, width, height, 'center');
    this.width = bitmap.width;
    this.height = bitmap.height;
    this.bitmap = bitmap;
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.startAppearEffect();
}

Sprite_Formula.prototype.startAppearEffect = function(){
    this._effectDuration = 0;
    this._effectType = 'appear';
    this.setFrame(0,-this.height,this.width,this.height);
}

Sprite_Formula.prototype.startHitEffect = function(){
    this._effectDuration = 0;
    this._effectType = 'hit';
    this._baseY = this.y - 100;
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
    var frameY = this._effectDuration*3 - this.height
    if (frameY > 0){
        frameY = 0;
        this._effectType = '';
    }
    this.setFrame(0,frameY,this.width,this.height);
    this._effectDuration++;
}

Sprite_Formula.prototype.updateDisappearEffect = function(){
    var frameY = -this._effectDuration*3
    if (frameY < -this.height){
        this.dispose();
    }
    this.setFrame(0,frameY,this.width,this.height);
    this._effectDuration++;
}

Sprite_Formula.prototype.updateHitEffect = function(){
    this._effectDuration++;
    var d = 10 - this._effectDuration*0.7;
    this.rotation += 0.3;
    this.x -= 7;
    this.y = this._baseY + (d * d)
    if (this._effectDuration > 100) {
        this.dispose();
    }
}

Sprite_Formula.prototype.updateColorTone = function(){
    var g = 2*this._battler._calcWaiting/CalcWaitingTime;
    if (g < 0.5){
        this.setColorTone([0, 0, 0, 0]);
    } else if (g < 1.5){
        g = (g-0.5)*255;
        this.setColorTone([0, -g, -g, 0]);
    } else {
        this._blinking *= -1;
        var b = this._blinking;
        this.setColorTone([0, -(1-b)*255, -(1-b)*255, 0]);
    }
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
    bitmap.fontSize = 60;
    bitmap.outlineWidth = 8;
    bitmap.fontFace = 'MyFont001';
    bitmap.resize(bitmap.measureTextWidth(judgement), bitmap.fontSize)
    if(judgement == 'GOOD!!'){
        bitmap.textColor = '#99FF33';
    } else {
        bitmap.textColor = '#FF0000';
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
    bitmap.textColor = '#000000';
    bitmap.fontSize = 40;
    bitmap.outlineColor = 'rgb(51, 51, 51)';
    bitmap.outlineWidth = 3;
    bitmap.drawText('認定証', this._padding, this._nextY, this.width-this._padding*2, 32, 'center');
    this._nextY += bitmap.fontSize + 20
}

Sprite_Certificate.prototype.drawRank = function(){
    var bitmap = this.bitmap;
    bitmap.textColor = '#000000';
    bitmap.fontSize = 40;
    bitmap.outlineColor = 'rgb(51, 51, 51)';
    bitmap.outlineWidth = 3;
    var text = RankingClass[CalcManager.rankingModeClass()-1]
    bitmap.drawText(text, this._padding, this._nextY, this.width-this._padding*2, 32, 'center');
    this._nextY += bitmap.fontSize + 10
}

Sprite_Certificate.prototype.drawName = function(){
    var bitmap = this.bitmap;
    bitmap.textColor = '#000000';
    bitmap.fontSize = 24;
    bitmap.outlineColor = 'rgb(51, 51, 51)';
    bitmap.outlineWidth = 1;
    var name = $gameParty.members()[0].name() + ' 殿';
    bitmap.fontItalic = true;
    bitmap.drawText(name, this._padding, this._nextY, this.width-this._padding*2, 32, 'left');
    bitmap.fontItalic = false;
    this._nextY += bitmap.fontSize + 30;
}

Sprite_Certificate.prototype.drawContent = function(){
    var bitmap = this.bitmap;
    bitmap.textColor = '#000000';
    bitmap.fontSize = 24;
    bitmap.outlineColor = 'rgb(51, 51, 51)';
    var text = '  貴殿の頑張りに免じて'
    bitmap.drawText(text, this._padding, this._nextY, this.width-this._padding*2, 32, 'left');
    this._nextY += bitmap.fontSize + 10
    var text = '頭書の資格を認定しちゃおう。'
    bitmap.drawText(text, this._padding, this._nextY, this.width-this._padding*2, 32, 'left');
    this._nextY += bitmap.fontSize*2 + 10
}

Sprite_Certificate.prototype.drawDate = function(){
    var bitmap = this.bitmap;
    bitmap.textColor = '#000000';
    bitmap.fontSize = 24;
    bitmap.outlineColor = 'rgb(51, 51, 51)';
    var date = new Date();
    var dates = date.getFullYear() + '年 ';
    dates += (date.getMonth()+1) + '月 ';
    dates += date.getDate() + '日 ' ;
    bitmap.drawText(dates, this._padding, this._nextY, this.width-this._padding*2, 32, 'left');
    this._nextY += bitmap.fontSize + 10
}

Sprite_Certificate.prototype.drawDifficulty = function(){
    var bitmap = this.bitmap;
    bitmap.textColor = '#000000';
    bitmap.fontSize = 24;
    bitmap.outlineColor = 'rgb(51, 51, 51)';
    var text = '難易度 : '+DifficultyText[CalcManager.difficulty()];
    bitmap.drawText(text, this._padding, this._nextY, this.width-this._padding*2, 32, 'left');
    this._nextY += bitmap.fontSize + 10
}


Sprite_Certificate.prototype.drawScore = function(){
    var bitmap = this.bitmap;
    bitmap.textColor = '#000000';
    bitmap.fontSize = 24;
    bitmap.outlineColor = 'rgb(51, 51, 51)';
    var score = '得点 ' +Score._currentScore.toString();
    bitmap.drawText(score, this._padding, this._nextY, this.width-this._padding*2, 32, 'left');
    this._nextY += bitmap.fontSize + 10
}

Sprite_Certificate.prototype.drawScoreRate = function(){
    var bitmap = this.bitmap;
    bitmap.textColor = '#000000';
    bitmap.fontSize = 24;
    bitmap.outlineColor = 'rgb(51, 51, 51)';
    var score = '得点率 ' +Score.scoreRate().toFixed(2).toString() + ' %';
    bitmap.drawText(score, this._padding, this._nextY, this.width-this._padding*2, 32, 'left');
    this._nextY += bitmap.fontSize + 10
}


Sprite_Certificate.prototype.drawAssociation = function(){
    var bitmap = this.bitmap;
    bitmap.textColor = '#000000';
    bitmap.fontSize = 18;
    bitmap.outlineColor = 'rgb(51, 51, 51)';
    var text = 'カルドラ段位認定協会';
    bitmap.drawText(text, this._padding, this._nextY, this.width-this._padding*2, 32, 'center');
    this._nextY += bitmap.fontSize + 10;
}

Sprite_Certificate.prototype.drawSignature = function(){
    var bitmap = this.bitmap;
    bitmap.textColor = '#000000';
    bitmap.fontSize = 24;
    bitmap.outlineColor = 'rgb(51, 51, 51)';
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

//Sprite_StandOut.prototype.initialize = function(bitmap){
//    Sprite_Base.prototype.initialize.call(this,bitmap);
//    
//}

Sprite_StandOut.prototype.update = function(){
    Sprite.prototype.update.call(this);
    if(Graphics.frameCount % 5 == 0){
        this.setColorTone([rand(255), rand(255), rand(255), 0]);
    }
}



var _Game_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId){
    for(i=1; i<101; i++){
        $gameSwitches.setValue(i, false);
    }
    Score._currentScoreSprite.alpha = (CalcManager.isRankingMode()? 1 : 0);
    CalcManager._difficultySprite.alpha = (CalcManager.isRankingMode()? 1 : 0);
    _Game_Map_setup.call(this, mapId);
}

var _Game_Map_displayName = Game_Map.prototype.displayName;
Game_Map.prototype.displayName = function() {
    if (this.mapId()==42){
        var name = $gameActors.actor(10).name();
        return (name +'の家 ハウスレベル '+$gameVariables.value(104));
    }
    return _Game_Map_displayName.call(this);
};

var _Game_BattlerBase_attackSkillId = Game_BattlerBase.prototype.attackSkillId;
Game_BattlerBase.prototype.attackSkillId = function() {
    if (CalcManager.isRankingMode()){
        return 11;
    } else {
        return _Game_BattlerBase_attackSkillId.call(this);
    }
    
};

var _Game_Battler_initMembers = Game_Battler.prototype.initMembers
Game_Battler.prototype.initMembers = function(){
    _Game_Battler_initMembers.call(this);
    this._makeFormulaRequested = false;
    this._formula = null;
    this._isInputCalcLocked = false;
    this._formulaHitEffectRequested = false;
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

Game_Actor.prototype.addActions = function(){
    Game_Battler.prototype.addActions.call(this);
    this.makeAutoBattleActions();
    this._actions.forEach(function(action){
        action._calcLinkedEnemy = this._calcTarget;
    },this)
}

var _Game_Actor_makeAutoBattleActions = Game_Actor.prototype.makeAutoBattleActions;
Game_Actor.prototype.makeAutoBattleActions = function(){
    if (CalcManager.isRankingMode){
        var action = new Game_Action(this);
        action.setAttack();
        this.setAction(0, action);
    }
}


var _Game_Actor_removeCurrentAction = Game_Actor.prototype.removeCurrentAction;
Game_Actor.prototype.removeCurrentAction = function(){
    if(!CalcManager.isOn()){
        _Game_Actor_removeCurrentAction.call(this);
        return;
    }
    var action = this._actions.shift();
    enemy = action._calcLinkedEnemy;
    if(enemy.isAlive() && enemy._isInputCalcLocked){
        enemy.makeFormula();
    }
}

Game_Actor.prototype.cancelCalcTarget = function(){
    this._calcTarget = null;
    this._sprite = null;
}

var _Game_Enemy_setup = Game_Enemy.prototype.setup;
Game_Enemy.prototype.setup = function(enemyId, x, y) {
    _Game_Enemy_setup.call(this, enemyId, x, y);
    this._hitBaseScore = CalcWaitingTime;
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

Game_Enemy.prototype.processRightAnswer = function(){
    //Score.addScore(this._hitScore);
    if(this._hitBaseScore < 0){
        this._hitBaseScore = 0;
    }
    var score = Math.ceil((this._hitBaseScore/CalcWaitingTime)*100)
    this._popupScore = score.clamp(Score.MinHitScore, Score.MaxHitScore);
    this._hitBaseScore = CalcWaitingTime;
    this._calcWaiting = 0;
    this._isInputCalcLocked = true;
    //this.makeFormula();
    this._formulaHitEffectRequested = true;
}

Game_Enemy.prototype.countCalcWaiting = function(){
    this._calcWaiting += this.agi*CalcManager.difficulty();
    this._hitBaseScore -= this.agi;
    if(this._calcWaiting > CalcWaitingTime){
        this.addActions()
        this._calcWaiting -= CalcWaitingTime;
    }
}

Game_Enemy.prototype.resetFormula = function(){
    this._formula._counter = 0;
    if(!this._isInputCalcLocked){
        this._resetFormulaRequested = true;
    }
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

Game_Troop.prototype.countCalcWaiting = function(){
    this.aliveMembers().forEach(function(enemy){
        if(!enemy._isInputCalcLocked){
            enemy.countCalcWaiting();
        }
    })
}

var _Game_Troop_goldTotal = Game_Troop.prototype.goldTotal;
Game_Troop.prototype.goldTotal = function() {
    if (CalcManager.isRankingMode()){
        var gold = _Game_Troop_goldTotal.call(this)*2;
        return Math.round(gold * CalcManager.difficulty() * CalcManager.difficulty());
    } else {return _Game_Troop_goldTotal.call(this)}
};

Game_Party.prototype.cancelCalcTarget = function(){
    this.members().forEach(function(actor){
        actor.cancelCalcTarget();
    });
}

function Calc_Formula() {
    this.initialize.apply(this, arguments);
}

Calc_Formula.prototype.initialize = function(battler){
    this._battler = battler;
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
    if (battler.isEnemy()){
        this._script0 = $dataEnemies[battler._enemyId].meta.calc0;
        this._scripts = $dataEnemies[battler._enemyId].meta.calc.split('yield');
        eval(this._script0);
    }
};

Calc_Formula.prototype.makeFormula = function(){
    var l = this._l;
    var la = this._la;
    var v = this._v
    //var yieldObject = {};
    var string = this._scripts[this._counter % this._scripts.length];
    string += 'var yieldObject = {a:ans, s:str, v:v, l:l, la:la}'
    eval(string);
    this._answer = yieldObject.a;
    this._formulaString = yieldObject.s;
    this._l = yieldObject.l;
    this._la = yieldObject.la;
    this._v = yieldObject.v;
    this._counter++;
}

Window_TitleCommand.prototype.makeCommandList = function() {
    this.addCommand(TextManager.newGame,   'newGame');
    this.addCommand(TextManager.continue_, 'continue', this.isContinueEnabled());
//    this.addCommand('段位認定試験', 'rankingMode');
//    this.addCommand(TextManager.options,   'options');
    
    //this.addCommand('段位認定試験', 'rankingMode');
    this.addCommand(TextManager.options,   'options');

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
     '0', '-', 'BS','', '', ''];

Window_CalcInput.prototype.initialize = function(){
    var x = 0;
    //var y = 0;
    var width = 400;
    var height = this.windowHeight();
    var y = Graphics.height - height;
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._index = 7;
    this.refresh();
    this.updateCursor();
    //this.activate();
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

Window_CalcInput.prototype.windowHeight = function() {
    return this.fittingHeight(this.numVisibleRows());
};

Window_CalcInput.prototype.numVisibleRows = function() {
    return Math.ceil(this.maxItems() / this.maxCols());
};

Window_CalcInput.prototype.itemRect = function(index){
    if (this.isEnterIndex(index)){
        index = 3;
    };
    var rect = Window_Selectable.prototype.itemRect.call(this, index);
    if (index === 3) {rect = this.enterRect(rect)};
    return rect;
};

Window_CalcInput.prototype.isEnterIndex = function(index){
    return [4, 5, 9, 10, 11, 15, 16, 17, 21, 22, 23].contains(index);
};

Window_CalcInput.prototype.drawItem = function(index){
    this.drawItemRect(index);
    //if (index % 6 - 3 > 0){return};
    var rect = this.itemRectForText(index);
    this.drawText(Window_CalcInput.ITEM[index], rect.x, rect.y, rect.width, 'center');
};

Window_CalcInput.prototype.drawItemRect = function(index) {
//        if ([4, 5, 9, 10, 11, 15, 16, 17, 21, 22, 23].contains(index)){
//            return
//        };
    var rect = this.itemRect(index);
    if (index === 3) {rect = this.enterRect(rect)};
    //var color = this.getRectColor(index);
    switch(CalcManager.difficulty()){
        case 2:
            var color = '#6f0303';
            break;
        case 4:
            var color = '#265c04';
            break;
        default:
            var color = '#534208';
            break;
    }
//        if (index === 3){
//            this.drawRect(rect.x+1, rect.y+1, rect.width*3-2, rect.height*4-2, color);
//        }
    if (this.isEnterIndex(index)){return};
    this.drawRect(rect.x+1, rect.y+1, rect.width-2, rect.height-2, color);
};

Window_CalcInput.prototype.drawRect = function(dx, dy, dw, dh, color) {
    this.changePaintOpacity(false);
    this.contents.fillRect(dx, dy, dw, dh, color);
    this.changePaintOpacity(true);
};

Window_CalcInput.prototype.cursorRight = function(wrap){
    switch(this.index()){
        case 3:
            this.select(0);
            break;
        case 9:
            this.select(6);
            break;
        case 15:
            this.select(12);
            break;
        case 21:
            this.select(18);
            break;
        default:
            Window_Selectable.prototype.cursorRight.call(this, wrap);
            break;
    }
}

Window_CalcInput.prototype.cursorLeft = function(wrap){
    switch(this.index()){
        case 0:
            this.select(3);
            break;
        case 6:
            this.select(9);
            break;
        case 12:
            this.select(15);
            break;
        case 18:
            this.select(21);
            break;
        default:
            Window_Selectable.prototype.cursorLeft.call(this, wrap);
            break;
    }
}


Window_CalcInput.prototype.callOkHandler = function(){
    var symbol = Window_CalcInput.ITEM[this._index];
    if (this.isEnterIndex(this._index)){
        symbol = 'Enter';
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
                this._flickStartX = x;
                this._flickStartY = y;
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

//Window_CalcInput.prototype.update = function(){
//    this.processQuickEnter();
//    this.processFlick();
//    Window_Selectable.prototype.update.call(this);
//    this.processNumKey();
//    this.processByGamepad();
//}

Window_CalcInput.prototype.update = function(){
    if (this.active){
        this.processQuickEnter();
        this.processFlick();
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

Window_CalcInput.prototype.processFlick = function(){
    if (this._touchPressed && TouchInput.isReleased()){
        this._touchPressed = false;
        var x1 = this._flickStartX;
        var y1 = this._flickStartY;
        var x2 = this.canvasToLocalX(TouchInput.x);
        var y2 = this.canvasToLocalY(TouchInput.y);
        var length = Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
        if (length > 40){
            CalcManager.input('Enter');
        }
    }
}

Window_CalcInput.prototype.processByGamepad = function(){
    if (Input.isTriggered('pageup')){
        CalcManager.input('0');
    } else if (Input.isTriggered('pagedown')){
        CalcManager.input('Enter');
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
    var x = 400;
    var y = 0;
    var width = 400;
    var height = this.lineHeight();
    Window_Base.prototype.initialize.call(this, x, y, width, height*2);
    this.refresh();
    //this.updateCursor();
    this.deactivate();
};

Window_CalcInputDisplay.prototype.refresh = function(string){
    this.contents.clear();
    this.contents.fontFace = 'MyFont001';
    this.contents.outlineColor = 'rgba(0, 0, 0, 1)';
    this.contents.outlineWidth = 6;
    this.drawText(string, 6, 0, this.width-36, 'left');
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

var _Window_BattleStatus_initialize = Window_BattleStatus.prototype.initialize;
Window_BattleStatus.prototype.initialize = function(){
    this._miniGauges = [];
    _Window_BattleStatus_initialize.call(this);
    //this.addChild(miniGauge);
}

var _Window_BattleStatus_refresh = Window_BattleStatus.prototype.refresh;
Window_BattleStatus.prototype.refresh = function(){
    _Window_BattleStatus_refresh.call(this);
    if(!this._miniGauges.length==0){
        this._miniGauges.forEach(function(w){
            w.refresh();
        })
    }
}

Window_BattleStatus.prototype.makeMiniGauge = function(){
    $gameParty.members().forEach(function(actor){
        this._miniGauges.push(new Window_MiniGauge(actor));
    },this)
}

var _Window_BattleLog_initialize = Window_BattleLog.prototype.initialize;
Window_BattleLog.prototype.initialize = function() {
    _Window_BattleLog_initialize.call(this);
    this.visible = false;
};

var _Window_BattleLog_startAction = Window_BattleLog.prototype.startAction;
Window_BattleLog.prototype.startAction = function(subject, action, targets) {
    if (!CalcManager.isRankingMode){
        _Window_BattleLog_startAction.call(this, subject, action, targets);
        return;
    }
    var item = action.item();
    var id = item.animationId;
    if(subject.isEnemy() && item.id === 11){
    //if(subject.isEnemy()){
        if(subject.enemy().meta.AttackAnimationId){
            var id = subject.enemy().meta.AttackAnimationId;
        }
    }
    var item = action.item();
    this.push('performActionStart', subject, action);
    this.push('waitForMovement');
    this.push('performAction', subject, action);
    this.push('showAnimation', subject, targets.clone(), id);
    this.displayAction(subject, item);
};

function Window_MiniGauge(){
    this.initialize.apply(this,arguments);
}

Window_MiniGauge.prototype = Object.create(Window_Base.prototype);
Window_MiniGauge.prototype.constructor = Window_MiniGauge;

Window_MiniGauge.prototype.initialize = function(actor){
    Window_Base.prototype.initialize.call(this, 0, 0, 120, 100)
    this._actor = actor;
    this.padding = 0;
    this.margin = 0;
    this._windowFrameSprite.visible = false;
    this._windowBackSprite.visible = false;
    this.refresh();
    actor._sprite.addChild(this);
    this.x = 30;
    this.y = -40;
}

Window_MiniGauge.prototype.refresh = function(){
    if(this.contents){
        this.contents.clear();
        this.drawItem();
    }
}

Window_MiniGauge.prototype.drawItem = function(){
    this.drawActorHp(this._actor, 0, 0, this.contentsWidth());
}

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
    for (i=10; i<12; i++){
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








//Window_MiniGauge.prototype.initialize = function(actor){
////    var x = actor._homeX+20;
////    var y = actor._homeY;
//    var width = 100;
//    var height = 10;
//    this._actor = actor; 
//    Window_Base.prototype.initialize.call(this, 0, 0, width, height);
//    this.padding = 0;
//    this.margin = 0;
//    this.contents.resize(100,10);
//    this._windowFrameSprite.visible = false;
//    this._windowBackSprite.visible = false;
//    this.refresh();
//    actor._sprite.addChild(this);
//    this.x = 30;
//    this.y = -10;
//    //SceneManager._scene._windowLayer.addChild(this);
//}
//
//Window_MiniGauge.prototype.gaugeWidth = function(){
//    return this.width - 48//this.padding*2
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
//    this.drawTpGauge();
//    this.drawMpGauge();
//    this.drawHpGauge();
////        var c1 = this.hpGaugeColor1();
////        var c2 = this.hpGaugeColor2();
////        var actor = $gameParty.members()[0];
////        this.drawGauge(0, 0, 100, actor.hpRate(), c1, c2);
//}
//
//Window_MiniGauge.prototype.drawHpGauge = function(){
//    var color1 = this.hpGaugeColor1();
//    var color2 = this.hpGaugeColor2();
//    this.drawGauge(0,0,this.gaugeWidth(),this._actor.hpRate(),color1,color2);
//}
//
//Window_MiniGauge.prototype.drawMpGauge = function(){
//    var color1 = this.mpGaugeColor1();
//    var color2 = this.mpGaugeColor2();
//    this.drawGauge(0,2,this.gaugeWidth(),this._actor.mpRate(),color1,color2);
//}
//
//Window_MiniGauge.prototype.drawTpGauge = function(){
//    var color1 = this.tpGaugeColor1();
//    var color2 = this.tpGaugeColor2();
//    this.drawGauge(0,4,this.gaugeWidth(),this._actor.tpRate(),color1,color2);
//}
//
//Window_MiniGauge.prototype.drawGauge = function(x, y, width, rate, color1, color2) {
//    var fillW = Math.floor(width * rate);
//    this.contents.fillRect(x, y, width, 6, this.gaugeBackColor());
//    this.contents.gradientFillRect(x, y, fillW, 6, color1, color2);
//};




//隠し通路に関するコード
var _Game_Player_executeMove = Game_Player.prototype.executeMove;
Game_Player.prototype.executeMove = function(direction) {
    var x = $gameMap.roundXWithDirection(this._x, direction);
    var y = $gameMap.roundYWithDirection(this._y, direction);
    if($gameMap.regionId(x, y) == 255){
        this._opacity = 0;
    }
    _Game_Player_executeMove.call(this, direction);
};

var _Game_Player_updateNonmoving = Game_Player.prototype.updateNonmoving
Game_Player.prototype.updateNonmoving = function(wasMoving) {
    _Game_Player_updateNonmoving.call(this, wasMoving);
    if(wasMoving){
        if($gameMap.regionId(this._x, this._y) == 254){
            this._opacity = 255;
        }
    }
};
    
//})();
