import CasinoIcon from "@mui/icons-material/Casino";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import CastleIcon from "@mui/icons-material/Castle";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import DiningIcon from "@mui/icons-material/Dining";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PsychologyIcon from "@mui/icons-material/Psychology";
import FortIcon from "@mui/icons-material/Fort";
import Groups2Icon from "@mui/icons-material/Groups2";
import InterpreterModeIcon from "@mui/icons-material/InterpreterMode";
import WebStoriesIcon from "@mui/icons-material/WebStories";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import CurtainsIcon from "@mui/icons-material/Curtains";
import CycloneIcon from "@mui/icons-material/Cyclone";

export const ITEMS_PER_PAGE = "100";

export const COL_NAMES = [
  "name",
  "type",
  "description",
  "day",
  "duration",
  "date_updated",
  "space",
  "room_name",
];

export const GAME_ICON_MAP = {
  "Board Game": <CasinoIcon />,
  "Roleplaying Game": <AutoStoriesIcon />,
  "Miniatures Game": <CastleIcon />,
  Wargame: <FortIcon />,
  "Live-Action Role Playing Game": <Groups2Icon />,
  "Social Deduction/Deception": <PsychologyIcon />,
  "Card Game": <WebStoriesIcon />,
  "Paint and Take": <ColorLensIcon />,
  "Seminars and Panels": <InterpreterModeIcon />,
  Food: <DiningIcon />,
  Tournament: <EmojiEventsIcon />,
  "Video Games": <SportsEsportsIcon />,
  Eclectic: <CycloneIcon />,
  Entertainment: <CurtainsIcon />,
};
