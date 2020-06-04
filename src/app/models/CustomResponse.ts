
/**
 * Represent an Http response from the server. payload is whatever object we are returning
 * @author Malcolm Roy
 */
export class CustomResponse {

  constructor(
      public status: any,
      public payload: any[]

  ) {}

}
