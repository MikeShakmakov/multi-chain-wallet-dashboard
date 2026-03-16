import { Component, signal } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  imports: [MatSelectModule, MatFormFieldModule, ReactiveFormsModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('frontend');

  control = new FormControl('');
  chains = [
    { id: 'chain1', name: 'Chain 1' },
    { id: 'chain2', name: 'Chain 2' },
    { id: 'chain3', name: 'Chain 3' },
  ];
}
