import { Component, HostListener, OnInit } from '@angular/core';
import { DatePickerService } from './date-picker.service';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
})
export class DatePickerComponent implements OnInit {
  @HostListener('document:keydown.escape', ['$event']) onEsc() {
    this.onClose();
  }

  display: boolean = true;

  yearsList = [] as number[]
  startingYear = 1950;
  finalYear = 0;
  selectedDate: string = '';

  monthData = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  datepickerValue!: string;
  month!: number; // !: mean promis it will not be null, and it will definitely be assigned
  year!: number;
  no_of_days = [] as number[];
  blankdays = [] as number[];

  constructor(
    private datePickerService: DatePickerService<DatePickerComponent>
  ) { }

  ngOnInit(): void {
    this.initDate();
    this.getNoOfDays();
    let today = new Date();
    this.finalYear = today.getFullYear();
    document.querySelector('body')?.classList.toggle('overflow-hidden');
  }

  initDate() {
    let today = new Date();
    this.month = today.getMonth();
    this.year = today.getFullYear();
    this.datepickerValue = new Date(
      this.year,
      this.month,
      today.getDate()
    ).toDateString();

    for (let i = this.year; i >= this.startingYear; i--) {
      console.log(i);
      this.yearsList.push(i)
    }
  }

  isToday(date: any) {
    const today = new Date();
    const d = new Date(this.year, this.month, date);
    return today.toDateString() === d.toDateString() ? true : false;
  }

  async getDateValue(date: any) {
    if (date < 10) {
      if (this.month < 9) {
        this.selectedDate = await `${this.year}-0${this.month + 1}-0${date}`;
      } else {
        this.selectedDate = await `${this.year}-${this.month + 1}-0${date}`;
      }
    } else {
      if (this.month < 9) {
        this.selectedDate = await `${this.year}-0${this.month + 1}-${date}`;
      } else {
        this.selectedDate = await `${this.year}-${this.month + 1}-${date}`;
      }
    }
    await this.datePickerService.setSelectedDate(this.selectedDate);
    this.onClose();
  }

  getNoOfDays() {
    const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();

    // find where to start calendar day of week
    let dayOfWeek = new Date(this.year, this.month).getDay();
    let blankdaysArray = [];
    for (var i = 1; i <= dayOfWeek; i++) {
      blankdaysArray.push(i);
    }

    let daysArray = [];
    for (var i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    this.blankdays = blankdaysArray;
    this.no_of_days = daysArray;
  }

  trackByIdentity = (index: number, item: any) => item;

  async onClose(): Promise<void> {
    this.display = false;
    setTimeout(async () => {
      await this.datePickerService.close();
    }, 300);
    document.querySelector('body')?.classList.toggle('overflow-hidden');
  }
}
