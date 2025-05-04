class Auto{
    constructor(rok,przebieg,cena_wyjsciowa,cena_koncowa){
        this.rok = rok;
        this.przebieg = przebieg;
        this.cena_wyjsciowa = cena_wyjsciowa;
        this.cena_koncowa = cena_koncowa;

    }


}

let auta=[
    new Auto(2000,100000,10000,2000),
    new Auto(2010,70000,20000,10000),
    new Auto(2020,30000,40000,20000)

]

function widokTabelka(auta){
    const table=document.createElement("table");
    table.setAttribute("border","1");


    const header=table.createTHead();
    const headerRow=header.insertRow();
    const headers=["rok", "przebieg", "cena_wyjsciowa", "cena_koncowa"];
    headers.forEach(headerText=>{
        const th=document.createElement("th");
        th.innerText=headerText;
        headerRow.appendChild(th);
    });


    const body=table.createTBody();
    auta.forEach(car=>{
        const row=body.insertRow();
        Object.values(car).forEach(value=>{
            const cell=row.insertCell();
            cell.innerText=value;
        });
    });


    document.getElementById("car-table").appendChild(table);
}


widokTabelka(auta);





