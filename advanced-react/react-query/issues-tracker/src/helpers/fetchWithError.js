export async function fetchWithError(url, options) {
  const response = await fetch(url, options);

  if (response.ok) {
    const result = await response.json();

    // there might be some errors in this application if status code is 'ok'

    if (result.error) {
      throw new Error(result.error);
    }

    return result;
  }

  throw new Error(`Error ${response.status}: ${response.statusText}`);
}
