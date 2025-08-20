// EMOTERRAIN - UI Controller
import { CONFIG } from './config.js';
import { Utils } from './utils.js';

export class UIController {
  constructor(mapManager, dataManager) {
    this.mapManager = mapManager;
    this.dataManager = dataManager;
    this.displayedCount = 0;
    this.elements = {};
  }

  /**
   * Initialize UI elements and event handlers
   */
  init() {
    this.elements = {
      emotionFilters: document.getElementById('emotion-filters'),
      opacitySlider: document.getElementById('layer-opacity'),
      displayedCount: document.getElementById('displayed-count'),
      totalCount: document.getElementById('total-count'),
      status: document.getElementById('status')
    };

    this.bindEvents();
    this.updateStats();
    this.updateControls();
  }

  /**
   * Bind event handlers
   */
  bindEvents() {
    // Emotion filter buttons
    if (this.elements.emotionFilters) {
      this.elements.emotionFilters.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-btn')) {
          this.handleEmotionFilter(e.target.dataset.emotion);
        }
      });
    }

    // Opacity slider
    if (this.elements.opacitySlider) {
      this.elements.opacitySlider.addEventListener('input', (e) => {
        this.handleOpacityChange(parseFloat(e.target.value));
      });
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      this.handleKeyboard(e);
    });

    // Data manager callbacks
    this.dataManager.onDataLoaded((data) => {
      this.setStatus('データが読み込まれました');
      this.updateStats();
      this.displayedCount = this.mapManager.render(data);
      this.updateDisplayedCount();
      this.mapManager.fitToData(data);
    });

    this.dataManager.onError((error) => {
      this.setStatus(`エラー: ${error.message}`, 'error');
    });
  }

  /**
   * Handle emotion filter selection
   */
  handleEmotionFilter(emotion) {
    this.mapManager.setEmotionFilter(emotion);
    this.updateEmotionButtons(emotion);
    
    const data = this.dataManager.getData();
    if (data) {
      this.displayedCount = this.mapManager.render(data);
      this.updateDisplayedCount();
    }
  }

  /**
   * Handle opacity slider change
   */
  handleOpacityChange(opacity) {
    this.mapManager.setOpacity(opacity);
    this.mapManager.updateStyles();
  }

  /**
   * Handle keyboard shortcuts
   */
  handleKeyboard(event) {
    // Number keys 1-5 for emotion filters
    if (event.key >= '1' && event.key <= '5') {
      event.preventDefault();
      const emotions = ['all', ...CONFIG.EMOTIONS.ORDER];
      const index = parseInt(event.key) - 1;
      if (emotions[index]) {
        this.handleEmotionFilter(emotions[index]);
      }
    }
  }

  /**
   * Update emotion filter buttons
   */
  updateEmotionButtons(selectedEmotion) {
    if (!this.elements.emotionFilters) return;
    
    const buttons = this.elements.emotionFilters.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.emotion === selectedEmotion);
    });
  }

  /**
   * Update statistics display
   */
  updateStats() {
    const stats = this.dataManager.getStats();
    
    if (this.elements.totalCount) {
      this.elements.totalCount.textContent = stats.totalFeatures.toString();
    }
  }

  /**
   * Update displayed count
   */
  updateDisplayedCount() {
    if (this.elements.displayedCount) {
      this.elements.displayedCount.textContent = this.displayedCount.toString();
    }
  }

  /**
   * Set status message
   */
  setStatus(message, type = 'info') {
    if (!this.elements.status) return;
    
    this.elements.status.textContent = message;
    this.elements.status.className = `status ${type}`;
    
    // Auto-hide success messages after delay
    if (type === 'info') {
      setTimeout(() => {
        if (this.elements.status.textContent === message) {
          this.elements.status.textContent = '';
          this.elements.status.className = 'status';
        }
      }, CONFIG.UI.STATUS_HIDE_DELAY);
    }
  }

  /**
   * Update control states
   */
  updateControls() {
    if (this.elements.opacitySlider) {
      this.elements.opacitySlider.value = this.mapManager.layerOpacity;
    }
  }

  /**
   * Create emotion filter HTML
   */
  static createEmotionFiltersHTML() {
    const emotionButtons = [
      { emotion: 'all', label: 'All', color: '#555' },
      ...CONFIG.EMOTIONS.ORDER.map(emotion => ({
        emotion,
        label: Utils.capitalizeFirst(emotion),
        color: CONFIG.EMOTIONS.COLORS[emotion]
      }))
    ];

    return emotionButtons.map((item, index) => {
      const shortcut = index === 0 ? '1' : `${index + 1}`;
      return `
        <button class="filter-btn ${index === 0 ? 'active' : ''}" 
                data-emotion="${item.emotion}" 
                title="ショートカット: ${shortcut}">
          <span class="emotion-swatch" style="background-color: ${item.color}"></span>
          ${item.label}
        </button>
      `;
    }).join('');
  }

  /**
   * Create controls HTML
   */
  static createControlsHTML() {
    return `
      <div class="controls">
        <div class="control-section">
          <label for="emotion-filters">感情フィルター:</label>
          <div id="emotion-filters" class="filter-buttons">
            ${UIController.createEmotionFiltersHTML()}
          </div>
        </div>
        
        <div class="control-section">
          <label for="layer-opacity">透明度:</label>
          <input type="range" id="layer-opacity" 
                 min="0.1" max="1" step="0.1" 
                 value="${CONFIG.UI.DEFAULT_OPACITY}">
        </div>
      </div>
      
      <div class="stats">
        表示中: <span id="displayed-count">0</span> / 
        総計: <span id="total-count">0</span>
      </div>
      
      <div id="status" class="status"></div>
    `;
  }
}
