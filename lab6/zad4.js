


function fn(x,y){
    return (x%3)-(y%3);
   
}


let tablica2=[10,20,30,35,36,37,99,102,105];
let posorotwana=tablica2.sort(fn);
console.log(posorotwana);