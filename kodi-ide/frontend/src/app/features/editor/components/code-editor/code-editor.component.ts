import { Component, Input } from '@angular/core';

@Component({
  selector: 'kodi-code-editor',
  standalone: true,
  template: `
    <section class="editor-shell">
      <h2>KODI Code Editor</h2>
      <textarea [value]="code" (input)="onInput($event)" rows="16"></textarea>
      <small>Language: {{ language }}</small>
    </section>
  `,
  styles: [
    `
      .editor-shell {
        display: grid;
        gap: 0.75rem;
      }

      textarea {
        width: 100%;
        font-family: monospace;
      }
    `
  ]
})
export class CodeEditorComponent {
  @Input() code = '';
  @Input() language = 'javascript';

  onInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.code = target.value;
  }
}
