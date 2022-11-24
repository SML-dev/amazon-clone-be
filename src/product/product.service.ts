import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async create(createProduct: CreateProductDto): Promise<ProductDocument> {
    const newProduct = new this.productModel(createProduct);
    return newProduct.save();
  }

  async findAll(): Promise<ProductDocument[]> {
    return this.productModel.find({}).exec();
  }

  async findOneById(id: string): Promise<ProductDocument> {
    return this.productModel.findById(id).exec();
  }

  async update(
    id: string,
    updateProduct: UpdateProductDto,
  ): Promise<ProductDocument> {
    const product = await this.productModel.findById(id);
    Object.assign(product, updateProduct);
    return await product.save();
  }

  async delete(id: string) {
    return this.productModel.deleteOne({ id }).exec();
  }
}
