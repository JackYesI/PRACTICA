import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student-bookings',
  templateUrl: './student-bookings.component.html',
  styleUrls: ['./student-bookings.component.scss']
})
export class StudentBookingsComponent implements OnInit {
  bookings: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    const username = localStorage.getItem('username');
    this.http.get(`http://localhost:5000/api/bookings/${username}`).subscribe((data: any) => {
      this.bookings = data;
    });
  }

  cancelBooking(bookingId: number): void {
    this.http.delete(`http://localhost:5000/api/bookings/${bookingId}`).subscribe(
      () => {
        alert('Бронювання скасовано.');
        this.loadBookings();
      },
      () => {
        alert('Помилка при скасуванні бронювання.');
      }
    );
  }
}
