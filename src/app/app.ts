import { Component, inject } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AppFormService } from './services/app-form.service';
import { ChainsEntityService } from './services/chains.entity.service';

@Component({
  selector: 'app-root',
  imports: [MatSelectModule, MatFormFieldModule, ReactiveFormsModule, FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly appFormService = inject(AppFormService);
  private readonly chainsEntityService = inject(ChainsEntityService);
  protected readonly form = this.appFormService.form;
  protected readonly chains = this.chainsEntityService.chains;
}
