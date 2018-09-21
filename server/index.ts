import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import * as path from 'path'
import * as http from 'http'
import {NextFunction, Request, Response} from "express";

const port = process.env.PORT || '3000'
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client/dist')));
// app.set('views', path.join(__dirname, ''));

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next:NextFunction) {
  return res.render('index.html');
});


const server = http.createServer(app);
server.listen(port);
server.on('error', (err) => {
  console.log('error', err)
});
server.on('listening', () => {
  console.log('listening on port ' + port)
});
