import { Injectable } from '@angular/core';

const SELECTIONS = {INFO: 1, PLAN: 2, ADDONS: 3, SUMMARY: 4}

@Injectable({
  providedIn: 'root'
})
export class AppstoreService {
  SELECTIONS = SELECTIONS
  selected = SELECTIONS.INFO
  planCategory: 'arcade'|'advanced'|'pro' = 'arcade'
  planType: 'yearly'|'monthly' = 'monthly'
  detailsConfirmed = false
  constructor() { }
}
