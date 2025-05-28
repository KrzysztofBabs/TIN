import fs from 'fs';
import path from 'path';


const akcja=process.argv[2];
const nazwa=process.argv[3];
const tekst = process.argv.slice(4).join(' ');



const sciezka=path.join('pliczki', nazwa);


switch(akcja){
  case 'open':
    fs.readFile(sciezka, 'utf8', (e, data)=>{
      if(e){
        console.log(`Plik ${nazwa} nie istnieje`);

        }else{
            console.log(`${data}`);

        }
        
    
    });
    break;
  case 'append':
    fs.appendFile(sciezka, tekst+ '\n', (e)=>{   
        if(e){
            console.log(`Plik ${nazwa} nie istnieje`);
        }else{
            console.log(`zapisano nowa tresc`);

        }
          
    });
    break;


   case 'delete':
    fs.unlink(sciezka, (e)=>{
        if(e){
            console.log(`Plik ${nazwa} nie istnieje`);
        }else{
            console.log(`usuniete`);

        }
        
    });
    break;
            
    default:
    break;
}