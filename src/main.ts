import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common/pipes';
import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as yaml from 'yaml';
import * as path from 'path';
import { readFile } from 'node:fs/promises';
import { env } from 'process';

async function bootstrap() {
  const port = env.PORT || 4000;
  const app = await NestFactory.create(AppModule);

  try {
    const __dirname = path.resolve();
    const path_yaml = path.join(__dirname, 'doc', 'api.yaml');
    const yamlString = await readFile(path_yaml, { encoding: 'utf8' });
    const docYaml = yaml.parse(yamlString);

    SwaggerModule.setup('/doc', app, docYaml);
  } catch (err) {
    return process.stdout.write(
      'Error during reading swagger file: ' + err + '\n',
    );
  }

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port, () =>
    process.stdout.write('Server just started on port ' + port + '\n'),
  );
}
bootstrap();
