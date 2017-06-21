export interface Location{
    createdAt: number | null,
    geometry: {
        coorindates: number[],
        type:string
    }  
    name: string 
    place?:any
    reports: object,
    type: string
}