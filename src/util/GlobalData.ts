/**
 * Created by Sunday on 5/9/15.
 * 全局数据存储
 */
module GlobalData {
    /*********************分数全局变量**********************/
    //音乐开关
    export var music:boolean = false;

    /*********************分数全局变量**********************/
    //当前分数
    export var currentScore:number = 0;

    //最好分数
    export var bestScore:number = 0;

    /*********************计时类全局变量**********************/
    //使用时间
    export var useTime:number = 0;

    //剩余时间
    export var lastTime:number = 0;

    //当前时间
    export var currentTime:number = 0;

    //最好时间
    export var bestTime:number = 0;

    /*********************战斗类全局变量**********************/
    //我的当前血量
    export var myCurHP:number = 0;

    //我的最高血量
    export var myMaxHP:number = 0;

    /*********************其他全局变量**********************/
    //排行榜数据存储
    export var rankArr:Array<any> = [];

    /*********************自己的**********************/
    //自己名字
    export var myName:string = "";
    //自己头像
    export var myAvatar:string = "";


    export var myMaxHP:number = 5000;

    export var myCurHP:number = 5000;

    export var myStrength:number = 1000;

    export var aiMaxHP:number = 4000;

    export var aiCurHP:number = 4000;

    export var initIsVertical:boolean = false;

    export var isVerticalGame:boolean = false;	//是否是横屏游戏
}