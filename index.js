
 var circles = [];
 var undoCircles = [];
 var redoCircles = [];

 var canvas = null;
 var ctx = null;

$(document).ready(function(){

  $( "#undoButton" ).click(function() {
    undo();
  });

  $( "#redoButton" ).click(function() {
    redo();
  });

  $( "#slider" ).slider({
    value:0,
    min: 0,
    max: 100,
    step: 1,
    slide: function( event, ui ) {
    
      modificarSelect(ui.value);
       
    }
});
  
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
  
  
  });


  function storeGuess(event) {
    saveSate();
    var x = event.offsetX;
    var y = event.offsetY;
   

    for (let i = 0; i < circles.length; i++) {
     
         var rangox1 = circles[i].x + circles[i].diametro;
         var rangox2 = circles[i].x - circles[i].diametro;

         var rangoy1 = circles[i].y + circles[i].diametro;
         var rangoy2 = circles[i].y - circles[i].diametro;

      if((x < rangox1 && x > rangox2) && (y < rangoy1 && y > rangoy2)){
        quitSelected();
        circles[i].selected = true;
        $( "#slider" ).slider("value",circles[i].diametro);
        draw();
        return;
      }
      
    }
    var nuevoCirculo = {
      "x":x,
      "y":y,
      "diametro":90,
      "selected": false
    }


    circles.push(nuevoCirculo);
    console.log("x coords: " + x + ", y coords: " + y);
    draw();


}



function quitSelected(){
  for (let i = 0; i < circles.length; i++) {
    circles[i].selected = false;
    
  }
}

function modificarSelect(valor){
  saveSate();
  for (let i = 0; i < circles.length; i++) {
    if(circles[i].selected){
      circles[i].diametro = valor;
      draw();
    }
    
  }
}


function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
for (let i = 0; i < circles.length; i++) {
  if(circles[i].selected){
    ctx.beginPath();
    ctx.fillStyle = "#a5a5a5";
    ctx.arc(circles[i].x,circles[i].y,circles[i].diametro,0,2*Math.PI);
    ctx.fill();
    ctx.stroke();
  }else{
      ctx.beginPath();
    ctx.arc(circles[i].x,circles[i].y,circles[i].diametro,0,2*Math.PI);
    ctx.stroke();
  }

  
}
}

function undo(){
  saveSate2();
  circles = undoCircles.slice();
 
  draw();
}

function redo(){
  circles = redoCircles.slice();
  
  draw();
}

function saveSate(){
  undoCircles = circles.slice();
}
function saveSate2(){
  redoCircles = circles.slice();
}