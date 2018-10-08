import * as express from 'express'
import {NextFunction, Request, Response} from 'express'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import {join} from 'path'
import * as http from 'http'
import {router} from "./routes/router";

const folder = './controllers';
const port = process.env.PORT || '80'
export const app = express();
const client = join(__dirname, '../client/dist');

// app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use((req: Request, res: Response, next: NextFunction) => {
    const lang = req.query.lang;
    req['lang'] =  lang==1 ? 'Eng' : 'Heb';
    next();
})


router.initRoutes(app, folder).then(() => {
    // app.use(express.static(client));

// Server static files from /browser
    app.all('*.*', express.static(client));

// catch 404 and forward to error handler
    app.use(function (req, res, next) {
        res.sendFile('index.html', {root: client});
    })


    const server = http.createServer(app);
    server.listen(port);
    server.on('error', (err) => {
        console.log('error', err)
    });
    server.on('listening', () => {
        console.log('listening on port ' + port)
    });

});

