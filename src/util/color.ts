/** Represents a color in Ableton */
export class Color {
  private readonly color: string;

  constructor(color: number | string) {
    if (typeof color === "number") {
      this.color = color.toString(16).padStart(6, "0");
    } else if (color.length === 6 || color.length === 7) {
      this.color = color.replace("#", "");
    } else {
      throw new Error("Color " + color + " is not in a valid format");
    }
  }

  get hex() {
    return `#${this.color}`;
  }

  get rgb() {
    return {
      r: parseInt(this.color.substr(0, 2), 16),
      g: parseInt(this.color.substr(2, 2), 16),
      b: parseInt(this.color.substr(4, 2), 16),
    };
  }

  get numberRepresentation() {
    return parseInt(this.color, 16);
  }

  toString() {
    return this.hex;
  }

  toJSON() {
    return this.numberRepresentation;
  }
}
