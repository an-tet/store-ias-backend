import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
	@IsEmail({}, { message: 'El correo electronico no tiene un formato valido' })
	@IsString({ message: 'El correo electronico debe ser un texto' })
	email: string;

	@IsString({ message: 'El usuario debe ser un texto' })
	@MinLength(3, { message: 'El usuario debe tener minimo 3 caracteres' })
	@MaxLength(10, { message: 'La usuario debe tener maximo 20 caracteres' })
	username: string;

	@IsString({ message: 'La contraseña debe ser un texto' })
	@MinLength(9, { message: 'La contraseña debe tener minimo 9 caracteres' })
	@MaxLength(20, { message: 'La contraseña debe tener maximo 20 caracteres' })
	password: string;

	@IsString({ message: 'La contraseña debe ser un texto' })
	@MinLength(9, { message: 'La contraseña debe tener minimo 9 caracteres' })
	@MaxLength(20, { message: 'La contraseña debe tener maximo 20 caracteres' })
	passwordConfirmed: string;

	@IsString({ message: 'El nombre debe ser un texto' })
	@MinLength(3, { message: 'El nombre debe tener minimo 3 caracteres' })
	firstName: string;

	@IsString({ message: 'El apellido debe ser un texto' })
	@MinLength(3, { message: 'El apellido debe tener minimo 3 caracteres' })
	lastName: string;
}

