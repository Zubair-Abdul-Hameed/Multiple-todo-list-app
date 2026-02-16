// src/ui/icons/iconRegistry.js
import ListAltIcon from '@mui/icons-material/ListAlt';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import HomeIcon from '@mui/icons-material/Home';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FlightIcon from '@mui/icons-material/Flight';
import BuildIcon from '@mui/icons-material/Build';
import StarIcon from '@mui/icons-material/Star';

// + extras (30 total)
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicationIcon from '@mui/icons-material/Medication';
import PaymentsIcon from '@mui/icons-material/Payments';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SavingsIcon from '@mui/icons-material/Savings';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import EventIcon from '@mui/icons-material/Event';
import TodayIcon from '@mui/icons-material/Today';
import AlarmIcon from '@mui/icons-material/Alarm';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CommuteIcon from '@mui/icons-material/Commute';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PetsIcon from '@mui/icons-material/Pets';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import YardIcon from '@mui/icons-material/Yard';
import HandymanIcon from '@mui/icons-material/Handyman';
import ComputerIcon from '@mui/icons-material/Computer';
import CodeIcon from '@mui/icons-material/Code';
import BookIcon from '@mui/icons-material/Book';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MovieIcon from '@mui/icons-material/Movie';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PaletteIcon from '@mui/icons-material/Palette';

export const ICONS = [
  { key: 'list', label: 'List', Icon: ListAltIcon },
  { key: 'work', label: 'Work', Icon: WorkIcon },
  { key: 'school', label: 'School', Icon: SchoolIcon },
  { key: 'home', label: 'Home', Icon: HomeIcon },
  { key: 'fitness', label: 'Fitness', Icon: FitnessCenterIcon },
  { key: 'shopping', label: 'Shopping', Icon: ShoppingCartIcon },
  { key: 'favorite', label: 'Favorite', Icon: FavoriteIcon },
  { key: 'travel', label: 'Travel', Icon: FlightIcon },
  { key: 'tools', label: 'Tools', Icon: BuildIcon },
  { key: 'star', label: 'Star', Icon: StarIcon },

  // Essentials & lifestyle
  { key: 'groceries', label: 'Groceries', Icon: LocalGroceryStoreIcon },
  { key: 'food', label: 'Food', Icon: RestaurantIcon },
  { key: 'coffee', label: 'Coffee', Icon: LocalCafeIcon },

  // Health
  { key: 'health', label: 'Health', Icon: LocalHospitalIcon },
  { key: 'meds', label: 'Medication', Icon: MedicationIcon },

  // Money
  { key: 'payments', label: 'Payments', Icon: PaymentsIcon },
  { key: 'wallet', label: 'Wallet', Icon: AccountBalanceWalletIcon },
  { key: 'savings', label: 'Savings', Icon: SavingsIcon },
  { key: 'bills', label: 'Bills', Icon: ReceiptLongIcon },

  // Time & planning
  { key: 'calendar', label: 'Calendar', Icon: EventIcon },
  { key: 'today', label: 'Today', Icon: TodayIcon },
  { key: 'alarm', label: 'Alarm', Icon: AlarmIcon },
  { key: 'time', label: 'Time', Icon: AccessTimeIcon },

  // Transport & logistics
  { key: 'car', label: 'Car', Icon: DirectionsCarIcon },
  { key: 'commute', label: 'Commute', Icon: CommuteIcon },
  { key: 'shipping', label: 'Shipping', Icon: LocalShippingIcon },

  // People & home life
  { key: 'pets', label: 'Pets', Icon: PetsIcon },
  { key: 'kids', label: 'Kids', Icon: ChildCareIcon },
  { key: 'family', label: 'Family', Icon: FamilyRestroomIcon },
  { key: 'cleaning', label: 'Cleaning', Icon: CleaningServicesIcon },
  { key: 'garden', label: 'Garden', Icon: YardIcon },
  { key: 'handyman', label: 'Handyman', Icon: HandymanIcon },

  // Tech & learning
  { key: 'computer', label: 'Computer', Icon: ComputerIcon },
  { key: 'code', label: 'Code', Icon: CodeIcon },
  { key: 'reading', label: 'Reading', Icon: BookIcon },
  { key: 'study', label: 'Study', Icon: LibraryBooksIcon },

  // Fun & goals
  { key: 'goals', label: 'Goals', Icon: EmojiEventsIcon },
  { key: 'movies', label: 'Movies', Icon: MovieIcon },
  { key: 'music', label: 'Music', Icon: MusicNoteIcon },
  { key: 'creative', label: 'Creative', Icon: PaletteIcon },
];

export const DEFAULT_ICON_KEY = 'list';

export function getIconByKey(key) {
  return (
    ICONS.find(i => i.key === key) ||
    ICONS.find(i => i.key === DEFAULT_ICON_KEY)
  );
}
