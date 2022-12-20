import axios from "axios";
import { AxiosHttpClient } from "./axios-http-client";
import { faker } from "@faker-js/faker";

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

describe('AxiosHttpClient', () => {
    test('should call Axios with correct URL', async () => {
        const url = faker.internet.url();
        const sut = new AxiosHttpClient()
        await sut.post({url})
        expect(mockedAxios).toHaveBeenCalledWith(url)
    });
});