import { ILLCode } from '../utils';

export const videoElementCode: ILLCode = {
  title: 'Video Element',
  type: 'html-element',
  code: `
  import { setDOMInteractive } from '../utils';

  export class VideoElement extends Phaser.GameObjects.Container {
    dom: Phaser.GameObjects.DOMElement;
    video = this.createElement('video', { width: '100%', height: '100%' });
    videoFrame = this.createElement('div', { width: '100%', height: '100%' });
    playButton: Phaser.GameObjects.DOMElement;
    soundButton: Phaser.GameObjects.DOMElement;

    constructor(
      scene: Phaser.Scene,
      x: number,
      y: number,
      public frameWidth: number,
      public frameHeight: number,
      src: string,
      type: VideoMediaType = 'video/mp4'
    ) {
      super(scene, x, y);
      scene.add.existing(this);

      const source = document.createElement('source');
      source.src = src;
      source.type = type;
      this.video.preload = 'metadata';
      this.video.muted = true;
      this.video.autoplay = true;
      this.video.playsInline = true;
      this.video.setAttribute('webkit-playsinline', '');
      this.video.append(source);
      this.video.volume = 0.4;

      this.dom = scene.add.dom(0, 0, 'div', \`width: \${frameWidth}px; height: \${frameHeight}px\`);
      this.dom.node.append(this.video, this.videoFrame);
      this.dom.pointerEvents = 'none';

      const sound = this.createElement('div');
      const play = this.createElement('div');

      this.soundButton = scene.add.dom(0, 0, sound);

      this.playButton = scene.add.dom(0, 0, play);

      this.add([this.dom, this.soundButton, this.playButton]);

      this.muted = true;
      this.load(true);
    }

    private createElement<K extends keyof HTMLElementTagNameMap>(tagName: K, style: Partial<CSSStyleDeclaration> = {}) {
      const element = document.createElement(tagName);

      Object.assign(element.style, { position: 'absolute', pointerEvents: 'none', ...style });

      return element;
    }

    get isPlaying() {
      return !!(this.video.currentTime > 0 && !this.video.paused && !this.video.ended && this.video.readyState > 2);
    }

    get duration() {
      return this.video.duration;
    }

    get muted() {
      return this.video.muted;
    }

    set muted(value) {
      this.video.muted = value;
    }

    get currentTime() {
      return this.video.currentTime;
    }

    set currentTime(value) {
      this.video.currentTime = value;
    }

    load(paused = false) {
      this.video.load();
      paused && this.video.pause();
      return this;
    }

    pause() {
      if (this.isPlaying) this.video.pause();
      return this;
    }

    play() {
      if (!this.isPlaying) this.video.play();
      return this;
    }

    replay() {
      this.currentTime = 0;
      return this.play();
    }

    setMute(value: boolean) {
      this.muted = value;
      return this;
    }

    setBorderFrame(filepath: string, padding = 0, borderRadius = '0', sendToBack = false) {
      const img = document.createElement('img');

      img.src = \`\${this.scene.load.path}\${filepath}\`;
      img.draggable = false;

      Object.assign(this.video.style, {
        width: \`calc(100% - \${padding * 2}px)\`,
        height: \`calc(100% - \${padding * 2}px)\`,
        padding: \`\${padding}px\`,
        zIndex: sendToBack ? '1' : 'auto',
        borderRadius
      });

      this.videoFrame.append(img);

      return this;
    }

    setSoundButton(soundOnPath: string, soundOffPath: string, px = 0, py = 0, handler?: (muted?: boolean) => void) {
      this.soundButton.setPosition(this.frameWidth / 2 - px, -this.frameHeight / 2 + py);

      const soundOn = document.createElement('img');
      soundOn.src = \`\${this.scene.load.path}\${soundOnPath}\`;
      soundOn.draggable = false;

      const soundOff = document.createElement('img');
      soundOff.src = \`\${this.scene.load.path}\${soundOffPath}\`;
      soundOff.draggable = false;
      soundOff.onload = () => {
        this.soundButton.updateSize().setInteractive();

        setDOMInteractive(this.soundButton, soundOff.naturalWidth, soundOff.naturalHeight, () => {
          this.muted = !this.muted;
          soundOn.style.display = this.muted ? 'none' : 'block';
          soundOff.style.display = this.muted ? 'block' : 'none';
          handler?.(this.muted);
        });
      };

      soundOn.style.display = this.muted ? 'none' : 'block';
      soundOff.style.display = this.muted ? 'block' : 'none';

      this.soundButton.node.append(soundOn, soundOff);

      return this;
    }

    setPlayButton(filepath: string, handler = () => {}) {
      const img = document.createElement('img');

      img.src = \`\${this.scene.load.path}\${filepath}\`;
      img.draggable = false;
      img.onload = () => {
        this.playButton.node.append(img);
        this.playButton.updateSize();

        setDOMInteractive(this.playButton, img.naturalWidth, img.naturalHeight, () => {
          if (this.alpha === 1) {
            this.play();
            handler?.();
          }
        });
      };

      this.video.addEventListener('ended', () => this.showPlayButton());
      this.video.addEventListener('pause', () => this.showPlayButton());
      this.video.addEventListener('play', () => this.hidePlayButton());

      return this;
    }

    showPlayButton() {
      if (this.playButton) {
        this.scene.add.tween({ targets: this.playButton, alpha: { from: 0, to: 1 }, duration: 250 });
      }
      return this;
    }

    hidePlayButton() {
      if (this.playButton) {
        this.scene.add.tween({ targets: this.playButton, alpha: { from: 1, to: 0 }, duration: 250 });
      }
      return this;
    }

    update() {
      this.playButton.updateSize();
      this.soundButton.updateSize();
    }
  }

  declare type VideoMediaType = 'video/mp4' | 'video/webm' | 'video/ogg';
`,
};
