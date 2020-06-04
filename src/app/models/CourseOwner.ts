
/**
 * Represents basic owner info between a member and a golfcourse they are managing
 * @author Malcolm Roy
 */
export class CourseOwner {

  constructor(
      public courseId: number,
      public memberId: number,
      public courseName: string,
      public memberName: string,
      public type: string

  ) {}

}
