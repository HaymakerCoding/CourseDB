
/**
 * Represent a review submitted by a user for a golfcourse
 * @author Malcolm Roy
 */
export class Review {

  constructor(
      public id: number,
      public userId: number,
      public courseName: string,
      public courseId: number,
      public score: number,
      public comments: string,
      public submitted: any,
      public country: string,
      public userFullName: string | null

  ) {}


}


