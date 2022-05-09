/**
 * Texts that are mainly used in the start page
 */
export enum Titles {
  StartIntroduction = "Welcome!",
  StartBrief1TEN = "Momentarily, we will be showing you 10 movie reviews. For each one, you'll be choosing if the review is positive or negative.",
  StartBrief1TWE = "Momentarily, we will be showing you 20 movie reviews. For each one, you'll be choosing if the review is: ",
  StartBrief5 = "After you review all ten reviews, you will complete a short survey.",
  AdditionalInformation = "Additional Information: ",
  StartBrief3 = "Afterwards, you will choose words or phrases that led to your answer.",
  StartBrief3NoPhrases = "Afterwards, you will choose words that led to your answer.",
  StartBrief3Confusing = "Afterwards, you will choose words in the reviews that influenced your decision the most, and words that might have been confusing or given you difficulty in making a decision",
  StartBrief4 = "As a participant in this study, you will be helping us create an algorithm that can determine if a movie review is negative or positive. The information you provide will help us feed the algorithm data that will help it better understand which movie reviews are positive and negative.",
  MobileText = "Sorry, you can not take this survey on a mobile device, please use a computer.",
  ObsceneReview = "It is possible that some reviews may contain obscene or offensive language. If you are uncomfortable or triggered by reading any of the reviews, click the exclamation point in the upper right-hand corner to skip that review.",
  PressButtonContinue = "Press the button in the corner to continue.",
  ThankYou = "Thank you",
}

/**
 * Class names and their class name
 */
export enum ClassesAndDefs {
  Instruction = "Each of the Labels are Defined as Follows:",
  Positive = "Positive Review",
  PositiveDesc = "A review that suggests the user liked the movie.",
  Negative = "Negative Review",
  NegativeDesc = "A review that suggests the user disliked the movie.",
  Difference = "Difference Between Highlighting Words and Phrases:",
  Word = "Word",
  WordDesc = "A singular, highlighted word that independently led to your justification.",
  Phrase = "Phrase",
  PhraseDesc = "A group of highlighted words side-by-side that collectively led to your justification.",
}

/**
 * Text for classification
 */
export enum ClassificationTexts {
  Helpful = "Click a word once to label it “Somewhat Helpful”, or click it twice to label it “Very Helpful”. A third click will unselect the word. The same rules apply when dragging to select a phrase.",
  Confusing = "Click a word once to label it “Somewhat Confusing”, or click it twice to label it “Very Confusing”. A third click will unselect the word. The same rules apply when dragging to select a phrase.",
  SelectDescriptiveWords = "1) Click individual words and/or 2) Click, hold, and then drag over phrases that helped you label the review as: ",
  CombinedSelection = "Read the review and determine if it is a positive or negative review, and click words or drag over words that led you to your label decision.",
  SelectHarmfulWords = "1) Click individual words and/or 2) Click, hold, and then drag over phrases that gave you the most trouble labeling the review as: ",
  SelectOppositeWords = "1) Click individual words and/or 2) Click, hold, and then drag over phrases that signaled the review could have been: ",
  Positive = "Positive",
}

/**
 * Text for the appbar
 */
export enum AppBarTexts {
  Welcome = "Welcome",
  Instructions = "Instructions",
  Descriptions = "Class Descriptions",
  SelectClass = "Step 1: Select the Most Fitting Classification",
  SelectWords = "Step 2: Select Words or Phrases",
  SelectHarmfulWords = "Step 3: Select Harmful Words",
  SelectOppositeWords = "Step 4: Select words with Opposite Sentiment",
  Finish = "You're Finished!",
}

/**
 * Tooltip text for buttons
 */
export enum TooltipTexts {
  BtnBack = "Go Back",
  BtnCantBack = "You can't go back",
  BtnContinue = "Continue",
  BtnCantContinueLabel = "Please label this review",
  BtnCantContinueConfidence = "Please rate your confidence",
  BtnDataNotLoaded = "Please wait until the reviews are ready to be labeled"
}

