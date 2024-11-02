import {
  Directive,
  ElementRef,
  SimpleChanges,
  EventEmitter,
  inject,
  NgZone,
  ChangeDetectorRef,
} from '@angular/core';

function isTemplate(childNode: ChildNode): childNode is HTMLTemplateElement {
  return childNode.nodeName.toLowerCase() === 'template';
}

@Directive({
  standalone: true,
})
export class CePassthrough<T extends HTMLElement> {
  protected zone = inject(NgZone);
  private cdRef = inject(ChangeDetectorRef);
  public el = this.elRef.nativeElement;
  private pollInterval: any;

  constructor(public elRef: ElementRef<T>) {
    this.cdRef.detach();
  }

  static eventMap: Record<string, string> = {} as const;

  ngOnChanges(changes: SimpleChanges) {
    // console.log('change detected!');
    this.zone.runOutsideAngular(() => {
      for (const changedProp of Object.keys(changes)) {
        if (!(changedProp in this.elRef.nativeElement)) {
          continue;
        }
        const currentValue = changes[changedProp].currentValue;
        (this.elRef.nativeElement as any)[changedProp] = currentValue;
      }
    });
  }

  ngOnInit() {
    this.zone.runOutsideAngular(() => {
      const eventNameMap = (this.constructor as typeof CePassthrough).eventMap;
      const eventNames = Object.keys(eventNameMap) as Array<keyof typeof eventNameMap>;
      const element = this.elRef.nativeElement as HTMLElement;

      const reEmitEvent = (emitterName: string) => (e: Event) => {
        (this as any)[emitterName].emit(e);
      };

      for (const eventName of eventNames) {
        element.addEventListener(
          eventName as keyof HTMLElementEventMap,
          reEmitEvent(eventNameMap[eventName])
        );
      }
    });

    // this.zone.runOutsideAngular(() => {

    // })
    // this.initTemplatePolling();
  }

  // Doesn't seem to work like it does in the web component `define` module
  // initTemplatePolling() {
  //   let template: HTMLTemplateElement | undefined = [...(this.el as any).childNodes].find(
  //     isTemplate
  //   );
  //   if (!template) {
  //     console.log('no template found');
  //     return;
  //   }
  //   console.log('template found!', template)
  //   let previousContentSnapshot = template.content.cloneNode(true);

  //   // Function to compare snapshots
  //   const hasContentChanged = () => {
  //     // Create a new snapshot to compare
  //     const currentSnapshot = template.content.cloneNode(true);

  //     // Compare the new snapshot to the previous one
  //     const isDifferent = !currentSnapshot.isEqualNode(previousContentSnapshot);

  //     if (isDifferent) {
  //       console.log('Template content modified!', currentSnapshot);
  //       previousContentSnapshot = currentSnapshot; // Update the snapshot
  //       (this.el as any).renderPreactComponent([
  //         ...(template.content.firstChild as any).childNodes,
  //       ]);
  //     }
  //   };

  //   if (this.pollInterval) {
  //     clearInterval(this.pollInterval);
  //   }

  //   // Set up polling interval (adjust as needed)
  //   this.pollInterval = setInterval(hasContentChanged, 500); // Check every 500ms
  // }
}
