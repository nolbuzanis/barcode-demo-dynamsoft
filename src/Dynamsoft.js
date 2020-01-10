import Dynamsoft from "keillion-dynamsoft-javascript-barcode";
Dynamsoft.BarcodeReader.engineResourcePath = "https://cdn.jsdelivr.net/npm/keillion-dynamsoft-javascript-barcode@0.20200110.0/dist/";// 0.20200110.0 is preview for dbrjs 7.3.0-v0
// Please visit https://www.dynamsoft.com/CustomerPortal/Portal/TrialLicense.aspx to get a trial license
Dynamsoft.BarcodeReader.productKeys = "t0068NQAAAHFz8G3olEbtsZE7lyhTmeygjYMnxO53Su7Q40dqsDBhVOctKSaRO5tBc1axC5je0Sg3jXZIqSufQKfXoPzzyPc=";
// Dynamsoft.BarcodeReader._bUseFullFeature = true; // Control of loading min wasm or full wasm.
export default Dynamsoft;