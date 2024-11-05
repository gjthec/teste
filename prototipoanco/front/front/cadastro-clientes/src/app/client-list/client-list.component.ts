import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule],
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  clients = [
    { cpfCnpj: '12345678901', razaoSocial: 'Empresa Exemplo', cidade: 'Cidade Exemplo', estado: 'EX', situacao: 'Em Processo' }
  ];
  displayedColumns: string[] = ['cpfCnpj', 'razaoSocial', 'cidade', 'estado', 'situacao', 'actions'];

  constructor() {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    // Simulação da lista de clientes sem uso de ClientService
    this.clients = [
      { cpfCnpj: '12345678901', razaoSocial: 'Empresa Exemplo', cidade: 'Cidade Exemplo', estado: 'EX', situacao: 'Em Processo' },
      { cpfCnpj: '98765432100', razaoSocial: 'Outra Empresa', cidade: 'Outra Cidade', estado: 'OT', situacao: 'Nome Limpo' }
    ];
  }

  // Método para simular a navegação para a edição do cliente
  editClient(clientId: string): void {
    alert(`Navegar para edição do cliente com ID: ${clientId}`);
  }

  deleteClient(clientId: string): void {
    alert(`Simulação de exclusão do cliente com ID: ${clientId}`);
    this.loadClients(); // Atualiza a lista após exclusão (simulado)
  }
}
