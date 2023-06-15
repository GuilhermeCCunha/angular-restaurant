import { Component, OnInit } from '@angular/core';
import { FoodList } from 'src/app/model/food-list';
import { ActivatedRoute } from '@angular/router';
import { FoodListService } from 'src/app/services/food-list.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent  implements OnInit {

  public foodList: Array<FoodList> = [];


  constructor(
    private route: ActivatedRoute,
    private foodListService: FoodListService) { }

  ngOnInit(): void {
    const _id = this.route.snapshot.paramMap.get('_id')
    console.log(_id)
    this.foodListService.foodListGetId(_id!).subscribe({
      next: (res) => this.foodList[0] = res,
      error: (error) => console.log(error)
    });

  }

}
