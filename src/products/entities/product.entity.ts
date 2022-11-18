import { ProductImage } from './product-image.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'products' })
export class Product {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('text', {
		unique: true,
	})
	name: string;

	@Column('float', {
		default: 0,
	})
	price: number;

	@Column('text', {
		nullable: true,
	})
	description: string;

	@Column('float', {
		default: 0,
	})
	stock: number;

	@Column('text', {
		array: true,
	})
	sizes?: string[];

	@Column('text')
	gender?: string;

	@OneToMany(() => ProductImage, (productImage) => productImage.product, {
		cascade: true,
		eager: true,
	})
	images?: ProductImage[];
}
