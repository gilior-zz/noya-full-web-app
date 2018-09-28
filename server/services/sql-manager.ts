import {Connection, ConnectionConfig, Request, TediousTypes} from "tedious";
import {proc_param} from '../../shared/models'

export type MyTediousTypes = TediousTypes;


export async function connect() {


    var config: ConnectionConfig = {
        userName: 'lior',
        password: 'lM8%px35',
        server: '184.168.194.78',

        options: {
            rowCollectionOnDone: true,
            rowCollectionOnRequestCompletion: true,
            connectTimeout: 60 * 1000 * 60,
            requestTimeout: 60 * 1000 * 60,
            cancelTimeout: 60 * 1000 * 60,
            useColumnNames: true,
            camelCaseColumns: true
        }
    };

    var connection = new Connection(config);
    const con = await connectAsync(connection);

    return con;

}

export function callProc<T>(con: Connection, proc: string, ...params: proc_param[]): Promise<T[]> {
    var myrows: any[] = []

    return new Promise((res, rej) => {
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

async function connectAsync(connection): Promise<Connection | {}> {
    return new Promise((res, rej) => {
        connection.on('connect', function (err) {
                if (err) rej(err)
                res(connection)
            }
        );
    })
}