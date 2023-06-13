import { Component, ElementRef, Renderer2 } from '@angular/core';
import JSConfetti from 'js-confetti';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'seti-mutants';
  public inputDNA: string;
  public initialArray: string[] = [];
  public resultState: string;

  constructor(private renderer2: Renderer2, private elementRef: ElementRef) {
    /* ATGCGA,CAGTGC,TTATGT,AGAAGG,CCCCTA,TCACTG */
    this.inputDNA = '';
    this.resultState = '';
  }

  public analizeDNA() {
    if (this.inputDNA.length != 0) {
      const array = this.inputDNA.split(',');

      for (let i = 0; i < array.length; i++) {
        this.initialArray.push(array[i]);
      }
      if (this.isMutant(this.initialArray)) {
        this.resultState = 'Eres mutante!';
      } else {
        this.resultState = 'Eres normal :c';
      }
      this.shootConffeti();
      this.inputDNA = '';
      this.initialArray = [];
      setTimeout(() => {
        this.resultState = '';
      }, 2000);
    }
  }

  public isMutant(dna: string[]): boolean {
    const matrix: string[][] = [];

    for (let i = 0; i < dna.length; i++) {
      const row = dna[i].split('');
      matrix.push(row);
    }

    const maxLengthInRows = matrix.length;
    const maxLengthInColumns = matrix[0].length;

    for (let i = 0; i < maxLengthInRows; i++) {
      for (let j = 0; j < maxLengthInColumns; j++) {
        const currentLetter = matrix[i][j];

        if (
          i + 3 < maxLengthInRows &&
          currentLetter === matrix[i + 1][j] &&
          currentLetter === matrix[i + 2][j] &&
          currentLetter === matrix[i + 3][j]
        ) {
          return true;
        }

        if (
          i + 3 < maxLengthInColumns &&
          currentLetter === matrix[i][j + 1] &&
          currentLetter === matrix[i][j + 2] &&
          currentLetter === matrix[i][j + 3]
        ) {
          return true;
        }

        if (
          i + 3 < maxLengthInRows &&
          i + 3 < maxLengthInColumns &&
          currentLetter === matrix[i + 1][j + 1] &&
          currentLetter === matrix[i + 2][j + 2] &&
          currentLetter === matrix[i + 3][j + 3]
        ) {
          return true;
        }
      }
    }

    return false;
  }

  private shootConffeti() {
    const jsConfetti = new JSConfetti()
    jsConfetti.addConfetti()
  }
}
