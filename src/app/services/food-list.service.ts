import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { FoodList } from '../model/food-list';

@Injectable({
  providedIn: 'root'
})
export class FoodListService {

  public emitEvent = new EventEmitter();

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  private url: string = "https://restaurant-menu-delta.vercel.app/api";

  constructor(private http: HttpClient) {
  }

  public foodList(): Observable<Array<FoodList>> {
    return this.http.get<Array<FoodList>>(`${this.url}`).pipe(
      res => res,
      error => error
    )
  }

  public foodListAdd(name: string, category: string, image_url: string): Observable<FoodList> {
    return this.http.post<FoodList>(`${this.url}`, { name: name, category: category, image_url: image_url }).pipe(
      res => res,
      error => error
    )
  }

  public foodListEdit(name: string, category: string, image_url: string, _id: number): Observable<FoodList> {
    return this.http.put<FoodList>(`${this.url}/${_id}`, { name: name, category: category, image_url: image_url }).pipe(
      res => res,
      error => error
    )
  }

  public foodListDelete(_id: number): Observable<FoodList> {
    return this.http.delete<FoodList>(`${this.url}/${_id}`).pipe(
      res => res,
      error => error
    )
  }

  public foodListGetId(_id: any): Observable<FoodList> {
    return this.http.get<FoodList>(`${this.url}/${_id}`).pipe(
      res => res,
      error => error
    )
  }

  public foodListMessage(value: FoodList) {
    return this.emitEvent.emit(value);
  }
}
