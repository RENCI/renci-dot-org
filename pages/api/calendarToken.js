import axios from 'axios';

export default async function handler(req, res) {
  try {
    const data = {
      client_id: process.env.CLIENT_ID,
      scope: process.env.SCOPE,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: process.env.GRANT_TYPE,
    };

    const response = await axios.post(
      'https://login.microsoftonline.com/58b3d54f-16c9-42d3-af08-1fcabd095666/oauth2/v2.0/token',
      new URLSearchParams(data),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    res.status(200).json({ token: response.data.access_token });
  } catch (error) {
    console.error('Error fetching token:', error);
    res.status(500).json({ error: 'Failed to fetch token' });
  }
}
