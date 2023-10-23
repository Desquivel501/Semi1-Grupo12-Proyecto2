import { RowDataPacket } from "mysql2";

export function getSuccessfullMessage(data: any) {
  const isRowData = (x: any): x is RowDataPacket[][] => x;
  if (isRowData(data[0])) {
    const response = data[0][0][0];
    return response? response : null;
  }
  return null;
}
