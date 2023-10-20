import { Component, Input, OnChanges, SimpleChange } from "@angular/core";

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.scss']
})
export class PasswordStrengthComponent implements OnChanges {
  bar0: string = '';
  bar1: string = '';
  bar2: string = '';
  bars = [this.bar0, this.bar1, this.bar2]
  private colors = ['darkred', 'orangered', 'yellowgreen'];
  @Input() public passwordToCheck: string = '';
  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    const password = changes["passwordToCheck"].currentValue;

    if (password) {
      if (password.length <= 6) {
        let strength = this.bars.length + 1
        this.setBarColors(strength)
      }
      const c = this.checkStrength(password);
      this.setBarColors(c);
    }
  }
  checkStrength(p: string) {
    let force = 0;

    const hasLetters = /[a-zA-Z]/.test(p);
    const hasDigits = /[0-9]/.test(p);
    const hasSymbols = /[$-/:-?{-~!"^_@`\[\]]/.test(p);

    if (hasLetters && hasSymbols && hasDigits) {
      force = 3;
    } else if ((hasLetters && hasSymbols) || (hasLetters && hasDigits) || (hasDigits && hasSymbols)) {
      force = 2;
    } else if (hasLetters || hasDigits || hasSymbols) {
      force = 1;
    }
    return force;
  }



  private setBarColors(s: number) {

    if (this.bars.length <= s ) {
      for (let bar of this.bars) {
        bar = 'darkred'
      }
    }
    for (let n = 0; n <= s - 1; n++) {
      this.bars [n] = this.colors[s-1]
    }

  }
}
