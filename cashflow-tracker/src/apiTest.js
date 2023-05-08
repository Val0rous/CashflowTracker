//Import MSAL library
import * as msal from "@azure/msal-browser";

//Initialize MSAL with your client ID and redirect URI
const msalConfig = {
  auth: {
    clientId: "cd9fd17f-a488-4300-b900-90284a4ac3bb",
    redirectUri: "https://val0rant.github.io/CashflowTracker/",
  },
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

//Define the scopes that your app will need to access OneDrive and Excel
const tokenRequest = {
  scopes: ["https://graph.microsoft.com/Files.ReadWrite.All", "https://graph.microsoft.com/.default"],
};

//Get an access token from MSAL
const tokenResponse = await msalInstance.acquireTokenSilent(tokenRequest).catch(async (error) => {
  console.log(error);
  return await msalInstance.acquireTokenPopup(tokenRequest);
});

const accessToken = tokenResponse.accessToken;





//Define the URL of the shared spreadsheet
const spreadsheetUrl = "https://1drv.ms/x/s!Ag9bHLaasvtamhJRtArcrZaB4vIc?e=vgFoRp";

//Extract the drive ID and item ID from the URL
const urlParts = spreadsheetUrl.split("/");
const driveId = urlParts[4];
const itemId = urlParts[6];

//Use the OneDrive Rest API to get the metadata of the spreadsheet
const metadataResponse = await fetch("https://graph.microsoft.com/v1.0/drives/${driveId}/items/${itemId}", {
  headers: {
    Authorization: "Bearer ${accessToken}",
  },
});

const metadata = await metadataResponse.json();





//Define the range where you want to append the data
const range = "Duckling!A:A";

//Define the data to append
const data = [["Hello World"]];

//Use the Excel Rest API to append the data to the spreadsheet
const appendResponse = await fetch(
  "https://graph.microsoft.com/v1.0/drives/${driveId}/items/${itemId}/workbook/worksheets('${range}')/range('A1').insert(Shift:=x1ShiftDown)",
  {
    method: "PATCH",
    headers: {
      Authorization: "Bearer ${accessToken}",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      values: data,
    }),
  }
);

const appendResult = await appendResponse.json();
