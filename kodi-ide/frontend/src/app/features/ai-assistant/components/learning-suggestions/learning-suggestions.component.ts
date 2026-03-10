import { Component, Input } from '@angular/core';

@Component({
  selector: 'kodi-learning-suggestions',
  template: '<div *ngIf="code">Learning suggestions placeholder for {{ language }}</div>'
})
export class LearningSuggestionsComponent {
  @Input() code = '';
  @Input() language = 'javascript';
}
