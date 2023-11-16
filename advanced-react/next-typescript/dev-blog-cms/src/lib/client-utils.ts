export function createFormData(data: any): FormData {
  const form = new FormData();

  for (const key in data) {
    const value = data[key as keyof typeof data];

    if (value) form.append(key, value);
  }

  return form;
}

export async function waitClient(seconds: number) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

export function trimText(text: string, trimBy: number): string {
  if (text.length <= trimBy) return text;
  return text.substring(0, trimBy).trim() + '...';
}
