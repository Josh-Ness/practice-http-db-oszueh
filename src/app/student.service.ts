import { Injectable } from '@angular/core';
import { Student } from './student';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  STUDENTS: Student[] = [
    {
      id: 1,
      name: 'John',
      age: 20,
    },
  ];

  constructor(private http: HttpClient) {}

  addNewStudent(newStd: Student) {
    return this.http.post(
      'https://student-data-9668d-default-rtdb.firebaseio.com/' +
        'student.json',
      newStd
    );
  }

  getStudents() {
    return this.http
      .get<Student[]>(
        'https://student-data-9668d-default-rtdb.firebaseio.com/' +
          'student.json'
      )
      .pipe(
        map((responseData) => {
          const studentList: Student[] = [];
          for (const key in responseData) studentList.push(responseData[key]);
          return studentList;
        })
      );
  }
}
