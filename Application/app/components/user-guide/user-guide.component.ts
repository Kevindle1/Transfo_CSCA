import { Component, OnInit } from '@angular/core';
import { UserGuideConfig } from './user-guide.config';

@Component({
  selector: 'app-user-guide',
  templateUrl: './user-guide.component.html',
  styleUrls: ['./user-guide.component.css']
})
export class UserGuideComponent implements OnInit {
  guideConfig = UserGuideConfig;

  constructor() {}

  ngOnInit(): void {}
}
