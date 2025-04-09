function czy3Pitagorejska(a,b,c){
    if(a*a+b*b==c*c){
        console.log("tak")
    }
    else if(c*c+b*b==a*a){
        console.log("tak")
    }
    else if(a*a+c*c==b*b){
        console.log("tak")
    }

    else{
        console.log("nie")
    }


}