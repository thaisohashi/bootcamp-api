import { Router, Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../config/data-source';
import { CategoryController } from '../controllers/category.controller';
import { CreateCategoryDto } from '../dtos/category/create-category.dto';
import { UpdateCategoryDto } from '../dtos/category/update-category.dto';
import { validator } from '../middlewares';
import { CategoryService } from '../services/category.service';

const categoryRoutes = Router();

const categoryController = new CategoryController(
	new CategoryService(AppDataSource),
);

categoryRoutes.get('/', (_request: Request, response: Response) => {
	return response.json({ status: 'success', version: '1.0.0' }).status(200);
});

// CATEGORIES

categoryRoutes.post(
	'/categories',
	CreateCategoryDto.validators(),
	validator,
	(request: Request, response: Response, next: NextFunction) => {
		categoryController.create(request, response).catch((error: Error) => {
			next(error);
		});
	},
);

categoryRoutes.get(
	'/categories',
	(request: Request, response: Response, next: NextFunction) => {
		categoryController.getAll(request, response).catch((error: Error) => {
			next(error);
		});
	},
);

categoryRoutes.get(
	'/categories/:id',
	(request: Request, response: Response, next: NextFunction) => {
		categoryController.show(request, response).catch((error: Error) => {
			next(error);
		});
	},
);

categoryRoutes.put(
	'/categories/:id',
	UpdateCategoryDto.validators(),
	validator,
	(request: Request, response: Response, next: NextFunction) => {
		categoryController.update(request, response).catch((error: Error) => {
			next(error);
		});
	},
);

categoryRoutes.delete(
	'/categories/:id',
	(request: Request, response: Response, next: NextFunction) => {
		categoryController.delete(request, response).catch((error: Error) => {
			next(error);
		});
	},
);

export { categoryRoutes };
