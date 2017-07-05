export interface GeoJSONFeature{
  type: "Feature"
  geometry:   {
    coordinates: Array<number>
    radius?: number
    type: "Point" | "Polygon"
  }
  properties?: any
}