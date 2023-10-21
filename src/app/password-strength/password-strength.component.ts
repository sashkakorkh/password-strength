import { Component, EventEmitter, Input, OnChanges, Output, SimpleChange } from "@angular/core";

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.scss'],
})
export class PasswordStrengthComponent implements OnChanges {
  bar0: string = '';
  bar1: string = '';
  bar2: string = '';
  strengthText: string = '';
  message: string = '';
  messageColor: string = '';
  @Input() public passwordToCheck: string = '';
  @Output() passwordStrength = new EventEmitter<boolean>();
  private colors = ['darkred', 'orangered', 'yellowgreen'];

  checkStrength(p: string) {
    let strength = 0;
    const hasLetters = /[a-zA-Z]/.test(p);
    const hasDigits = /[0-9]/.test(p);
    const hasSymbols = /[$-/:-?{-~!"^_@`\[\]]/.test(p);

    if (hasLetters && hasSymbols && hasDigits) {
      strength = 3;
      this.strengthText = 'Strong password';
    } else if (
      (hasLetters && hasSymbols) ||
      (hasLetters && hasDigits) ||
      (hasDigits && hasSymbols)
    ) {
      strength = 2;
      this.strengthText = 'Medium password';
    } else if (hasLetters || hasDigits || hasSymbols) {
      strength = 1;
      this.strengthText = 'Weak password';
    }
    return strength
  }
  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    // @ts-ignore
    const password = changes.passwordToCheck.currentValue;
    this.setBarColors(3, '#DDD');
    if (password) {
      const pwdStrength = this.checkStrength(password);
      pwdStrength === 3 ? this.passwordStrength.emit(true) : this.passwordStrength.emit(false);
      if (password.length <= 6) {
        this.setBarColors(3, 'darkred');
      } else {
        const c = this.getColor(this.checkStrength(password));
        this.setBarColors(c.index, c.color);
      }
      switch (pwdStrength) {
        case 1:
          this.message = 'Poor';
          break;
        case 2:
          this.message = 'Not Good';
          break;
        case 3:
          this.message = 'Great';
          break;
      }
    } else {
      this.message = '';
    }
  }

  private getColor(s: number) {
    let index = s;
    this.messageColor = this.colors[index -1];
    return {
      index: index,
      color: this.colors[index - 1],
    };
  }

  private setBarColors(count: number, col: string) {
    for (let n = 0; n < count; n++) {
      // @ts-ignore
      this['bar' + n] = col;
    }
  }
}
