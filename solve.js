var solveSudoku = function (board) {
    const m = new Sudoku(board);
    var tentativo = 0;
    while (!m.risolvi()) {
        if (tentativo != 0) {
            var [rigaPunto, colonnaPunto] = m.trovaProssimaCasellaPunto(tentativo);
            var quadrante = Sudoku.trovaQuadrante(rigaPunto, colonnaPunto);
            for (cifra = 1; cifra <= 9; cifra++) {

                if (!m.cifraInRiga(rigaPunto, cifra))
                    if (!m.cifraInQuadrante(quadrante, cifra))
                        if (!m.cifraInColonna(colonnaPunto, cifra)) {

                            const m2 = new Sudoku(JSON.parse(JSON.stringify(m.matrice)));
                            m2.matrice[rigaPunto][colonnaPunto] = cifra.toString();
                            if (m2.risolvi()) {
                                m.matrice[rigaPunto][colonnaPunto] = cifra.toString();
                                break;
                            }
                        };
            }
        }
        tentativo++;


    }

};

class Sudoku {
    constructor(m) {
        this.matrice = m;
    }



    risolvi() {
        //  console.log("inizio la risoluzione della matrice");

        var trovato = true;
        while (trovato) {
            this.caselleVuote = 0;
            trovato = false;
            for (var i = 1; i <= 9; i++) {
                if (this.scorriQuadrante(i))
                    trovato = true;
                if (this.scorriRiga(i - 1))
                    trovato = true;
            }
            //   console.log("caselle vuote=" + this.caselleVuote);
        }
        return this.caselleVuote == 0 ? true : false;
    }


    trovaProssimaCasellaPunto(inizio) {
        var i = 0;
        for (var colonna = 0; colonna < 9; colonna++) {
            for (var riga = 0; riga < 9; riga++) {
                if (this.matrice[riga][colonna] == ".") {
                    i++;
                    if (inizio == i)
                        return [riga, colonna];
                }
            }


        }
    }


    scorriRiga(riga) {
        var trovato = false;
        for (var colonna = 0; colonna < 9; colonna++) {
            if (this.matrice[riga][colonna] == ".") {
                this.caselleVuote++;

                var cifrePossibili = [];
                var quadrante = Sudoku.trovaQuadrante(riga, colonna);

                for (var cif = 1; cif <= 9 && cifrePossibili.length <= 1; cif++) {

                    if (!this.cifraInRiga(riga, cif))
                        if (!this.cifraInColonna(colonna, cif))
                            if (!this.cifraInQuadrante(quadrante, cif)) {
                                cifrePossibili.push(cif);
                            };

                }

                if (cifrePossibili.length == 1) {
                    trovato = 1;
                    this.matrice[riga][colonna] = cifrePossibili[0].toString();

                }
            }

        }
        return trovato;
    }


    scorriQuadrante(quadrante) {

        var trovato = false;
        for (var cifra = 1; cifra <= 9; cifra++) {
            var casellePossibili;
            casellePossibili = this.casellePossibiliInQuadrante(quadrante, cifra);
            if (casellePossibili.length == 1) {
                trovato = 1;
                var [riga, colonna] = casellePossibili[0];
                this.matrice[riga][colonna] = cifra.toString();
                break;
            }
        }
        return trovato;
    }



    cifraInRiga(riga, cifra) {
        var esito = false;
        for (var x = 0; x < 9; x++) {
            if (parseInt(this.matrice[riga][x]) == cifra) {
                esito = true;
                break;
            }
        }
        return esito;
    }

    cifraInColonna(colonna, cifra) {
        var esito = false;
        for (var x = 0; x < 9; x++) {
            if (parseInt(this.matrice[x][colonna]) == cifra) {
                esito = true;
                break;
            }
        }
        return esito;
    }


    cifraInQuadrante(quadrante, cifra) {

        var esito = false;

        var rigaQuadrante = Math.floor((quadrante - 1) / 3) * 3;
        var colonnaQuadrante = Math.floor((quadrante - 1) % 3) * 3;
        for (var x = 0; x < 9; x++) {
            var casellaRiga = parseInt(rigaQuadrante + (Math.floor(x / 3)));
            var casellaColonna = parseInt(colonnaQuadrante + (x % 3));
            if (parseInt(this.matrice[casellaRiga][casellaColonna]) == cifra) {
                esito = true;
                break;
            }
        }
        return esito;
    }




    casellePossibiliInQuadrante(quadrante, cifra) {

        var rigaQuadrante = Math.floor((quadrante - 1) / 3) * 3;
        var colonnaQuadrante = Math.floor((quadrante - 1) % 3) * 3;
        var arrayCasellePossibili = [];
        for (var x = 0; x < 9 && (arrayCasellePossibili.length <= 1); x++) {

            var casellaRiga = parseInt(rigaQuadrante + (Math.floor(x / 3)));
            var casellaColonna = parseInt(colonnaQuadrante + (x % 3));
            if (parseInt(this.matrice[casellaRiga][casellaColonna]) == cifra) {
                var arrayCasellePossibili = [];
                break;
            } else if (this.matrice[casellaRiga][casellaColonna] == ".") {

                if (!this.cifraInColonna(casellaColonna, cifra))
                    if (!this.cifraInRiga(casellaRiga, cifra)) {
                        arrayCasellePossibili.push([casellaRiga, casellaColonna]);
                    }

            }
        }
        return arrayCasellePossibili;
    }


    static trovaQuadrante(riga, colonna) {

        return (parseInt((Math.floor(riga / 3)) * 3) + parseInt(Math.floor(colonna / 3) + 1));
    }

}
