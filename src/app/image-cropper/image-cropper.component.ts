import { Component, OnInit, ViewChild, ElementRef, Input, OnDestroy,
  AfterViewInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { CourseService } from '../services/course.service';
import Cropper from 'cropperjs';
import { CustomResponse } from '../models/CustomResponse';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss']
})
export class ImageCropperComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {

  loading: boolean;
  subscriptions: Subscription[] = [];

  @ViewChild('image', { static: false }) public imageElement: ElementRef;

  @Input() public imageSource: string;
  // flag for whether this is for an admin user or regular user
  @Input() userType: string;
  @Input() courseId: number;
  @Input() fileToUpload: any;
  @Input() sliderNum: number;
  @Output() cropDone = new EventEmitter<any>();

  public imageDestination: string;

  initialized: boolean;

  private cropper: Cropper;

  constructor(private courseService: CourseService) { }

  ngOnInit() {
  this.imageDestination = '';
  }

  ngOnDestroy() {
  this.subscriptions.forEach(sub => {
  sub.unsubscribe();
  });
  }

  /**
   * Check for when the value of the image source comming in has changed and update the cropper with it
   */
  ngOnChanges() {
  if (this.initialized) {
  this.cropper.replace(this.imageSource);
  }
  }

  /**
   * After intitializing the view we need to instatiate the cropper
   */
  ngAfterViewInit() {
  this.cropper = new Cropper(this.imageElement.nativeElement, {
  zoomable: false,
  scalable: false,
  aspectRatio: 16 / 10,
  crop: () => {
  const canvas = this.cropper.getCroppedCanvas(
    {imageSmoothingQuality : 'high'}
  );
  this.imageDestination = canvas.toDataURL('image/png');
  }
  });
  this.initialized = true;
  }

  /**
   * Save the image to the database. Cropper only used for carousel slider any of the possible 6.
   * On successful update we emit a response to the parent component so it can update its data and close the modal.
   * Need 2 end points for the course service 1 for admin users editing any course and 1 for a regular user updating their own course.
   */
  saveImg() {
  this.loading = true;
  this.fileToUpload.value = this.imageDestination;
  /*
  this.subscriptions.push(this.courseService.updateImage(this.userType, this.courseId, 'slider_img_' + this.sliderNum, this.fileToUpload)
  .subscribe(response => {
  if (response.status === '200') {
  this.loading = false;
  const payload = [];
  payload.push(this.imageDestination);
  const cropResponse = new CustomResponse('done', payload);
  this.cropDone.emit(cropResponse);
  } else if (response.status === '401') {
  // display msg unauthorized access
  alert('401 Unauthorized access. You do not have permission to change this data.');
  console.error(response.status);
  } else {
  alert('Sorry there was an error uploading the image.');
  console.error(response.status);
  }
  }));
  */
  }

}
