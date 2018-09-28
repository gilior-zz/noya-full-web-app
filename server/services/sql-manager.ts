import {Connection, ConnectionConfig, Request, TediousTypes, TYPES} from "tedious";
import {proc_arg, proc_param} from '../../shared/models'
import {Request as ExpressRequest} from "express";

export type MyTediousTypes = TediousTypes;


export async function connect(): Promise<Connection> {


    var config: ConnectionConfig = {
        userName: 'lior',
        password: 'lM8%px35',
        server: '184.168.194.78',

        options: {
            rowCollectionOnDone: true,
            rowCollectionOnRequestCompletion: true,
            useColumnNames: true,
            camelCaseColumns: true,
            encrypt: true
        }
    };

    var connection = new Connection(config);
    const con = await connectAsync(connection);

    return con;

}

function getProcParams(con: Connection, proc: string): Promise<proc_arg[]> {
    const sql = `select name from sys.parameters where object_id = object_id('${proc}')`
    return new Promise((res, rej) => {
        const request = new Request(sql, (err, rowCount, proc_args: proc_arg[]) => {
            res(proc_args);
        });
        con.execSql(request);
    })
}

function hasArg(arg: string, args: proc_arg[]): boolean {
    const res = args.filter(i => i.name.value.toLowerCase() === arg);
    return res.length > 0;
}

export async function callProc<T>(req: ExpressRequest, con: Connection, proc: string, ...params: proc_param[]): Promise<T[]> {
    const proc_args = await getProcParams(con, proc);
    const hasLang = hasArg('@lang', proc_args);
    if (hasLang)
        params.push({
            type: TYPES.NVarChar,
            name: 'lang',
            value: req['lang']
        })
    return new Promise<T[]>((res, rej) => {
            var request = new Request(proc, function (err, rowCount, rows) {

            });
            for (let param of params)
                request.addParameter(param.name, param.type, param.value)

            request.on('doneInProc', (error: Error, more: boolean, rows: any[]) => {
                res(rows);
            });

            con.callProcedure(request);

        }
    )


}

async function connectAsync(connection): Promise<Connection> {
    return new Promise<Connection>((res, rej) => {
        connection.on('connect', function (err) {
                if (err) rej(err)
                res(connection)
            }
        );
    })
}