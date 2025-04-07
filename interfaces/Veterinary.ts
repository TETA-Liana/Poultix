import { Farm } from "./Farm"
import { Farmer } from "./Farmer"
import { Vaccine } from "./Vaccine"

export interface Veterinary{
    details:Farmer,
    farmManaged: Farm,
    vaccinesAvailable: Vaccine
}