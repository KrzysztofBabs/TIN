class Ocena{
    constructor(przedmiot,wartoscOceny){
        this.przedmiot=przedmiot;
        this.wartoscOceny=wartoscOceny;

    }
}



class Student{
    constructor(imie,nazwisko,tablicaOcen=[]){
        this.imie=imie;
        this.nazwisko=nazwisko;

        this.tablicaOcen=tablicaOcen;


    }

    obliczSrednia(){
        if(this.tablicaOcen.length===0){
            return 0;
        }

        let suma=this.tablicaOcen.reduce((sum,o) => sum+o.wartoscOceny, 0);
        return suma/this.tablicaOcen.length;
    }



    set oceny(x) {
        if (x instanceof Ocena) {
            this.tablicaOcen.push(x);
        } else {
            console.log('nic')

        }
    }
    // get oceny(){
    //         return this.tablicaOcen.map(ocena => `Przedmiot: ${ocena.przedmiot} - ocena ${ocena.wartoscOceny}`).join('. ');
    //     }



}

let studenci=[
    new Student("Jan","Nowak"),
    new Student("Jan","Kowalski"),
    new Student("Jan","Nowacki"),

]

studenci[0].oceny = new Ocena("Matematyka", 5);
studenci[0].oceny = new Ocena("Fizyka", 4);
studenci[0].oceny = new Ocena("Chemia", 5);

studenci[1].oceny = new Ocena("Matematyka", 3);
studenci[1].oceny = new Ocena("Fizyka", 4);
studenci[1].oceny = new Ocena("Chemia", 5);

studenci[2].oceny = new Ocena("Matematyka", 4);
studenci[2].oceny = new Ocena("Fizyka", 3);
studenci[2].oceny = new Ocena("Chemia", 2);

function wyswietlStudenta(studenci){
    const container = document.getElementById('student-info');
    studenci.forEach(student => {
        const imieNazwisko = document.createElement("h2");
        imieNazwisko.className="naglowek";
        imieNazwisko.innerText = `${student.imie} ${student.nazwisko}`;

        const elementy = document.createElement("div");
        elementy.className = "elementy";

        const listaPrzedmiotow = document.createElement("ul");

        const ul=document.createElement('ul');
        student.tablicaOcen.forEach(p =>{
            const li = document.createElement("li");
            li.innerText = `${p.przedmiot}: ${p.wartoscOceny}`;
            li.style.paddingLeft = '5px';
            ul.appendChild(li);

        });


        const srednia = document.createElement("p");
        srednia.innerText = `Średnia: ${student.obliczSrednia().toFixed(2)}`;


        container.appendChild(imieNazwisko);

        elementy.appendChild(ul);
        elementy.appendChild(srednia);


        container.appendChild(elementy);


        imieNazwisko.addEventListener("click", () => {
            elementy.classList.toggle("active");
        });




    });
}



wyswietlStudenta(studenci);



