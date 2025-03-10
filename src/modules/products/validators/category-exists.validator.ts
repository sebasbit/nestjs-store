import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { CategoriesService } from '../../categories/categories.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class CategoryExists implements ValidatorConstraintInterface {
  constructor(private readonly categoriesService: CategoriesService) {}

  async validate(categoryIds: number[], args: ValidationArguments) {
    const categories = await this.categoriesService.findByIds(categoryIds);
    return categories.length === categoryIds.length;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Some categories do not exist';
  }
}
