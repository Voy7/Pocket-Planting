export default function handler(req, res) {
  console.log(req.body) // coordsinates
  res.status(200).json({ fake: 'details' })
}
  