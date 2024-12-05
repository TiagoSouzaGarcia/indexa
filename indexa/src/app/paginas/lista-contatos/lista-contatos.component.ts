import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CabecalhoComponent } from "../../components/cabecalho/cabecalho.component";
import { ContainerComponent } from "../../components/container/container.component";
import { ContatoComponent } from "../../components/contato/contato.component";
import { SeparadorComponent } from "../../components/separador/separador.component";

import { RouterLink } from "@angular/router";
import agenda from "../../agenda.json";
import { ContatoService } from "../../services/contato.service";
import { Contato } from "../../components/contato/contato";

@Component({
  selector: "app-lista-contatos",
  standalone: true,
  imports: [CommonModule, ContainerComponent, CabecalhoComponent, SeparadorComponent, ContatoComponent, RouterLink, FormsModule],
  templateUrl: "./lista-contatos.component.html",
  styleUrl: "./lista-contatos.component.css",
})
export class ListaContatosComponent implements OnInit {
  alfabeto: string = "abcdefghijklmnopqrstuvwxyz";
  contatos: Contato[] = agenda;
  filtroPorTexto: string = "";

  constructor(private contatoService: ContatoService) {}

  ngOnInit() {
    this.contatoService.obterContatos();
  }

  private removerAcentos(texto: string): string {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  filtrarContatosPorTexto(): Contato[] {
    if (!this.filtroPorTexto) {
      return this.contatos;
    }
    return this.contatos.filter((contato) => {
      return contato.nome.toLowerCase().includes(this.removerAcentos(this.filtroPorTexto).toLowerCase());
    });
  }

  filtrarContatosPorLetraInicial(letra: string): Contato[] {
    return this.filtrarContatosPorTexto().filter((contato) => {
      return contato.nome.toLowerCase().startsWith(letra);
    });
  }
}
