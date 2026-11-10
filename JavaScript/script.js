const onibus = [];

class Onibus {
  constructor(id, assentosDisponiveis) {
    this.id = id;
    onibus.push(id);
    this.assentosDisponiveis = assentosDisponiveis;
    this.total = assentosDisponiveis;
  }
  alugarAssentos(pessoa, quntidade) {
    if (pessoa.temDireitoAosAssentos() && this.assentosDisponiveis >= quntidade) {
      this.assentosDisponiveis -= quntidade;
      console.log("Assento agendado com sucesso.");
      return true;

    } else {
      console.log("Assentos indisponiveis no momento.");
      return false;
    }
  }
  cancelarAluguel(quntidade) {
    this.reservados = this.total - this.assentosDisponiveis;

    if (quntidade <= this.reservados) {
      console.log("O cancelamento do agendamento foi realizado com sucesso.");
      this.assentosDisponiveis += quntidade;
      return true;

    } else {
      console.log("Não foi possivel cancelar o agendamento");
      return false;
    }
  }
}
class Passageiro {
  constructor(nome, deficiencia) {
    this.nome = nome;
    this.deficiencia = deficiencia;
  }
  temDireitoAosAssentos() {

    switch (this.deficiencia) {
      case "FISICA":
        console.log("Passageiro tem direito ao assento preferencial");
        return true;

      case "VISUAL":
        console.log("Passageiro tem direito ao assento preferencial");
        return true;

      case "AUDITIVA":
        console.log("Passageiro tem direito ao assento preferencial");
        return true;

      default:
        console.log("Passageiro sem direito a tal assento");
        return false;
    }
  }
}
class Antena {
  constructor(ponto) {
    this.ponto = ponto;
    this.status = "SEM ONIBUS";
  
  }onibusProximos(onibus) {
    this.onibus = onibus;
    if (this.status == "SEM ONIBUS") {
      this.status = "A CAMINHO";
      console.log(onibus.id + this.ponto + " Está a caminho");

    } else if (this.status == "A CAMINHO") {
      this.status = "ONIBUS CHEGOU";
      console.log(onibus.id + this.ponto + " Chegou");
      return true;
    } else if (this.status == "ONIBUS CHEGOU") {
      this.status = "ONIBUS ACABOU DE SAIR";
      console.log(onibus.id + this.ponto + " Acabou de sair ");

    } else if (this.status == "ONIBUS ACABOU DE SAIR") {
      this.status = "SEM ONIBUS";
      console.log(onibus.id + this.ponto + " Não está no ponto");
    }
  }
}
class Rota {
  constructor(numeroLinha) {
    this.antenas = [];
    this.numeroLinha = numeroLinha;
  }
  adicionarParada(antena) {
    this.antenas.push(antena);
  }
  avisarProximo(posicao, onibus){
    let proxima = this.antenas[posicao + 1]
      if(posicao  == this.antenas.length -1 ){
        console.log("PONTO FINAL");
      }else{
        proxima.onibusProximos(onibus)
      }
    }
  }


const onibus1 = new Onibus("971-m", 3);
