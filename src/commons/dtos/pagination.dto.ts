import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";
import { Type } from "class-transformer";


export class PaginationDto {
    @IsOptional()
    @IsPositive()
    @Type(() => Number) // enableImplicitConversions: true
    limit?: number;

    @IsOptional()
    @Min(0)
    @Type(() => Number) // enableImplicitConversions: true
    offset?: number;
}
