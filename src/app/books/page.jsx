export default async function AllBooks() {
  const res = await fetch("http://localhost:9000/AllBooks");
  const data = await res.json();
  console.log(data);
  return <h1>Hello world</h1>;
}
