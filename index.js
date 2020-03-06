// var edge = require('edge-js');
var edge = require('edge-js')
var axios = require('axios')
var fs = require('fs')
var FormData = require('form-data');

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
        public static String USERNAME = "";
        public static String verifyStatus = "FAIL";
        public static String actionName = "";
        public async Task<object> Invoke(dynamic input)
        {
            USERNAME = input.username;
            return await Task.Run<object>(async () => {
               Init();
               Start();
               actionName = input.actionName;

                if(actionName == "verify")
                {
                  return verifyStatus;
                }
                else
                {
                  return "Enrollment Process Complete " + input.ToString();
                }

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

        protected virtual void InitEnroll()
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
            if(actionName == "verify")
            {
              ProcessVerify(Sample);
              //sample web call - begin
              string URI = "http://192.168.0.101:3030/staffCheckIn";
              string myParameters = "username=chiewfei&action=punchin";

              using (WebClient wc = new WebClient())
              {
                  wc.Headers[HttpRequestHeader.ContentType] = "application/x-www-form-urlencoded";
                  string HtmlResult = wc.UploadString(URI, myParameters);
              }
             //sample web call = end
            }
            else{
              ProcessEnroll(Sample);
            }
      		}

      		public void OnFingerGone(object Capture, string ReaderSerialNumber)
      		{
            // MessageBox.Show("The finger was removed from the fingerprint reader.", "Information", MessageBoxButtons.OK, MessageBoxIcon.Information);
      		}

      		public void OnFingerTouch(object Capture, string ReaderSerialNumber)
      		{
            // MessageBox.Show("The fingerprint reader was touched.!", "Information", MessageBoxButtons.OK, MessageBoxIcon.Information);
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

        protected virtual void ProcessEnroll(DPFP.Sample Sample)
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
                  MessageBox.Show( "FingerPrint Capture Complete " + USERNAME, "Information", MessageBoxButtons.OK, MessageBoxIcon.Information, MessageBoxDefaultButton.Button2, MessageBoxOptions.ServiceNotification);
                  String fileName = "scans\\"+ USERNAME +".fpt";
                  using (FileStream fs = File.Open(fileName, FileMode.Create, FileAccess.Write)) {
                    Enroller.Template.Serialize(fs);
                  }

      						break;
                case DPFP.Processing.Enrollment.Status.Insufficient:	// report success and stop capturing
                  MessageBox.Show( "Please continue rescan " + USERNAME, "Information", MessageBoxButtons.OK, MessageBoxIcon.Information, MessageBoxDefaultButton.Button2, MessageBoxOptions.ServiceNotification);
      						break;
      				}
      			}
          }
          catch (Exception e)
          {
              MessageBox.Show(e.ToString());
          }
    		}


        protected virtual void ProcessVerify(DPFP.Sample Sample)
    		{
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
                                {
                                    verifyStatus = "SUCCESS";
                                    MessageBox.Show( "The fingerprint was VERIFIED", "Information", MessageBoxButtons.OK, MessageBoxIcon.Information, MessageBoxDefaultButton.Button2, MessageBoxOptions.ServiceNotification);
                                    verifyStatus = "SUCCESS";
                                    break;
                                }
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
                  }//FileStream
            }//end of foreach
            if(verifyStatus == "FAIL")
              MessageBox.Show("The fingerprint was NOT VERIFIED.", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error, MessageBoxDefaultButton.Button2, MessageBoxOptions.ServiceNotification);
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
  'System.Net.dll',
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

var username = "abccc"
demofunction({
  username,
  actionName:"verify"
}, function (err, result) {
  if (err) {
    throw err;
  }
  console.log(result);

  // // upload files
  // var newFile = fs.createReadStream("scans\\"+ username +".fpt");
  // var url = "http://192.168.0.101:3030/upload-FingerPrint"
  // var form = new FormData();
  //
  // form.append("file", newFile)
  // form.append("name", username)
  // axios.post(url,
  //   form,
  //   { headers: {...form.getHeaders()} }
  // )
  // .catch((err)=>{
  //   console.log({err})
  // })

});
