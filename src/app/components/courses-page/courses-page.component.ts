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
  tags: { id: number, title: string, checked: boolean }[] = [];

  selectedTags: Set<number> = new Set()

  // Filtered courses based on query parameter
  filteredCourses: Course[] = [];

  constructor(private route: ActivatedRoute, private courseServ: CourseService) { }

  ngOnInit() {
    this.fetchCourses();

    this.courseServ.getAllTags().subscribe(
      response => {
        this.tags = response.data.map((tag: any) => ({ id: tag.id, title: tag.title }));
      }
    );

    this.filterByTags();
  }


  filterByQuery(query: string) {
    if (!query) return
    
    query = query.toLowerCase().trim()

    this.filteredCourses = this.courses.filter(
      course => course.tags.map(t => t.toLowerCase()).includes(query) || course.title.toLowerCase().includes(query)
    )
  }

  private filterByTags() {
    if (this.selectedTags.size == 0)
      this.filteredCourses = this.courses

    this.selectedTags.forEach(tag => {
      this.courseServ.getCoursesByTag(tag).subscribe(
        response => {
          this.filteredCourses = response.data;
        }
      );
    });
  }

  private fetchCourses() {
    this.courseServ.getCourses().subscribe(
      response => {

        console.log(response.data);
        
        response.data.forEach((c: any) => c.tags = c.tags.map((t: any) => t.tag.title))
        this.courses = response.data;
        this.filteredCourses = this.courses;

        this.route.queryParams.subscribe(
          params => {
            const query = params['query'] as string;
            this.filterByQuery(query);
          }
        )
      }
    );
  }

  selectTag(tagId: number, isChecked: boolean) {
    if (isChecked)
      this.selectedTags.add(tagId);
    else
      this.selectedTags.delete(tagId);

    this.filterByTags()
  }
}
