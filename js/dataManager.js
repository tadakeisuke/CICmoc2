// EMOTERRAIN - Data Manager
import { CONFIG } from './config.js';
import { Utils } from './utils.js';

export class DataManager {
  constructor() {
    this.rawData = null;
    this.loadingCallbacks = [];
    this.errorCallbacks = [];
  }

  /**
   * Register callbacks for data loading events
   */
  onLoading(callback) {
    this.loadingCallbacks.push(callback);
  }

  onError(callback) {
    this.errorCallbacks.push(callback);
  }

  /**
   * Trigger loading callbacks
   */
  triggerLoading(isLoading) {
    this.loadingCallbacks.forEach(callback => callback(isLoading));
  }

  /**
   * Trigger error callbacks
   */
  triggerError(error) {
    this.errorCallbacks.forEach(callback => callback(error));
  }

  /**
   * Fetch and process emotion data
   */
  async fetchData() {
    this.triggerLoading(true);
    this.triggerError(null);

    try {
      const response = await fetch(CONFIG.DATA_URL, { cache: 'no-store' });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch ${CONFIG.DATA_URL}: ${response.status}`);
      }

      const data = await response.json();
      Utils.validateGeoJSON(data);

      // Process features to ensure analysis data
      data.features = Utils.processFeatures(data.features);

      this.rawData = data;
      return data;

    } catch (error) {
      console.error('Data loading error:', error);
      this.triggerError(error.message || String(error));
      throw error;

    } finally {
      this.triggerLoading(false);
    }
  }

  /**
   * Get current data
   */
  getData() {
    return this.rawData;
  }

  /**
   * Check if data is loaded
   */
  hasData() {
    return this.rawData !== null;
  }

  /**
   * Get filtered features based on emotion
   */
  getFilteredFeatures(emotionFilter = 'all') {
    if (!this.hasData()) return [];

    if (emotionFilter === 'all') {
      return this.rawData.features;
    }

    return this.rawData.features.filter(feature => {
      const primary = feature.properties?.analysis?.primary;
      return primary === emotionFilter;
    });
  }

  /**
   * Get statistics about the data
   */
  getStats() {
    if (!this.hasData()) return null;

    const features = this.rawData.features;
    const emotionCounts = CONFIG.EMOTIONS.ORDER.reduce((acc, emotion) => {
      acc[emotion] = 0;
      return acc;
    }, {});

    features.forEach(feature => {
      const primary = feature.properties?.analysis?.primary;
      if (emotionCounts.hasOwnProperty(primary)) {
        emotionCounts[primary]++;
      }
    });

    return {
      totalFeatures: features.length,
      emotionDistribution: emotionCounts
    };
  }
}
