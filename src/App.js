import React from 'react';
import Dynamsoft from './Dynamsoft';
import styled from 'styled-components';

const style = {
  video: {
    position: 'relative',
    width: "100%",
    height: "100%",
    //resize: "both",
    background: 'black'
  }
}
const ScanBox = styled.div`
  position: absolute;
  top: 20%;
  left: 25%;
  right: 25%;
  bottom: 60%;
  border: 2px solid red;
  height: 20%;
  width: 50%;
  z-index: 100;
`

function App() {

  const myScanner = React.useRef();
  let scanner;

  const initBarcodeScanner = async () => {
    try {
      scanner = await Dynamsoft.BarcodeScanner.createInstance();
      console.log(scanner);

      scanner.setUIElement(myScanner.current);
      scanner.onFrameRead = results => {
        if (results.length) {
          console.log(results);
        }
      };
      scanner.onUnduplicatedRead = (txt, result) => {
        console.log(result.barcodeFormatString + ': ' + txt);
      };
      let runtimeSettings = await scanner.getRuntimeSettings();
      runtimeSettings.barcodeFormatIds = Dynamsoft.EnumBarcodeFormat.BF_ONED;
      runtimeSettings.localizationModes = [
        Dynamsoft.EnumLocalizationMode.LM_SCAN_DIRECTLY,
        Dynamsoft.EnumLocalizationMode.LM_LINES, 0, 0, 0, 0, 0];
      //runtimeSettings.deblurLevel = 9;
      runtimeSettings.expectedBarcodesCount = 1;
      runtimeSettings.region = {
        regionTop: 20,
        regionLeft: 25,
        regionRight: 75,
        regionBottom: 40,
        regionMeasuredByPercentage: true
      }
      runtimeSettings.returnBarcodeZoneClarity = 1;
      console.log(runtimeSettings);
      await scanner.updateRuntimeSettings(runtimeSettings);
      await scanner.open();

    } catch (ex) {
      console.error(ex);
    }
  };

  React.useEffect(() => {
    initBarcodeScanner();

    return () => {
      if (scanner) {
        scanner.close();
        scanner.destroy();
        scanner = null;
      }
    }
  }, []);


  return (
    <div ref={myScanner}>
      <select className="dbrScanner-sel-camera"></select>
      <select className="dbrScanner-sel-resolution"></select>
      <br />
      <div style={{ position: 'relative' }}>
        <video className="dbrScanner-video" style={style.video}></video>
        <ScanBox />
      </div>
    </div>
  );
}


export default App;
