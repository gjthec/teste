import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {
  clientForm: FormGroup;
  selectedFile: File | null = null;
  selectedFileName: string = '';
  
  constructor(private fb: FormBuilder) {
    this.clientForm = this.fb.group({
      cpfCnpj: ['', Validators.required],
      razaoSocial: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cep: ['', Validators.required],
      dataInclusao: ['', Validators.required],
      endereco: ['', Validators.required],
      situacao: ['', Validators.required],
      relatorioUrl: [null] // Campo para o PDF
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    // Lógica simples para simular o cadastro sem o ClientService
    if (this.clientForm.valid) {
      const newClient = this.clientForm.value;
      alert('Dados do cliente prontos para cadastro: ' + JSON.stringify(newClient));
      this.clientForm.reset();
    }
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      this.selectedFileName = this.selectedFile.name;
    }
  }
}
