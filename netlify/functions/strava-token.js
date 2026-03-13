exports.handler = async (event) => {
  const { code, refresh_token, grant_type } = JSON.parse(event.body || '{}');
  const res = await fetch('https://www.strava.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: '211350',
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      code,
      refresh_token,
      grant_type: grant_type || 'authorization_code',
    }),
  });
  const data = await res.json();
  return {
    statusCode: 200,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify(data),
  };
};
