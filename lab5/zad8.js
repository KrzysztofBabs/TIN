function trojkatPascala(n){
    for(let i = 0;i<n;i++){
        let wiersz= "";

        for(let s=0;s<n-i-1; s++){
            wiersz = wiersz+ " ";
        }

        let liczba = 1;

        
        for(let j=0;j<=i;j++){
            wiersz= wiersz + liczba + " ";
            liczba = liczba * (i - j) / (j + 1);
        }

        console.log(wiersz);
    }
}
