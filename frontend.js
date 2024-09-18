async function postIt() {
  const reponse = await fetch("http://localhost:5000/post", {
    method: "POST",
    body: JSON.stringify({ name: "joseph", married: false, age: 280 }),
  });
  const result = await reponse.text();
  console.log(result);
}
postIt();
