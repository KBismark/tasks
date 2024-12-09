import { Component } from '@angular/core';

const SELECTIONS = {INFO: 1, PLAN: 2, ADDONS: 3, SUMMARY: 4}

@Component({
  selector: 'navigation',
  standalone: true,
  imports: [],
  templateUrl: './nav-panel.component.html',
  styleUrl: './nav-panel.component.css'
})
export class NavPanelComponent {
  SELECTIONS = SELECTIONS
  selected = SELECTIONS.INFO

  // Methods
  select(selection: typeof SELECTIONS[keyof typeof SELECTIONS]){
    this.selected = selection
  }
}



