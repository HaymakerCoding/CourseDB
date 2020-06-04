
/**
 * Represent a GolfCourse with its basic properties for list
 * @author Malcolm Roy
 */
export class BasicCourse {

  constructor(
      public id: number,
      public fullName: string,
      public website: string,
      public city: string,
      public province: string,
      public country: string,
      public region: string,
      public submittedBy: string,
      public submitterEmail: string,
      public listingType: string

  ) {}

}
