// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import JWT from "jsonwebtoken";

export default function handler(req, res) {
  // const is = JWT.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFyeWFuYWs5MTYzQGdtYWlsLmNvbSIsImlkIjoiNjY2NWQ2MDYyYmZkZmQyMTdhODQ2MjJlIiwiaWF0IjoxNzE3OTU4OTk1LCJleHAiOjE3MTc5NjI1OTV9.kejKhSi_-qGQb3WYvEfFWMb-8LU8mcBopQJbuLFDaHo", process.env.JWT_SECRET)
  res.status(200).json({ name: "John Doe" });
  // res.status(200).json({ name: "John Doe", data: is});
}
