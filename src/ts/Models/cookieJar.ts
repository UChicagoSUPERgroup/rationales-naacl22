/**
 * This class handles a lot of the weirdness that comes to cookies
 */
class CookieJar {
  /**
   * Creates a full cookie with a key, value and expiration date
   * 
   * @param key The key of the cookie being created
   * @param value The value of the cookie being created
   * @param numDays The number of days the cookie is set to expire
   */
  public static setFullCookie(key: string, value: string, numDays: number): void {
    const date = new Date();
    date.setTime(date.getTime() + (numDays * 24 * 60 * 60 * 1000));
    document.cookie = key + '=' + value + '; expires=' + date.toUTCString();
  }

  /**
   * Gets the value of a cookie with a certain key
   * 
   * @param key The key of the cookie
   * @returns The value of the cookie associated with the key
   */
  public static getCookieValue(key: string): number {
    const cookie: string = document.cookie;
    return parseInt(cookie.split(';')[0].split('=')[1], 10) ?? NaN;
  }

  /**
   * Sets a cookie to a value associated with a key
   * @param key The key of the cookie being set
   * @param value The value the cookie is to be set to
   */
  public static setCookieValue(key: string, value: string | number): void {
    const cookie: string = document.cookie;
    document.cookie = key + '=' + value.toString() + ';' + cookie.split(';')[1];
  }

  /**
   * Sets the number of days for a cookie to expire
   * @param numDays The number of days until the cookie is set to expire
   */
  public static setDaysUntilExpiration(numDays: number): void {
    const date = new Date();
    date.setTime(date.getTime() + (numDays * 24 * 60 * 60 * 1000));
    document.cookie = document.cookie.split(';')[0] + 'expires=' + date.toUTCString();
  }

  /**
   * Primarily for debugging
   * 
   * Deletes the value of a cookie associated with a key
   * @param key The key of the cookie to be deleted
   */
  public static deleteCookie(key: string): void {
    CookieJar.setCookieValue(key, '');
  }
}

export default CookieJar