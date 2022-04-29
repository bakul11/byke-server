const express = require( 'express' );
const app = express();
const { MongoClient, ServerApiVersion } = require( 'mongodb' );

//midleware
const bodyParser = require( 'body-parser' );
const cors = require( 'cors' );
app.use( cors() )
app.use( bodyParser.json() )
app.use( express.json() );

//dot Env File 
require( 'dotenv' ).config();

const uri = `mongodb+srv://${ process.env.DB_USER }:${ process.env.DB_PASS }@cluster0.gtxk9.mongodb.net/${ process.env.DB_DATABASE }?retryWrites=true&w=majority`;
const client = new MongoClient( uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 } );

client.connect( err =>
{
    //Testing Amazon DataBase
    const DbCollection = client.db( process.env.DB_DATABASE ).collection( process.env.DB_COLLECTION );
    //Car Services Database
    const CarCollection = client.db( "carServices" ).collection( "servicesPoint" );


    //Get data From MongoDB
    app.get( '/services', (req, res) =>{
        CarCollection.find({}).toArray()
            .then( result =>{
                res.send(result)
            })
            .catch(err =>{
                console.log(err);
            })
    } )


    //Post Data in MongoDB
    app.post('/services', ( req, res ) =>{
        const result = req.body;
        const addServices = CarCollection.insertOne( result )
        res.send( addServices );
    })


});


app.listen(5000, () =>{
    console.log( "Server start done" );
});