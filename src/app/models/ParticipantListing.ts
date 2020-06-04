
/**
 * Represent a Golfaway Trip participant with basic public listing info
 * @author Malcolm Roy
 */
export class ParticipantListing {

  constructor(
      public id: number,
      public fullName: string,
      public nickname: string,
      public format: string,
      public status: string,
      public member_id: number
  ) {}

}
