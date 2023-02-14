import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  OnInit,
  AfterViewInit,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss'],
})
export class ImgComponent
  implements OnChanges, OnInit, AfterViewInit, OnDestroy
{
  img: string = '';

  @Input('img')
  set changeImg(newImage: string) {
    this.img = newImage;
    // add code when image changes
    // console.log('Image Changed');
  }

  @Input() alt: string = '';
  @Output() loaded = new EventEmitter<string>();
  imageDefault = './assets/images/default.png';
  counter = 0;
  counterFunction: number | undefined;

  constructor() {
    //Before Render
    // console.log('Constructor', 'imageValue = ', this.img);
  }

  ngOnChanges(changes: SimpleChanges) {
    // Before and During Render
    // Each time it changes
    // console.log('OnChanges', 'imageValue = ', this.img);
    // console.log('changes', changes);
  }

  ngOnInit(): void {
    // Before Render
    // Async Functions, Fetchs, Promises
    // console.log('OnInit', 'imageValue = ', this.img);
    // this.counterFunction = window.setInterval(() => {
    //   this.counter += 1;
    //   console.log('Counter');
    // }, 1000);
  }

  ngAfterViewInit(): void {
    // After Render
    // console.log('AfterView', 'imageValue = ', this.img);
  }

  ngOnDestroy(): void {
    // console.log('OnDestroy', 'imageValue = ', this.img);
    window.clearInterval(this.counterFunction);
  }

  imgError() {
    this.img = this.imageDefault;
  }

  imgLoaded() {
    // console.log('Log Hijo');
    this.loaded.emit(this.img);
  }
}
