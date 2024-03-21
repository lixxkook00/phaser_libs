import { ILLCode } from '../utils';
import { setDOMInteractive } from './utils';
import { videoElementCode } from './video-element';

const CODE: Array<ILLCode> = [
  {
    title: 'Follow Hands Tween',
    type: 'hand',
    code: `
      TweenTask.MoveTo(this.hand, 354, 570, {
        duration: 1000,
        onUpdate: () => this.tutorial_char_1.setPosition(this.hand.x - 50, this.hand.y - 75),
        onComplete: () => {
          !this.popupClosed && this.popupScoreTutorial.spawn(this.hand.x + 100, this.hand.y, 500, '+1000').setDepth(99);

          this.time.delayedCall(
            2000,
            () => !this.popupClosed && this.closeTutorial()
          )
        }
      })
      `,
  },
  {
    title: 'Mutiple Hands Tween',
    type: 'hand',
    code: `
        const handMap = [
          { x: 262, y: 493 },
          { x: 618, y: 609 },
          { x: 306, y: 807 },
          { x: 627, y: 848 },
        ];

        handleHand() {
          this.moveCount = 0;
          this.hand = this.add.container(680, 685, this.add.image(1, 1, "atlas", "hand").setOrigin(1)).setAlpha(1);
          TweenTask.Bob(this.hand.first, 10, {
              repeat: -1,
              repeatDelay: 800,
              onRepeat: () => {
                  if (this.moveCount >= handMap.length) {
                      this.moveCount = 0;
                  }
                  const x = handMap[this.moveCount].x;
                  const y = handMap[this.moveCount].y;
                  TweenTask.MoveTo(this.hand, x, y, { duration: 500 , onComplete: () => this.moveCount++});
              },
          });
        }
      `,
  },
  {
    title: 'Selection',
    type: 'events',
    code: `
        // handle select
        this.selections.forEach((item, index) => {
          // render
          TweenTask.FloatIn(item, boxPositions[index].x, boxPositions[index].y, { duration: 1000 , delay: index * 150 });
          
          // events
          item.setInteractive().once(Phaser.Input.Events.POINTER_DOWN, () => {
            // active item selected
            TweenTask.PopFrame(item, 'atlas', 'name_selected', false, { onComplete: () => this.next() });
    
            // clear all item left
            this.selections.forEach(itemToDisable => {
              itemToDisable.removeInteractive();
              if(itemToDisable!==item) {
                itemToDisable.setAlpha(0.5);
              }
            })
          });
        })
      `,
  },
  {
    title: 'Drag Element',
    type: 'events',
    code: `
        setDrag(element, elementTarget, index) {
          const defaultPosition = {
              x: element.x,
              y: element.y,
          };
      
          element
              .setInteractive({ draggable: true })
              .clearTint()
              .once(Phaser.Input.Events.POINTER_DOWN, () => {})
              .on(Phaser.Input.Events.DRAG, (_, x, y) => {
                  element.x = x;
                  element.y = y;
      
                  element.setDepth(99);
      
                  if (Phaser.Geom.Intersects.RectangleToRectangle(elementTarget.getBounds(), element.getBounds())) {
                    const frameNameParts = element.frame.name.split("_");
                    if (frameNameParts[0] === window.themeSelected) {
                      // handle on correct
                    } else {
                      // handle on incorrect
                    }
                  }
                }
              )
              .on(Phaser.Input.Events.POINTER_UP, () => {
                // move back to the previous position
                TweenTask.MoveTo(element, defaultPosition.x, defaultPosition.y);
              }
          );
        }
      `,
  },
  {
    title: 'Glow Effect',
    type: 'effect',
    code: `
      glow(element) {
        const fx1 = element.postFX.addGlow(0xFFDE4C, 0, 0, false, 0.1, 32);
        this.tweens.add({
            targets: fx1,
            outerStrength: 8,
            yoyo: true,
            loop: -1,
            ease: 'sine.inout'
        });
      }
      `,
  },
  {
    title: 'Video Carousel',
    type: 'others',
    code: `
      changeSlide() {
        const videos = [this.video, this.video2];
        const currentVideo = this.currrentVideo === 1 ? 0 : 1;
        const nextVideo = this.currrentVideo === 1 ? 1 : 0;
    
        videos[currentVideo].setAlpha(0);
        videos[currentVideo].pause();
        TweenTask.ZoomOut(videos[currentVideo]);
    
        videos[nextVideo].setAlpha(1);
        videos[nextVideo].play();
        TweenTask.ZoomIn(videos[nextVideo], { scale: 1 });
    
        this.dots[currentVideo].setAlpha(0.5);
        this.dots[nextVideo].setAlpha(1);
    
        this.currrentVideo = nextVideo + 1;
      }
      `,
  },
  {
    title: 'Text Animation',
    type: 'tweens',
    code: `
      this.txt_1 = this.add.image(122, 108, "atlas", "txt_1");

      const fx = this.txt_1.preFX.addReveal(0.1, 0, 0);
      this.tweens.add({
          targets: fx,
          progress: 1,
          yoyo: false,
          repeat: false,
          duration: 1000,
          onComplete : () => {
            this.txt_2 = this.add.image(161, 132, "atlas", "txt_2");
            const fx = this.txt_2.preFX.addReveal(0.1, 0, 0);
            this.tweens.add({
                targets: fx,
                progress: 1,
                yoyo: false,
                repeat: false,
                duration: 1000
            });
          }
      });
      `,
  },
  {
    title: 'Input Element',
    type: 'html-element',
    code: `
      export default class Input extends Phaser.GameObjects.Container {
        constructor(scene, x, y) {
          super(scene, x, y);
          scene.add.existing(this);
      
          /**
           * @type {HTMLVideoElement}
           */
          this.input = document.createElement('input');
          this.input.className = 'input';
          this.input.style.height = '80px';
          this.input.style.width = '375px';
          this.input.style.background = 'none';
          this.input.style.border = 'none';
          this.input.style.outline = 'none';
          this.input.style.borderRadius = '40px';
          this.input.style.textAlign = 'center';
          this.input.style.fontSize = '60px';
          this.input.style.letterSpacing = '6px';
          this.input.maxLength = 4;
    
          this.setAlpha(0);
    
          this.dom = scene.add.dom(0, 0, this.input).setDisplayOrigin(0);
    
          this.add([this.dom]);
        }
    
        get value() {
          return this.input.value;
        }
    
        show() {
          TweenTask.FadeIn(this);
        }
    
        hidden() {
          TweenTask.FadeOut(this);
        }
    }
      `,
  },
  {
    title: 'Rock Paper Scissors',
    type: 'others',
    code: `
      rockPaperScissors() {
        TweenTask.FadeIn(this.overlay);
    
        this.choose = ['scissors', 'rock', 'paper'];
    
        this.rockPaperScissorsContainer = this.add.container(341, 550).setDepth(LAYER.POPUP);
    
        this.rockPaperScissorsContainer.add(this.add.image(0, 0, "atlas", "popup-bg"));
    
        this.txt1 = this.add.image(0, -223, "atlas", "txt-youropponentpick");
        this.rockPaperScissorsContainer.add(this.txt1);
    
        this.circle = this.add.image(-6, -93, "atlas", "circle");
        this.rockPaperScissorsContainer.add(this.circle);
    
        this.txt2 = this.add.image(0, 61, "atlas", "txt-taketyourpicktostratrgame");
        this.rockPaperScissorsContainer.add(this.txt2);
    
        this.rockPaperScissorTitle = this.add.image(0, -148, "atlas", "txt-win").setScale(0);
        this.rockPaperScissorsContainer.add(this.rockPaperScissorTitle);
    
        this.scissors = this.add.sprite(-145, 184, "atlas", "scissors").setScale(0);
        this.rock = this.add.sprite(5, 184, "atlas", "rock").setScale(0);
        this.paper = this.add.sprite(154, 184, "atlas", "paper").setScale(0);
        
        this.selections = [this.scissors, this.rock, this.paper];
        this.rockPaperScissorsContainer.add([...this.selections]);
    
        this.anims.create({
          key: 'choose',
          frames: this.anims.generateFrameNames('atlas', { frames: this.choose }),
          frameRate: 6,
          yoyo: true,
          repeat: -1,
          duration: 150,
        });
    
        this.opponentChoose = this.add.sprite(-6, -93, 'atlas', 'scissors')
            .play('choose');
            this.rockPaperScissorsContainer.add(this.opponentChoose)
    
        // const hand = this.add.image(7, 267, "atlas", "hand");
        // rockPaperScissorsContainer.add(hand);
    
        TweenTask.FloatIn(this.rockPaperScissorsContainer, 0, GAME_HEIGHT);
    
        this.selections.forEach((item, index) => {
          TweenTask.ZoomIn(item, { delay: 500 + index*100 });
    
          item.setInteractive().on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.selections.forEach(itemleft => item !== itemleft && TweenTask.ZoomOut(itemleft));
    
            TweenTask.FadeOut([this.txt1, this.txt2])
    
            TweenTask.MoveTo(item, 0, 170, { scale: 1.35, onComplete: () => {
              this.opponentChoose.stop('choose');
      
              this.time.delayedCall(
                1000,
                () => {
                  this.determineWinner(item.frame.name ,this.opponentChoose.frame.name, item);
                }
              )
            } });
          })
        })
      }

      determineWinner(playerChoice, computerChoice, selected) {
        let result = null;
    
        if (playerChoice === computerChoice) {
          console.log("It's a tie!");
          result = 0;
        } else if (
            (playerChoice === 'rock' && computerChoice === 'scissors') ||
            (playerChoice === 'paper' && computerChoice === 'rock') ||
            (playerChoice === 'scissors' && computerChoice === 'paper')
        ) {
            console.log("Player wins!");
            result = 1;
        } else {
            console.log("Computer wins!");
            result = -1;
        }
    
        this.handleResult(result, selected);
      }
      `,
  },
  {
    title: 'Heart Breathing',
    type: 'tweens',
    code: `
      const fx = this.add.image(this.sys.scale.width / 2, this.sys.scale.height / 2, 'heart');
        fx.setScale(9);

        this.image = fx;

        // const fx2 = fx.postFX.addBloom(0xff0000, 1, 1, 1, 6, 4);
        const barrel = fx.preFX.addBarrel(1);
        // barrel.amount = 2;
        this.add.tween({
            duration: 400,
            repeatDelay: 1000,
            targets: barrel,
            ease: Phaser.Math.Easing.Elastic.InOut,
            amount: 1.2,
            yoyo: true,
            repeat: -1,
            onRepeat: () => {
                this.sound.play("heartbeat");
            },
            onStart: () => {
                this.sound.play("heartbeat");
                this.add.tween({
                    duration: 400,
                    repeatDelay: 1000,
                    targets: fx,
                    ease: (value) => Math.round(value),
                    scale: 10,
                    yoyo: true,
                    repeat: -1
                })
            }
        });
      `,
  },
  {
    title: 'Pixelate Amount Fx',
    type: 'effect',
    code: `
      const sprite = this.add.image(400, 300, 'pic');

      const fx = sprite.preFX.addPixelate(-1);

      this.add.text(10, 10, '[W] Increase Pixelate\n[S] Decrease Pixelate').setResolution(window.devicePixelRatio).setShadow(2, 2);

      const amount = this.add.text(790, 10, 'FX.amount: -1').setResolution(window.devicePixelRatio).setOrigin(1, 0).setShadow(2, 2);

      // increase or decrease with : fx.amount++; or fx.amount--;

      this.time.addEvent({
        delay: 1000,
        callback: () => {
            this.tweens.addCounter({
                from: -1,
                to: 10,
                duration: 2000,
                yoyo: true,
                repeat: -1,
                onUpdate: (value) => {
                  fx.amount = value.getValue();
                    textDebug.setText("Pixel Amount:{fx.amount.toFixed(2).padStart(5, " ")}");
                }
            })
        }
    });
      `,
  },
  {
    title: 'Shine Effect',
    type: 'effect',
    code: `
      const card = this.add.plane(this.sys.scale.width / 2, this.sys.scale.height / 2, 'card');

      card.setScale(2)

      const fx = card.postFX.addShine(1, .2, 5);

      this.add.tween({
          targets: card,
          duration: 4000,
          repeatDelay: 800,
          rotateY: 360,
          repeat: -1
      });
      `,
  },
  {
    title: 'Start With Full Screen',
    type: 'events',
    code: `
      startWithFullScreen() {
        this.input.setHitArea(this.add.rectangle(0, 0, ENV.WIDTH, ENV.HEIGHT));
        this.input.on('pointerdown', (pointer, gameObject) => {
            this.scene.start(ENV.SCENE.PLAY)
        });
      }
      `,
  },
  videoElementCode,
  setDOMInteractive,
];

export default CODE;
