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

    this.initTemplatePolling();
  }

  getTemplateContent(): Node | null {
    const template: HTMLTemplateElement | undefined = [...(this.el as any).childNodes].find(
      isTemplate
    );
    if (!template) {
      console.error('No web component template found');
    }
    return template?.content.firstChild ?? null;
  }

  // Doesn't seem to work like it does in the web component `define` module
  initTemplatePolling() {
    let previousContentSnapshot = this.getTemplateContent()?.cloneNode(true);

    // Function to compare snapshots
    const hasContentChanged = () => {
      const currentContent = this.getTemplateContent();

      // Compare the new content to the previous snapshot
      const isDifferent =
        !previousContentSnapshot || !previousContentSnapshot.isEqualNode(currentContent);

      if (isDifferent) {
        previousContentSnapshot = currentContent?.cloneNode(true); // Update the snapshot
        (this.el as any).renderPreactComponent(
          currentContent ? [...(currentContent.childNodes as any)] : []
        );
      }
    };

    if (this.pollInterval) {
      clearInterval(this.pollInterval);
    }

    // Set up polling interval (adjust as needed)
    this.pollInterval = setInterval(hasContentChanged, 500); // Check every 500ms
  }
}
