declare namespace Sketch {
  interface Context {
    document: MSDocument;
  }

  interface MSDocument {
    showMessage(message: string): void;
  }
}
