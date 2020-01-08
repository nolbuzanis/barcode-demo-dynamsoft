import React from 'react';
import Dynamsoft from './Dynamsoft';

const style = {
  video: {
    width: "640px",
    height: "480px",
    border: "1px solid black",
    resize: "both"
  }
}

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
      <video className="dbrScanner-video" style={style.video}></video>
    </div>
  );
}


export default App;
