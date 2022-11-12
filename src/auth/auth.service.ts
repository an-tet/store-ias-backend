import {
	BadRequestException,
	Injectable,
	Logger,
	UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginUserDto, CreateUserDto, UpdateUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	private logger = new Logger('ProductService');
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		private readonly jwtService: JwtService,
	) {}

	private getJwt(payload: JwtPayload) {
		const token = this.jwtService.sign(payload);
		return token;
	}

	async create(createUserDto: CreateUserDto) {
		try {
			const { password, passwordConfirmed, ...userData } = createUserDto;

			if (password !== passwordConfirmed)
				throw new BadRequestException('Las contraseñas no coinsiden');

			const userCreated = this.userRepository.create({
				...userData,
				password: bcrypt.hashSync(password, 10),
			});
			await this.userRepository.save(userCreated);
			delete userCreated.password;
			return userCreated;
		} catch (error) {
			console.log(error);

			this.handleExceptions(error);
		}
	}

	async login(loginUserDto: LoginUserDto) {
		const { password, username } = loginUserDto;

		const user = await this.userRepository.findOne({
			where: { username },
			select: { username: true, password: true, id: true },
		});

		if (!user || !bcrypt.compareSync(password, user.password))
			throw new UnauthorizedException('Las credenciales no son validas');

		return { ...user, token: this.getJwt({ id: user.id }) };
	}

	findAll() {
		return `This action returns all auth`;
	}

	findOne(id: number) {
		return `This action returns a #${id} auth`;
	}

	update(id: number, updateUserDto: UpdateUserDto) {
		return `This action updates a #${id} auth`;
	}

	remove(id: number) {
		return `This action removes a #${id} auth`;
	}

	handleExceptions(error: any): never {
		this.logger.error(error);
		const UNIQUE_ERROR_CODE = '23505';
		if (error.code === UNIQUE_ERROR_CODE) {
			if (error.constraint === 'UQ_fe0bb3f6520ee0469504521e710')
				throw new BadRequestException('El usuario ya se encuentra en uso');

			if (error.constraint === 'UQ_97672ac88f789774dd47f7c8be3')
				throw new BadRequestException('El correo ya se encuentra en uso');
		}

		throw new Error('Error no controlado, contacte con el equipo tecnico');
	}
}

