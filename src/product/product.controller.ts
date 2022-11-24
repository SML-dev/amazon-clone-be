import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  async createProduct(
    @Body() createProduct: CreateProductDto,
  ): Promise<ProductDocument> {
    return this.productService.create(createProduct);
  }

  @Get()
  async findAllProduct(): Promise<ProductDocument[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  async findProduct(@Param('id') id: string): Promise<ProductDocument> {
    return this.productService.findOneById(id);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProduct: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.update(id, updateProduct);
  }

  @Delete(':id')
  async deleteProduct(
    @Param('id')
    id: string,
  ) {
    return this.productService.delete(id);
  }
}
