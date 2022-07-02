import { Router, Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { AppDataSource } from '../config/data-source';
import { multerConfig } from '../config/multer';
import { CourseController } from '../controllers/course.controller';
import { CreateCourseDto } from '../dtos/course/create-course.dto';
import { UpdateCourseDto } from '../dtos/course/update-course.dto';
import { validator } from '../middlewares';
import { CourseService } from '../services/course.service';

const courseRoutes = Router();

const courseController = new CourseController(new CourseService(AppDataSource));

courseRoutes.post(
	'/courses',
	multer(multerConfig).single('image'),
	CreateCourseDto.validators(),
	validator,
	(request: Request, response: Response, next: NextFunction) => {
		courseController.create(request, response).catch((error: Error) => {
			next(error);
		});
	},
);

courseRoutes.get(
	'/courses',
	(request: Request, response: Response, next: NextFunction) => {
		courseController.getAll(request, response).catch((error: Error) => {
			next(error);
		});
	},
);

courseRoutes.get(
	'/courses/:id',
	(request: Request, response: Response, next: NextFunction) => {
		courseController.show(request, response).catch((error: Error) => {
			next(error);
		});
	},
);

courseRoutes.put(
	'/courses/:id',
	multer(multerConfig).single('image'),
	UpdateCourseDto.validators(),
	validator,
	(request: Request, response: Response, next: NextFunction) => {
		courseController.update(request, response).catch((error: Error) => {
			next(error);
		});
	},
);

courseRoutes.delete(
	'/courses/:id',
	(request: Request, response: Response, next: NextFunction) => {
		courseController.delete(request, response).catch((error: Error) => {
			next(error);
		});
	},
);

export { courseRoutes };
