import { DataSource, Repository } from 'typeorm';
import { CreateCategoryDto } from '../dtos/category/create-category.dto';
import { CreatedCategoryDto } from '../dtos/category/created-category.dto';
import { UpdateCategoryDto } from '../dtos/category/update-category.dto';
import { CategoryEntity } from '../entities/category.entity';
import { HttpException } from '../handler-exceptions/http-exception.provider';
import { HttpStatus } from '../utils/enums/http-status.enum';

export class CategoryService {
	private categoryRepository: Repository<CategoryEntity>;

	constructor(private readonly connection: DataSource) {
		this.categoryRepository = this.connection.getRepository(CategoryEntity);
	}

	async create({ name }: CreateCategoryDto): Promise<CreatedCategoryDto> {
		try {
			const createCategory = this.categoryRepository.create({ name });
			const savedCategory = await this.categoryRepository.save(createCategory);
			return new CreatedCategoryDto(savedCategory);
		} catch (error) {
			throw new HttpException(
				'Houve um erro ao cadastrar a categoria!',
				HttpStatus.BAD_REQUEST,
			);
		}
	}

	async getAll(): Promise<CreatedCategoryDto[]> {
		try {
			const categories = await this.categoryRepository.find();
			return categories.map((category) => new CreatedCategoryDto(category));
		} catch (error) {
			throw new HttpException(
				'Houve um erro ao listar as categorias!',
				HttpStatus.BAD_REQUEST,
			);
		}
	}

	async show(id: string): Promise<CreatedCategoryDto> {
		try {
			const category = await this.categoryRepository.findOne({ where: { id } });
			if (!category) {
				throw new HttpException(
					'Categoria não encontrada!',
					HttpStatus.NOT_FOUND,
				);
			}
			return new CreatedCategoryDto({ id: category.id, name: category.name });
		} catch (error) {
			throw new HttpException(
				'Houve um erro ao procurar a categoria!',
				HttpStatus.BAD_REQUEST,
			);
		}
	}

	async update(
		id: string,
		{ name }: Partial<UpdateCategoryDto>,
	): Promise<void> {
		const oldCategory = await this.categoryRepository.findOne({
			where: { id },
		});
		if (!oldCategory) {
			throw new HttpException(
				'Categoria não encontrada!',
				HttpStatus.NOT_FOUND,
			);
		}
		try {
			const updateCategory = this.categoryRepository.merge(oldCategory, {
				name,
			});
			await this.categoryRepository.save(updateCategory);
		} catch (error) {
			throw new HttpException(
				'Houve um erro ao atualizar a categoria!',
				HttpStatus.BAD_REQUEST,
			);
		}
	}

	async delete(id: string): Promise<void> {
		try {
			await this.categoryRepository.delete(id);
		} catch (error) {
			throw new HttpException(
				'Houve um erro ao deletar a categoria!',
				HttpStatus.BAD_REQUEST,
			);
		}
	}
}
