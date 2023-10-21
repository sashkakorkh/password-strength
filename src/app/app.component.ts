import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  passwordForm!: FormGroup;
  passwordIsValid = false;
  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.passwordForm = this.fb.group({
      password: ['', Validators.required],
    });
  }
  passwordValid(event: boolean) {
    this.passwordIsValid = event;
  }
}
