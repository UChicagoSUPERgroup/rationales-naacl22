# Data Supplement

This data supplement contains three types of data as our open data release.

First, the word-selection-heatmap-review-*.pdf files are variations on Figure 4 (a heatmap showing the response by word across all conditions and phases) from the main body of the text for all 10 reviews.

Second, the SurveyData-Phase*.csv files contains each participant's survey results, including demographic information, as exported from Qualtrics and cleaned. Note that not all participants opted into open data release, so these files deviate from the data reported in the paper as follows:

* In Phase 1, 109 participants opted into open data release; 10 declined
* In Phase 2, 114 participants opted into open data release; 11 declined
* In Phase 3, 84 participants opted into open data release; 4 declined

Third, data.json is a JSON file containing the raw data for the words participants selected as rationales in our React app, as well as their survey answers about the specific reviews. When cross-referencing the JSON objects for each participant to their survey data, match the five-digit userId field in the CSV file and the corresponding user field in the JSON file. Note that two different participants were randomly assigned the ID 61056, one in Phase 1 (condition 4) and one in Phase 3 (condition 22). These are indeed distinct users.

## Conditions

Conditions are numbered in the data release, and they correspond as follows to the names reported in the paper:

Phase 1
1: Baseline
2: Generalize
3: %, not shown
4: %, shown
5: Zaidan
6: Sen

Phase 2
11: Baseline
12: Generalize
13: Zaidan
14: Baseline, 2-sided
15: Generalize, 2-sided
16: Zaidan, 2-sided

Phase 3
20: Zaidan
21: Labels Only
22: Zaidan, No Dragging
23: Zaidan, No Dragging, Words Only
