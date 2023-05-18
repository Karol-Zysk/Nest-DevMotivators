"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const mongo_exception_filter_1 = require("./filters/mongo-exception.filter");
const port = process.env.PORT || 4000;
console.log(`app is running on port${port}`);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: 'http://localhost:5173',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
    }));
    app.useGlobalFilters(new mongo_exception_filter_1.MongoExceptionFilter());
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map