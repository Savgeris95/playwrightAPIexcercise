export class APILogger{
    private recentLogs: any [] = []

    logRequest(method: string, url: string, apiHeaders?: object, apiBody?: object){
        const logs = {type: 'Request Details', data: {method,url,apiHeaders,apiBody}}
        this.recentLogs.push(logs)
    }

    logResponse(statusCode: number, responseBody?: object){
        const logs = {type: 'Response Details', data: {statusCode,responseBody}}
        this.recentLogs.push(logs)
    }

    getRecentLogs(){
        const logs = this.recentLogs.map(log =>
            `${log.type}\n\n${JSON.stringify(log.data,null,2)}\n\n`    
        ).join('')

        return logs
    }
}