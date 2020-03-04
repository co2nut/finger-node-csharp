// var edge = require('edge-js');
var edge = require('edge-js'), http = require('http');

var demofunction = edge.func({
  source:function() {/*

      using System;
      using System.Text;
      using System.Data;
      using System.Threading.Tasks;
      using System.Windows.Forms;
      using System.Collections.Generic;
      using System.ComponentModel;
      using System.Threading;
      using System.Drawing;
      using System.IO;
      using System.Net;
      using System.Collections.Specialized;
      using DPFP.Capture;

      public class Startup : DPFP.Capture.EventHandler{
        delegate void Function();	// a simple delegate for marshalling calls from event handlers to the GUI thread

        //test---------------------------
        static TaskCompletionSource<object> tcs;
        public async Task<object> Invoke(object input)
        {
            return await Task.Run<object>(async () => {
        			// we are on CLR thread pool thread here
        			// simulate long running operation
               Init();
               Start();
               // await Task.Delay(50000);

        			return ".NET welcomes " + input.ToString();
        		});
        }


        protected virtual void Init()
    		{
            try
            {
                Capturer = new DPFP.Capture.Capture();				// Create a capture operation.

                if ( null != Capturer )
                    Capturer.EventHandler = this;					// Subscribe for capturing events.
                else
                    MessageBox.Show("Can't initiate capture operation!", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);

            }
            catch
            {
                MessageBox.Show("Can't initiate capture operation!", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
    		}

        protected void Start()
    		{
            if (null != Capturer)
            {
                try
                {
                    Capturer.StartCapture();
                    MessageBox.Show("Using the fingerprint reader, scan your fingerprint.!", "Information", MessageBoxButtons.OK, MessageBoxIcon.Information);
                }
                catch
                {
                    // SetPrompt("Can't initiate capture!");
                }
            }
    		}

        #region EventHandler Members:

      		public void OnComplete(object Capture, string ReaderSerialNumber, DPFP.Sample Sample)
      		{
      			// MakeReport("The fingerprint sample was captured.");
      			// SetPrompt("Scan the same fingerprint again.");
      			Process(Sample);
            ConvertToString(Sample);
            // MessageBox.Show("The fingerprint sample was captured.", "Information", MessageBoxButtons.OK, MessageBoxIcon.Information);
      		}

      		public void OnFingerGone(object Capture, string ReaderSerialNumber)
      		{
            // MessageBox.Show("The finger was removed from the fingerprint reader.", "Information", MessageBoxButtons.OK, MessageBoxIcon.Information);
      		}

      		public void OnFingerTouch(object Capture, string ReaderSerialNumber)
      		{
            MessageBox.Show("The fingerprint reader was touched.!", "Information", MessageBoxButtons.OK, MessageBoxIcon.Information);
      		}

      		public void OnReaderConnect(object Capture, string ReaderSerialNumber)
      		{
            // MessageBox.Show("The fingerprint reader was connected.", "Information", MessageBoxButtons.OK, MessageBoxIcon.Information);
      		}

      		public void OnReaderDisconnect(object Capture, string ReaderSerialNumber)
      		{
            MessageBox.Show("The fingerprint reader was disconnected.", "Information", MessageBoxButtons.OK, MessageBoxIcon.Information);
      		}

      		public void OnSampleQuality(object Capture, string ReaderSerialNumber, DPFP.Capture.CaptureFeedback CaptureFeedback)
      		{
      		// 	if (CaptureFeedback == DPFP.Capture.CaptureFeedback.Good)
      		// 		MakeReport("The quality of the fingerprint sample is good.");
      		// 	else
      		// 		MakeReport("The quality of the fingerprint sample is poor.");
            MessageBox.Show("", "Information", MessageBoxButtons.OK, MessageBoxIcon.Information);
      		}
      	#endregion

        protected DPFP.FeatureSet ExtractFeatures(DPFP.Sample Sample, DPFP.Processing.DataPurpose Purpose)
    		{
    			DPFP.Processing.FeatureExtraction Extractor = new DPFP.Processing.FeatureExtraction();	// Create a feature extractor
    			DPFP.Capture.CaptureFeedback feedback = DPFP.Capture.CaptureFeedback.None;
    			DPFP.FeatureSet features = new DPFP.FeatureSet();
    			Extractor.CreateFeatureSet(Sample, Purpose, ref feedback, ref features);			// TODO: return features as a result?
    			if (feedback == DPFP.Capture.CaptureFeedback.Good)
    				return features;
    			else
    				return null;
    		}

        protected virtual void Process(DPFP.Sample Sample)
    		{
          ConvertToString(Sample);
    			// Draw fingerprint sample image.
    			// DrawPicture(ConvertSampleToBitmap(Sample));
          // BitMapToString( ConvertSampleToBitmap(Sample) );

          // var response = wb.DownloadString("http://192.168.0.191:3030/hello");
          // data["input"] = BitMapToString( ConvertSampleToBitmap(Sample) );

          var wb = new WebClient();
          var data = new NameValueCollection();
          var url = "http://192.168.0.191:3030/helloPost";
          data["input"] = Convert.ToBase64String( ConvertSampleToByte(Sample) );
          // MessageBox.Show("FingerPrint Sample Encoding.UTF8.GetString", "Information", MessageBoxButtons.OK, MessageBoxIcon.Information);
          data["input2a"] = "hello bitch";

          System.IO.File.WriteAllText(@"C:\Users\User\Desktop\WriteText.txt", Convert.ToBase64String( ConvertSampleToByte(Sample) ));

          // var response = wb.UploadValues(url, "POST", data);
          // string responseInString = Encoding.UTF8.GetString(response);

          // MessageBox.Show("FingerPrint Sample", "Information", MessageBoxButtons.OK, MessageBoxIcon.Information);


          //--------------------------------test verification--------------------------------
          // byte[] bytetest = ConvertSampleToByte(Sample);
          byte[] bytetest = BitMapToByte( ConvertSampleToBitmap(Sample) );

          MemoryStream ms = new MemoryStream( bytetest );
          // DPFP.Template Template = new DPFP.Template();
          // Template.DeSerialize(ms);


            // string fs = System.IO.File.ReadAllText(@"D:\Documents\FingerPrint\shawn.fpt");
            // MessageBox.Show(String.Format("The fingerprint sample was captured (FAR) = {0} {1}", Template.Bytes.Length, Template.Bytes), "Information", MessageBoxButtons.OK, MessageBoxIcon.Information);
            // using (FileStream fs = File.Open(@"D:\Documents\shawn2.fpt", FileMode.Create, FileAccess.Write)) {
            //   try
            //   {
            //     Template.Serialize(fs);
            //   }
            //   catch (Exception e)
            //   {
            //       MessageBox.Show(e.ToString());
            //   }
            // }

            // string fs1 = System.IO.File.ReadAllText(@"D:\Documents\FingerPrint\shawn.fpt");
            // string fs1 = System.IO.File.ReadAllText(@"C:\Users\User\Desktop\WriteText.txt");
            // MessageBox.Show(String.Format("The fingerprint sample was captured (sadsadasFAR) {0}", fs1.Length), "Information", MessageBoxButtons.OK, MessageBoxIcon.Information);
            using (FileStream fs = File.OpenRead(@"D:\Documents\shawn2.fpt")) {

                try
                {
                  DPFP.Template Template = new DPFP.Template(fs);
                  // MessageBox.Show(String.Format("The fingerprint sample was captured (FAR) {0}", Template.Bytes.Length), "Information", MessageBoxButtons.OK, MessageBoxIcon.Information);

                  DPFP.Verification.Verification Verificator = new DPFP.Verification.Verification();
                  DPFP.FeatureSet features = ExtractFeatures(Sample, DPFP.Processing.DataPurpose.Verification);
                  DPFP.Verification.Verification.Result result = new DPFP.Verification.Verification.Result();

                  if (features != null)
            			{

                      try
                      {
                          MessageBox.Show(String.Format("The fingerprint sample was captured (FAR) = {0} {1}", Template.Bytes.Length, Template.Bytes), "Information", MessageBoxButtons.OK, MessageBoxIcon.Information);
                          Verificator.Verify(features, Template, ref result);
                          MessageBox.Show(String.Format("The fingerprint sample was captured (FAR) {0}", Template.Bytes.Length), "Information", MessageBoxButtons.OK, MessageBoxIcon.Information);
                          //
                          MessageBox.Show(String.Format("The fingerprint sample was captured (FAR) = {0}", result.FARAchieved), "Information", MessageBoxButtons.OK, MessageBoxIcon.Information);
                          if (result.Verified)
                              MessageBox.Show("The fingerprint was VERIFIED", "Information", MessageBoxButtons.OK, MessageBoxIcon.Information);
                          else
                              MessageBox.Show("The fingerprint was NOT VERIFIED.", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                      }
                      catch (Exception e)
                      {
                          MessageBox.Show(e.ToString());
                      }
                  }

                }
                catch (Exception e)
                {
                    MessageBox.Show(e.ToString());
                }
    				}




          //--------------------------------test verification--------------------------------


    		}

        protected String ConvertToString(DPFP.Sample Sample){
          DPFP.FeatureSet features = ExtractFeatures(Sample, DPFP.Processing.DataPurpose.Enrollment);
          return "ac";
        }

        protected Byte[] ConvertSampleToByte(DPFP.Sample Sample)
    		{
    			DPFP.Capture.SampleConversion Convertor = new DPFP.Capture.SampleConversion();
    			Byte[] byteArr = null;
    			Convertor.ConvertToANSI381(Sample, ref byteArr);
    			return byteArr;


          // DPFP.Capture.SampleConversion convertor = new DPFP.Capture.SampleConversion();
          // convertor.ConvertToANSI381(usuarios.Usuarios.Where(u => u.Rut == this.txtRut.Text).FirstOrDefault().Sample, ref bytes);
          //new DPFP.Template(new MemoryStream(bytes));
    		}

        protected Bitmap ConvertSampleToBitmap(DPFP.Sample Sample)
    		{
    			DPFP.Capture.SampleConversion Convertor = new DPFP.Capture.SampleConversion();	// Create a sample convertor.
    			Bitmap bitmap = null;												            // TODO: the size doesn't matter
    			Convertor.ConvertToPicture(Sample, ref bitmap);									// TODO: return bitmap as a result
          // MessageBox.Show("FingerPrint Sample", "Information", MessageBoxButtons.OK, MessageBoxIcon.Information);
    			return bitmap;
    		}

        protected String BitMapToString(Bitmap bitmap){
          System.IO.MemoryStream ms = new MemoryStream();
          bitmap.Save(ms, System.Drawing.Imaging.ImageFormat.Jpeg);
          byte[] byteImage = ms.ToArray();
          var SigBase64= Convert.ToBase64String(byteImage); // Get Base64
          MessageBox.Show("FingerPrint Sample abc" + SigBase64, "Information", MessageBoxButtons.OK, MessageBoxIcon.Information);
           return SigBase64;
         }

         protected Byte[] BitMapToByte(Bitmap bitmap){
           System.IO.MemoryStream ms = new MemoryStream();
           bitmap.Save(ms, System.Drawing.Imaging.ImageFormat.Jpeg);
           byte[] byteImage = ms.ToArray();
           return byteImage;
          }

        private DPFP.Capture.Capture Capturer;
        // private DPFP.Template Template;
        private DPFP.Processing.Enrollment Enroller;

      }
*/},
references: [
  'System.Data.dll',
  'System.Windows.Forms.dll',
  'System.Drawing.dll',
  'System.IO.dll',
  'Bin\\DPFPCtlXTypeLibNET.dll',
  'Bin\\DPFPCtlXWrapperNET.dll',
  'Bin\\DPFPDevNET.dll',
  'Bin\\DPFPEngNET.dll',
  'Bin\\DPFPGuiNET.dll',
  'Bin\\DPFPShrNET.dll',
  'Bin\\DPFPShrXTypeLibNET.dll',
  'Bin\\DPFPVerNET.dll'
 ]
});

demofunction({}, function (err, result) {
  if (err) {
    throw err;
  }
  console.log(result);
});

// var controller = createController(null, true);
// controller.yieldControl();
// console.log('Control over process lifetime yielded to CLR, the process will not exit...');
