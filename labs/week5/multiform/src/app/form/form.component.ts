import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormInfoComponent } from "../form-info/form-info.component";

@Component({
  selector: 'formcontent',
  standalone: true,
  imports: [CommonModule, FormInfoComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

}
