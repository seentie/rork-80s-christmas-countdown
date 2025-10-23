export const HOLIDAY_QUOTES = [
  "The best way to spread Christmas cheer is singing loud for all to hear.",
  "Christmas isn't a season. It's a feeling.",
  "The magic of Christmas never ends and its greatest gifts are family and friends.",
  "Christmas waves a magic wand over this world, and behold, everything is softer and more beautiful.",
  "Peace on earth will come to stay, when we live Christmas every day.",
  "Christmas is not as much about opening our presents as opening our hearts.",
  "The joy of brightening other lives becomes for us the magic of the holidays.",
  "Christmas is a day of meaning and traditions, a special day spent in the warm circle of family and friends.",
  "At Christmas, all roads lead home.",
  "Christmas is the spirit of giving without a thought of getting.",
  "The best of all gifts around any Christmas tree is the presence of a happy family.",
  "Christmas is a season not only of rejoicing but of reflection.",
  "Christmas is doing a little something extra for someone.",
  "The wonder of Christmas is that it makes all things new.",
  "Christmas is the day that holds all time together.",
  "Christmas is a bridge. We need bridges as the river of time flows past.",
  "Christmas is built upon a beautiful and intentional paradox; that the birth of the homeless should be celebrated in every home.",
  "Christmas is the gentlest, loveliest festival of the revolving year.",
  "Christmas is a time when you get homesick - even when you're home.",
  "Christmas is forever, not for just one day, for loving, sharing, giving, are not to put away.",
  "Christmas is the season of joy, of holiday greetings exchanged, of gift-giving, and of families united.",
  "Christmas is a necessity. There has to be at least one day of the year to remind us that we're here for something else besides ourselves.",
  "Christmas is a time of little time.",
  "Christmas is a season for kindling the fire for hospitality in the hall, the genial flame of charity in the heart.",
  "Christmas is the keeping-place for memories of our innocence.",
  "Christmas is a time when everybody wants his past forgotten and his present remembered.",
  "Christmas is not a time nor a season, but a state of mind.",
  "Christmas is the one time of year when people of all religions come together to worship Jesus Christ.",
  "Christmas is a baby shower that went totally overboard.",
  "Christmas is the season when you buy this year's gifts with next year's money.",
  "Christmas is a time when kids tell Santa what they want and adults pay for it.",
  "Christmas is like candy; it slowly melts in your mouth sweetening every taste bud, making you wish it could last forever.",
  "Christmas is a tonic for our souls. It moves us to think of others rather than of ourselves.",
  "Christmas is a time to open our hearts to God and his gifts.",
  "Christmas is the time to touch every heart with love and care.",
  "Christmas is about spending time with family and friends. It's about creating happy memories that will last a lifetime.",
  "Christmas is the perfect time to celebrate the love of God and family and to create memories that will last forever."
];

export function getDailyHolidayQuote(): string {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const quoteIndex = dayOfYear % HOLIDAY_QUOTES.length;
  return HOLIDAY_QUOTES[quoteIndex];
}