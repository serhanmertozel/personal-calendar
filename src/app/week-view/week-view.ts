import { Component, computed, signal } from '@angular/core';
import { addDays, startOfWeek, toIsoDate } from '../utils/date';

@Component({
  imports: [],
  selector: 'app-week-view',
  styleUrl: './week-view.scss',
  templateUrl: './week-view.html',
})
export class WeekView {
  anchorDate = signal(new Date());

  monthLabel = computed(() =>
    startOfWeek(this.anchorDate()).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    }),
  );

  days = computed(() => this.buildWeek(this.anchorDate()));

  buildWeek(from: Date) {
    const monday = startOfWeek(from);
    const todayIso = toIsoDate(new Date());
    const week = [];

    for (let i = 0; i < 7; i++) {
      const date = addDays(monday, i);
      const iso = toIsoDate(date);
      week.push({
        iso,
        name: date.toLocaleDateString('en-US', { weekday: 'short' }),
        number: date.getDate(),
        isToday: iso === todayIso,
      });
    }

    return week;
  }

  previousWeek() {
    this.anchorDate.set(addDays(this.anchorDate(), -7));
  }

  nextWeek() {
    this.anchorDate.set(addDays(this.anchorDate(), 7));
  }

  goToToday() {
    this.anchorDate.set(new Date());
  }
}
