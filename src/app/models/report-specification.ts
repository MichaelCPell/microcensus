import { ReportType } from "./report-type"

export interface ReportSpecification {
  geoJSON:geoJSONFeature,
  keywords?: Array<string>,
  reportType: ReportType;
}

interface geoJSONFeature{
  type: "Feature"
  geometry:   {
    coordinates: Array<number>
    radius?: number
    type: "Point" | "Polygon"
  }
  properties?: any
}