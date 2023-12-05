import { ILLCode } from "../utils";


const CODE : Array<ILLCode> = [
    {
      title: 'Follow Hands Tween',
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
      `
    },
    {
      title: 'Mutiple Hands Tween',
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
      `
    },
    {
      title: 'Selection',
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
      `
    },
    {
        title : 'Drag Element',
        code : `
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
      `
    },
    {
      title: 'Glow Effect',
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
      `
    },
    {
      title: 'Video Carousel',
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
      `
    },
    {
      title: 'Text Animation',
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
      `
    },
    {
      title: 'Input Element',
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
      `
    },
    // {
    //   title: 'Updating...',
    //   code: `

    //   `
    // },
]

export default CODE;