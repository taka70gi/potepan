
$(document).ready(function(){
    let count1 =  0;
    let count2 =  0;
    let count3 =  0;
    let count4 =  0;
    let flg = false;
    let nowTime = 0;
    let startTime = 0;
    let millisec = 0;					// 1000分の1秒
    let sec100 = 0;					// 100分の1秒
    let sec = 0;						// 秒
    let min = 0;						// 分
    let hour = 0;
    let diff;
    var timerId;
    let addTime = 0;
    
    const start_button = document.getElementById('start');
    //ボタン活性
    start_button.disabled = false;
    
    const countUp = (count) =>{
    console.log(count++);
    return count++;
    }
    
    //スタートボタン
    $("#start").click(function() {
        //ボタン非活性
        start_button.disabled = true;
        
        //スタート時の時間取得（再度スタートが押されるまで更新しない）
        startTime = new Date().getTime();
        //時間計測　時間表示
        timerId = setInterval(() =>{
            runStopWatch();
        }, 100);
        
        //時間測定関数に入る前はaddTimeは0
        if(millisec !== 0)
        {
            //時間計測後は差分をスタート時間から引き算
            addTime = (hour*60*60*1000 + min*60*1000 + sec * 1000 + millisec);
        }
        
        startTime -= addTime;
    });
    $("#stop").click(function() {
        clearInterval(timerId); 
        
        //ボタン活性
        start_button.disabled = false;
    });
  
    $("#reset").click(function() {
        $(".timer").text("0:0:0:0");
        clearInterval(timerId); 
        startTime = 0;
        addTime = 0;
        millisec = 0;
        sec100 = 0;
        sec = 0;
        min = 0;
        hour = 0;
        
        //ボタン活性
        start_button.disabled = false;
    });

    function runStopWatch(){
        	// スタートからの差分をとる
        	nowTime = new Date().getTime();
        	diff = new Date(nowTime - startTime);
        	// ミリ秒、100分の1秒、秒、分、時を設定
        	millisec = diff.getMilliseconds();
        	sec100 = Math.floor(millisec / 10);
        	sec = diff.getSeconds();
        	min = diff.getMinutes();
            hour = diff.getHours() - 9;
        	drawTime();			// 時間表示
        }
        function drawTime(){
        	var strTime = "";
        	var strSec100, strSec, strSec1, strSec2, strMin, strHour;
        
        	// 数値を文字に変換及び2桁表示設定
        	strSec100 = "" + sec100;
        	strSec100 = strSec100.slice(0,1);
        	
        	strSec = "" + sec;
        	if ( strSec.length < 2){
        		strSec = "0" + strSec;
        	}
        	strSec1 = strSec.slice(0,1);
        	strSec2 = strSec.slice(1,2);
        	
        	strMin = "" + min;
        	
        	// 表示形式を設定
        	strTime = strMin + ":" + strSec1 + ":" + strSec2 + "." + strSec100;
        	$(".timer").text(strTime);
        } 
});