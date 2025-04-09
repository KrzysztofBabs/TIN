function poleProstokat(a,b){
    var pole=a*b;
    // return pole;
    console.log(pole)
}


function poleTrapez(a,b,h){
    var pole=(a+b)*h*0.5;
    console.log(pole);
}

function poleRownoleglobok(a,h){
    var pole=a*h;
    console.log(pole);
}

function poleTrojkata(a,h){
    var pole=a*h*0.5;
    console.log(pole);
}

let p = poleProstokat();
let t = poleTrapez();
let r = poleRownoleglobok();
let tr = poleTrojkata();


