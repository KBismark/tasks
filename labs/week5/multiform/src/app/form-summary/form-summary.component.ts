import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AppstoreService } from '../services/appstore.service';

@Component({
  selector: 'form-summary.content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-summary.component.html',
  styleUrl: './form-summary.component.css'
})
export class FormSummaryComponent {
  appStoreService = inject(AppstoreService)

}
