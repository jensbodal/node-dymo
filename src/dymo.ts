"use strict";

class Dymo {
  private readonly hostname: string;
  private readonly port: number;
  private readonly printerName: string;

  constructor(options) {
    options = options || {};

    this.hostname = options.hostname || "127.0.0.1";
    this.port = options.port || 41951;
    this.printerName = options.printerName;
  }

  get apiUrl() {
    return `https://${this.hostname}:${this.port}/DYMO/DLS/Printing`;
  }

  async print(printerName: string, labelXml: string, labelSetXml = "") {
    let label = `printerName=${encodeURIComponent(
      this.printerName
    )}&printParamsXml=&labelXml=${encodeURIComponent(
      labelXml
    )}&labelSetXml=${encodeURIComponent(labelSetXml)}`;

    if (typeof process !== "undefined" && process.env) {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // TODO: Bundle the certificates.
    }

    const response = await fetch(`${this.apiUrl}/PrintLabel`, {
      method: "POST",
      body: label,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const result_1 = await response.text();
    return result_1;
  }

  async renderLabel(labelXml: string) {
    let label = `printerName=&renderParamsXml=&labelXml=${encodeURIComponent(
      labelXml
    )}&labelSetXml=`;

    if (typeof process !== "undefined" && process.env) {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // TODO: Bundle the certificates.
    }

    const response = await fetch(`${this.apiUrl}/RenderLabel`, {
      method: "POST",
      body: label,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return await response.text();
  }

  async getStatus() {
    if (typeof process !== "undefined" && process.env) {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // TODO: Bundle the certificates.
    }

    const response = await fetch(`${this.apiUrl}/StatusConnected`);
    return await response.text();
  }

  async getPrinters() {
    if (typeof process !== "undefined" && process.env) {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // TODO: Bundle the certificates.
    }

    const response = await fetch(`${this.apiUrl}/GetPrinters`);
    return await response.text();
  }
}
