import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-error-field',
  templateUrl: './error-field.component.html',
  styleUrls: ['./error-field.component.css'],
})
export class ErrorFieldComponent implements OnInit {
  @Input() control!: AbstractControl;
  @Input() errorMessages!: Object;

  constructor(public formDirective: FormGroupDirective) {}

  ngOnInit(): void {}
}
