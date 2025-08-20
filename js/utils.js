// EMOTERRAIN - Utility functions
import { CONFIG } from './config.js';

export class Utils {
  /**
   * Categorize emotion intensity by score
   */
  static getIntensityByScore(score) {
    if (score == null || isNaN(score)) return 'low';
    if (score <= CONFIG.STYLE.INTENSITY_THRESHOLDS.LOW) return 'low';
    if (score <= CONFIG.STYLE.INTENSITY_THRESHOLDS.MODERATE) return 'moderate';
    if (score <= CONFIG.STYLE.INTENSITY_THRESHOLDS.HIGH) return 'high';
    return 'very_high';
  }

  /**
   * Compute primary emotion from emotions object
   */
  static computePrimaryEmotion(emotions) {
    let best = 'joy';
    let bestVal = -Infinity;
    
    CONFIG.EMOTIONS.ORDER.forEach(emotion => {
      const value = Number(emotions?.[emotion] ?? -Infinity);
      if (value > bestVal || 
          (value === bestVal && CONFIG.EMOTIONS.ORDER.indexOf(emotion) < CONFIG.EMOTIONS.ORDER.indexOf(best))) {
        best = emotion; 
        bestVal = value;
      }
    });
    
    return best;
  }

  /**
   * Format number for display
   */
  static formatNumber(value) {
    return (value == null || isNaN(value)) ? '-' : Number(value).toFixed(0);
  }

  /**
   * Escape HTML characters
   */
  static escapeHtml(str) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    return String(str).replace(/[&<>"']/g, s => map[s]);
  }

  /**
   * Validate GeoJSON data
   */
  static validateGeoJSON(data) {
    if (!data || data.type !== 'FeatureCollection' || !Array.isArray(data.features)) {
      throw new Error('Invalid GeoJSON: FeatureCollection expected');
    }
    return true;
  }

  /**
   * Process features to ensure they have required analysis data
   */
  static processFeatures(features) {
    return features.map(feature => {
      const props = feature.properties || (feature.properties = {});
      const emotions = props.emotions || {};
      
      if (!props.analysis) props.analysis = {};
      
      if (!props.analysis.primary) {
        props.analysis.primary = this.computePrimaryEmotion(emotions);
      }
      
      if (!props.analysis.intensity) {
        const score = emotions[props.analysis.primary];
        props.analysis.intensity = this.getIntensityByScore(score);
      }
      
      return feature;
    });
  }
}
