import { Component } from '@angular/core';
import PDFDocument from "pdfkit";
import fs from "fs";

@Component({
  selector: 'app-math-pdf-generator',
  imports: [],
  templateUrl: './math-pdf-generator.component.html',
  styleUrl: './math-pdf-generator.component.scss'
})
export class MathPdfGeneratorComponent {
  generatePdf() {
    const doc = new PDFDocument({
      size: "A4",
      margin: 50
    });

    // Output file
    doc.pipe(fs.createWriteStream("class5_math_problems.pdf"));

    // Title
    doc
      .fontSize(18)
      .text("Class 5 Math Practice - 100 Problems", { align: "center" })
      .moveDown(1.5);



    // Layout settings
    doc.fontSize(12);

    const problemsPerRow = 2;
    let count = 0;

    // Generate 100 problems
    for (let i = 1; i <= 100; i++) {
      const problem = `${i}. ${this.generateProblem()}`;

      doc.text(problem, {
        continued: count % problemsPerRow !== problemsPerRow - 1,
        width: 250
      });

      if (count % problemsPerRow === problemsPerRow - 1) {
        doc.moveDown();
      } else {
        doc.text("    "); // spacing between columns
      }

      count++;
    }

    // Finish PDF
    doc.end();

  }

  generateProblem(): string {
    const randomInt = (min: number, max: number): number => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const type = randomInt(1, 4);
    let a: number, b: number;

    switch (type) {
      case 1: // Addition
        a = randomInt(1, 50);
        b = randomInt(1, 50);
        return `${a} + ${b} =`;

      case 2: // Subtraction
        a = randomInt(10, 50);
        b = randomInt(1, a);
        return `${a} - ${b} =`;

      case 3: // Multiplication
        a = randomInt(2, 9);
        b = randomInt(2, 20);
        return `${a} × ${b} =`;

      case 4: // Division (whole number answers)
        b = randomInt(2, 12);
        a = b * randomInt(2, 12);
        return `${a} ÷ ${b} =`;

      default:
        return "";
    }
  }

}
