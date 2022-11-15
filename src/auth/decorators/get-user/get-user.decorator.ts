import { User } from '../../entities/user.entity';
import {
	createParamDecorator,
	ExecutionContext,
	InternalServerErrorException,
} from '@nestjs/common';

export const GetUser = createParamDecorator(
	(data, ctx: ExecutionContext): User | InternalServerErrorException => {
		const req = ctx.switchToHttp().getRequest();
		const user: User = req.user;
		if (!user)
			throw new InternalServerErrorException(
				'No se encontro el ususrio en la petición',
			);

		return user;
	},
);

