export default function handler(req, res) {
  console.log(req.body) // location/zip code
  res.status(200).json({ lat: 41.8409, lng: -88.0733 })
}
