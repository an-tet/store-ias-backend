import {
	BadRequestException,
	Injectable,
	Logger,
	NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from './dto';
import { Product, ProductImage } from './entities';

@Injectable()
export class ProductsService {
	private logger = new Logger('ProductService');

	constructor(
		@InjectRepository(Product)
		private readonly productRepository: Repository<Product>,
		@InjectRepository(ProductImage)
		private readonly productImageRepository: Repository<ProductImage>,
		private readonly dataSource: DataSource,
	) {}

	async create(createProductDto: CreateProductDto) {
		try {
			const { images = [], ...productDetails } = createProductDto;
			const productCreated = this.productRepository.create({
				...createProductDto,
				images: images.map((image) =>
					this.productImageRepository.create({ image }),
				),
			});
			await this.productRepository.save(productCreated);
			return productCreated;
		} catch (error) {
			this.handleExceptions(error);
		}
	}

	findAll() {
		return this.productRepository.find();
	}

	findOne(id: string) {
		return this.productRepository.findOneBy({ id });
	}

	async update(id: string, updateProductDto: UpdateProductDto) {
		const { images, ...toUpdate } = updateProductDto;

		const preloadedProduct = await this.productRepository.preload({
			id,
			...toUpdate,
		});

		if (!preloadedProduct)
			throw new NotFoundException(
				'El producto con el id: ${ id } no fue encontrado',
			);

		const queryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {
			if (images) {
				await queryRunner.manager.delete(ProductImage, { product: { id } });
				preloadedProduct.images = images.map((image) =>
					this.productImageRepository.create({ image }),
				);
			}
			await queryRunner.manager.save(preloadedProduct);
			queryRunner.commitTransaction();
			return this.findOne(id);
		} catch (error) {
			queryRunner.commitTransaction();
			this.handleExceptions(error);
		}
	}

	async remove(id: string) {
		return await this.productRepository.delete(id);
	}

	handleExceptions(error: any) {
		if (error.code === '23505') throw new BadRequestException(error.detail);

		this.logger.error(error);
		throw new Error('Error no controlado, contacte con el equipo tecnico');
	}
}

