import { PAGES } from "./pages.mjs";

export class Assigner {
  constructor(word, isSpy, assignersIterator) {
    this.word = word;
    this.isSpy = isSpy;
    this.assignersIterator = assignersIterator;
  }

  invoke() {
    document.querySelector("." + PAGES.assignPlayers).innerText = "";

    const div = document.createElement("div");
    div.className = "assigner";

    const p = document.createElement("p");
    p.innerText = "Press `OK` to continue";
    div.appendChild(p);

    const button = document.createElement("button");
    button.innerText = "OK";
    button.onclick = () => {
      this.showWord(p, button);
    };
    div.appendChild(button);

    document.querySelector("." + PAGES.assignPlayers).appendChild(div);
  }

  showWord(paragraphDom, okButtonDom) {
    if (!this.isSpy) {
      paragraphDom.innerText = this.word;
    } else {
      paragraphDom.innerText = "FUCKING SPY!!";
    }

    okButtonDom.onclick = () => {
      const nextAssigner = this.assignersIterator.next().value;
      if (nextAssigner) {
        nextAssigner.invoke();
      } else {
        window.showTimer();
      }
    };
  }
}
