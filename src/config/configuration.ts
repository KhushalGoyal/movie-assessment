import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';

enum Environment {
    Development = "development",
    Production = "production",
    Test = "test",
    Provision = "provision",
}

export class EnvironmentVariables {
    @IsEnum(Environment)
    NODE_ENV: Environment;

    @IsNumber()
    PORT: number;

    @IsString()
    JWT_SECRET: string;

    @IsString()
    DATABASE_USER: string;

    @IsString()
    DATABASE_PASSWORD: string;

    @IsString()
    DATABASE_HOST: string;

    @IsString()
    DATABASE_NAME: string;
}

export class AppConfig {
    PORT: number;
    URI: string;
    JWT_SECRET: string;
    DATABASE_NAME: string;
}

export function validate(config: Record<string, unknown>) {
    const validatedConfig = plainToInstance(
        EnvironmentVariables,
        config,
        { enableImplicitConversion: true },
    );
    const errors = validateSync(validatedConfig, { skipMissingProperties: false });

    if (errors.length > 0) {
        throw new Error(errors.toString());
    }
    return validatedConfig;
}


export const appConfig = () : AppConfig => ({
    PORT: parseInt(process.env.PORT, 10) || 3000,
    URI: `mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:27017`,
    DATABASE_NAME: process.env.DATABASE_NAME,
    JWT_SECRET: process.env.JWT_SECRET
});
