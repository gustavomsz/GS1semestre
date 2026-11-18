const onibus = [];

class Onibus {
    constructor(id, assentosDisponiveis) {
        this.id = id;
        onibus.push(id);
        this.led = false;
        this.assentosDisponiveis = assentosDisponiveis;
        this.total = assentosDisponiveis;
    }
    alugarAssentos(pessoa, quantidade) {
        if (pessoa.temDireitoAosAssentos() && this.assentosDisponiveis >= quantidade) {
            this.assentosDisponiveis -= quantidade;
            console.log("Assento agendado com sucesso.");
            console.log("Seu aluguel já foi informado ao motorista.");
            console.log("[MOTORISTA]" + " - " + pessoa.nome + " - " + this.id + " - " + pessoa.deficiencia + " - " + quantidade + " Assentos foram alugados");
            this.led = true;
            return true;

        } else {
            console.log("Assentos indisponiveis no momento.");
            return false;
        }
    }
    cancelarAluguel(quantidade) {
        this.reservados = this.total - this.assentosDisponiveis;

        if (quantidade <= this.reservados) {
            console.log("O cancelamento do agendamento foi realizado com sucesso.");
            this.assentosDisponiveis += quantidade;

            if (this.assentosDisponiveis == this.total) {
                this.led = false;
            }
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
            case "IDOSO":
                console.log("Passageiro tem direito ao assento preferencial");
                return true;
            case "MOBILIDADE REDUZIDA":
                console.log("Passageiro tem direito ao assento preferencial");
                return true;
            case "GESTANTE":
                console.log("Passageiro tem direito ao assento preferencial");
                return true;
            case "AUTISTA":
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

    } onibusProximos(onibus) {
        this.onibus = onibus;
        if (this.status == "SEM ONIBUS") {
            this.status = "A CAMINHO";
            console.log(formatarMensagem(onibus.id, this.ponto, this.status))

        } else if (this.status == "A CAMINHO") {
            this.status = "ONIBUS CHEGOU";
            console.log(formatarMensagem(onibus.id, this.ponto, this.status))

        } else if (this.status == "ONIBUS CHEGOU") {
            this.status = "ONIBUS ACABOU DE SAIR";
            console.log(formatarMensagem(onibus.id, this.ponto, this.status))

        } else if (this.status == "ONIBUS ACABOU DE SAIR") {
            this.status = "SEM ONIBUS";
            console.log(formatarMensagem(onibus.id, this.ponto, this.status))
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
    avisarProximo(posicao, onibus) {
        let proxima = this.antenas[posicao + 1]

        if (posicao == this.antenas.length - 1) {
            console.log("PONTO FINAL");
        } else {
            proxima.onibusProximos(onibus)
        }
    }
    simularViagem(onibus) {

        console.log("INICIOU A VIAGEM");
        let primeira = this.antenas[0];
        primeira.onibusProximos(onibus);

        for (let i = 0; i < this.antenas.length; i++) {
            let atual = this.antenas[i];
            atual.onibusProximos(onibus);
            atual.onibusProximos(onibus);
            atual.onibusProximos(onibus);
            this.avisarProximo(i, onibus);
        }
    }
}

function formatarMensagem(onibus, ponto, status) {
    return (onibus + " - " + ponto + " : " + status)
}

const onibus1 = new Onibus("971-m", 3);

const antena1 = new Antena("Terminal Pq. D. Pedro II");
const antena2 = new Antena("Lgo. Pateo do Colégio");
const antena3 = new Antena("R. Boa Vista, 364");

const rota1 = new Rota("2002-10");

rota1.adicionarParada(antena1);
rota1.adicionarParada(antena2);
rota1.adicionarParada(antena3);

console.log("Paradas da linha " + rota1.numeroLinha + ":");
for (let i = 0; i < rota1.antenas.length; i++) {
    console.log("  " + i + " - " + rota1.antenas[i].ponto);
}

rota1.simularViagem(onibus1);
