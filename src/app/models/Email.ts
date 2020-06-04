
/**
 * Data for sending an email
 * @author Malcolm Roy
 */
export class Email {

  constructor(
      public to: string,
      public from: string,
      public subject: string,
      public data: string[]
  ) {}

}
