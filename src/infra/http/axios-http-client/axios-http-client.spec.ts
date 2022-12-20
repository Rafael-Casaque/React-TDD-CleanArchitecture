import { AxiosHttpClient } from "./axios-http-client";
import { HttpPostParams } from "@/data/protocols/http";
import axios from "axios";
import { faker } from "@faker-js/faker";

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
const mockedAxiosResult = {
    data: faker.random.words(),
    status: faker.random.numeric()
}
mockedAxios.post.mockResolvedValue(mockedAxiosResult)

const makeSut = (): AxiosHttpClient => {
    return new AxiosHttpClient()     
}

const mockPostRequest = (): HttpPostParams<any> =>({
    url: faker.internet.url(),
    body: faker.random.words()
})

describe('AxiosHttpClient', () => {    

    test('should call Axios with correct values', async () => {        
        const request = mockPostRequest()
        const sut = makeSut()
        await sut.post(request)
        expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
    });

    test('should return correct statusCode and body', async () => {                
        const sut = makeSut()
        const httpResponse = await sut.post(mockPostRequest())
        expect(httpResponse).toEqual({ 
            statusCode: mockedAxiosResult.status,
            body: mockedAxiosResult.data
        })
    });
});