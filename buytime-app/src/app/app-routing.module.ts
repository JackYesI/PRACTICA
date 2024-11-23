import { Routes } from '@angular/router';
import { RoleSelectorComponent } from './components/role-selector/role-selector.component';
import { TeacherListComponent } from './components/teacher-list/teacher-list.component';
import { TeacherDetailsComponent } from './components/teacher-details/teacher-details.component';
import { BookingListComponent } from './components/booking-list/booking-list.component';
import { TeacherProfileComponent } from './components/teacher-profile/teacher-profile.component';

export const routes: Routes = [
    { path: '', component: RoleSelectorComponent },
    { path: 'teachers', component: TeacherListComponent },
    { path: 'teachers/:id', component: TeacherDetailsComponent },
    { path: 'bookings', component: BookingListComponent },
    { path: 'profile', component: TeacherProfileComponent }
];
