import axios from "axios"
import { describe } from "node:test"
import jsonpath from "jsonpath"
import fs from "fs-extra"
import jsonData from '../api-data.json'

let userName:String
let userPass:String
let authToken:String

describe('test for users', () => {
    test('get token', async () => {
        const all_users_response = await axios.get("https://dummyjson.com/users")
        console.log(all_users_response.data)

        let userName = String(jsonpath.query(all_users_response.data, '$..users[0].username'))

        let userPass = String(jsonpath.query(all_users_response.data, '$..users[0].password'))

        console.log(userName)
        console.log(userPass)

        expect(all_users_response.status).toEqual(200)
    })


    test('get auth token', async () => {
        const auth_token_response = await axios.post('https://dummyjson.com/auth/login')



        authToken = String(jsonpath.query(auth_token_response.data, "$..token"))
        console.log(authToken)

        fs.writeJSONSync('api-token.json', authToken)
    })
})

//$..users[?(@.id==12)].username