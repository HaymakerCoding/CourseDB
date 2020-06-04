
/**
 * Represent a GolfCourse with its basic properties for list
 * @author Malcolm Roy
 */
export class CourseListing {

  constructor(
      public id: number,
      public fullName: string,
      public address: string,
      public city: string,
      public province: string,
      public country: string,
      public region: string,
      public courseURL: string,
      public owner: number,
      public listingType: string,
      public website: string,
      public approval: string,
      public numReviews: number,
      public score: number
  ) {}

}

