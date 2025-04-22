function fn(t){

    return `${t[0]} | ${t[1]} | ${t[2]}` ;

}

// backticki ````



let tablica4=[['Jan','Kowalski',21],['Anna','Nowak',19],['Jan','Kowal',30]];
let wynik4=tablica4.map(fn);

console.log(wynik4);

console.log('[');
console.log(wynik4.map(el=>`'${el}'`).join(',\n'));
console.log(']');



// console.log('[')
// wynik4.forEach(el=>{
//     console.log(`'${el}',`);
// })
// console.log(']');





// console.log(wynik4);