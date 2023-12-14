import {FormControl, Validators} from "@angular/forms";

export interface AddAccommodation {
  name?: string | null,
  minPeople?: string | null,
  maxPeople?: string | null,
  ammineity?: string | null,
  weekendPrice?: string | null,
  holidayPrice?: string | null,
  summerPrice?: string | null,
  country?: string | null,
  city?: string | null,
  street?: string | null,
  number?: string | null,
  limit?: string | null,
  userType?: string | null,
  ConfirmationType?: string | null,
  TypeAcc?: string | null,
  dataSource?:any[],
  imageUrls?:string[]
}
