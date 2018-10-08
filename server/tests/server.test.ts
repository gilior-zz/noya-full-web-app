import {app} from "../index";
import {Response} from "supertest";

const expect = require('expect')
const request = require('supertest')


describe('home controller', () => {
    it('shld return true', () => {
        expect(true).toBe(true)
    })
    it('shld load home page text', (done) => {
        request(app)
            .get('/api/home/text')
            .query({lang: 1})
            // .expect(200)
            .expect((res: Response) => {
                console.log(JSON.stringify(res.body, undefined, 2))
                expect(res.body).toBe('')
            })
            .end(done)
    })
})



