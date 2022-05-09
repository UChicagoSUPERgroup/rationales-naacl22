/**
 * @param {number} currentReviewIndex The index of the current document
 * @property {number} id The id of the current labeler
 * @property {number} maxReviews The number of reviews the labeler is labeling
 * @param {IReview[]} reviews The reviews the labeler will label
 * @param {number} stepNumber The step of the current document labeling page
 * @property {number[]} timeTaken An array of times the user spends on each page
 */
interface ITask {
  currentReviewIndex: number;
  userId: number;
  numReviews: number;
  reviews: IReview[];
  stepNumber: number;
  pageTimes: number[];
}

/**
 * @param {number} id The id of the review
 * @param {string} review The review
 * @param {number} sentiment The sentiment of the review
 * @param {Array<Array<number>>} attention The attention vector from each user
 * @param {Array<Array<1 | 0>>} confusingData The harmful attention vector from each user
 */
export interface IReview {
  id: number;
  numLabelers: number;
  review: string;
  sentiment: number;
}

export default ITask