// ポリゴンの座標データを抽出して表示するスクリプト

const fs = require('fs');

// data.jsonを読み込み
const data = JSON.parse(fs.readFileSync('data/data.json', 'utf8'));

console.log('🗺️ EMOTERRAIN - ポリゴン座標データ抽出');
console.log('='.repeat(60));
console.log(`📊 総地区数: ${data.features.length}`);
console.log('='.repeat(60));

// 各地区の座標データを表示
data.features.forEach((feature, index) => {
    const { name, id } = feature.properties;
    let coordinates;
    
    try {
        coordinates = feature.geometry.coordinates[0]; // Polygonの外側の境界
        
        // 座標データの妥当性チェック
        if (!Array.isArray(coordinates) || coordinates.length === 0) {
            console.log(`\n⚠️  地区 ${id}: ${name} - 座標データが無効`);
            return;
        }
        
        console.log(`\n📍 地区 ${id}: ${name}`);
        console.log(`   座標点数: ${coordinates.length}点`);
        
        // 座標の境界を計算（有効な座標のみ）
        const validCoords = coordinates.filter(coord => 
            Array.isArray(coord) && coord.length >= 2 && 
            typeof coord[0] === 'number' && typeof coord[1] === 'number'
        );
        
        if (validCoords.length === 0) {
            console.log(`   ⚠️  有効な座標データがありません`);
            return;
        }
        
        const lons = validCoords.map(coord => coord[0]);
        const lats = validCoords.map(coord => coord[1]);
        const bounds = {
            north: Math.max(...lats).toFixed(6),
            south: Math.min(...lats).toFixed(6),
            east: Math.max(...lons).toFixed(6),
            west: Math.min(...lons).toFixed(6)
        };
        
        console.log(`   境界: N${bounds.north}, S${bounds.south}, E${bounds.east}, W${bounds.west}`);
        
        // 最初の5点の座標を表示
        console.log('   座標 (最初の5点):');
        validCoords.slice(0, 5).forEach((coord, i) => {
            console.log(`     ${i + 1}: [${coord[0].toFixed(6)}, ${coord[1].toFixed(6)}]`);
        });
        
        if (validCoords.length > 5) {
            console.log(`     ... (他${validCoords.length - 5}点)`);
        }
        
    } catch (error) {
        console.log(`\n❌ 地区 ${id}: ${name} - エラー: ${error.message}`);
        return;
    }
    
    // 最初の10地区だけ詳細表示
    if (index >= 9) {
        console.log(`\n... (他${data.features.length - 10}地区の詳細は省略)`);
        return;
    }
});

// 統計情報
console.log('\n📈 座標データ統計:');
console.log('='.repeat(40));

const totalPoints = data.features.reduce((sum, feature) => {
    try {
        const coords = feature.geometry.coordinates[0];
        return Array.isArray(coords) ? sum + coords.length : sum;
    } catch {
        return sum;
    }
}, 0);

const validFeatures = data.features.filter(feature => {
    try {
        const coords = feature.geometry.coordinates[0];
        return Array.isArray(coords) && coords.length > 0;
    } catch {
        return false;
    }
});

const avgPoints = validFeatures.length > 0 ? (totalPoints / validFeatures.length).toFixed(1) : '0';

// 全体の境界
const allCoords = [];
data.features.forEach(feature => {
    try {
        const coords = feature.geometry.coordinates[0];
        if (Array.isArray(coords)) {
            coords.forEach(coord => {
                if (Array.isArray(coord) && coord.length >= 2 && 
                    typeof coord[0] === 'number' && typeof coord[1] === 'number') {
                    allCoords.push(coord);
                }
            });
        }
    } catch {
        // Skip invalid coordinates
    }
});

if (allCoords.length > 0) {
    const allLons = allCoords.map(coord => coord[0]);
    const allLats = allCoords.map(coord => coord[1]);

    const overallBounds = {
        north: Math.max(...allLats).toFixed(6),
        south: Math.min(...allLats).toFixed(6),
        east: Math.max(...allLons).toFixed(6),
        west: Math.min(...allLons).toFixed(6)
    };

    console.log(`総座標点数: ${totalPoints.toLocaleString()}点`);
    console.log(`有効地区数: ${validFeatures.length}地区`);
    console.log(`平均座標点数/地区: ${avgPoints}点`);
    console.log(`全体境界: N${overallBounds.north}, S${overallBounds.south}, E${overallBounds.east}, W${overallBounds.west}`);
} else {
    console.log('有効な座標データが見つかりませんでした');
}

// CSVファイルとして座標データをエクスポート
const csvData = ['地区ID,地区名,座標点数,経度,緯度,順序'];
let csvRowCount = 0;

data.features.forEach(feature => {
    const { name, id } = feature.properties;
    
    try {
        const coordinates = feature.geometry.coordinates[0];
        if (Array.isArray(coordinates)) {
            coordinates.forEach((coord, index) => {
                if (Array.isArray(coord) && coord.length >= 2 && 
                    typeof coord[0] === 'number' && typeof coord[1] === 'number') {
                    csvData.push(`${id},"${name}",${coordinates.length},${coord[0]},${coord[1]},${index + 1}`);
                    csvRowCount++;
                }
            });
        }
    } catch (error) {
        console.log(`CSV出力エラー - 地区 ${id}: ${error.message}`);
    }
});

if (csvRowCount > 0) {
    fs.writeFileSync('polygon_coordinates.csv', csvData.join('\n'), 'utf8');
    console.log(`\n💾 座標データをCSVファイルに出力: polygon_coordinates.csv (${csvRowCount.toLocaleString()}行)`);
}

// GeoJSON座標のみのファイルも生成
const coordsOnly = {
    type: "FeatureCollection",
    features: []
};

data.features.forEach(feature => {
    try {
        const coordinates = feature.geometry.coordinates[0];
        if (Array.isArray(coordinates) && coordinates.length > 0) {
            coordsOnly.features.push({
                type: "Feature",
                geometry: feature.geometry,
                properties: {
                    id: feature.properties.id,
                    name: feature.properties.name,
                    points: coordinates.length
                }
            });
        }
    } catch (error) {
        console.log(`GeoJSON出力エラー - 地区 ${feature.properties.id}: ${error.message}`);
    }
});

if (coordsOnly.features.length > 0) {
    fs.writeFileSync('coordinates_only.geojson', JSON.stringify(coordsOnly, null, 2), 'utf8');
    console.log(`💾 座標のみのGeoJSONファイルに出力: coordinates_only.geojson (${coordsOnly.features.length}地区)`);
}
