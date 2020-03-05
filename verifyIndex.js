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
                Capturer = new DPFP.Capture.Capture();

                if ( null != Capturer )
                    Capturer.EventHandler = this;
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
                    MessageBox.Show("Fingerprint reader ready, scan your fingerprint.", "Information", MessageBoxButtons.OK, MessageBoxIcon.Information);
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
      			Process(Sample);
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
            MessageBox.Show("", "Information", MessageBoxButtons.OK, MessageBoxIcon.Information);
      		}
      	#endregion


        protected virtual void Process(DPFP.Sample Sample)
    		{

           Path.Combine(Directory.GetParent(System.IO.Directory.GetCurrentDirectory()).Parent.Parent.Parent.FullName,"abc.txt");
          string[] filePaths = Directory.GetFiles(System.IO.Directory.GetCurrentDirectory() + "\\scans", "*.fpt");

          foreach (string path in filePaths)
          {
              //start verification
                using (FileStream fs = File.OpenRead(path)) {
                    try
                    {
                      DPFP.Template Template = new DPFP.Template(fs);
                      DPFP.Verification.Verification Verificator = new DPFP.Verification.Verification();
                      DPFP.FeatureSet features = ExtractFeatures(Sample, DPFP.Processing.DataPurpose.Verification);
                      DPFP.Verification.Verification.Result result = new DPFP.Verification.Verification.Result();

                      if (features != null)
                      {
                          try
                          {
                              Verificator.Verify(features, Template, ref result);
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
          }
		    }

        protected DPFP.FeatureSet ExtractFeatures(DPFP.Sample Sample, DPFP.Processing.DataPurpose Purpose)
    		{
    			DPFP.Processing.FeatureExtraction Extractor = new DPFP.Processing.FeatureExtraction();
    			DPFP.Capture.CaptureFeedback feedback = DPFP.Capture.CaptureFeedback.None;
    			DPFP.FeatureSet features = new DPFP.FeatureSet();
    			Extractor.CreateFeatureSet(Sample, Purpose, ref feedback, ref features);
    			if (feedback == DPFP.Capture.CaptureFeedback.Good)
    				return features;
    			else
    				return null;
    		}

        private DPFP.Capture.Capture Capturer;
    		private DPFP.Verification.Verification Verificator;

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
