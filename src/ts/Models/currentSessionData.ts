/**
 * **The data of the selections that the labeler gave us**
 *
 * @property {number[][]} attentionData The attention data the user gives us
 * @property {number[][]} classificationData The classification the user gives us
 * @property {number[][]} confusingWordData The confusing data the user gives us
 */
interface ICurrentSessionData {
  attentionData: number[][]; // Binary [-1, 0, 1] -> [del, not selected, selected]
  classificationData: number[]; // Binary [0, 1] -> [Negative, Positive]
  confusingWordData: number[][];
  confidenceData: number[][]; // [1, 2, 3, 4, 5] -> [SD, D, N, A, SA]
  draggedLists: number[][][]; // [number of review [Number of drags [tuple of dragged points]]] 
  oppositeDraggedLists: number[][][];
  oppositeWordData: number[][];
  totalInteractions: number[];
  interactions: IInteraction[][];
}

export interface IInteraction {
  interactionIndices: number[];
  interactionType: InteractionTypeEnum;
}

export enum InteractionTypeEnum {
  Deselect = "deselect",
  DragDeselect = "drag_deselect",
  DragSelect = "drag_select",
  DragStrongSelect = "drag_strong_select",
  Select = "select",
  SelectNegative = "select_negative",
  SelectPositive = "select_positive",
  StrongSelect = "strong_select",
  labelConfidenceChange = "label_confidence_change",
  selectionConfidenceChange = "selection_confidence_change",
}

export default ICurrentSessionData;
