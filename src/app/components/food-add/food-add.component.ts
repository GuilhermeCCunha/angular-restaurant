import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FoodListService } from 'src/app/services/food-list.service';

@Component({
  selector: 'app-food-add',
  templateUrl: './food-add.component.html',
  styleUrls: ['./food-add.component.scss']
})
export class FoodAddComponent implements OnInit {

  public foodForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private foodListService: FoodListService) { }

  ngOnInit(): void {
    this.foodForm = this.fb.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      image_url: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  get FoodName() {
    return this.foodForm.controls['name'];
  }

  get FoodCategory() {
    return this.foodForm.controls['category'];
  }

  get FoodImageUrl() {
    return this.foodForm.controls['image_url'];
  }

  public listAddItem(name: string, category: string, image_url: string) {
    return this.foodListService.foodListAdd(name, category, image_url).subscribe({
      next: (res) => this.foodListService.foodListMessage(res),
      error: (error) => error
    });
  }
  reloadCurrentPage() {
    setTimeout(() => {
      console.log("Delayed for 1.5 second.");
      this.router.navigate([this.router.url]);
    }, 1500);
  }
}
