import fetch from 'node-fetch'

const handler = async (event) => {

  try {

    const longitude = event.queryStringParameters.long || 'Long'
    const latitude = event.queryStringParameters.lat || 'Lat'

    const API_SECRET = process.env.GEO_KEY;

    const res = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${API_SECRET}`)
    console.log(res);
    const data = await res.json();


    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }