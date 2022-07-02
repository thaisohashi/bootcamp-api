import express from 'express';
import { categoryRoutes } from './routes/category.route';
import { courseRoutes } from './routes/course.route';
import { env } from './config/environment-variables';
import { AppDataSource } from './config/data-source';
import { errorHandler } from './middlewares';
import { resolve } from 'path';

const PORT = env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(categoryRoutes, courseRoutes);
app.use(errorHandler);
app.use('/files', express.static(resolve(__dirname, '..', 'uploads')));

AppDataSource.initialize()
	.then(() => {
		app.listen(PORT, () => console.log(`Server is running in port: ${PORT}`));
	})
	.catch((error) => console.log(error));
