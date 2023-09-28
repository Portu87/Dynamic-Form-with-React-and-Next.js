export interface ResServer<T = any> {
    error:boolean,
    message:string,
    code:number
    data?: T
}