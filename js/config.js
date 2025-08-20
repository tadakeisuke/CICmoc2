// EMOTERRAIN - Configuration
export const CONFIG = {
  // Data source
  DATA_URL: 'data/data.json',

  // Map settings
  MAP: {
    FALLBACK_VIEW: { center: [34.0700, 134.5550], zoom: 14 },
    TILE_URL: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  },

  // Emotion settings
  EMOTIONS: {
    ORDER: ['joy', 'calm', 'excitement', 'stress'], // tie-breaker priority
    COLORS: {
      joy: '#ffd94a',         // warm yellow
      calm: '#4ea0ff',        // calm blue
      excitement: '#ff5ec4',  // vivid magenta
      stress: '#ff6b6b'       // red
    }
  },

  // Style settings
  STYLE: {
    INTENSITY_THRESHOLDS: {
      LOW: 24,
      MODERATE: 49,
      HIGH: 74
    },
    OPACITY_BY_INTENSITY: {
      low: 0.35,
      moderate: 0.55,
      high: 0.75,
      very_high: 0.95
    },
    POLYGON: {
      STROKE_COLOR: '#ffffff',
      STROKE_WEIGHT: 0.8,
      STROKE_OPACITY: 0.9
    }
  },

  // UI settings
  UI: {
    DEFAULT_OPACITY: 0.75,
    OPACITY_RANGE: { min: 0.2, max: 1.0, step: 0.05 },
    BOUNDS_PADDING: 0.1
  }
};
