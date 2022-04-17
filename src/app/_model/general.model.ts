export interface DefaultResponse{
    data: DataResponse<any>;
}

export interface DataResponse<T>  {
    UserDataModel : any
    data: T;
    success_code?: string;
    success_msg?: string;
    err_code?: string;
    err_msg?: string;
    verification_methods?: Array<any>;
}