import { Component, OnInit, Input, OnDestroy, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { CourseService } from '../services/course.service';
import { CourseListing } from '../models/CourseListing';
import { Course } from '../models/Course';
import { Router } from '@angular/router';
import { BasicCourse } from '../models/BasicCourse';
import { Subscription } from 'rxjs';
import { ReviewService } from '../services/review.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  @ViewChild('searchInput', { static: false }) public searchInput: ElementRef;
  courses: CourseListing[];
  masterCourseList: CourseListing[];
  subscriptions: Subscription[] = [];
  numCourses: number;
  countries: string[];
  cities: string[];
  provinces: any[];
  regions: any[];
  // master lists are used for refining searches
  masterProvinceList: any[];
  masterCityList: string[];
  masterRegionList: string[];
  countrySearch: string;
  citySearch: string;
  provinceSearch: string;
  regionSearch: string;
  // for tracking how many courses for the curent selected country
  currentCountryName: string;
  currentCountryNum: number;
  // for tracking home many courses for the current selected prov
  currentProvinceName: string;
  currentProvinceNum: number;
  // for tracking home many courses for the current selected city
  currentCityName: string;
  currentCityNum: number;
  // for tracking home many courses for the current selected region
  currentRegionName: string;
  currentRegionNum: number;
  loading: boolean;

  constructor(
    private courseService: CourseService,
    private router: Router,
    private reviewService: ReviewService, private renderer: Renderer2) {

  }

  ngOnInit() {
    this.numCourses = 0;
    this.countrySearch = 'All';
    this.citySearch = 'All';
    this.provinceSearch = 'All';
    this.regionSearch = 'All';
    this.loading = true;
    this.getCourses();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  /**
   * Filter the list by course name using user input text.
   * @param text Course name input by user
   */
  refineList(text: string) {
    this.courses = [];
    if (text === '') {
      // do nothing
    } else {
      this.courses = this.masterCourseList.filter((course) => {
        if (course.fullName.toLowerCase().startsWith(text.toLowerCase())) {
          return course;
        }
      });
      this.numCourses = this.courses.length;
      // reset the other search option variables/selectors
      this.citySearch = 'All';
      this.countrySearch = 'All';
      this.provinceSearch = 'All';
      this.regionSearch = 'All';
      this.currentCountryName = null;
      this.currentCountryNum = 0;
      this.currentProvinceName = null;
      this.currentProvinceNum = 0;
      this.currentCityName = null;
      this.currentCityNum = 0;
    }
  }

  /**
   * Set the list of courses with all courses in database, just basic info like name, address, city, etc.
   * Filter out only the approved listings, approved by admins
   */
  getCourses() {
    this.subscriptions.push(this.courseService.getAll().subscribe(response => {
      if (response.status === 200) {
        const courses = response.payload;
        this.masterCourseList = courses.filter(x => x.approval === 'approved');
        this.getBasicCourses();
      } else {
        console.error(response);
        alert('Sorry there was an error getting courses from the database. Please try back later.');
      }
    }));
  }

  /**
   * Add in all the 'Basic' course listings, these have less info and no course page, just go to external website on select
   */
  getBasicCourses() {
    this.subscriptions.push(this.courseService.getAllBasicCourses().subscribe(response => {
      response.payload.forEach(element => {
        this.masterCourseList.push(element);
        // sort the lists now that basic courses were added
        this.masterCourseList.sort((a, b) => {
          if (a.fullName.toLowerCase() === b.fullName.toLowerCase()) {
            return 0;
          }
          return (a.fullName.toLowerCase() < b.fullName.toLowerCase() ? -1 : 1);
        });
      });
      this.getCountries();
    }));
  }

  /**
   * Get a list of countries for search selector
   */
  getCountries() {
    const countries: string[] = [];
    this.masterCourseList.forEach(x => {
      if (countries.includes(x.country) === false) {
        countries.push(x.country);
      }
    });
    this.countries = countries;
    this.countries.unshift('All');
    this.getProvinces();
  }

  /**
   * Get a list of provinces for search selector options
   */
  getProvinces() {
    this.provinces = [];
    this.masterCourseList.forEach(e => {
      if (e.province !== '') {
        this.provinces.push(e.province);
      }
    });
    this.provinces = this.remove_duplicates(this.provinces).sort();
    this.masterProvinceList = this.provinces;
    this.provinces.unshift('All');
    this.getCities();
  }

  /**
   * Get a list of cities for search selector options
   */
  getCities() {
    this.cities = [];
    this.masterCourseList.forEach(e => {
      if (e.city !== '') {
        this.cities.push(e.city);
      }
    });
    this.cities = this.remove_duplicates(this.cities).sort();
    this.masterCityList = this.cities;
    this.cities.unshift('All');
    this.getRegions();
  }

  /**
   * Get a list of region names for search selector options
   */
  getRegions() {
    this.regions = [];
    this.masterCourseList.forEach(e => {
      if (e.region !== '') {
        this.regions.push(e.region);
      }
    });
    this.regions = this.remove_duplicates(this.regions).sort();
    this.masterRegionList = this.regions;
    this.regions.unshift('All');
    this.loading = false;
  }

  /**
   * Navigate to the course page selected. For standard courses go to the course page on our site. For basic listings go to the external
   * website URL
   * @param id ID of course
   */
  goToCourse(id: number, type: string) {
    if (type === 'standard') {
      this.router.navigate(['course', id]);
    } else {
      const thisCourse = this.courses.find(x => x.id === id);
      window.open(thisCourse.website);
    }
  }

  /**
   * Narrow search of courses by user defined Coutry, Provice, city, region/town.
   * @param target Select Element that changed its set value
   * @param type Location type that changed, ie city, province etc.
   */
  refineSearch(target: HTMLSelectElement, type: string) {
    // first empty the other search Input since we are using selector filter searching now
    this.searchInput.nativeElement.value = null;
    // multi element function so check which type was changed
    if (type === 'city') {
      this.citySearch = target.value;
      this.regionSearch = 'All';
    } else if (type === 'province') {
      this.provinceSearch = target.value;
      this.citySearch = 'All';
      this.regionSearch = 'All';
    } else if (type === 'country') {
      this.countrySearch = target.value;
      this.provinceSearch = 'All';
      this.citySearch = 'All';
      this.regionSearch = 'All';
    } else if (type === 'region') {
      this.regionSearch = target.value;
    }
    // refine course list by search params
    this.courses = [];
    for (const list of this.masterCourseList) {
      // note City and Region are connected in that a city that matches a region name works and vice versa
      if (
        (list.city === this.citySearch || list.region === this.citySearch
          || this.citySearch === 'All') &&
        (list.country === this.countrySearch || this.countrySearch === 'All') &&
        (list.province === this.provinceSearch || this.provinceSearch === 'All') &&
        (list.region === this.regionSearch || list.city === this.regionSearch
          || this.regionSearch === 'All')
        ) {
          this.courses.push(list);
        }
    }
    // setup the text display of current selected country/province/city under the selectors
    if (type === 'country' && this.countrySearch !== 'All') {
      this.currentCountryName = null;
      this.currentProvinceName = null;
      this.currentCityName = null;
      this.currentRegionName = null;
      this.currentCountryNum = 0;
      this.currentProvinceNum = 0;
      this.currentCityNum = 0;
      this.currentRegionNum = 0;
      for (const course of this.courses) {
        this.currentCountryNum++;
      }
      this.currentCountryName = this.countrySearch;
    } else if (type === 'province' && this.provinceSearch !== 'All') {
      this.currentProvinceName = null;
      this.currentProvinceNum = 0;
      this.currentCityName = null;
      this.currentCityNum = 0;
      this.currentRegionName = null;
      this.currentRegionNum = 0;
      for (const course of this.courses) {
        this.currentProvinceNum++;
      }
      this.currentProvinceName = this.provinceSearch;
    } else if (type === 'city' && this.citySearch !== 'All') {
      this.currentCityName = null;
      this.currentCityNum = 0;
      this.currentRegionName = null;
      this.currentRegionNum = 0;
      for (const course of this.courses) {
        this.currentCityNum++;
      }
      this.currentCityName = this.citySearch;
    } else if (type === 'region' && this.regionSearch !== 'All') {
      this.currentRegionName = null;
      this.currentRegionNum = 0;
      for (const course of this.courses) {
        this.currentRegionNum++;
      }
      this.currentRegionName = this.regionSearch;
    } else if (target.value === 'All') {
      // reset all lower down locations depending on location selected
      switch (type) {
        case 'country' : {
          this.currentCountryName = null;
          this.currentCountryNum = 0;
          this.currentProvinceName = null;
          this.currentProvinceNum = 0;
          this.currentCityName = null;
          this.currentCityNum = 0;
          break;
        }
        case 'province' : {
          this.currentProvinceName = null;
          this.currentProvinceNum = 0;
          this.currentCityName = null;
          this.currentCityNum = 0;
          break;
        }
        case 'city' : {
          this.currentCityName = null;
          this.currentCityNum = 0;
          break;
        }
      }
    }
    this.refineProvinces();
    this.refineCities();
    this.refineRegions();

  }

  /**
   * Adjust the province selector by country
   */
  refineProvinces() {
    // refine province selector by country
    if (this.countrySearch !== 'All') {
      this.provinces = [];
      // get a list of provinces filtered by country
      const filtered = this.masterCourseList.filter(x => x.country === this.countrySearch);
      filtered.forEach(e => this.provinces.push(e.province));
      // filter out duplicates
      this.provinces = this.remove_duplicates(this.provinces).sort();
      this.provinces.unshift('All');
    } else if (this.countrySearch === 'All') {
      this.provinces = [];
      this.provinces = this.masterProvinceList;
    }
  }

  /**
   * Adjust the region selector by combinations for country/province/city
   */
  refineRegions() {
    // refine regions by country, province and city
    if (this.citySearch !== 'All' && this.provinceSearch !== 'All' && this.countrySearch !== 'All') {
      this.regions = [];
      // get a list of regions filtered by selected country/province/city combo
      const filtered = this.masterCourseList.filter(x => x.country === this.countrySearch &&
        x.province === this.provinceSearch && x.city === this.citySearch );
      filtered.forEach(e => this.regions.push(e.region));
    } else if (this.provinceSearch === 'All' && this.countrySearch === 'All' && this.citySearch === 'All') {
      // all selectors set to all so show ALL regions
      this.regions = [];
      this.regions = this.masterRegionList;
    } else if (this.countrySearch === 'All' && this.provinceSearch !== 'All' && this.citySearch !== 'All') {
      // filter by province/city
      this.regions = [];
      const filtered = this.masterCourseList.filter(x => x.province === this.provinceSearch && x.city === this.citySearch );
      filtered.forEach(e => this.regions.push(e.region));
    } else if (this.countrySearch === 'All' && this.provinceSearch !== 'All' && this.citySearch === 'All') {
      // filter by province only
      this.regions = [];
      const filtered = this.masterCourseList.filter(x => x.province === this.provinceSearch);
      filtered.forEach(e => this.regions.push(e.region));
    } else if (this.countrySearch === 'All' && this.provinceSearch === 'All' && this.citySearch !== 'All') {
      // filter by city only
      this.regions = [];
      const filtered = this.masterCourseList.filter(x => x.city === this.citySearch );
      filtered.forEach(e => this.regions.push(e.region));
    } else if (this.countrySearch !== 'All' && this.provinceSearch !== 'All' && this.citySearch === 'All') {
      // filter by country/province
      this.regions = [];
      const filtered = this.masterCourseList.filter(x => x.country === this.countrySearch && x.province === this.provinceSearch);
      filtered.forEach(e => this.regions.push(e.region));
    } else if (this.countrySearch !== 'All' && this.provinceSearch === 'All' && this.citySearch !== 'All') {
      // filter by country/city
      this.regions = [];
      const filtered = this.masterCourseList.filter(x => x.country === this.countrySearch && x.city === this.citySearch);
      filtered.forEach(e => this.regions.push(e.region));
    }
    // filter out duplicates and sort
    this.regions = this.remove_duplicates(this.regions).sort();
    this.regions.unshift('All');
  }

  /**
   * Adjust the city selector by combinations for country/province
   */
  refineCities() {
    if (this.provinceSearch !== 'All' && this.countrySearch !== 'All') {
      this.cities = [];
      // get a list of ctities filtered by selected country and province
      const filtered = this.masterCourseList.filter(x => x.country === this.countrySearch &&
        x.province === this.provinceSearch);
      filtered.forEach(e => this.cities.push(e.city));
    } else if (this.provinceSearch === 'All' && this.countrySearch === 'All') {
      this.cities = [];
      this.cities = this.masterCityList;
    } else if (this.provinceSearch === 'All' && this.countrySearch !== 'All') {
      // refine cities by country only
      this.cities = [];
      const filtered = this.masterCourseList.filter(x => x.country === this.countrySearch);
      filtered.forEach(e => this.cities.push(e.city));
    } else if (this.provinceSearch !== 'All' && this.countrySearch === 'All') {
      // refine cities by province only
      this.cities = [];
      const filtered = this.masterCourseList.filter(x => x.province === this.provinceSearch);
      filtered.forEach(e => this.cities.push(e.city));
    }

    // filter out duplicates and sort
    this.cities = this.remove_duplicates(this.cities).sort();
    this.cities.unshift('All');
  }

  /**
   * Remove duplicates from arrays. Used for filtering selector locations.
   * @param array Any array
   */
  remove_duplicates(array: any[]) {
    const set = new Set(array);
    const i = set.values();
    return Array.from(i);
  }

}
