const fs   = require( 'fs' );
const http = require( 'http' );

const Port         = 3000;
const StaticFolder = "./public"; // "./public"
const indexFile = '/index.html';

const server = http.createServer( ( req, res )=>{

  
  const fileName = req.url = '/'
  ? indexFile
  : req.url;

  console.log(req.url);

  const file = `${ StaticFolder }${ req.url }`;

  console.log(file);

    fs.readFile( file, ( err, data )=>{

      if ( err ){

        res.writeHead( 404 );
        res.end( 'File Not Found' );
        return;
      
      }

      res.writeHead( 200 );
      res.end( data );

    } );

} );

server.listen( Port, null, ()=>{

  console.log( `Server started on: ${ Port }` );

} );