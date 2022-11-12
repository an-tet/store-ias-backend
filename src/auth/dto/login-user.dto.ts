import { IsString, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {
	@IsString({ message: 'El usuario debe ser un texto' })
	@MinLength(3, { message: 'El usuario debe tener minimo 3 caracteres' })
	@MaxLength(10, { message: 'La usuario debe tener maximo 20 caracteres' })
	username: string;

	@IsString({ message: 'La contraseña debe ser un texto' })
	@MinLength(9, { message: 'La contraseña debe tener minimo 9 caracteres' })
	@MaxLength(20, { message: 'La contraseña debe tener maximo 20 caracteres' })
	password: string;
}

