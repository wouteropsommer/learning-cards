import {Component, OnInit} from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{
  

  public images: string[] = [
    'https://picjumbo.com/wp-content/uploads/business-stock-photos-2210x1473.jpg',
    'https://cdn.pixabay.com/photo/2017/08/06/06/18/laptop-2589420_960_720.jpg',
    'https://cdn.pixabay.com/photo/2015/12/08/00/31/office-1081807_960_720.jpg'
  ]

  

}
