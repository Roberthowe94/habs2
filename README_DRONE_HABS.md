# Drone HABs Detection Platform

A comprehensive web application for processing drone imagery to detect Harmful Algal Blooms (HABs) using advanced image processing algorithms.

## Features

### Core Functionality
- **Multi-image Processing**: Batch process multiple drone images simultaneously
- **GPS Extraction**: Automatically extract GPS coordinates from image EXIF data
- **Real-time Analysis**: Non-blocking image processing using Web Workers
- **Risk Classification**: 5-level risk assessment (Pristine, Good, Moderate, High, Extreme)
- **Interactive Mapping**: Satellite imagery with color-coded detection markers
- **Data Export**: Export results in JSON, CSV, and GeoJSON formats

### Detection Algorithms
- **PCI (Phycocyanin Index)**: Specialized algorithm for detecting blue-green algae
- **Chlorophyll-a Index**: Measures chlorophyll concentration in water
- **Blue-Green Algae Index**: Detects presence of harmful algal blooms
- **Block-based Analysis**: Configurable image segmentation for detailed analysis

### User Interface
- **Responsive Design**: Works on desktop and mobile devices
- **Professional Styling**: CSS custom properties for consistent theming
- **Real-time Feedback**: Progress indicators and status updates
- **Configurable Settings**: Adjustable thresholds and processing parameters

## Usage

### Getting Started
1. Open `drone_habs_detector.html` in a modern web browser
2. The application will automatically initialize with default settings

### Processing Images
1. **Select Images**: Click "📁 Select Drone Images" to choose one or more drone images
2. **Adjust Settings**: Configure detection thresholds in the sidebar:
   - PCI Threshold (0-1): Sensitivity for phycocyanin detection
   - Chlorophyll-a Threshold (0-100 μg/L): Chlorophyll concentration limit
   - Blue-Green Algae Threshold (0-1): BGA detection sensitivity
   - Block Size: Image segmentation resolution (10x10 to 100x100 pixels)
3. **Process**: Click "🔬 Process Images" to start analysis
4. **View Results**: Results will appear on the map and in the results panel

### Understanding Results

#### Risk Levels
- **Pristine** (Green): No detectable algal blooms, excellent water quality
- **Good** (Light Green): Minimal algae presence, safe for recreation
- **Moderate** (Yellow): Some algae detected, caution advised
- **High** (Orange): Significant algal bloom activity, avoid contact
- **Extreme** (Red): Severe HAB conditions, dangerous for humans and animals

#### Map Markers
- Color-coded markers show detection locations
- Click markers for detailed statistics
- Toggle heatmap view for pattern visualization
- Use "Fit to Data" to zoom to all results

### Export Options
- **JSON**: Complete analysis results with all metadata
- **CSV**: Tabular data suitable for spreadsheet analysis
- **GeoJSON**: Geographic data format for GIS applications

## Technical Details

### Algorithms
The platform implements simplified RGB-based approximations of scientific indices:

- **PCI Calculation**: Uses blue-green to red ratio for phycocyanin estimation
- **Chlorophyll-a**: Empirical relationship between green channel and concentration
- **BGA Index**: Blue-green color ratio analysis for algae detection

### Browser Compatibility
- Requires modern browser with Web Worker support
- Tested on Chrome, Firefox, Safari, and Edge
- Mobile responsive design

### Data Privacy
- All processing happens locally in your browser
- No data is sent to external servers
- Results are saved in browser local storage only

## Configuration

### Risk Classification Modes
- **Conservative**: Lower thresholds, more sensitive detection
- **Standard**: Balanced approach for general use
- **Aggressive**: Higher thresholds, fewer false positives

### Processing Parameters
- **Block Size**: Larger blocks = faster processing, less detail
- **Minimum Detection Area**: Percentage threshold for positive detection
- **Thresholds**: Adjust based on local conditions and requirements

## Limitations

### Image Requirements
- JPEG/PNG format recommended
- GPS EXIF data required for mapping (or manual coordinates)
- Clear water surface visibility essential
- Adequate lighting conditions

### Algorithm Accuracy
- RGB-based approximations of scientific indices
- Best used as screening tool, not definitive diagnosis
- Ground-truth validation recommended for critical decisions

## Support

For technical issues or questions about the drone HABs detection platform, please refer to the repository documentation or contact the development team.

## License

This software is part of the HABs monitoring project and follows the repository's license terms.