const args=process.argv;

if(args.length<3){
  console.log("a");
} 
else{
  const name=args[2];
  console.log(`hello ${name}!`);
}