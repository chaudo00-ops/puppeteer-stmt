export class PDFContext {
  public Y: number;
  public X: number;
  public pageNo: number;

  constructor(
    /** Starts at the top of the page */
    Y: number = 0,
    X: number = 0,
    pageNo: number = 1
  ) {
    this.Y = Y;
    this.X = X;
    this.pageNo = pageNo;
  }

  setY(newValue: number): void {
    this.Y = newValue;
  }

  setX(newValue: number): void {
    this.X = newValue;
  }

  getPageNo(): number {
    return this.pageNo;
  }

  nextPage(): void {
    this.pageNo = this.pageNo + 1;
  }

  resetContextState(): void {
    this.X = 0;
    this.Y = 0;
    this.pageNo = 1;
  }
}
