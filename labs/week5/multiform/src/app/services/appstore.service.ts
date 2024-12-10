import { Injectable, signal, Signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  prices = {
    monthly: {arcade: 9, advanced: 12, pro: 15},
    yearly: {arcade: 90, advanced: 120, pro: 150},
  }

  userPersonalInfo = signal(new FormGroup({
    name : new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(64),
    ]),
    email : new FormControl('',[
      Validators.required,
      Validators.email,
      Validators.minLength(3),
      Validators.maxLength(64)
    ]),
    phone : new FormControl('',[
      Validators.required,
      Validators.min(10),
      Validators.maxLength(15),
    ])
  }))

}


type FormValue = {
  name: string | null;
  email: string | null;
  phone: string | null;
}

type PersonalInfo = FormGroup<{
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  phone: FormControl<string | null>;
}>
