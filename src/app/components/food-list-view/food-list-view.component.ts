import { Component, OnInit } from '@angular/core';
import { FoodList } from 'src/app/model/food-list';

import { FoodListService } from 'src/app/services/food-list.service';

@Component({
  selector: 'app-food-list-view',
  templateUrl: './food-list-view.component.html',
  styleUrls: ['./food-list-view.component.scss']
})
export class FoodListViewComponent implements OnInit {

  public foodList: Array<FoodList> = [];

  constructor(private foodListService: FoodListService) { }

  ngOnInit(): void {
    this.foodListService.foodList().subscribe({
      next: (res) => this.foodList = res,
      error: (error) => console.log(error)
    });
  }

}

