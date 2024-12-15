import { select } from '@inquirer/prompts';

export async function prompts(promptItem: any) {
  const choices = Object.keys(promptItem.items).map((item: string) => {
    return {
      name: item,
      description: (promptItem.items as any)[item].message,
      value: (promptItem.items as any)[item]
    };
  });

  let value;
  if (promptItem.type === 'select') {
    value = await select({
      message: promptItem.message,
      choices
    });
  }

  if (value.items) {
    return await prompts(value);
  }
  else {
    return value.title;
  }
}
