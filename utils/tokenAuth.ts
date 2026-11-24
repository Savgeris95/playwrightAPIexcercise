import { APIRequestContext } from "@playwright/test"


export class TokenAuth{

    private request: APIRequestContext

    constructor(request: APIRequestContext){
        this.request = request
    }

    async getToken(){

        const loginResponse = await this.request.post('https://conduit-api.bondaracademy.com/api/users/login', { data: { "user": { "email": "sotirisapitestingtutorial@gmail.com", "password": "password1234" } } })
        const loginResponseJSON = await loginResponse.json()
        const authToken = `Token ${loginResponseJSON.user.token}`

        return authToken
    }
}