import { Component } from '@angular/core';
import { WeekView } from './week-view/week-view';

@Component({
  imports: [WeekView],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
}
