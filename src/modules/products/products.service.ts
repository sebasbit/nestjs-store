import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { User } from '../users/entities/user.entity';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    private categoriesService: CategoriesService,
  ) {}

  create(user: User, createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productsRepository.create({
      name: createProductDto.name,
      description: createProductDto.description,
      price: createProductDto.price,
      user: { id: user.id },
      categories: createProductDto.categories.map((id) => ({ id })),
    });

    return this.productsRepository.save(product);
  }

  findAll(): Promise<Product[]> {
    return this.productsRepository.find({ relations: { categories: true } });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: { categories: true },
    });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<void> {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: { categories: true },
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    if (updateProductDto.name) {
      product.name = updateProductDto.name;
    }

    if (updateProductDto.description !== undefined) {
      product.description = updateProductDto.description;
    }

    if (updateProductDto.price) {
      product.price = updateProductDto.price;
    }

    if (updateProductDto.categories) {
      product.categories = await this.categoriesService.findByIds(
        updateProductDto.categories,
      );
    }

    await this.productsRepository.save(product);
  }

  async remove(id: number): Promise<void> {
    await this.productsRepository.delete(id);
  }
}
