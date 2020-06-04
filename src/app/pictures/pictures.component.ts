import { Component, OnInit, Renderer2, Input, ViewChild, OnDestroy } from '@angular/core';
import { Course } from '../models/Course';
import { CourseService } from '../services/course.service';
import Cropper from 'cropperjs';
import { NgModel } from '@angular/forms';
import { CustomResponse } from '../models/CustomResponse';
import { Subscription } from 'rxjs';
import { MatDialogRef, MatDialog } from '@angular/material';

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.scss']
})
export class PicturesComponent implements OnInit, OnDestroy {

  // flag for whether this is for an admin user or regular user
  @Input() userType: string;
  @Input() course: Course;
  subscriptions: Subscription[] = [];
  private MAXFILESIZE = 1073741824; // 1GB limit
  private suportedFiles = ['jpeg', 'jpg', 'gif', 'png', 'webp'];

  sliderNumbers: number[] = [1, 2, 3, 4, 5, 6];
  currentSliderNum: number;
  imageType: string;
  previewImg: string | ArrayBuffer;
  imageReady: boolean;
  fileToUpload: any;
  title: string;
  loading: boolean;
  uploadType: string;
  dialogRef: MatDialogRef<any>;

  constructor(
    private courseService: CourseService,
    private renderer: Renderer2,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loading = false;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }


  /**
   * Set text for modal title and show the modal
   * @param type Text of which element we are uploading an image for
   */
  setUploadType(type: any, dialog) {
    this.uploadType = type;
    this.title = 'Upload new ' + type;
    this.imageType = type;
    this.dialogRef = this.dialog.open(dialog);
  }

  getNumSliderImgs() {
    let num = 0;
    if (this.course.slider1) {
      num++;
    }
    if (this.course.slider2) {
      num++;
    }
    if (this.course.slider3) {
      num++;
    }
    if (this.course.slider4) {
      num++;
    }
    if (this.course.slider5) {
      num++;
    }
    if (this.course.slider6) {
      num++;
    }
    return num;
  }

  /**
   * Save the image to the database. Can be different types of images for the course.
   * Success sets the current image to the new uploaded one.
   */
  saveImg() {
    this.loading = true;
    switch (this.uploadType) {
      case 'Logo' :
        if (!this.course.logo) {
          this.addLogo();
        } else {
          this.updateLogo();
        }
        break;
      case 'Feature Image' :
        !this.course.featureImage ? this.addFeatureImage() : this.updateFeatureImage();
        break;
      case 'Carousel Image' :
        switch (this.currentSliderNum) {
          case 1: {
            const column = 'slider_img_1';
            this.course.slider1 ? this.updateSliderImage(column, this.course.slider1) : this.addSliderImage(column);
            break;
          }
          case 2:  {
            const column = 'slider_img_2';
            this.course.slider2 ? this.updateSliderImage(column, this.course.slider2) : this.addSliderImage(column);
            break;
          }
          case 3: {
            const column = 'slider_img_3';
            this.course.slider3 ? this.updateSliderImage(column, this.course.slider3) : this.addSliderImage(column);
            break;
          }
          case 4: {
            const column = 'slider_img_4';
            this.course.slider4 ? this.updateSliderImage(column, this.course.slider4) : this.addSliderImage(column);
            break;
          }
          case 5: {
            const column = 'slider_img_5';
            this.course.slider5 ? this.updateSliderImage(column, this.course.slider5) : this.addSliderImage(column);
            break;
          }
          case 6: {
            const column = 'slider_img_6';
            this.course.slider6 ? this.updateSliderImage(column, this.course.slider6) : this.addSliderImage(column);
            break;
          }
        }
        break;
      default :
        alert('No img type found');
        this.loading = false;
        break;
    }
  }

  addSliderImage(column) {
    if (this.previewImg) {
      this.subscriptions.push(this.courseService.addSliderImage(this.course.id, this.previewImg, column)
      .subscribe(response => {
        if (response.status === 201) {
          const pic = response.payload.pic;
          switch (column) {
            case 'slider_img_1': this.course.slider1 = pic; break;
            case 'slider_img_2': this.course.slider2 = pic; break;
            case 'slider_img_3': this.course.slider3 = pic; break;
            case 'slider_img_4': this.course.slider4 = pic; break;
            case 'slider_img_5': this.course.slider5 = pic; break;
            case 'slider_img_6': this.course.slider6 = pic; break;
          }
        } else {
          alert('Sorry there was an error uploading the image.');
          console.error(response);
        }
        this.close();
        this.loading = false;
      }));
    }
  }

