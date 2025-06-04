const fs=require('fs');
var http=require('http'); 






var server = http.createServer(function (req, res){   
    if(req.url == '/a' && req.method=== 'GET'){ 
        
        fs.readFile("plik.txt", 'utf8', function (err, data){ 
            if(err){
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.write('nie znaleziono');
                res.end();
            } 
            else{
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.write(data);
                res.end();
            }
        });
        
    
    }
    else if(req.url == '/b' && req.method === 'POST'){
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); 
        });
        req.on('end', () => {
            fs.writeFile("plik.txt", body, {flag: 'a+'},(err) => { 
                if(err){
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.write('blad');
                } 
                else{
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.write('zapisano');
                }
                res.end();
            });
        });
     } 



     else if(req.url == '/c' && req.method === 'DELETE'){ 
        fs.unlink("plik.txt", (err) => { 
            if(err){
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.write('nie znaleziono');
            }
            else{
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.write('usunieto');
            }
            res.end();
        });

     }
    else
        res.end('Invalid Request!');

});





server.listen(3000);
console.log('serwer na porcie 3000')