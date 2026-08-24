import { Component } from '@angular/core';
import { addDays, startOfWeek, toIsoDate } from '../utils/date';

@Component({
  imports: [],
  selector: 'app-week-view',
  styleUrl: './week-view.scss',
  templateUrl: './week-view.html',
})
export class WeekView {
  days = this.buildWeek();

  buildWeek() {
    const monday = startOfWeek(new Date());
    const todayIso = toIsoDate(new Date());
    const week = [];

    for (let i = 0; i < 7; i++) {
      const date = addDays(monday, i);
      const iso = toIsoDate(date);
      week.push({
        iso,
        name: date.toLocaleDateString("en-US", { weekday: "short" }),
        number: date.getDate(),
        isToday: iso === todayIso,
      });
    }

    return week;
  }
}
