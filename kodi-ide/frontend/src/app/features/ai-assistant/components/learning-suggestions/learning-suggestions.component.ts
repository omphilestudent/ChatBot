import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { AiService, LearningSuggestion } from '../../../../core/services/ai.service';

@Component({
  selector: 'kodi-learning-suggestions',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="learning-suggestions">
      <h3>Learning Opportunities</h3>
      <p *ngIf="loading">Analyzing code…</p>
      <ul *ngIf="!loading">
        <li *ngFor="let suggestion of suggestions">
          <strong>{{ suggestion.concept }}:</strong> {{ suggestion.hint }}
        </li>
      </ul>
    </div>
  `
})
export class LearningSuggestionsComponent implements OnChanges {
  @Input() code = '';
  @Input() language = 'javascript';

  loading = false;
  suggestions: LearningSuggestion[] = [];

  private readonly aiService = new AiService();

  async ngOnChanges(): Promise<void> {
    if (!this.code.trim()) {
      this.suggestions = [];
      return;
    }

    this.loading = true;
    try {
      this.suggestions = await this.aiService.getLearningSuggestions(this.code, this.language);
    } catch {
      this.suggestions = [
        {
          concept: 'Connection issue',
          hint: 'Unable to reach AI backend. Verify backend server and API key configuration.'
        }
      ];
    } finally {
      this.loading = false;
    }
  }
}
