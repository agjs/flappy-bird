import PlayScene from './Play';
import MenuScene from './Menu';
import PreloadScene from './Preload';

export default (config) => {
  return [PreloadScene, MenuScene, PlayScene].map((Scene) => new Scene(config));
};
