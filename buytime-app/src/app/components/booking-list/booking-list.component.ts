import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Додаємо CommonModule

@Component({
  selector: 'app-booking-list',
  standalone: true,
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss'],
  imports: [CommonModule], // Додаємо CommonModule до імпортів
})
export class BookingListComponent implements OnInit {
  bookings: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchBookings();
  }

  fetchBookings(): void {
    this.http.get('http://localhost:5000/api/bookings').subscribe(
      (data: any) => {
        this.bookings = data;
      },
      (error) => {
        console.error('Error fetching bookings:', error);
      }
    );
  }

  deleteBooking(bookingId: number): void {
    this.http.delete(`http://localhost:5000/api/book/${bookingId}`).subscribe(
      () => {
        alert('Booking deleted successfully');
        this.fetchBookings();
      },
      (error) => {
        console.error('Error deleting booking:', error);
        alert('Failed to delete booking.');
      }
    );
  }
}
