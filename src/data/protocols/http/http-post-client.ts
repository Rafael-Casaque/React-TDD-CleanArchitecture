import { httpResponse } from "."

export type HttpPostParams<T> = {
    url: string
    body?: T
}

export interface HttpPostClient<T,R>{
    post(params:HttpPostParams<T>): Promise<httpResponse<R>>
}