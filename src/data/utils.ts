import { ILLCode } from 'utils';

export const setDOMInteractive: ILLCode = {
  title: 'Video Element',
  type: 'others',
  code: `export const setDOMInteractive = (
    element: Phaser.GameObjects.DOMElement,
    width: number,
    height: number,
    fn: () => void
  ) => {
    element
      .setInteractive(new Phaser.Geom.Rectangle(-width / 2, -height / 2, width, height), Phaser.Geom.Triangle.Contains)
      .addListener('click')
      .on('click', fn)
      .on(Phaser.Input.Events.POINTER_DOWN, fn);
  };`,
};