  updateSliderImage(column, oldImage) {
    if (this.previewImg) {
      this.subscriptions.push(this.courseService.updateSliderImage(this.course.id, this.previewImg, column, oldImage)
      .subscribe(response => {
        if (response.status === 200) {
          const pic = response.payload.pic;
          switch (column) {
            case 'slider_img_1': this.course.slider1 = pic; break;
            case 'slider_img_2': this.course.slider2 = pic; break;
            case 'slider_img_3': this.course.slider3 = pic; break;
            case 'slider_img_4': this.course.slider4 = pic; break;
            case 'slider_img_5': this.course.slider5 = pic; break;
            case 'slider_img_6': this.course.slider6 = pic; break;
          }
        } else {
          alert('Sorry there was an error uploading the image.');
          console.error(response);
        }
        this.close();
        this.loading = false;
      }));
    }
  }

  addFeatureImage() {
    if (this.previewImg) {
      this.subscriptions.push(this.courseService.addFeatureImage(this.course.id, this.previewImg)
      .subscribe(response => {
        if (response.status === 201) {
          this.course.featureImage = response.payload.pic;
        } else {
          alert('Sorry there was an error uploading the image.');
          console.error(response);
        }
        this.close();
        this.loading = false;
      }));
    }
  }

  updateFeatureImage() {
    if (this.previewImg) {
      this.subscriptions.push(this.courseService.updateFeatureImage(this.course.id, this.previewImg, this.course.featureImage)
      .subscribe(response => {
        if (response.status === 200) {
          this.course.featureImage = response.payload.pic;
        } else {
          alert('Sorry there was an error uploading the image.');
          console.error(response);
        }
        this.close();
        this.loading = false;
      }));
    }
  }

  addLogo() {
    this.subscriptions.push(this.courseService.addLogo(this.course.id, this.previewImg)
    .subscribe(response => {
      if (response.status === 201) {
        this.course.logo = response.payload.pic;
      } else  {
        alert('Sorry there was an error uploading the image.');
        console.error(response);
      }
      this.close();
      this.loading = false;
    }));
  }

  updateLogo() {
    this.subscriptions.push(this.courseService.updateLogo(this.course.id, this.previewImg, this.course.logo)
    .subscribe(response => {
      if (response.status === 200) {
        this.course.logo = response.payload.pic;
      } else  {
        alert('Sorry there was an error uploading the image.');
        console.error(response);
      }
      this.close();
      this.loading = false;
    }));
  }

  /**
   * Fired on input change for choose image file to upload. Sets the preview image src var.
   * Browser side validation of image type and size done here as well.
   * @param event The file upload event
   */
  setImagePreview(event): void {
    if (event.target.files && event.target.files[0]) {
      const imageFile = event.target.files[0];
      const extension = imageFile.name.split('.').pop();
      const reader = new FileReader();
      reader.onload = e => {
        this.previewImg = reader.result;
        this.imageReady = true;
        this.fileToUpload = {
          fileName: imageFile.name,
          fileType: imageFile.type,
          fileExtension: extension,
          value: reader.result
        };
      };
      if (imageFile.size <= this.MAXFILESIZE) {
        if (this.suportedFiles.includes(extension)) {
          reader.readAsDataURL(imageFile);
        } else {
          alert('Sorry this is not a valid file type');
        }
      } else {
        alert('Sorry this file exceeds the maximum size of 1GB.');
      }
    }
  }

  /**
   * Cropping was completed and we got a response from the child component
   * @param event Response
   */
  complete(response: CustomResponse) {
    if (response.status === 'done') {
      /* all good, need to update the in-memory slider image, close the modal and update the number of slider images if
       there was none set before */
      this.close();
    } else {
      alert('Sorry there was an error uploading');
      console.error(response.status);
    }
  }

  /**
   * Track which number of slider image we are uploading for
   * @param num Slider number 1-6
   */
  setSliderNumer(num) {
    this.currentSliderNum = num;
  }

  close() {
    this.dialogRef.close();
    this.previewImg = null;
  }

}
