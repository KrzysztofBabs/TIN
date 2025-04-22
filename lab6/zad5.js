
function fn(t){
    if(t[2]>20){
        return true;
    }
    else{
        return false;
    }
    

}





let tablica3=[['Jan','Kowalski',21],['Anna','Nowak',19],['Jan','Kowal',30],['Pawel','Kowlaski',33],['Piotr','Kowalski',15]];
let wynik3=tablica3.filter(fn);



console.log("-----------")

console.table(wynik3);
wynik3.forEach(el=>console.log(el));


console.log("-----------")




