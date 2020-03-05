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
                Enroller = new DPFP.Processing.Enrollment();			// Create an enrollment.
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
          try
          {
            DPFP.FeatureSet features = ExtractFeatures(Sample, DPFP.Processing.DataPurpose.Enrollment);
            if (features != null) try
      			{
      				Enroller.AddFeatures(features);		// Add feature set to template.
      			}
            finally {
      				switch(Enroller.TemplateStatus)
      				{
      					case DPFP.Processing.Enrollment.Status.Ready:	// report success and stop capturing
                  MessageBox.Show("FingerPrint Capture Complete", "Information", MessageBoxButtons.OK, MessageBoxIcon.Information);
                  using (FileStream fs = File.Open("scans\\a2.fpt", FileMode.Create, FileAccess.Write)) {
                    Enroller.Template.Serialize(fs);
                  }
      						break;
                case DPFP.Processing.Enrollment.Status.Insufficient:	// report success and stop capturing
                  MessageBox.Show("Please continue", "Information", MessageBoxButtons.OK, MessageBoxIcon.Information);
      						break;
      				}
      			}
          }
          catch (Exception e)
          {
              MessageBox.Show(e.ToString());
          }
    		}

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

        private DPFP.Capture.Capture Capturer;
        private DPFP.Template Template;
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
