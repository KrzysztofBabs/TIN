function choinkaNoca(wysokosc){
    const szerokosc=wysokosc * 2 - 3;
    wysokosc=wysokosc-1;

    
    console.log('*'.repeat(szerokosc));

    for(let i = 0; i<wysokosc - 1; i++){
        let gwiazdki= '*'.repeat(wysokosc - i - 1);
        let spacje= ' '.repeat(i * 2 + 1);
        console.log(gwiazdki+spacje+gwiazdki);
    }

    
    console.log('*'.repeat(szerokosc));
}
