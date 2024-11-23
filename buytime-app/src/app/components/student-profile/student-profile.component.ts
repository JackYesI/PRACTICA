import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule], // Додано CommonModule
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit {
  allMeetings: any[] = []; // Всі зустрічі
  myBookings: any[] = []; // Бронювання студента
  errorMessage: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadAllMeetings();
    this.loadMyBookings();
  }

  loadAllMeetings(): void {
    this.http.get('http://localhost:5000/api/all-meetings').subscribe(
      (data: any) => {
        this.allMeetings = data;
      },
      (error) => {
        this.errorMessage = 'Не вдалося завантажити всі зустрічі.';
      }
    );
  }

  loadMyBookings(): void {
    const username = localStorage.getItem('username');
    if (!username) {
      this.errorMessage = 'Користувач не знайдений.';
      return;
    }

    this.http.get(`http://localhost:5000/api/bookings/${username}`).subscribe(
      (data: any) => {
        this.myBookings = data;
      },
      (error) => {
        this.errorMessage = 'Не вдалося завантажити ваші бронювання.';
      }
    );
  }

  bookMeeting(meeting: any): void {
    const username = localStorage.getItem('username');
    if (!username) {
      this.errorMessage = 'Користувач не знайдений.';
      return;
    }

    this.http.post('http://localhost:5000/api/bookings', { username, meeting }).subscribe(
      (response: any) => {
        this.loadMyBookings();
        alert(response.message);
      },
      (error) => {
        this.errorMessage = 'Помилка бронювання.';
      }
    );
  }
}
