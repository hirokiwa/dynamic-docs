import { getDocsUrl } from './fetch';
import { isEmptyString, redirectTo, selectDivQuery } from './utils';

const main = async () => {
  viewLoading();
  const docsUrl = await getDocsUrl();
  const ultimateView = generateUltimateView(docsUrl);
  ultimateView && viewInnerAppElement(ultimateView);
}

const viewInnerAppElement = (newElement: string) => {
  const appElement = selectDivQuery('#app');

  const updateElement = (appElement: HTMLDivElement) => {
    appElement.innerHTML = newElement;
  }
  const handleNotFound = () => {
    throw new Error("Element is not found.");
  };
  
  appElement
    ? updateElement(appElement)
    : handleNotFound();
}

const generateUltimateView = (docsUrl: string | undefined) => {
  return (!docsUrl || redirectTo(docsUrl) === "faild")
    ? generateErrorView(
      docsUrl ? "リダイレクトに失敗しました。" : "ドキュメントの取得に失敗しました。",
      docsUrl ? "議事録を開く" : "議事録フォルダを開く",
      docsUrl ?? (import.meta.env.VITE_DOCS_FOLDER_URL ?? ""),
    )
    : undefined;
}

const generateErrorView = (errorMessage: string, linkTitle: string, url: string) => {
  return `
    <div>
      <p>
        <strong>${ isEmptyString(errorMessage) ? "エラーが発生しました。" : errorMessage }</strong>
        ${
          isEmptyString(url)
          ? ""
          :`
              <br>
              <a href=${url}>👉 ${ isEmptyString(linkTitle) ? url : linkTitle }</a>
          `
        }
      </p>
    </div>
  `
}

const viewLoading = () => {
  viewInnerAppElement(`
    <div>
      <div class="loader loader--style3" title="2">
      <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
        <path class="loadingIcon" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
          <animateTransform attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="0 25 25"
            to="360 25 25"
            dur="0.6s"
            repeatCount="indefinite"/>
        </path>
      </svg>
      </div>
      リダイレクト中...
    </div>
  `)
}

main();