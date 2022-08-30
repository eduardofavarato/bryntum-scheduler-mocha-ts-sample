export const UP_KEY = 38;
export const DOWN_KEY = 40;
export const ENTER_KEY = 13;
export const BACKSPACE_KEY = 8;
export const ESCAPE_KEY = 27;
export const TAB_KEY = 9;

export const TOOLTIP_DELAY = 300;

// Different browsers and servers support different maximum GET request lengths. It appears that the SSO junction or
// some other component fails >= ~5000 chars. I picked 2^12 arbitrarily as some number reasonably smaller than that.
export const MAXIMUM_GET_REQUEST_LENGTH_WHICH_APPEARS_TO_BE_SAFE = 4096;
