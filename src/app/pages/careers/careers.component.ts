import { Component } from '@angular/core';

interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  level: string;
  salary: string;
  type: string;
}

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.scss']
})
export class CareersComponent {
  jobs: JobPosition[] = [
    {
      id: '1',
      title: 'Senior Full Stack Engineer',
      department: 'Engineering',
      location: 'San Francisco, CA (Remote Available)',
      level: 'Senior',
      salary: '$150,000 - $200,000',
      type: 'Full-time'
    },
    {
      id: '2',
      title: 'Frontend Developer - React',
      department: 'Engineering',
      location: 'Remote',
      level: 'Mid-level',
      salary: '$120,000 - $160,000',
      type: 'Full-time'
    },
    {
      id: '3',
      title: 'Product Manager',
      department: 'Product',
      location: 'San Francisco, CA',
      level: 'Senior',
      salary: '$140,000 - $190,000',
      type: 'Full-time'
    },
    {
      id: '4',
      title: 'UX/UI Designer',
      department: 'Design',
      location: 'Remote',
      level: 'Mid-level',
      salary: '$110,000 - $150,000',
      type: 'Full-time'
    },
    {
      id: '5',
      title: 'Customer Support Manager',
      department: 'Operations',
      location: 'Remote',
      level: 'Mid-level',
      salary: '$70,000 - $95,000',
      type: 'Full-time'
    },
    {
      id: '6',
      title: 'Engineering Internship',
      department: 'Engineering',
      location: 'Remote',
      level: 'Internship',
      salary: '$25/hour',
      type: 'Part-time / Seasonal'
    }
  ];

  benefits = [
    { icon: '💰', title: 'Competitive Salary', description: 'Industry-leading compensation' },
    { icon: '🏥', title: 'Health Insurance', description: 'Medical, dental, vision coverage' },
    { icon: '🎓', title: 'Learning & Development', description: 'Professional courses and conferences' },
    { icon: '🏠', title: 'Remote Work', description: 'Work from anywhere' },
    { icon: '📈', title: 'Stock Options', description: 'Own a piece of ZYRO' },
    { icon: '🎯', title: 'Growth Opportunities', description: 'Clear career advancement paths' }
  ];

  selectedJob: JobPosition | null = null;
}
