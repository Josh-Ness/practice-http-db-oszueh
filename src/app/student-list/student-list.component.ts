import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Student } from '../student';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
  studentList: Student[] = [];
  nextID: number = 0;
  sName: string;
  sAge: number;

  constructor(private stdService: StudentService) {}

  ngOnInit() {
    //this.studentList = this.stdService.STUDENTS;
    this.fetchData();
  }

  addNewStudent() {
    const newStudent: Student = {
      id: ++this.nextID,
      name: this.sName,
      age: this.sAge,
    };

    //this.studentList.push(newStudent);
    this.stdService
      .addNewStudent(newStudent)
      .subscribe((data) => console.log(data));
    this.fetchData();
  }

  onClearData() {
    this.studentList = [];
  }

  fetchData() {
    this.stdService.getStudents().subscribe((data) => {
      this.studentList = data;
    });
  }
}
