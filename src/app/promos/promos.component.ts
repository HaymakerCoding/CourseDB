import { Component, OnInit, Input, ViewChild, OnDestroy, Renderer2, AfterViewInit } from '@angular/core';
import { Course } from '../models/Course';
import { CourseService } from '../services/course.service';
import { Promo } from '../models/Promo';
import { Subscription } from 'rxjs';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-promos',
  templateUrl: './promos.component.html',
  styleUrls: ['./promos.component.scss']
})
export class PromosComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() course: Course;
  @Input() userType: string;

  subscriptions: Subscription[] = [];
  dialogRef: MatDialogRef<any>;
  // flags when image is updating db to show loading spinner
  loading: boolean;
  previewImg: string | ArrayBuffer;
  imageReady: boolean;
  fileToUpload: any;
  uploadInput: HTMLInputElement;

  private MAXFILESIZE = 1073741824; // 1GB limit
  private suportedFiles = ['jpeg', 'jpg', 'gif', 'png', 'webp'];

  updating: boolean; // updating flag for showing update promo info in modal
  currentPromo: Promo;
  numPromos: number;
  HTMLloaded: boolean;

  constructor(
    private courseService: CourseService,
    private dialog: MatDialog,
    private renderer: Renderer2,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loading = false;
    this.numPromos = this.course.promos.length;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  ngAfterViewInit() {
    this.HTMLloaded = true;
  }

  /**
   * For saving a new promo. Can be used to save a new promo or update an exisiting promo's picture.
   */
  addPromo(link) {
    this.loading = true;
    this.close();
    this.subscriptions.push(this.courseService.addPromo(this.course.id, link, this.previewImg)
    .subscribe(response => {
      if (response.status === 201) {
        // payload holds the new records ID (PK) so we can build the in memory object
        const newPromo = response.payload;
        this.course.promos.push(new Promo(newPromo.id, newPromo.link, newPromo.pic));
      } else {
        alert('Sorry there was an error uploading the Promo.');
        console.error(response.status);
      }
      this.close();
      this.loading = false;
    }));
  }

  deletePromo(id, pic) {
    if (prompt('Are you sure you want to delete this promo? Type DELETE to confirm.') === 'DELETE') {
      this.subscriptions.push(this.courseService.deletePromo(id.toString(), pic).subscribe(response => {
        if (response.status === 200) {
          this.course.promos = this.course.promos.filter(x => +x.id !== +id);
        } else {
          console.error(response);
        }
      }));
    }
  }

  /**
   * Update just the image for the promo
   */
  updatePromo(promo: Promo) {
    this.loading = true;
    this.subscriptions.push(this.courseService.updatePromoImage(promo.id, this.course.id, this.previewImg, promo.pic)
    .subscribe(response => {
      if (response.status === 200) {
        // new image URL is in payload
        promo.pic = response.payload;
        this.previewImg = null;
      } else {
        alert('Sorry there was an error uploading the Promo.');
        console.error(response);
      }
      this.close();
      this.loading = false;
    }));
  }

  close() {
    this.dialogRef.close();
  }

  /**
   * Update the selected promos URL link
   * @param promo Promo Obj
   */
  updateLink(promo: Promo) {
    this.subscriptions.push(this.courseService.updatePromoLink(promo.id, promo.link).subscribe(response => {
      if (response.status === 200) {
        this.snackbar.open('Link updated successfully!', '', { duration: 1200 });
      } else {
        alert('Sorry there was an error updating the Promo.');
        console.error(response);
      }
    }));
  }

  /**
   * Show the pop up modal for uploading a new promo image and link, we need to use the renderer here to assign the
   * input elements to variables now that they exists(only exist when modal is openened)
   */
  showPromo(dialog, promo) {
    // open the modal for adding a promo
    this.dialogRef = this.dialog.open(dialog, { data: promo });
  }

  /**
   * Launch the file upload window for the input element when the custom button is pressed.
   */
  showFileUpload() {
    this.uploadInput.click();
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

}
