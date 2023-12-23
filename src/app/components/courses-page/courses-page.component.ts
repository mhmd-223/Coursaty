import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.css'],
})
export class CoursesPageComponent implements OnInit {

  // Original courses fetched from the service
  courses: Course[] = [];

  // Tags for filtering
  tags = new Set<string>();

  // Selected tags for filtering
  selectedTags: { [key: string]: boolean } = {};

  // Filtered courses based on query parameter
  filteredCourses: Course[] = [];

  constructor(private route: ActivatedRoute, private courseServ: CourseService) { }

  ngOnInit() {
    this.courseServ.getCourses().subscribe(
      courses => {
        this.courses = courses;
        // tags
        this.courses.forEach((course) => {
          course.tags.forEach((tag: string) => {
            this.tags.add(tag);
          });
        });
        
        // Get the query parameter from the URL
        this.route.queryParams.subscribe((params) => {
          const query = params['query'];
  
          if (query) {
            // Filter courses based on the query
            this.filteredCourses = this.filterCoursesByQuery(query);
          } else {
            // If no query, show all courses
            this.filteredCourses = this.courses;
          }
        });
      }
    );
  }

  // Function to filter courses based on the query
  filterCoursesByQuery(query: string): Course[] {
    return this.courses.filter(
      (course) =>
        course.title.toLowerCase().includes(query.toLowerCase()) ||
        course.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
    );
  }

  // Function to filter courses based on the selected tags
  filterCoursesByTags(tags: { [key: string]: boolean }): Course[] {
    const selectedTags = Object.values(tags).some((value) => value);

    if (!selectedTags) {
      // If no tags are selected, return all courses
      return this.courses;
    }

    return this.courses.filter((course) =>
      Object.keys(tags).some((tag) => tags[tag] && course.tags.includes(tag))
    );
  }
}
