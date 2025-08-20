// EMOTERRAIN - Main Application
import { CONFIG } from './js/config.js';
import { Utils } from './js/utils.js';
import { DataManager } from './js/dataManager.js';
import { MapManager } from './js/mapManager.js';
import { UIController } from './js/uiController.js';

class EmotionMapApp {
  constructor() {
    this.dataManager = null;
    this.mapManager = null;
    this.uiController = null;
  }

  /**
   * Initialize the application
   */
  async init() {
    try {
      // Initialize managers
      this.dataManager = new DataManager(CONFIG.DATA_URL);
      this.mapManager = new MapManager('map');
      
      // Initialize map
      this.mapManager.init();
      
      // Initialize UI
      this.setupUI();
      this.uiController = new UIController(this.mapManager, this.dataManager);
      this.uiController.init();
      
      // Load data
      this.uiController.setStatus('データを読み込み中...');
      await this.dataManager.loadData();
      
    } catch (error) {
      console.error('Application initialization failed:', error);
      this.handleError(error);
    }
  }

  /**
   * Setup UI HTML structure
   */
  setupUI() {
    const app = document.getElementById('app');
    if (!app) {
      throw new Error('App container not found');
    }

    app.innerHTML = `
      <div class="app-container">
        <header class="app-header">
          <h1>EMOTERRAIN</h1>
          <p>徳島市街地の感情マップ - 阿波踊り時期の雰囲気を可視化</p>
        </header>
        
        <main class="app-main">
          <div class="controls-panel">
            ${UIController.createControlsHTML()}
          </div>
          
          <div class="map-container">
            <div id="map" class="map"></div>
          </div>
        </main>
        
        <footer class="app-footer">
          <p>© 2024 EMOTERRAIN | OpenStreetMap contributors</p>
        </footer>
      </div>
    `;
  }

  /**
   * Handle application errors
   */
  handleError(error) {
    console.error('EmotionMapApp Error:', error);
    
    const statusEl = document.getElementById('status');
    if (statusEl) {
      statusEl.textContent = `エラーが発生しました: ${error.message}`;
      statusEl.className = 'status error';
    }
  }

  /**
   * Get application instance
   */
  static getInstance() {
    if (!window.emotionMapApp) {
      window.emotionMapApp = new EmotionMapApp();
    }
    return window.emotionMapApp;
  }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const app = EmotionMapApp.getInstance();
  app.init().catch(console.error);
});

// Export for global access
window.EmotionMapApp = EmotionMapApp;
