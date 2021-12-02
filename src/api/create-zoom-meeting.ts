import rp from 'request-promise';

const ZOOM_TOKEN = process.env.ZOOM_TOKEN;
const ZOOM_API_URL = process.env.ZOOM_API_URL;

const options = {
  method: 'POST',
  url: ZOOM_API_URL,
  headers: {
    authorization: `Bearer ${ZOOM_TOKEN}`,
  },
  body: {
    topic: 'Genieus Help Request',
    type: 2,
    start_time: new Date(),
    settings: { join_before_host: true, waiting_room: false },
  },
  json: true,
};

async function createZoom() {
  const body = await rp(options);
  return body.join_url;
}

export default createZoom;
