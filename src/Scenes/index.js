import PlayScene from "./Play";
import MenuScene from "./Menu";
import PreloadScene from "./Preload";
import ScoreScene from "./Score";
import PauseScene from "./Pause";

export default (config) => {
  return [PreloadScene, MenuScene, ScoreScene, PlayScene, PauseScene].map(
    (Scene) => new Scene(config)
  );
};
