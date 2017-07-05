import { ReportType } from "./report-type"
import { GeoJSONFeature } from "./geoJSON-feature"

export interface ReportSpecification {
  geoJSON:GeoJSONFeature,
  keywords?: Array<string>,
  reportType: ReportType;
}