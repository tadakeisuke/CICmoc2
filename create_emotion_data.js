// 実際の町・地区境界データに感情データを統合するスクリプト

const fs = require('fs');

// クリップされたKMLデータを読み込み
const boundaryData = JSON.parse(fs.readFileSync('temp_kml_clipped.geojson', 'utf8'));

// 各地区に感情データをランダムに割り当て（実際には調査データに基づく）
// 阿波踊り関連の地域特性を考慮した感情バランス
function assignEmotions() {
    const baseEmotions = [
        { joy: 85, calm: 60, excitement: 95, stress: 25 }, // 阿波踊り会場周辺
        { joy: 75, calm: 70, excitement: 80, stress: 30 }, // 商店街エリア
        { joy: 65, calm: 80, excitement: 60, stress: 20 }, // 住宅地
        { joy: 70, calm: 65, excitement: 75, stress: 35 }, // オフィス街
        { joy: 80, calm: 55, excitement: 90, stress: 40 }  // 観光地
    ];
    
    // ランダムに基本パターンを選択し、±10の範囲で調整
    const base = baseEmotions[Math.floor(Math.random() * baseEmotions.length)];
    
    return {
        joy: Math.max(0, Math.min(100, base.joy + (Math.random() * 20 - 10))),
        calm: Math.max(0, Math.min(100, base.calm + (Math.random() * 20 - 10))),
        excitement: Math.max(0, Math.min(100, base.excitement + (Math.random() * 20 - 10))),
        stress: Math.max(0, Math.min(100, base.stress + (Math.random() * 20 - 10)))
    };
}

// 感情データを統合
const emotionData = {
    type: "FeatureCollection",
    features: boundaryData.features.map((feature, index) => {
        const emotions = assignEmotions();
        const primaryEmotion = Object.keys(emotions).reduce((a, b) => 
            emotions[a] > emotions[b] ? a : b
        );
        
        return {
            type: "Feature",
            geometry: feature.geometry,
            properties: {
                id: index + 1,
                name: feature.properties.S_NAME || feature.properties.name || `地区${index + 1}`,
                area: feature.properties.AREA || "不明",
                population: feature.properties.JINKO || 0,
                households: feature.properties.SETAI || 0,
                emotions: emotions,
                analysis: {
                    primary: primaryEmotion,
                    intensity: Math.round(emotions[primaryEmotion])
                }
            }
        };
    })
};

// data.jsonとして保存
fs.writeFileSync('data/data.json', JSON.stringify(emotionData, null, 2), 'utf8');

console.log(`✅ 感情データを統合完了: ${emotionData.features.length}個の地区境界`);
console.log('📍 含まれる地区の例:');
emotionData.features.slice(0, 5).forEach(feature => {
    const { name, emotions, analysis } = feature.properties;
    console.log(`  - ${name}: ${analysis.primary}(${analysis.intensity}) [joy:${Math.round(emotions.joy)}, calm:${Math.round(emotions.calm)}, excitement:${Math.round(emotions.excitement)}, stress:${Math.round(emotions.stress)}]`);
});
