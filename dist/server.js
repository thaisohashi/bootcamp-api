"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const categories = [
    {
        id: 1,
        name: 'NodeJS',
        created_at: '2022-05-22 00:00:00',
        update_at: '2022-05-22 00:00:00'
    }
];
app.get('/', (request, response) => {
    return response.json({ status: 'sucess', version: '1.0.0 ' }).status(200);
});
app.get('/categories', (request, response) => {
    return response.json(categories).status(200);
});
app.listen(3000, () => {
    console.log('Server in running');
});
//# sourceMappingURL=server.js.map