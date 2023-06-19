import { Expose, Transform } from "class-transformer";
import { Organization } from "src/modules/organization/entities/organization.entity";
import { Category } from "../entities/category.entity";

export class CategoriesDto {

    @Expose()
    id: number

    @Expose()
    name: string;

    @Transform(({obj}) => obj.child?.length)
    @Expose()
    subCatLength: number

    @Transform(({obj}) => obj.child?.map((ch) => {
        let vendorsQty = 0;
        ch.vendor.forEach((v) => {
            vendorsQty++;
        })
        return vendorsQty;
    }))
    @Expose()
    vendorsLength: number

    @Transform(({obj}) => obj.child?.map((subCategory)=>{
        let quantity = 0, 
        unassigned = 0, 
        assigned = 0, 
        faulty = 0

        let vendorNames = subCategory.vendor.map((vendor)=>vendor.name)
        vendorNames = vendorNames.length > 0 ? vendorNames.join(", ") : "No vendors Found"
        subCategory.item?.forEach(element => {
            quantity ++;
            if(element.status === 'unassigned') unassigned++;
            else if(element.status === 'assigned') assigned++;
            else faulty++;
        });
        return{
        id: subCategory.id,
        name: subCategory.name,
        vendorNames,
        quantity,
        assigned,
        unassigned,
        faulty
    }


    }))
    @Expose()
    child: any



}
