import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	ParseUUIDPipe,
	UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('products')
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@Post()
	@UseGuards(AuthGuard())
	create(@Body() createProductDto: CreateProductDto) {
		return this.productsService.create(createProductDto);
	}

	@Get()
	@UseGuards(AuthGuard())
	findAll() {
		return this.productsService.findAll();
	}

	@Get(':id')
	@UseGuards(AuthGuard())
	findOne(@Param('id', ParseUUIDPipe) id: string) {
		return this.productsService.findOne(id);
	}

	@Patch(':id')
	@UseGuards(AuthGuard())
	update(
		@Param('id', ParseUUIDPipe) id: string,
		@Body() updateProductDto: UpdateProductDto,
	) {
		return this.productsService.update(id, updateProductDto);
	}

	@Delete(':id')
	@UseGuards(AuthGuard())
	remove(@Param('id') id: string) {
		return this.productsService.remove(id);
	}
}

