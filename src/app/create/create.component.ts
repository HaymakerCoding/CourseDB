import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmailService } from '../services/email.service';
import { Email } from '../models/Email';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy {

  form;
  showThankYou = false;
  subscriptions: Subscription[] = [];

  constructor(
    private emailService: EmailService
    ) { }

  ngOnInit() {
    // form validation
    this.form = new FormGroup({
      courseName: new FormControl('', Validators.required),
      courseWebsite: new FormControl('', Validators.required),
      managerName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email]))
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  /**
   * Send an email for a new request by user to register for course creation rights
   * @param data Form data
   */
  submitForm(data) {
    this.subscriptions.push(this.emailService.sendManagerReqest(data).subscribe(response => {
      if (response.status === 200) {
        this.showThankYou = true;
      } else {
        console.error(response);
        alert('Sorry there was an error with your request, please contact us.');
      }
    }));
  }

}

