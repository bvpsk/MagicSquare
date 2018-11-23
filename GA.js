var total_agents = 1500;
var agents = [];
var new_agents = [];
var mutation_rate = 0.5;
var scores = [];
var fittest,min_index;

class AGENT{
    constructor(){
        this.score = 0;
        this.solved = false;
        this.val = [];
        this.row_sum = [];
        this.col_sum = [];
        this.diag_sum = [0,0];
        for(var i = 0;i < n;i++){
            this.col_sum[i] = 0;
        }
        for(var i = 0;i < n;i++){
            this.val[i] = [];
            for(var j = 0;j < n;j++){
                this.val[i][j] = Math.floor(Math.random()*(target));
            }
        }
    }
    CalcScore(){
        for(var i = 0;i < n;i++){
            this.col_sum[i] = 0;
        }
        for(var i = 0;i < n;i++){
            this.row_sum[i] = 0;
            for(var j = 0;j < n;j++){
                if(i == j){
                    this.diag_sum[0] += this.val[i][j];
                }
                if(i+j == n-1){
                    this.diag_sum[1] += this.val[i][j];
                }
                this.row_sum[i] += this.val[i][j];
                this.col_sum[j] += this.val[i][j];
            }
        }
        this.score = 0;
        this.row_sum.forEach(e=>{
            this.score += Math.abs(target - e);
        });
        this.col_sum.forEach(e=>{
            this.score += Math.abs(target - e);
        });
        this.diag_sum.forEach(e=>{
            this.score += Math.abs(target - e);
        });
    }
    check(){
        this.solved = true;
        this.row_sum.forEach((s)=>{
            if(s != target){
                this.solved = false;
            }
        });
        this.col_sum.forEach((s)=>{
            if(s != target){
                this.solved = false;
            }
        });
        this.diag_sum.forEach((s)=>{
            if(s != target){
                this.solved = false;
            }
        });
    }
    display(){
        for(var i = 0;i < n;i++){
            for(var j = 0;j < n;j++){
                a[i][j].p.innerHTML = this.val[i][j];
            }
        }
        
    }
}

function mutate(parent){
    for(var i = 0;i < n;i++){
        for(var j = 0;j < n;j++){
            if(mutation_rate <= Math.random()){
                if(Math.random() >= 0.5){
                    parent.val[i][j] -= Math.floor(Math.random()*(n+1));
                }else{
                    parent.val[i][j] += Math.floor(Math.random()*(n+1));
                }
                if(parent.val[i][j] > target || parent.val[i][j] < 0){
                    parent.val[i][j] = Math.floor(Math.random()*n);
                }
            }
        }
    }
}

function crossover(parent1,parent2){
    var p1 = [];
    var p2 = [];
    for(var i = 0;i < n;i++){
        for(var j = 0;j < n;j++){
            p1.push(parent1[i][j]);
            p2.push(parent2[i][j]);
        }
    }
    var cp = Math.floor(Math.random()*(n**2));
    var ch1 = new Array(n**2);
    var ch2 = new Array(n**2);
    for(var i = 0;i < n**2;i++){
        if(i < cp){
            ch1[i] = p1[i];
            ch2[i] = p2[i];
        }else{
            ch1[i] = p2[i];
            ch2[i] = p1[i];
        }
    }
    var c1 = [];
    var c2 = [];
    var k = 0;
    for(var i = 0;i < n;i++){
        c1[i] = [];
        c2[i] = [];
        for(var j = 0;j < n;j++){
            c1[i][j] = ch1[k];
            c2[i][j] = ch2[k];
            k+=1;
        }
    }
    return [c1,c2];
}

for(var i = 0;i < total_agents;i++){
    agents.push(new AGENT());
}
var iter_limit = 100;
var iter = -1;
$(".run").click(function(){
    agents = [];
    for(var i = 0;i < total_agents;i++){
        agents.push(new AGENT());
    }
});

var timer = setInterval(function(){
    iter += 1;
    scores = [];
    for(var i = 0;i < total_agents;i++){
        agents[i].CalcScore();
        scores.push(agents[i].score);
    }
    min_index = 0;
    for(var i = 0;i < total_agents;i++){
        if(scores[i] < scores[min_index]){
            min_index = i;
        }
    }
    agents[min_index].check();
    if(iter%iter_limit == 0){
        agents[min_index].display();
        for(var i = 0;i < n;i++){
            if(agents[min_index].row_sum[i] == target){
                indicators[i].div.style.backgroundColor = "green";
            }else{
                indicators[i].div.style.backgroundColor = "red";
            }
            if(agents[min_index].col_sum[i] == target){
                indicators[n+i].div.style.backgroundColor = "green";
            }else{
                indicators[n+i].div.style.backgroundColor = "red";
            }
        }
        if(agents[min_index].diag_sum[0] == target){
            indicators[indicators.length - 1].div.style.backgroundColor = "green";
        }else{
            indicators[indicators.length - 1].div.style.backgroundColor = "red";
        }
        if(agents[min_index].diag_sum[1] == target){
            indicators[indicators.length - 2].div.style.backgroundColor = "green";
        }else{
            indicators[indicators.length - 2].div.style.backgroundColor = "red";
        }
        iter = 0;
    }
    // if(agents[min_index].solved){
    //     // clearInterval(timer);
    //     // alert("done");
    // }
    new_agents = [];
    for(var i = 0;i < total_agents;i++){
        new_agents.push(new AGENT());
    }
    for(var k= 0;k < Math.floor(total_agents/2);k++){
        for(var i = 0;i < n;i++){
            for(var j = 0;j < n;j++){
                new_agents[k].val[i][j] = agents[min_index].val[i][j];
            }
        }
    }
    for(var i = 0;i < Math.floor(total_agents/2) - 1;i++){
        mutate(new_agents[i]);
    }
    agents = new_agents;
},1);