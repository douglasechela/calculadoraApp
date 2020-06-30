import { Component } from '@angular/core';
import { evaluate } from 'mathjs';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public calculo = ''; // Variável vazia
  public resultado: string; // Variável null

  private ponto = false; // Variável que inicia falsa

  private operacoes = ['+', '-', '*', '/'];

  constructor(public alertController: AlertController) { } // Import para usar os métodos do alert

  // Método para adicionar número
  public adicionarNumero(valor: string) {
    if(this.resultado){
      this.apagarTudo();
    }

    this.calculo = this.calculo + valor; // Pega a variável e adiciona o valor.

  }

   // Método para adicionar ponto
  public adicionarPonto() {

    if (this.ponto) {
      return; // Para a execução de um método e retorna vazio.
    }

    this.calculo += "."; // Pega a variável e adiciona o ponto.
    this.ponto = true;
  }

  // Método para adicionar operações
  public adicionarOperacao(operador: string) {

    if(this.resultado) { // Leva o resultado para cima para continuar o cálculo.
      this.calculo = this.resultado.toString();
      this.resultado = null; // Zera o resultado.
    }

    const ultimo = this.calculo.slice(-1); // Último item para não repetir operador.

    if (this.operacoes.indexOf(ultimo) > -1) { // IndexOf verifica o último caracter dentro da calculadora.
      return; // Para a execução de um método e retorna vazio.
    }

    this.calculo += operador;
    this.ponto = false;
  }

// Método para zerar completamente a calculadora
  public apagarTudo() {
    this.calculo = ''; // Deixa a variável calculo vazia, ela não pode ser nula.
    this.resultado = null; // Anula a variável resultado, limpando tudo que tem nela.
    this.ponto = false; // Libera a calculadora para que possa ser incluido o ponto.
  }

  // Método para extrair um texto por partes
  public apagarUltimo() {
    const ultimo = this.calculo.slice(-1); // Teste para "pegar" o último caracter.
    if (ultimo == '.') {
      this.ponto = false;
    }

    this.calculo = this.calculo.slice(0, -1);  // Método que "pega" o que está na váriavel, mas não considera o último carácter.
  }

  public calcularResultado() {
    try { // Mensagem de erro, tenta executar e se houver erro executa o que está no catch.
      this.resultado = evaluate(this.calculo); // Chama a função evaluate do mathjs e executa os cálculos.
    } catch (e) {
      this.resultado = ''; // Zerado.
      this.presentAlert('ERRo!!!', 'Calculo inválido, verifique!');
    }
  }

  // Método de alerta.
  async presentAlert(titulo:string, mensagem: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensagem,
      buttons: ['OK']
    });

    await alert.present();
  }

}