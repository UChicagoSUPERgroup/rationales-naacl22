/**
 * Provides useful functions for prepping strings and reviews
 * in the context of the study
 */
class TextUtils {
  /**
   * Checks if a character is not alpha num.
   * (any non alpha num character is a delimiter)
   *
   * If the length of the string is greater than 1, it will only check the first character
   * @param char The character that we are testing to see is a delimiter
   */
  public static isDelimiter(char: string): boolean {
    /* 
    
    Char | Dec

    0-9    48-57
    A-Z    65-90
    a-z    97-122
    */

    const code: number = char.charCodeAt(0);
    return (
      !this.inBetween(code, 48, 57) &&
      !this.inBetween(code, 65, 90) &&
      !this.inBetween(code, 97, 122) &&
      // Apostrophe used as part of a word
      char !== "'"
    );
  }

  /**
   * Splits the string based on spaces, and separates delimiters as well
   *
   * New Philosophy:
   * Split by
   * @param str The string that is being split
   */
  public static split(s: string): string[] {
    const words: string[] = s.split(" ");
    const purifiedWordsArr: string[] = [];

    words.forEach((word: string) => {
      let str = "";
      const ws: string[] = [];
      word.split("").forEach((char: string) => {
        if (this.isDelimiter(char)) {
          ws.push(str, char);
          str = "";
        } else str += char;
      });

      if (str !== "") ws.push(str);
      purifiedWordsArr.push(...ws, " ");
    });

    // For some reason, empty strings are in the array
    purifiedWordsArr.pop();
    return purifiedWordsArr.filter((word: string) => word.length > 0);
  }

  /**
   * Count the number of words in a review given an attention
   * vector
   * 
   * @param attentionData The attention data for the review
   * @param selected If you only want to count selected words
   */
  public static numWords(attentionData: number[], selected?: boolean): number {
    return attentionData.filter((n: number) => n === 1 || n === (selected ? 1 : 0)).length;
  }

  /**
   * Turns a string into into it's appropriate init value
   * @param str A specific string
   */
  public static strToSelectedValue(str: string): number {
    return this.isDelimiter(str) ? -1 : 0;
  }

  /**
   * Checks if a number, x, is in between two bounds a and b inclusive
   * @param x The value in the middle of the inequality
   * @param a The low bound
   * @param b The high bound
   */
  private static inBetween(x: number, a: number, b: number): boolean {
    return x >= a && x <= b;
  }
}

export default TextUtils;
