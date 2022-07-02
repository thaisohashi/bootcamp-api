"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_route_1 = require("./routes/category.route");
const course_route_1 = require("./routes/course.route");
const environment_variables_1 = require("./config/environment-variables");
const data_source_1 = require("./config/data-source");
const middlewares_1 = require("./middlewares");
const path_1 = require("path");
const PORT = environment_variables_1.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(category_route_1.categoryRoutes, course_route_1.courseRoutes);
app.use(middlewares_1.errorHandler);
app.use('/files', express_1.default.static((0, path_1.resolve)(__dirname, '..', 'uploads')));
data_source_1.AppDataSource.initialize()
    .then(() => {
    app.listen(PORT, () => console.log(`Server is running in port: ${PORT}`));
})
    .catch((error) => console.log(error));
//# sourceMappingURL=server.js.map