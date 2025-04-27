class Ocena{

    constructor(przedmiot, ocena){
        this.przedmiot = przedmiot;
        this.ocena=ocena;

    }
}

class Student{
    constructor(imie,nazwisko,tablicaOcen=[]){
        this.imie = imie;
        this.nazwisko = nazwisko;
        this.tablicaOcen = tablicaOcen;
        // this.srednia=this.obliczSrednia();


    }

    obliczSrednia(){
        if(this.tablicaOcen.length===0){
            return 0;
        }

        let suma=this.tablicaOcen.reduce((sum,o) => sum+o.ocena, 0);
        return suma/this.tablicaOcen.length;
    }
    przywitanie(){
        return 'Witaj ' + this.imie+' '+this.nazwisko + ', twoja srednia ocen to: '+ this.obliczSrednia();
    }

    set oceny(x){
        if(x instanceof Ocena){
            this.tablicaOcen.push(x);
            // this.srednia=this.obliczSrednia();
        }
        else{
            console.log('nie jest to obiekt klasy Ocena');
        }
    }




    get oceny(){
        return this.tablicaOcen.map(ocena => `Przedmiot: ${ocena.przedmiot} - ocena ${ocena.ocena}`).join('. ');


    }
}

let s =new Student('Jan', "Nowak");

s.oceny=new Ocena("Matma",5)
s.oceny=new Ocena("Polski",4)
s.oceny=new Ocena("Angielski",3)
s.oceny=new Ocena("Biologia",2)

console.log(s.przywitanie());
console.log(s.oceny);

