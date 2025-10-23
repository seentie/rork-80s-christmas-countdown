export type ColorPalette = {
  neonPink: string;
  neonCyan: string;
  neonPurple: string;
  neonYellow: string;
  neonGreen: string;
  background: string;
  backgroundDark: string;
  gridLine: string;
  textPrimary: string;
  textSecondary: string;
};

export const COLOR_PALETTES: { [key: string]: ColorPalette } = {
  classic: {
    neonPink: "#FF10F0",
    neonCyan: "#00FFFF",
    neonPurple: "#9D00FF",
    neonYellow: "#FFFF00",
    neonGreen: "#39FF14",
    background: "#0A0A0F",
    backgroundDark: "#050508",
    gridLine: "#FF10F0",
    textPrimary: "#FFFFFF",
    textSecondary: "#B0B0B0",
  },
  miami: {
    neonPink: "#FF1493",
    neonCyan: "#00FFF0",
    neonPurple: "#DA70D6",
    neonYellow: "#FFD700",
    neonGreen: "#00FF7F",
    background: "#001529",
    backgroundDark: "#000810",
    gridLine: "#00FFF0",
    textPrimary: "#FFFFFF",
    textSecondary: "#87CEEB",
  },
  sunset: {
    neonPink: "#FF6B35",
    neonCyan: "#004E89",
    neonPurple: "#D62828",
    neonYellow: "#FCBF49",
    neonGreen: "#F77F00",
    background: "#1A0A34",
    backgroundDark: "#0D051A",
    gridLine: "#FF6B35",
    textPrimary: "#FFF3E0",
    textSecondary: "#FFB84D",
  },
  arcade: {
    neonPink: "#FF0080",
    neonCyan: "#00FFFF",
    neonPurple: "#8B00FF",
    neonYellow: "#FFFF00",
    neonGreen: "#00FF00",
    background: "#000000",
    backgroundDark: "#000000",
    gridLine: "#FF0080",
    textPrimary: "#FFFFFF",
    textSecondary: "#00FFFF",
  },
  cyberpunk: {
    neonPink: "#FF0090",
    neonCyan: "#00F0FF",
    neonPurple: "#B026FF",
    neonYellow: "#FFED4E",
    neonGreen: "#39FF14",
    background: "#0D0221",
    backgroundDark: "#050110",
    gridLine: "#00F0FF",
    textPrimary: "#00F0FF",
    textSecondary: "#B026FF",
  },
};

export const PALETTE_NAMES: { [key: string]: string } = {
  classic: "80s Classic",
  miami: "Miami Vice",
  sunset: "Sunset Strip",
  arcade: "Arcade Glow",
  cyberpunk: "Cyberpunk",
};

export const COLORS = COLOR_PALETTES.classic;

export const RETRO_COLORS = {
  neonPink: COLOR_PALETTES.classic.neonPink,
  neonCyan: COLOR_PALETTES.classic.neonCyan,
  neonPurple: COLOR_PALETTES.classic.neonPurple,
  neonYellow: COLOR_PALETTES.classic.neonYellow,
  neonGreen: COLOR_PALETTES.classic.neonGreen,
  electricBlue: "#00BFFF",
  darkBg: COLOR_PALETTES.classic.background,
  darkPurple: "#1A0B2E",
};