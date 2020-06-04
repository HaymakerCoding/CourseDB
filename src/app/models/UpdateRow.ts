
/**
 * Represent a row of data to update in db
 * @author Malcolm Roy
 */
export class UpdateRow {

  constructor(
      public col: string,
      public value: any

  ) {}

}
