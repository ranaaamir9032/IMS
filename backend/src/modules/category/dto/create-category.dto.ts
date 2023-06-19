import { Organization } from "src/modules/organization/entities/organization.entity";

export class CreateCategoryDto {
    name: string;
    organization: Organization;
    subcategory:[{name: string}]
}
