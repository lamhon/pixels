export interface SearchParamsType {
    searchParams: {
        [key: string]: string | string[] | undefined
    }
}

export interface CustomerDataType {
    _id: string
    name: string
    address: string
    phoneNumber: string
    sex: number
    note: string
    updateBy: string
    deleteType: string
}

export interface PaginationType {
    pageIndex: number
    pageSize: number
    total: number
}

export interface ResponseData {
    status: string
    data: any
    message: string
}
