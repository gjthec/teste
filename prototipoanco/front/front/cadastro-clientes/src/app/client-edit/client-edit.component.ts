import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-client-edit',
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
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit {
  clientForm: FormGroup;
  clientId: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
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
      relatorioUrl: [null]
    });
    this.clientId = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    // Comportamento de inicialização do componente, sem `ClientService`
  }

  onSubmit(): void {
    // Lógica para envio do formulário sem `ClientService`
    if (this.clientForm.valid) {
      const updatedClient = this.clientForm.value;
      alert('Dados do cliente prontos para atualização: ' + JSON.stringify(updatedClient));
    }
  }
}
