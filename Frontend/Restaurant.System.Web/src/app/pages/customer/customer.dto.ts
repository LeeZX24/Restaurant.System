import { ApplicationDto } from "../../shared/models/application.dto";

export interface CustomerDto extends ApplicationDto {
  currentCustomerNumber : string;
}
