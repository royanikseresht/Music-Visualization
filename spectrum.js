function Spectrum() {
  this.name = "spectrum";

  this.draw = function () {
    push();
    var spectrum = fourier.analyze();
    noStroke();

    fill(0, 255, 0);

    const n = spectrum.length;

    for (var i = 0; i < n; i++) {
      const amplitude = spectrum[i];
      const x = 0;
      const y = map(i, 0, n, 0, height);
      const barWidth = map(amplitude, 0, 255, 0, width);
      const barHeight = height / n;
      const red = amplitude;
      const green = map(amplitude, 0, 255, 255, 0);
      const blue = 0;

      fill(red, green, blue);
      rect(x, y, barWidth, barHeight);
    }

    pop();
  };
}
