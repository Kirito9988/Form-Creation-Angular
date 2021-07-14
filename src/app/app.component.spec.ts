import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';

import { By, by } from 'protractor';
import { TestBed, fakeAsync, tick, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import {  AppComponent } from './app.component';
import { AppService } from './app.service';
import * as Rx from 'rxjs';
import { delay } from "rxjs/operators";
import { SuccessAlertComponent } from './success-alert/success-alert.component';
// import { SuccessAlertComponent } from './success-alert/success-alert.component';
// import { WarningAlertComponent } from './warning-alert/warning-alert.component';


describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
      ],
      declarations: [
        AppComponent,
        // WarningAlertComponent,
         SuccessAlertComponent,
      ],
      providers : [
        AppService
      ]
    }).compileComponents().then(() => {
    });
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.debugElement.componentInstance;
    let spy_getPostDetails = spyOn(component,"getPostDetails").and.returnValue([ ]);
    component.ngOnInit();
    expect(component.postDetails).toEqual([ ]);
  })

  it('should call getPostDetails and get response as empty array', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.debugElement.componentInstance;
    const service = fixture.debugElement.injector.get(AppService);
    let spy_getPosts = spyOn(service,"getPosts").and.callFake(() => {
      return Rx.of([]).pipe(delay(100));
    });
    component.getPostDetails();
    tick(100);
    expect(component.postDetails).toEqual([]);
  }))

  it('should call getPostDetails and get response as array', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.debugElement.componentInstance;
    const service = fixture.debugElement.injector.get(AppService);
    let spy_getPosts = spyOn(service,"getPosts").and.callFake(() => {
      return Rx.of([{postId : 100}]).pipe(delay(2000));
    });
    component.getPostDetails();
    tick(1000);
    expect(component.showLoadingIndicator).toEqual(true);
    tick(1000);
    expect(component.showLoadingIndicator).toEqual(false);
    expect(component.postDetails).toEqual([{postId : 100}]);
  }))


  it(`should have as title 'angular test'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('angular test');
  })

  it('should render title in a head tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('head').textContent).toContain('angular test');
  });

  // it(`should render 'This is a warning, you are in danger!'`, () => {
  //   const fixture = TestBed.createComponent(WarningAlertComponent);
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('p').textContent).toEqual('This is a warning, you are in danger!');
  // })

  it(`should render 'You are so successful!'`, () => {
    const fixture = TestBed.createComponent(SuccessAlertComponent);
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).toEqual('You are so successful!');
  })
  it(`form should be invalid`, () => {
    let fixture = TestBed.createComponent(AppComponent);
    let comp = fixture.componentInstance;
    comp.contactForm.controls['email'].setValue('');
    comp.contactForm.controls['name'].setValue('');
    comp.contactForm.controls['text'].setValue('');
    expect(comp.contactForm.valid).toBeFalsy();
})
it(`form should be valid`, () => {
  let fixture = TestBed.createComponent(AppComponent);
  let comp = fixture.componentInstance;
  comp.contactForm.controls['email'].setValue('asd@asd.com');
  comp.contactForm.controls['name'].setValue('asda');
  comp.contactForm.controls['text'].setValue('text');
  expect(comp.contactForm.valid).toBeTruthy();
})})
