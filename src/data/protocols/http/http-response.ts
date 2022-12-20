export enum HttpStatusCode {
    noContent = 204,
    unathorized = 401
}

export type httpResponse = {
    statusCode: HttpStatusCode
    body ?: object
}