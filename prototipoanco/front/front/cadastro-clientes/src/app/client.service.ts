import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'http://localhost:5000/api/clients'; // URL do backend para CRUD de clientes
  private uploadUrl = 'http://localhost:5000/api/upload'; // URL do backend para upload de PDF

  constructor(private http: HttpClient) {}

  // Método para criar um novo cliente - agora retorna um Observable vazio
  createClient(): Observable<void> {
    return of(undefined);
  }

  // Método para obter todos os clientes - retorna Observable vazio
  getAllClients(): Observable<void> {
    return of(undefined);
  }

  // Método para obter um cliente pelo ID - retorna Observable vazio
  getClientById(): Observable<void> {
    return of(undefined);
  }

  // Método para atualizar um cliente existente - retorna Observable vazio
  updateClient(): Observable<void> {
    return of(undefined);
  }

  // Método para excluir um cliente pelo ID - retorna Observable vazio
  deleteClient(): Observable<void> {
    return of(undefined);
  }

  // Método para fazer upload de um PDF e obter a URL de retorno - retorna Observable vazio
  uploadPDF(): Observable<void> {
    return of(undefined);
  }
}
