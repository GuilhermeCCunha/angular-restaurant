import { Component, OnInit } from '@angular/core';
import { FoodList } from 'src/app/model/food-list';

import { FoodListService } from 'src/app/services/food-list.service';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss']
})
export class FoodListComponent implements OnInit {

  public foodList: Array<FoodList> = [];

  constructor(private foodListService: FoodListService) { }

  ngOnInit(): void {
    this.foodListService.foodList().subscribe({
      next: (res) => this.foodList = res,
      error: (error) => console.log(error)
    });

    this.foodListService.emitEvent.subscribe(
      res => {
        console.log(JSON.stringify(res));
      }
    );
  }

  public foodListEdit(name: string, category: string, image_url: string, _id: number) {
    this.foodListService.foodListEdit(name, category, image_url, _id).subscribe({
      next: (res) => {
        return console.log(res)
      },
      error: (error) => error
    })
  }

  public foodListDelete(_id: number) {
    return this.foodListService.foodListDelete(_id).subscribe({
      next: (res) => {
        this.foodList = this.foodList.filter(
          item => {
            return _id !== item._id
          }
        )
        console.log(res)
      },
      error: (error) => error
    })
  }
}
