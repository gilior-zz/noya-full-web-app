import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import {join} from 'path'
import * as http from 'http'
import {router} from "./routes/router";
import {Request, Response} from "express";

const folder = './controllers';
const port = process.env.PORT || '3000'
const app = express();
const client = join(__dirname, '../client/dist');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());


router.initRoutes(app, folder);

// app.use(express.static(client));

// Server static files from /browser
app.all('*.*', express.static(client));

// catch 404 and forward to error handler


let r=express.Router();
r.get('/api/home/text',(req:Request,res:Response) => {
  res.send('OK')
})
// app.all('/*', (req, res) => {
//     res.sendFile('index.html', {root: client});
// })


const server = http.createServer(app);
server.listen(port);
server.on('error', (err) => {
    console.log('error', err)
});
server.on('listening', () => {
    console.log('listening on port ' + port)
});
