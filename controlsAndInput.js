//Constructor function to handle the onscreen menu, keyboard and mouse
//controls
function ControlsAndInput() {
  this.menuDisplayed = false;

  //playback button displayed in the top left of the screen
  this.playbackButton = new PlaybackButton();

  //make the window fullscreen or revert to windowed
  this.mousePressed = function () {
    const hit = this.playbackButton.hitCheck();

    if (hit) {
      //check if the playback button has been clicked
    } else {
      //if not make the visualisation fullscreen
      const status = fullscreen();

      fullscreen(!status);
    }
  };

  //responds to keyboard presses
  //@param keycode the ascii code of the keypressed
  this.keyPressed = function (keycode) {
    // space to toggle menu
    if (keycode == 32) {
      this.menuDisplayed = !this.menuDisplayed;
    }

    // toggle playback with p
    if (keycode === 80) {
      this.playbackButton.toggle();
    }

    const visual = this.getVisualFromKeycode(keycode);

    if (visual !== false) {
      this.vis.selectVisual(this.vis.visuals[visual].name);
    }
  };

  /**
   * Returns the visual index for the specified keycode. Extended from original to support numpad.
   * 
   * @param {Number} keycode - The keycode to get the visual index for.
   * @returns {Number|Boolean} - The visual index or false if the keycode is not supported.
   */
  this.getVisualFromKeycode = function (keycode) {
    switch (keycode) {
      case 49:
      case 97:
        return 0;

      case 50:
      case 98:
        return 1;

      case 51:
      case 99:
        return 2;

      default:
        return false;
    }
  };

  //draws the playback button and potentially the menu
  this.draw = function () {
    push();
    fill("white");
    stroke("black");
    strokeWeight(2);
    textSize(34);

    //playback button
    this.playbackButton.draw();
    //only draw the menu if menu displayed is set to true.
    if (this.menuDisplayed) {
      fill("white");
      noStroke();

      text("Select a visualisation:", 100, 40);
      this.menu();
    }
    pop();
  };

  this.menu = function () {
    //draw out menu items for each visualisation
    const { visuals } = this.vis;
    const n = visuals.length;

    push();
    noStroke();

    const currentVisual = this.vis.selectedVisual.name;

    if (currentVisual === "needles") {
      fill("black");
    } else {
      fill("white");
    }

    textFont("monospace");
    textSize(24);

    const x = 100;
    let y = 80;

    for (let i = 0; i < n; i++) {
      const { name } = visuals[i];

      text(`${i + 1}: ${name}`, x, y);

      if (name === currentVisual) {
        ellipse(x - 20, y - 10, 10, 10);
      }

      // increase offset from start by textSize + 10 pixels padding
      y = 80 + (i + 1) * (24 + 10);
    }

    pop();
  };
}
