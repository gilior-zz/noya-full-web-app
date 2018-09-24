import * as express from 'express'
import {NextFunction, Request, Response} from 'express'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import {join} from 'path'
import * as http from 'http'
import {router} from "./routes/router";

const folder = './controllers';
const port = process.env.PORT || '3000'
const app = express();
const client = join(__dirname, '../client/dist');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use((req: Request, res: Response, next: NextFunction) => {
    const lang = req.params.lang;
    req['lang'] = lang ? 'Eng' : 'Heb';
    next();
})


router.initRoutes(app, folder);

// app.use(express.static(client));

// Server static files from /browser
app.all('*.*', express.static(client));

// catch 404 and forward to error handler
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
