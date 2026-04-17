const rows = 18;
const cols = 30;
const grid = document.getElementById("grid");

let start = [3,3];
let end = [14,24];

function createGrid(){
grid.innerHTML = "";

for(let r=0;r<rows;r++){
for(let c=0;c<cols;c++){

let cell = document.createElement("div");
cell.className = "cell";

if(r===start[0] && c===start[1]) cell.classList.add("start");
if(r===end[0] && c===end[1]) cell.classList.add("end");

cell.onclick = ()=>{
if(!cell.classList.contains("start") &&
!cell.classList.contains("end")){
cell.classList.toggle("wall");
}
};

grid.appendChild(cell);
}}
}

function getCell(r,c){
return grid.children[r*cols+c];
}

async function runBFS(){

let q = [[...start]];
let vis = Array(rows).fill().map(()=>Array(cols).fill(false));
let prev = Array(rows).fill().map(()=>Array(cols).fill(null));

vis[start[0]][start[1]] = true;

let dir = [[1,0],[-1,0],[0,1],[0,-1]];

while(q.length){

let [r,c] = q.shift();

if(r===end[0] && c===end[1]) break;

for(let d of dir){

let nr = r+d[0];
let nc = c+d[1];

if(nr>=0 && nc>=0 && nr<rows && nc<cols && !vis[nr][nc]){

let next = getCell(nr,nc);

if(next.classList.contains("wall")) continue;

vis[nr][nc] = true;
prev[nr][nc] = [r,c];
q.push([nr,nc]);

if(!(nr===end[0] && nc===end[1])){
next.classList.add("visited");
}

await new Promise(x=>setTimeout(x,18));
}
}
}

let cur = end;

while(cur){

let [r,c] = cur;

if(!(r===start[0]&&c===start[1]) &&
!(r===end[0]&&c===end[1])){
getCell(r,c).classList.add("path");
}

cur = prev[r][c];
await new Promise(x=>setTimeout(x,30));
}
}

createGrid();