import {app} from "../index";
import {Response} from "supertest";

const expect = require('expect')
const request = require('supertest')


describe('home controller', () => {
    it('shld return true', () => {
        expect(true).toBe(true)
    })
    it('shld load home page text (english)', (done) => {
        request(app)
            .get('/api/home/text')
            .query({lang: 1})
            // .expect(200)
            .expect((res: Response) => {

                expect(res.body[0].Text).toContain('Welcome')
            })
            .end(done)
    })
    it('shld load home page text (hebrew)', (done) => {
        request(app)
            .get('/api/home/text')
            .query({lang: 0})
            .expect(200)
            .expect((res: Response) => {

                expect(res.body[0].Text).toContain('ברוכים הבאים')
            })
            .end(done)
    })
    it('shld load 6 vome cards', (done) => {
        request(app)
            .get('/api/home/cards')
            .query({lang: 0})
            .expect(200)
            .expect((res: Response) => {

                expect(res.body.length).toBe(6)
            })
            .end(done)
    })
})



