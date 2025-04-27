class Auto{
    constructor(rok,przebieg,cena_wyjsciowa){
        this.rok=rok;
        this.przebieg=przebieg;
        this.cena_wyjsciowa=cena_wyjsciowa;
        this.cena_koncowa=this.obliczCene();
    }

    powiekszCene(){
        this.cena_wyjsciowa+=1000;
        return this.cena_wyjsciowa;
    }

    obliczCene(){
        const teraz=new Date().getFullYear();
        const wiek=teraz-this.rok;
        let przebiegIlosc=this.przebieg/100000;

        this.cena_koncowa=this.cena_wyjsciowa-wiek*1000 - przebiegIlosc*10000;
        return this.cena_koncowa;
    }

    aktualizuj(nowyPrzebieg, nowyRok){
        this.przebieg=nowyPrzebieg;
        this.rok=nowyRok;

        const teraz=new Date().getFullYear();
        const wiek=teraz-this.rok;
        let przebiegIlosc=this.przebieg/100000;

        this.cena_koncowa=this.cena_wyjsciowa-wiek*1000 - przebiegIlosc*10000;
        return this.cena_koncowa;


    }


}

let auto1=new Auto(2020,250000,40000);
console.log(auto1.powiekszCene());
console.log(auto1.obliczCene());

let noweDane=auto1.aktualizuj(300000,2021);
console.log(noweDane);




let auta=[
    new Auto(2020,250000,20000),
    new Auto(2021,300000,50000),
    new Auto(2022,350000,60000),
]

function dopiszAuto(tablicaAut){
    let tablica=[];
    for(let i in tablicaAut){
        tablicaAut[i].powiekszCene();
        tablicaAut[i].obliczCene();

        if(tablicaAut[i].cena_koncowa>10000){
            tablica.push(auta[i]);

        }
    }
    return tablica;
}

function dodajRok(tablicaAut){
    let tablica=dopiszAuto(tablicaAut);
    for(let i in tablica){
        tablica[i].cena_wyjsciowa-=1000;
        tablica[i].rok+=1;

    }
    return tablica;
}





console.log(dopiszAuto(auta));
console.log(dodajRok(auta));


