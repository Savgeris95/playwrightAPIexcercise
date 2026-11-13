import { APIRequestContext, expect, request } from "@playwright/test"
import { APILogger } from "./logger"
import { ExpectMatcherUtils } from "@playwright/test"

export class RequestHandler {
    private baseUrl?: String
    private defaultUrl: string = 'https://conduit-api.bondaracademy.com/api'
    private apiPath: string = ''
    private queryParameters: object = {}
    private apiHeaders: object = {}
    private apiBody: object = {}
    private request: APIRequestContext
    private authToken: string = ''
    private apiLogger: APILogger

    constructor(request: APIRequestContext, authToken: string, apiLogger: APILogger) {
        this.request = request
        this.authToken = authToken
        this.apiLogger = apiLogger
    }

    url(baseUrl: string) {
        this.baseUrl = baseUrl
        return this
    }

    path(apiPath: string) {
        this.apiPath = apiPath
        return this
    }

    params(queryParameters: object) {
        this.queryParameters = queryParameters
        return this
    }

    headers(apiHeaders: object) {
        this.apiHeaders = apiHeaders
        return this
    }

    body(apiBody: object) {
        this.apiBody = apiBody
        return this
    }

    async getRequest(expectedStatusCode: number) {
        const url = this.getUrl()
        this.apiLogger.logRequest('GET',url,this.apiHeaders,this.apiBody)
        const response = await this.request.get(url, { headers: { Authorization: this.authToken } })
        const actualStatusCode = response.status()
        const responseJSON = await response.json()
        this.apiLogger.logResponse(actualStatusCode,responseJSON)
        this.statusCodeValidator(expectedStatusCode,actualStatusCode)
        
        

        this.cleanUp()
        return responseJSON
    }

    async postRequest(expectedStatusCode: number) {
        const url = this.getUrl()
        this.apiLogger.logRequest('POST',url,this.apiHeaders,this.apiBody)
        const response = await this.request.post(url, { data: this.apiBody, headers: { Authorization: this.authToken } })
        const actualStatusCode = response.status()
        const responseJSON = await response.json()
        this.apiLogger.logResponse(actualStatusCode,responseJSON)
        this.statusCodeValidator(expectedStatusCode,actualStatusCode)
        
        

        this.cleanUp()
        return responseJSON
    }

    async putRequest(expectedStatusCode: number) {
        const url = this.getUrl()
        this.apiLogger.logRequest('PUT',url,this.apiHeaders,this.apiBody)
        const response = await this.request.put(url, { data: this.apiBody, headers: { Authorization: this.authToken } })
        const actualStatusCode = response.status()
        const responseJSON = await response.json()
        this.apiLogger.logResponse(actualStatusCode,responseJSON)
        this.statusCodeValidator(expectedStatusCode,actualStatusCode)
        
        

        this.cleanUp()
        return responseJSON
    }

    async deleteRequest(expectedStatusCode: number) {
        const url = this.getUrl()
        this.apiLogger.logRequest('DELETE',url,this.apiHeaders,this.apiBody)
        const response = await this.request.delete(url, {headers: { Authorization: this.authToken } })
        const actualStatusCode = response.status()
        this.apiLogger.logResponse(actualStatusCode)
        this.statusCodeValidator(expectedStatusCode,actualStatusCode)
        
        
        this.cleanUp()
    
    }

    getUrl() {
        const url = new URL(`${this.baseUrl ?? this.defaultUrl}/${this.apiPath}`)

        for (const [key, value] of Object.entries(this.queryParameters)) {
            url.searchParams.append(key, value)
        }

        return url.toString()
    }

    statusCodeValidator(expectedStatusCode: number, actualStatusCode: number,){
        if(expectedStatusCode!=actualStatusCode){
            console.log(this.apiLogger.getRecentLogs())
            throw Error (`Expected: \x1b[32m{${expectedStatusCode}} \x1b[37m status code but received: \x1b[31m{${actualStatusCode}} \x1b[37mstatus code`)
        }
    }

    cleanUp() {
        this.apiPath = ''
        this.queryParameters = {}
        this.apiHeaders = {}
        this.apiBody = {}
    }

}