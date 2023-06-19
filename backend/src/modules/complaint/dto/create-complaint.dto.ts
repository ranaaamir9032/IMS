import { User } from "src/modules/user/entities/user.entity";

export class CreateComplaintDto {
    description: string;
    status: string;
    user:User
}
