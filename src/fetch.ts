import { isValidUrl } from "./utils";

export const getDocsUrl = async (): Promise<string|undefined> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_ENTRY_POINT}${import.meta.env.VITE_API_ENDPOINT}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    const docsUrl = data.url && isValidUrl(data.url) ? data.url : undefined;
    return docsUrl;
  } catch (e) {
    console.error(e, 'Error fetching data:');
    return undefined;
  }
}