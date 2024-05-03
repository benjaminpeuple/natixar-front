export interface BusinessEntity {
  id: number
  parent?: number
  name: string
  type: "Company" | "Division" | "Step"
  details?: BusinessEntityDetails
  image?: string
}

export interface BusinessEntityDetails {
  supplier: boolean
  customer: boolean
  ownOperation: boolean
  financialControl?: boolean
  operationalControl?: boolean
  capital?: boolean
  registration: string
  address?: string
}

export interface GeographicalArea {
  id: number
  parent?: number
  name: string
  type:
    | "World region"
    | "Continent"
    | "Country"
    | "State"
    | "Region"
    | "County"
    | "City"
    | "Location"
    | "Unit"
  details?: GeographicalAreaDetails
}

export interface CountryLocation {
  lat: number
  lon: number
  country: string
}

export interface GeographicalAreaDetails {
  lat: number
  long: number
  operatorId: number
  ownerId?: number
}
