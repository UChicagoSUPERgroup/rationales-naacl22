import * as React from "react";

// Pages
import ClassSelection from "../Pages/ClassSelection";
import CombinedSelection from "../Pages/CombinedSelection";
import ConfidencePage from "../Pages/ConfidencePage";
// import ConfusingWordSelect from "../Pages/ConfusingWordSelect";
import DescriptiveWordSelect from "../Pages/DescriptiveWordSelect";
import FinishPage from "../Pages/Finish";
import OppositeWordSelect from "../Pages/OppositeWordSelect";
import StartPage from "../Pages/Start";

// Models
import { IUrlParameters } from "./urlParameters";

/**
 * **Creates a list of pages that the labeler will go through. I wish I did this in the first place,
 * but I'm doing it now so it's ok. This is easier when doing some math when setting the selections**
 *
 * The number of pages will be:
 *
 * 3 + (3*maxReviews), if shouldShowConfusing
 *
 * 3 + (2*maxReviews), else
 *
 * @param maxReviews The number of reviews that the labeler will classify
 * @param shouldShowConfusingWords Whether or not the user will label confusing words. Changes the number of pages.
 */
const createPageList = ({
  shouldLabelOpposite,
  numReviews,
  combinedInterface,
}: IUrlParameters, onlyLabel: boolean): JSX.Element[] => {
  const pages: JSX.Element[] = [];

  // Always the first pages
  pages.push(<StartPage key="introduction" />);

  for (let i = 0; i < numReviews; i++) {
    if (combinedInterface) pages.push(<CombinedSelection key={`classSelection${i}`} />);
    else {
      pages.push(<ClassSelection key={`classSelection${i}`} />);

      // We don't want these pages if we only want them to label stuff.
      if (!onlyLabel) pages.push(<DescriptiveWordSelect key={`descriptiveWord${i}`} />);

      if (shouldLabelOpposite) pages.push(<OppositeWordSelect key={`oppositeWord${i}`} />);
    }
    pages.push(<ConfidencePage key={`confidence${i}`} />);

  }

  // Always the last page
  pages.push(<FinishPage key="finish" />);

  return pages;
};

export default createPageList;
