function poleProstokat(a,b){
    var pole=a*b;
    return pole;
    
}


function poleTrapez(a,b,h){
    var pole=(a+b)*h*0.5;
    return pole;
}

function poleRownoleglobok(a,h){
    var pole=a*h;
    return pole;
}

function poleTrojkata(a,h){
    var pole=a*h*0.5;
    return pole;
}




function policz(literka,a,b,h){
    let wynik;

    switch(literka){
        case 'p':
            wynik=poleProstokat(a, b);
            // console.log("Pole prostokata:", wynik);
            return "pole prostokata:" + wynik;
            break;
        case 't':
            wynik=poleTrapez(a,b,h);
            console.log("Pole trapezu:",wynik);
            break;
        case 'r':
            wynik=poleRownoleglobok(a,h);
            console.log("Pole rownolegloboku:",wynik);
            break;
        case 'tr':
            wynik=poleTrojkata(a,h); 
            console.log("Pole trojkata:",wynik);
            break;   
        default:
            console.log('zla literka');
    }

}


