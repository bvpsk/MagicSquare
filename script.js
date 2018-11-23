var n = 4;
var target =Math.floor(Math.random()*1000);
let c = 1,ic = 0;
var a = [];
var indicators = []; // horizontal+vertical+diagonal
let cube_ref = document.getElementById("cube");
function cubelet(div){
    this.div = div;
    this.p = document.createElement("p");
    this.div.appendChild(this.p);
}
function indicator(){
    this.div = document.createElement("div");
    this.div.classList.add("horizontal");
}




///////
function start(){
    indicators = [];
    a = [];
    cube_ref.innerHTML = "";
    for(var i = 0;i < 2*n;i++){
        indicators.push(new indicator());
    }
    for(var i = n;i < 2*n;i++){
        indicators[i].div.classList.remove("horizontal");
        indicators[i].div.classList.add("vertical");
    }
    for(var i = 0;i < 2;i++){
        indicators.push(new indicator());
    }
    for(var i = 0;i < n;i++){
        a[i] = [];
        for(var j = 0;j < n;j++){
            a[i][j] = new cubelet(document.createElement('div'));
            a[i][j].div.classList.add('cubelet');
            c+=1;
        }
    }
    ic = 0;
    for(var i = 0;i < n;i++){
        a[i][0].div.appendChild(indicators[ic].div);
        a[0][i].div.appendChild(indicators[ic+n].div);
        ic+=1;
    }
    a[0][0].div.appendChild(indicators[indicators.length - 1].div);
    indicators[indicators.length - 1].div.classList.add("diag1");
    indicators[indicators.length - 1].div.classList.remove("horizontal");
    a[0][n-1].div.appendChild(indicators[indicators.length - 2].div);
    indicators[indicators.length - 2].div.classList.add("diag2");
    indicators[indicators.length - 2].div.classList.remove("horizontal");
    for(var i = 0;i < n;i++){
        for(var j = 0;j < n;j++){
            cube_ref.appendChild(a[i][j].div);
        }
    }
    var cube_side = Math.floor($("#cube").width()/n) - 2;
    $(".cubelet").css("width",cube_side);
    $(".cubelet").css("height",cube_side);
    $(".cubelet").css("font-size",Math.floor(cube_side/3));
    $(".horizontal").css("width",n*cube_side);
    $(".horizontal").css("height",Math.floor(cube_side/1.5));
    $(".vertical").css("width",Math.floor(cube_side/1.5));
    $(".vertical").css("height",n*cube_side);
    $(".diag1").css("width",Math.floor(Math.hypot((n)*cube_side,(n-1)*cube_side)));
    $(".diag1").css("height",Math.floor(cube_side/1.5));
    $(".diag2").css("height",Math.floor(cube_side/1.5));
    $(".diag2").css("width",Math.floor(Math.hypot((n)*cube_side,(n-1)*cube_side)));
    $(".inp").css("font-size",Math.floor((Math.floor($("#cube").width()/4) - 2)/3));
    $(".run").css("font-size",Math.floor((Math.floor($("#cube").width()/4) - 2)/3));
    $(".cubeleton").css("width",Math.floor($("#cube").width()/3) - 2);
    $(".cubeleton").css("height",Math.floor($("#cube").width()/4) - 2);
    $(".input2").css("width",2*Math.floor((Math.floor($("#cube").width()/4) - 2)/3));
    $("#inp1").val(target);
    $("#inp2").val(n);
}
//////


$("#inf").click(()=>{
    $("#inf").css("display","none");
    $("#info").css("display","flex");
});
$(".cll").click(function(){
    $("#inf").css("display","block");
    $("#info").css("display","none");
});

start();
$(".run").click(function(){
    target = Number($("#inp1").val());
    if(typeof(target) != "number" || target == NaN){
        target = 1541;
    }
    n = Number($("#inp2").val());
    if(n > 10 || n == NaN){
        n = 4;
    }
    start();

});
// indicators[0].div.style.backgroundColor = "yellow";