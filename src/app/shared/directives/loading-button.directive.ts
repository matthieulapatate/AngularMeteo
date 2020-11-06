import { Attribute, Directive, Renderer2, ElementRef, OnChanges, OnInit, HostListener } from '@angular/core';

@Directive({
  selector: '[appLoadingButton]'
})
export class LoadingButtonDirective implements OnInit {

  originalInnerText: string;

  constructor(@Attribute('loader') public loader: string, private el: ElementRef,
    private renderer: Renderer2) {
  }

  ngOnInit() {
    // Set the button to maintain the same dimensions, even once we put the spinner inside.
    this.el.nativeElement.style.height = `${(this.el.nativeElement as HTMLElement).offsetHeight}px`;
    this.el.nativeElement.style.width = `${(this.el.nativeElement as HTMLElement).offsetWidth}px`;
  }

  @HostListener('click') onMouseClick() {
    let spinner = this.renderer.createElement('img');
    spinner.src = this.loader;
    this.renderer.setStyle(spinner, 'height', '100%');
    this.originalInnerText = this.el.nativeElement.textContent;
    this.el.nativeElement.removeChild(this.el.nativeElement.firstChild);
    this.el.nativeElement.appendChild(spinner);
    setTimeout(() => {
      this.el.nativeElement.removeChild(this.el.nativeElement.firstChild);
      this.el.nativeElement.innerText = this.originalInnerText;
      (<HTMLButtonElement>this.el.nativeElement).disabled = false;
    }, 3000);
  }

}