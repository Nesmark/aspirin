const electron = require('electron');
const remote = electron.remote;
const BrowserWindow = remote.BrowserWindow;
const clipboard = require('electron').clipboard;


var mainWindow ;


var electronScreen = electron.screen;
var size = electronScreen.getPrimaryDisplay().workAreaSize;

mainWindow = new BrowserWindow({ width: size.width/2, height: size.height ,x:100, y:50 });




// for (var i = 0; i < stopPoint; ++i) {
//     renderRect(d);
//     console.log(i,'asdas');    
// }

//var x=0, y=0;
//  console.log(d)

	// if(rtf()){
 //    x = rtf(4)?1:-1;
 //  }else{
 //    y = rtf(4)?1:-1;
 //  }
  
 //  d.x += x;
 //  d.y += y;


// SECOND WINDOW SECTION
var html = `

<div id="controls" style="font-size: 20px;">
  <b>GEN(<span id="ciic" >-</span>) 
  JustDoIt </b>
</div>
<canvas id="fbuf"  style="
  z-index: 1000;
  background: aquamarine;
" ></canvas>
<pre id="prelog"></pre>      

<script type="text/javascript">
         
         

var canvas = document.getElementById("fbuf");
var canvasWidth  = canvas.width = 1000;
var canvasHeight = canvas.height = 600;
var ctx = canvas.getContext('2d');         

function duality(EL_BUTTON, autostart, quant){

  var runTicks = false;

  EL_BUTTON.onclick = toggle;

  function toggle() 
  {
    if(runTicks = !runTicks) loop();
    EL_BUTTON.value = !runTicks ? "<RUN>" : "<STOP>";
  }
  function stop(){
	  clearTimeout(onlyOneLoop)
    toggle();
  }

  function loop(){

    //ctx.fillStyle="aquamarine";  
    ctx.fillStyle="white";
    renderRect(quant)
    //-------
    quant = tick(quant)
    //-------
    document.querySelector('#ciic').textContent = i; 
    //document.querySelector('#prelog').textContent = JSON.stringify(quant,null,2); 
    i++;

    ctx.fillStyle="#222";
    renderRect(quant)

    clearTimeout(onlyOneLoop)
    if(runTicks)
      onlyOneLoop = setTimeout(loop,tdelay);

  }
  function rtf(r){
    return Math.random()*(r||2)|0
  }



  //LOOP----PUP
  var tdelay = 200;
  var onlyOneLoop;
  var i = 0;


  quant = quant || {
    speed:{
      x:1,
      y:0
    },
    x:15,
    y:2
  };

	
  var speeds = {
    //x32:function(d){d.speed.x=-1;d.speed.y=1;},
    //x66:function(d){d.speed.x=0;d.speed.y=0;},
    y10:function(d){d.speed.x=1; d.speed.y=2;},
    y31:function(d){d.speed.x=0; d.speed.y+=0; 
                    document.querySelector('#prelog').textContent += d.data.char },
    y36:function(d){d.speed.x=1; d.speed.y=0;},
    
    x50y36:function(d){d.speed.x=0; d.speed.y=-3;},
    x50y2:function(d){d.speed.x=0; d.speed.y=0;},
    
    x7y14:function(d){d.speed.x=2; d.speed.y=1;}
  };
  // x107y2


  function tick(d){
    if(!d.speed.x && !d.speed.y){ 
      stop();
      return false;
    }  
    check(d,'x');
    check(d,'y');
    checkDual(d,'x','y');
    
    
    calculate(d);
    
    return d;
  }
  
  function calculate(d){
			Object.keys(d.speed).forEach(function(k){
					d[k] += d.speed[k]; //!!!Numbers
      })



    }
	
  function check(d,k){
    
    var fName = k+d[k];

    if(speeds.hasOwnProperty(fName)){
      speeds[fName](d);
    }

    //d[k] += d.speed[k]; //!!!Numbers

  }

  function checkDual(d,k1,k2){
    
    var fName = k1+d[k1]+k2+d[k2];

    if(speeds.hasOwnProperty(fName)){
      speeds[fName](d);
    }

  }


  function renderRect(d){	
    var scale = 10;
    var x = scale * d.x;
    var y = scale * d.y;

    //ctx.fillRect(x, y, scale-1, scale-1);
    ctx.font = "24px Arial";
		ctx.fillText(d.data.char, x, y);
  }

  if(!!autostart) toggle()
	
  
  return {speeds:speeds};
}

function creCtrl(type){
  var el = document.createElement('input');
  el.type=type || 'button';
  document.getElementById('controls').appendChild(el)
  return el;
}
//AUTORUN!!!

//debugger 

var sp = duality(creCtrl(),false);

var Skey = Object.keys(sp.speeds);

Skey.forEach(drawLine);

function renderRect2(d){
  
    var scale = 10;
    var x = scale * d.x;
    var y = scale * d.y;
		ctx.fillStyle="red";
    ctx.fillRect(x, y, d.w*scale-1, d.h*scale-1);
  }


function drawLine(fname){
  var xy = fname.split('y');
	xy[0] = xy[0].substr(1);   
  
  if(xy[0] && !xy[1]){

    renderRect2({x:xy[0],y:0,w:0,h:50})
  }
  if(!xy[0] && xy[1]){
  	renderRect2({x:0,y:xy[1],w:150,h:0})
  } 
  if(xy[0] && xy[1]){

  	renderRect2({x:xy[0],y:xy[1],w:1,h:1})
  } 
  
}

function buildWave(str){
  
  
  str.split('').forEach(function(char, n){
  	
    duality(creCtrl(),true,{
      data:{char:char},
      speed:{
        x:0,
        y:1
      },
      x:n+4,
      y:1
    });
  });
  
}

var search = creCtrl('text')
search.onkeypress = function(event){
	 if (event.keyCode == 13) {
     buildWave(this.value)
   return false;
 	}
}

buildWave('matrix CODE sample')

</script>
`;

mainWindow.loadURL("data:text/html;charset=utf-8," + encodeURI(html)); 

