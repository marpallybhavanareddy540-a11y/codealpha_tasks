const text=[
"Frontend Developer",
"UI Designer",
"Web Creator"
];

let i=0;
let j=0;

function type(){

document.getElementById(
"typing"
).innerHTML=
text[i].slice(0,j++);

if(j>text[i].length){

j=0;

i=(i+1)%text.length;

}

}

setInterval(type,150);