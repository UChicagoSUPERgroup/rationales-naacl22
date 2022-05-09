import ICurrentSessionData from "./currentSessionData";

export interface IExportData {
  instructions: number
  shouldAllowAttentionLevels: boolean; // Not used for now
  shouldLabelOpposite: boolean;
  noDrag: boolean
  shouldOnlyLabel: boolean
  pageTimes: string[]; // Json doesn't easily handle floats
  reviewIds: number[];
  sessionData: ICurrentSessionData
  userId: number;
}

export default IExportData;
