import { cpSync, renameSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { input } from '@inquirer/prompts';
import config from '../template.config.json';
import { prompts } from './utils/prompts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const templatePath = path.resolve(__dirname, '../templates');

export async function bootstrap() {
  const projectName = await input({ message: 'input project name', default: 'ts-project', required: true }).catch(() => {
    console.log('已取消');
    process.exit(1);
  });

  const template = await prompts(config);
  const finalTempPath = path.resolve(templatePath, template);
  const targetPath = path.resolve(process.cwd(), projectName);

  cpSync(finalTempPath, targetPath, { recursive: true });
  renameSync(path.resolve(targetPath, '_gitignore'), path.resolve(targetPath, '.gitignore'));
}

bootstrap();
