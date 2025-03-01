import { IsString } from "class-validator";
export class UserEntity {
  @IsString()
  username: string;
}