export enum Instructions {
  Graphic = "Use the graphic below as an example",
  ClassificationsTitle = "1) Classifications",
  ClassificationInstruction = "The material you will be reading are movie reviews. The first task requires you to determine if a review is a positive review or a negative review.",
  DefinitionIntroduction = "We define positive and negative as follows:",
  SelectionTitle = "2) Selecting Words",
  SelectionInstruction1P = "Select the most important words and phrases in the review that suggest the review is positive.",
  SelectionInstructionTo1P = "Even though you felt the review was negative overall, select the most important words and phrases in the review that might instead suggest the review is positive.",
  SelectionInstruction1N = "Select the most important words and phrases in the review that suggest the review is negative.",
  SelectionInstructionTo1N = "Even though you felt the review was positive overall, select the most important words and phrases in the review that might instead suggest the review is negative.",
  SelectionInstruction2P = "Select the most important words and phrases in the review that suggest the review is positive. Select ONLY words and phrases that, if they appeared in other reviews, would also suggest positive sentiment.",
  SelectionInstructionTo2P = "Even though you felt the review was negative overall, select the most important words and phrases in the review that suggest the review is positive. Select ONLY words and phrases that, if they appeared in other reviews, would also suggest positive sentiment.",
  SelectionInstruction2N = "Select the most important words and phrases in the review that suggest the review is negative. Select ONLY words and phrases that, if they appeared in other reviews, would also suggest negative sentiment.",
  SelectionInstructionTo2N = "Even though you felt the review was positive overall, select the most important words and phrases in the review that suggest the review is negative. Select ONLY words and phrases that, if they appeared in other reviews, would also suggest negative sentiment.",
  SelectionInstruction34P = "Select the most important words and phrases in the review that suggest the review is positive. Aim to select between 10% and 20% of the words in the review.",
  SelectionInstruction34N = "Select the most important words and phrases in the review that suggest the review is negative. Aim to select between 10% and 20% of the words in the review.",
  SelectionInstruction5P = "To justify why a review is positive, highlight the most important words and phrases that would tell someone to see the movie.",
  SelectionInstruction5PNoPhrase = "To justify why a review is positive, highlight the most important words that would tell someone to see the movie.",
  SelectionInstructionTo5P = "Even though you felt the review was negative overall, highlight words and phrases that would instead tell someone to see the movie.",
  SelectionInstruction5N = "To justify why a review is negative, highlight the most important words and phrases that would tell someone not to see the movie.",
  SelectionInstruction5NNoPhrase = "To justify why a review is negative, highlight the most important words that would tell someone not to see the movie.",
  SelectionInstructionTo5N = "Even though you felt the review was positive overall, highlight words and phrases that would instead tell someone not to see the movie.",
  SelectionInstruction6P = "Select ALL words and phrases in the review that would suggest the review is positive.",
  SelectionInstruction6N = "Select ALL words and phrases in the review that would suggest the review is negative.",
  HowToSelectIntroduction = "You can select words in two ways: ",
  ClickingTitle = "1) Clicking: ",
  ClickingDefinition = "You can click on individual words with the mouse pointer.",
  DraggingTitle = "2) Dragging: ",
  DraggingDefinition = "You can select a range of words by clicking and holding on one word and releasing on another with a mouse pointer.",
  NoTouchScreen1 = "If your computer has a touchscreen, ",
  DoNot = "do not ",
  NoTouchScreen2 = "use the touchscreen for this interface, only use your mouse cursor to select words.",
  ConfidenceTitle = "3) Confidence Selection",
  ConfidenceInstruction = "The final task for each review is telling us how confident you are in your selections.",
  PromptIntroduction = "You will be shown two prompts",
  Q1Title = "Question 1)",
  Q1 = "I am completely confident in my labeling of Positive or Negative (how confident you were that the review was positive or negative) ",
  Q2Title = "Question 2)",
  Q2 = "I am completely confident in my selection of words and phrases (how confident that the words and phrases you chose show the review's sentiment.) ",
}
