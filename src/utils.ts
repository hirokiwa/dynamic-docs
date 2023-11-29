export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true; 
  } catch { 
    return false; 
  }
}

export const selectDivQuery = (selector: string) => {
  try {
    return document.querySelector<HTMLDivElement>(selector);
  } catch (e) {
    console.error(e, "Faild to select query");
    return null;
  }
}

export const redirectTo = (url: string) => {
  try {
    location.replace(url);
    return "success";
  } catch {
    return "faild";
  }
}

export const isEmptyString = (text: string) => {
  return text.replace(" ", "").replace("　", "") === "";
}
