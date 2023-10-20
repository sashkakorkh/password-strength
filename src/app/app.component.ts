import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  passwordForm!: FormGroup;
  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    console.log(this.passwordForm);
    this.passwordForm = this.fb.group({
      password: ['', Validators.required],
    });
  }
}
