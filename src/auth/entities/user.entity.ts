import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('users')
@Unique('USERNAME_UNIQUE', ['username'])
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('text', {
		unique: true,
	})
	username: string;

	@Column('text', {
		select: false,
	})
	password: string;

	@Column('text', {
		unique: true,
	})
	email: string;

	@Column('text', {
		name: 'first_name',
	})
	firstName: string;

	@Column('text', {
		name: 'last_name',
	})
	lastName: string;

	@Column('bool', {
		default: true,
	})
	isActive: boolean;

	@Column('text', {
		array: true,
		default: ['user'],
	})
	roles: string[];
}

