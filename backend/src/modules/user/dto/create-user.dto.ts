import { Organization } from "src/modules/organization/entities/organization.entity";
import { Role } from "src/modules/roles/entities/role.entity";
import { IsNotEmpty, IsEmail } from "class-validator";



export class CreateUserDto {

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    contact: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    picture: string;

    @IsNotEmpty()
    role: Role;

    @IsNotEmpty()
    organization: Organization;
}
