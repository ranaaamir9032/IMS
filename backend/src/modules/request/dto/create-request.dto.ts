import { User } from "src/modules/user/entities/user.entity";

export class CreateRequestDto {
    type: string;
    item_name: string;
    description: string;
    status:string;
    user: User;
}
