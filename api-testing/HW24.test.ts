import { ok } from "assert";
import axios, { all } from "axios"
import { describe } from "node:test"
const MockAdapter = require('axios-mock-adapter');


describe('tests', () => {
  
    async function fetchData() {
        try {
          const response = await axios.get('https://QQQdummyjson.com/products/1');
          return response.data;
        } catch (error) {
          throw new Error('wrong URL');
        }
      }
      
      
    test('check error if wrong URL', async () => {
        await expect(fetchData()).rejects.toThrow('wrong URL');
      });

})

  


describe('checkHeaderAndParams', () => {
  
    async function checkHeaderAndParams() {
      try {
        const response = await axios.get('https://dummyjson.com/products', {
          params: {
            limit: 10,
            skip: 10,
            select: "title,price"
          },
          headers: {
            'Content-Type': 'application/json',
          }
        });
        return response.data;
      } catch (error) {
        throw new Error('inputed wrong params');
      }
    }
  
    it("should send correct headers and params", async () => {
        const expectedResponse = { ok: true };

        const mock = new MockAdapter(axios);
  
      mock.onGet('https://dummyjson.com/products', {
          params: {
            limit: 10,
            skip: 10,
            select: "title,price"
          },
          headers: {
            'Content-Type': 'application/json',
          }
        }).reply(200, expectedResponse);
        const response = await checkHeaderAndParams();
        expect(response).toEqual(expectedResponse);
    });
  
  });   






