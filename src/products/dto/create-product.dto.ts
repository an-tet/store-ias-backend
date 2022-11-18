import {
	IsArray,
	IsBase64,
	IsIn,
	IsInt,
	IsMimeType,
	IsNumber,
	IsOptional,
	IsPositive,
	IsString,
	MinLength,
} from 'class-validator';

export class CreateProductDto {
	@IsString()
	@MinLength(1)
	name: string;

	@IsNumber()
	@IsPositive()
	price: number;

	@IsString()
	description: string;

	@IsInt()
	@IsPositive()
	@IsOptional()
	stock: number;

	@IsString({ each: true })
	@IsArray()
	sizes?: string[];

	@IsIn(['hombre', 'mujer', 'niño', 'unisex'])
	gender?: string;

	// @IsString({ each: true })
	@IsMimeType({ each: true })
	@IsArray()
	@IsOptional()
	images?: string[];
}
