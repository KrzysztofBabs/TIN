

function cenzura(z,s){
    
    var noweZdanie= z.replace(s,"*");
    // console.log(noweZdanie);
    return noweZdanie;
    


}


let tablica=["kotlet",'kotka','koty','pies'];

let wynik = tablica.map(x=>cenzura(x,"kot"));

console.log(wynik);
