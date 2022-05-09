import IExportData from "./Models/exportData";
import { IReview } from "./Models/taskData";

/**
 * The REST client for the SUPERserver api
 *
 * @param {string} url SUPERserver url
 */

type ReviewTup = [number, number[]]
class SUPERServerClient {
  /** REST URLS */
  public SUPERGetIdsUrl: string = "YOURURL/assign_ids.php?userId=";
  public SUPERGetReviewUrl: string = "YOURURL/readimdb.php?id=";
  public SUPERPostAttentionUrl: string = "YOURURL/post_attention.php";
  public SUPERInstructionsGetUrl: string = "YOURURL/give_instructions_set.php";
  public SUPERInstructionsSetUrl: string = "YOURURL/set_i_set_data.php";
  public SUPERTestUrl: string = "YOURURL/test_submit.php";

  public async getIds(userId: number): Promise<ReviewTup> {
    const res: Response = await fetch(this.SUPERGetIdsUrl + userId.toString());
    const reviewIds: object = JSON.parse(await res.text())

    return [parseInt(Object.keys(reviewIds)[0], 10), Object.values(reviewIds)[0]]
  }

  public async getReview(id: number): Promise<IReview> {
    const res: Response = await fetch(this.SUPERGetReviewUrl + id.toString());
    const bodyText: string[] = (await res.text()).split("\n");

    return {
      id,
      numLabelers: 1,
      review: bodyText[1],
      sentiment: parseInt(bodyText[0], 10),
    };
  }

  public async setAttentionData(
    exportData: IExportData,
    additionalInformation: boolean,
    test: boolean
  ): Promise<Response | void> {
    console.log(JSON.stringify(exportData));
    let url: string;
    if (test) 
      url = this.SUPERTestUrl;

    else url = additionalInformation ? this.SUPERInstructionsSetUrl : this.SUPERPostAttentionUrl
    return fetch(url, {
      body: "jamar=" + JSON.stringify(exportData) + "&user=" + exportData.userId.toString(),
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });
  }

  public async getInstructionsSetReviews(): Promise<IReview[]> {
    const res: Response = await fetch(this.SUPERInstructionsGetUrl)
    const bodyJson: object = JSON.parse(await res.text());

    const reviewArr: IReview[] = [];
    Object.keys(bodyJson).forEach((key) => {
      reviewArr.push({
        id: parseInt(key, 10),
        numLabelers: -1,
        review: bodyJson[key]['review'],
        sentiment: bodyJson[key]['sentiment']
      })
    })

    return reviewArr;
  }
}

export default SUPERServerClient;
