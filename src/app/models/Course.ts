import { Promo } from './Promo';

/**
 * Represents a GolfCourse. All attributes needed for a full page golf course listing.
 * @author Malcolm Roy
 */
export class Course {

  constructor(
      public id: number,
      public fullName: string,
      public address: string,
      public region: string,
      public city: string,
      public province: string,
      public country: string,
      public about: string,
      public phone: string,
      public website: string,
      public email: string,
      public facebook: string,
      public twitter: string,
      public youtube: string,
      public instagram: string,
      public map: string,
      public logo: any,
      public featureImage: any,
      public featuredPromoLink: string,
      public banner: string,

      public headlineClubeg: string,
      public leftBoxLink: string,
      public leftBoxTitle: string,
      public leftBoxText: string,
      public rightBoxLink: string,
      public rightBoxTitle: string,
      public rightBoxText: string,
      public centerBoxTitle: string,

      public slider1: string,
      public slider2: string,
      public slider3: string,
      public slider4: string,
      public slider5: string,
      public slider6: string,

      public moreInfoText1: string,
      public moreInfoLink1: string,
      public moreInfoText2: string,
      public moreInfoLink2: string,
      public moreInfoText3: string,
      public moreInfoLink3: string,
      public moreInfoText4: string,
      public moreInfoLink4: string,
      public moreInfoText5: string,
      public moreInfoLink5: string,
      public moreInfoText6: string,
      public moreInfoLink6: string,
      public moreInfoText7: string,
      public moreInfoLink7: string,
      public moreInfoText8: string,
      public moreInfoLink8: string,

      public scorecard: string,
      public tourCourse: string,

      public promos: Promo[]


  ) {}

}
