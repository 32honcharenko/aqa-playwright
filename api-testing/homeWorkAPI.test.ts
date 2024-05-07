import axios, { all } from "axios"
import { describe } from "node:test"
import jsonpath from "jsonpath"

let id:Number
let titleR:String
let body:String

describe('test for users', () => {

    test('get ', async () => {
        const allResources = await axios.get("https://jsonplaceholder.typicode.com/posts")
        //console.log(allResources)

        titleR = String(jsonpath.query(allResources.data, '$[?(@.id==2)].title'))
        //console.log(titleR)

        body = String(jsonpath.query(allResources.data, '$[?(@.id==2)].body'))
        //console.log(body)

        id = Number(jsonpath.query(allResources.data, '$[?(@.id==2)].id'))
        console.log(id)

        expect(allResources.status).toEqual(200)
        
    })

    test('get by ID', async () => {
        const getById = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        //console.log(getById)

        expect(getById.data.title).toEqual(`${titleR}`)
        expect(getById.data.body).toEqual(`${body}`)
        expect(getById.status).toEqual(200)
        expect(getById.data).toHaveProperty('userId', 1);
               
    })

    test('POST', async () => {
        const postBody = {title: 'blablabla', body: 'qaqaqa', userId: 1}

        const post = await axios.post(`https://jsonplaceholder.typicode.com/posts`, postBody , {
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
              }})
        
        expect(post.data.title).toEqual(`blablabla`)
        expect(post.data.body).toEqual(`qaqaqa`)
      
        console.log(post.data)
               
    })

    test('PUT', async () => {
        const postBody = {title: 'blablabla2', body: 'qaqaqa2', userId: 1}

        const post = await axios.put(`https://jsonplaceholder.typicode.com/posts/5`, postBody , {
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
              }})
        
        expect(post.data.title).toEqual(`blablabla2`)
        expect(post.data.body).toEqual(`qaqaqa2`)
      
        console.log(post.data)
               
    })

    test('GET/posts/1/comments', async () => {
        const getById = await axios.get(`https://jsonplaceholder.typicode.com/posts/1/comments`)
        console.log(getById)

        expect(getById.data[2].name).toEqual(`odio adipisci rerum aut animi`)
        expect(getById.status).toEqual(200)
        expect(getById.data[2]).toHaveProperty('email', 'Nikita@garfield.biz');
        expect(getById.data).toContainEqual(
            { 
            postId: 1,
            id: 5,
            name: 'vero eaque aliquid doloribus et culpa',
            email: 'Hayden@althea.biz',
            body: 'harum non quasi et ratione\n' +
              'tempore iure ex voluptates in ratione\n' +
              'harum architecto fugit inventore cupiditate\n' +
              'voluptates magni quo et'})
    })



})

