import { Category } from "src/modules/category/entities/category.entity";
import { Vendor } from "src/modules/vendor/entities/vendor.entity";

export class CreateItemDto {
    name: string;
    description: string;
    price: string;
    status: string;
    sr_number: string;
    category: Category;
    vendor: Vendor;
}
