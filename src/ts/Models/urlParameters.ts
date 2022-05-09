import CookieJar from './cookieJar';

/**
 * Expresses the possible url parameters
 */
export interface IUrlParameters {
  instructions: number;
  combinedInterface: boolean;
  numReviews: number;
  shouldShowConfusingWords: boolean;
  shouldAllowAttentionLevels: boolean;
  shouldLabelOpposite: boolean;
  test: boolean;
  userId: number;
}

/**
 * Simply determines the url parameters
 */
const getUrlParams = (): IUrlParameters => {
  // Gets the url parameters if they are present
  const urlParamsStr: string = window.location.href.split("?")[1];
  const cookieInt: number = CookieJar.getCookieValue('userId');
  const params: IUrlParameters = {
    combinedInterface: false,
    instructions: 0,
    numReviews: 10,
    shouldAllowAttentionLevels: false,
    shouldLabelOpposite: false,
    shouldShowConfusingWords: false,
    test: false,
    userId: isNaN(cookieInt) ? 2 : cookieInt,
  };
  CookieJar.setCookieValue('userId', params.userId.toString());
  CookieJar.setDaysUntilExpiration(1);

  /** DEBUG */

  // For testing with different review sets, uncomment the line below
  // CookieJar.deleteCookie('userId');
  console.log(params.userId)

  /**********/

  if (urlParamsStr) {
    urlParamsStr.split("&").forEach((term: string) => {
      if (term === "showConfusing") params.shouldShowConfusingWords = true;
      else if (term === "attLevels") params.shouldAllowAttentionLevels = true;
      else if (term === "labelOpposite") params.shouldLabelOpposite = true;
      else if (term === "test") params.test = true;
      else if (term.includes("combined")) params.combinedInterface = true
      else if (term.includes("numReviews"))
        params.numReviews = parseInt(term.split("=")[1], 10);
      else if (term.includes("userId"))
        params.userId = parseInt(term.split("=")[1], 10);
      else if (term.includes("instructions"))
        params.instructions = parseInt(term.split("=")[1], 10)
    });
  }

  if ([14, 15, 16].includes(params.instructions))
    params.shouldLabelOpposite = true;

  return params;
};

export default getUrlParams;
