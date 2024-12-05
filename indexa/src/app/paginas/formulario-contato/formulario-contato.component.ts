import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { ContainerComponent } from "../../components/container/container.component";
import { SeparadorComponent } from "../../components/separador/separador.component";
import { ContatoService } from "../../services/contato.service";

@Component({
  selector: "app-formulario-contato",
  standalone: true,
  imports: [CommonModule, ContainerComponent, SeparadorComponent, ReactiveFormsModule, RouterLink],
  templateUrl: "./formulario-contato.component.html",
  styleUrl: "./formulario-contato.component.css",
})
export class FormularioContatoComponent implements OnInit {
  contatoForm!: FormGroup;

  constructor(private contatoService: ContatoService) {}

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  public salvarContato() {
    const novoContato = this.contatoForm.value;
    this.contatoService.salvarContato(novoContato);
  }

  inicializarFormulario() {
    this.contatoForm = new FormGroup({
      nome: new FormControl("", Validators.required),
      telefone: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      aniversario: new FormControl(""),
      redes: new FormControl(""),
      observacoes: new FormControl(""),
    });
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.contatoForm.value);
  }

  cancelar() {
    console.log("Submissão cancelada");
  }
}
