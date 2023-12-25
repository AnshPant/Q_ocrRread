// pages/api/upload.js
import { NextApiRequest, NextApiResponse } from 'next';

async function quickstart( url: string) {

  console.log("we have cathces",url);
  try{ const vision = require('@google-cloud/vision');
  console.log("start working ");
           const CREDENTIALS = JSON.parse(JSON.stringify({
           "type": "service_account",
           "project_id": "prismatic-canto-409105",
           "private_key_id": "d63b25213045f4efc457660cc9c2bc17b7d6844b",
           "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCr+3fpxxhmiDLA\nItR3LW3RxIxhlLOYZH7B+4UrzaRHYrKS8WOqy7hJTyyO6B+b0Trq83ExBHmGDDGz\nZoAH8c/t7aWqMjzdxvpeo/dSm9rpcAORsloGCD3LNCQ3x/UyU9kywWsZCYi0RZ3o\natb9d0OQCU63WT8Im6QUAQgQ/CrGvf8/jfI6IA3cLk7QqkplChsl70/IlBbszNAi\nFXjle1uXSHaxTP5MFCv5eXEQ4V20b00T/fjT5Hqy/g06rwrzItoV+l19GuSXHivs\nJtLszKMWTPGMlm2rk+FPa2S92nXXwjjrAlSPAFy31xYKZ6gX9Ds9e8a2LiouH3m3\n4RKW858tAgMBAAECggEAKj250mrjCJ33vx7e6gW3tT/ODhKguPOn+Zu+NgfMi3cH\nrtVIulTOpvziEBid2N7fVoFkIhq8AWth0rNAi5L+U+1clQzBS+SZLqEduEXNEyx+\nx+yTNWuVR+F+6s97Xzjefluo4y2nDMYTlpgVRYyjRM+wbJKoS4Q03O/y6/8Pv5/X\n5AoukwCe+39HtYlfPnbGlKDfl30iXBQl7qn6aAxGd2LDGm69Mm89Bd//DZqrof64\nH0tGLwp0VCzbnHvUpTZ/w+VZYjB+DK3ykaI9Pcq0746K79ERRC//X9sCrEYeSI1e\npQowrYTzHaDMGH8+dAq80ZTjcJJl+4+tvPIajlg00QKBgQDoRPx/S4PnKqsqqqB0\n7sRboX1zDjVBpv9+mb1fzTVvWnlrQM2aN6qBpsoGCblMdQgh2lcEyo7BCrMdaLnJ\n+KU7TxwNa9oHEkMhSPoQi2hArt0wkbpifkoX2654LrbKETfanaYiRlsohW3y0j/U\nN/Xmu1Y1yltH+wZuEnk+XSPq3QKBgQC9jatj6HCtorKZU7N0pmi4TXIyWTXY7FW7\nwdyckkXDdysQfmdwDXSzBEBOnj5LDjLrPm7TNLjoVkkehC1iZEjgIZ4qCGOTWkoA\nqxsfujxYyz/T5lbtYYk7+VT9+CTLl6lZkXmTRiBji5zZa8AKPuFybisRiDmAkAmJ\n2VeRO1R4kQKBgQCyqVX76K9mYnjVUfgo2fyqaxbfKJ+oh3dh/4oepe+jXtmkuW0t\nYgJCxnQBnvssp50AxT1ITzLtpHhQd9zpUdxvOZPfcwV7iP2gHc1UapdfoeI8WOwg\nlPoTTgTvJyetWP84pylClhHKopAHRtiYOg9pUtKmf6glPx8cDhO699QH9QKBgC07\nnFWYByN4OrRaA+3nNAAfAww+u5nLM949Mb7vLNSrIEysTVSw8VMyxYG9Q1I3zjDS\n0jF2WFWhGYu9sPLUyYsqmoqfO9vS5Ovp6OwWTgZGYjHXupClANGd+wkr6OPoihIE\npAVf66S1kTVVABuxy6y5228wmcAzHwOVKM9QYCTxAoGBAI53YsNND1kvWHsNGPVr\nOOgqxlZ5mkE3le1Dsrei7I7o42YSuWchQyQMMxhRAJHtPe46UYBaxZhZ5x+Phrt4\nJWvxpqGr7YAOUMPuIpJuUu2jHpd/x9CNNYKstDmISvg2rGozsJfI3qAIIx7NgZEj\nLFykreqXGtbYfjnzO+g8SSA8\n-----END PRIVATE KEY-----\n",
           "client_email": "anshvision@prismatic-canto-409105.iam.gserviceaccount.com",
           "client_id": "112559424947076186320",
           "auth_uri": "https://accounts.google.com/o/oauth2/auth",
           "token_uri": "https://oauth2.googleapis.com/token",
           "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
           "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/anshvision%40prismatic-canto-409105.iam.gserviceaccount.com",
           "universe_domain": "googleapis.com"
   }))

   const CONFIG = {
       credentials:{
           private_key: CREDENTIALS.private_key,
           client_email: CREDENTIALS.client_email
       }
   }

   
   const client = new vision.ImageAnnotatorClient(CONFIG);

   console.log("mid working: image extraction start ");
  //  const [result] = await client.textDetection('./pages/demo4.jpeg');
  const [result] = await client.textDetection(url);

   console.log("mid working: image extraction ended ");
   const detections = result.textAnnotations;

let anss = []
var num=0

const jsonObi = {
   CardType: detections[5].description +" "+detections[6].description ,
   Name:   detections[31].description +" "+detections[32].description ,
   Last_Name:  detections[35].description   ,
   Identification_Number:  detections[9].description+detections[10].description+detections[11].description+detections[12].description+detections[13].description ,
   Date_of_issue: detections[75].description+" "+detections[76].description+" "+detections[77].description+" "+detections[78].description , 
   Date_of_expiry: detections[99].description+" "+detections[100].description+" "+detections[101].description+" "+detections[102].description,
   Date_of_birth: detections[45].description+" "+detections[46].description+" "+detections[47].description+" "+detections[48].description
}
return jsonObi 
}catch (error) {
   console.error('Error in asyncFunction:', error);
   throw error; 
 }
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { url } = req.body;
    
    // Process the URL on the server side as needed
    console.log('Received URL on the server:', url);
    var gg = await quickstart(url);
    console.log("hi")
    console.log(gg);

    
    // Return a response
    res.status(200).json(gg);
  } catch (error) {
    console.error('Error in API route:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
