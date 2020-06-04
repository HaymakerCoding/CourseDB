import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  animations: [
    trigger('carouselAnimation', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]),
      transition('* => void', [
        animate('300ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class CarouselComponent implements OnInit, AfterViewInit {

  @Input() slides;
  @ViewChild('nextButton', { static: false }) nextButton: ElementRef;
  currentSlide: number;
  maxTimer: number;
  timer: number;

  constructor() { }

  ngOnInit() {
    this.currentSlide = 0;
    this.maxTimer = 500;
    this.timer = 0;
  }

  /**
   * Start slide animation after view loaded
   */
  ngAfterViewInit() {
    this.animate();
  }

  /**
   * Animation loop for slider
   */
  animate() {
    this.timer++;
    if (this.timer >= this.maxTimer) {
      this.nextButton.nativeElement.click();
      this.timer = 0;
    }
    requestAnimationFrame(this.animate.bind(this));
  }

  /**
   * User clicks previous button, go back a slide
   */
  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.slides.length - 1 : previous;
  }

  /**
   * User clicks next button, go forward a slide
   */
  onNextClick() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.slides.length ? 0 : next;
  }

}
