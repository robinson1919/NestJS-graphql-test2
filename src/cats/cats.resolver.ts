  
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CatsService } from './cats.service';
import { CatType } from './dto/create-cat.dto';
import { CatInput } from './input/cat.input';
import { Param } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Resolver()
export class CatsResolver {
  constructor(private readonly catsService: CatsService) {}

  @Query(() => String)
  async hello() {
    return 'hello';
  }

  @Query(() => [CatType])
  async cats() {
    return this.catsService.findAll();
  }

  @Mutation(() => CatType)
  async oneCat(@Args('input') id: string) {
    return this.catsService.findOne(id);
  }

  @Mutation(() => CatType)
  async createCat(@Args('input') input: CatInput) {
    return this.catsService.create(input);
  }

  @Mutation(() => CatType)
  async deleteCat(@Args('input') id: string) {
    return this.catsService.delete(id);
  }

  @Mutation(() => CatType)
  async updateCat(
    @Args('id') id: string,
    @Args('input') input: CatInput) {
    return this.catsService.update(id, input);
  }
}