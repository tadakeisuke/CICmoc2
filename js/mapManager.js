// EMOTERRAIN - Map Manager
import { CONFIG } from './config.js';
import { Utils } from './utils.js';

export class MapManager {
  constructor(containerId) {
    this.containerId = containerId;
    this.map = null;
    this.baseLayer = null;
    this.geoLayer = null;
    this.selectedEmotion = 'all';
    this.layerOpacity = CONFIG.UI.DEFAULT_OPACITY;
  }

  /**
   * Initialize the map
   */
  init() {
    this.map = L.map(this.containerId);
    
    this.baseLayer = L.tileLayer(CONFIG.MAP.TILE_URL, {
      attribution: CONFIG.MAP.ATTRIBUTION
    }).addTo(this.map);

    this.map.setView(CONFIG.MAP.FALLBACK_VIEW.center, CONFIG.MAP.FALLBACK_VIEW.zoom);
  }

  /**
   * Set emotion filter
   */
  setEmotionFilter(emotion) {
    this.selectedEmotion = emotion;
  }

  /**
   * Set layer opacity
   */
  setOpacity(opacity) {
    this.layerOpacity = opacity;
  }

  /**
   * Get style for a feature
   */
  getFeatureStyle(feature) {
    const { analysis } = feature.properties || {};
    const primary = analysis?.primary || 'joy';
    const intensity = analysis?.intensity || 'low';
    const fillColor = CONFIG.EMOTIONS.COLORS[primary] || '#888';
    const baseOpacity = CONFIG.STYLE.OPACITY_BY_INTENSITY[intensity] ?? 0.5;
    const fillOpacity = Math.min(1, Math.max(0, baseOpacity * this.layerOpacity));

    return {
      color: CONFIG.STYLE.POLYGON.STROKE_COLOR,
      weight: CONFIG.STYLE.POLYGON.STROKE_WEIGHT,
      opacity: CONFIG.STYLE.POLYGON.STROKE_OPACITY,
      fillColor: fillColor,
      fillOpacity: fillOpacity
    };
  }

  /**
   * Check if feature should be displayed based on filter
   */
  shouldDisplayFeature(feature) {
    if (this.selectedEmotion === 'all') return true;
    const primary = feature.properties?.analysis?.primary;
    return primary === this.selectedEmotion;
  }

  /**
   * Create popup content for a feature
   */
  createPopupContent(feature) {
    const props = feature.properties || {};
    const analysis = props.analysis || {};
    const emotions = props.emotions || {};
    const name = props.name || props.id || 'Area';

    const html = `
      <div style="min-width:220px">
        <div style="font-weight:600;margin-bottom:4px">${Utils.escapeHtml(name)}</div>
        <div style="margin-bottom:6px;font-size:13px">
          primary: <b>${Utils.escapeHtml(analysis.primary || '-')}</b> &nbsp; 
          intensity: <b>${Utils.escapeHtml(analysis.intensity || '-')}</b>
        </div>
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:4px;font-size:12px">
          <div>joy: ${Utils.formatNumber(emotions.joy)}</div>
          <div>calm: ${Utils.formatNumber(emotions.calm)}</div>
          <div>excitement: ${Utils.formatNumber(emotions.excitement)}</div>
          <div>stress: ${Utils.formatNumber(emotions.stress)}</div>
        </div>
      </div>`;

    return html;
  }

  /**
   * Render data on the map
   */
  render(data) {
    if (!data) return;

    // Remove existing layer
    if (this.geoLayer) {
      this.geoLayer.remove();
      this.geoLayer = null;
    }

    const displayedFeatures = [];

    // Create new layer
    this.geoLayer = L.geoJSON(data, {
      style: (feature) => this.getFeatureStyle(feature),
      filter: (feature) => {
        const shouldDisplay = this.shouldDisplayFeature(feature);
        if (shouldDisplay) {
          displayedFeatures.push(feature);
        }
        return shouldDisplay;
      },
      onEachFeature: (feature, layer) => {
        const popupContent = this.createPopupContent(feature);
        layer.bindPopup(popupContent);
      }
    }).addTo(this.map);

    return displayedFeatures.length;
  }

  /**
   * Update layer styles (for opacity changes)
   */
  updateStyles() {
    if (!this.geoLayer) return;
    this.geoLayer.setStyle((feature) => this.getFeatureStyle(feature));
  }

  /**
   * Fit map view to data bounds
   */
  fitToData(data) {
    try {
      if (!data || !data.features?.length) return;
      
      const bounds = L.geoJSON(data).getBounds();
      if (bounds.isValid()) {
        this.map.fitBounds(bounds.pad(CONFIG.UI.BOUNDS_PADDING));
      } else {
        this.map.setView(CONFIG.MAP.FALLBACK_VIEW.center, CONFIG.MAP.FALLBACK_VIEW.zoom);
      }
    } catch(error) {
      console.error('Error fitting to data:', error);
      this.map.setView(CONFIG.MAP.FALLBACK_VIEW.center, CONFIG.MAP.FALLBACK_VIEW.zoom);
    }
  }

  /**
   * Get map instance
   */
  getMap() {
    return this.map;
  }
}
