
/**
 * Represent a CLUBEG global Promo
 * @author Malcolm Roy
 */
export class GlobalPromo {

  constructor(
      public id: number,
      public promo_link: string,
      public promo_pic: any,

      // status of HTTP response when data was fetched
      public responseStatus: string,

  ) {}

}
