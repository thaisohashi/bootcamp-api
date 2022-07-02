import { CourseEntity } from '../../entities/course.entity';
import { CreateCourseDto } from './create-course.dto';

export class CreatedCourseDto extends CreateCourseDto {
	id!: string;
	created_at?: Date;
	updated_at?: Date;

	constructor({
		id,
		name,
		description,
		value,
		image,
		disponibility,
		category,
		created_at,
		updated_at
	}: CourseEntity) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.value = value;
		this.image = image;
		this.disponibility = disponibility;
		this.categoryId = category.id;
		this.created_at = created_at;
		this.updated_at = updated_at;
	}
}
