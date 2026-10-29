import { IsString, Length } from "class-validator";

export class updateProfileDto {
  @IsString()
  @Length(2, 100)
  name: string;

  @IsString()
  description: string;
}
