var auto={
    rok:null,
    przebieg:null,
    cena_wyjsciowa:60000,
    cena_koncowa:null,

    powieksz:function(){
        this.cena_wyjsciowa+=1000;
        return this.cena_wyjsciowa;
    },

    // obniz:function(){
    //     this.cena_koncowa=this.cena_wyjsciowa-5*1000;
    //     return this.cena_koncowa;

    // },

    // obniz2:function(){
    //     this.cena_koncowa2=this.cena_koncowa-2*10000;
    //     return this.cena_koncowa2;

    // },

    pokazDane:function(nowyPrzebieg,nowyRok){
        this.przebieg=nowyPrzebieg;
        this.rok=nowyRok;

        const teraz=new Date().getFullYear();
        const wiek=teraz-this.rok;
        const przebiegIlosc=Math.floor(this.przebieg/100000);

        this.cena_koncowa=this.cena_wyjsciowa-wiek*1000-przebiegIlosc*10000;

        return this.cena_koncowa;


    }

    


};




console.log(auto.powieksz());
// console.log(auto.obniz());
// console.log(auto.obniz2());
console.log(auto.pokazDane(400000,2023));





