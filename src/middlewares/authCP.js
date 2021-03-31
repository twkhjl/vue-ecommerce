

const authCP = async function () {
  let result="";
  let token_cp = localStorage.getItem("token_cp");
  if (!token_cp) {
    result= { "err": "no token" };
    return result;
  }

  let bodyData = {
    token: token_cp
  };
  result = await fetch("http://twkhjl.duckdns.org:3001/jwt", {
    headers: {
      "content-type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(bodyData)

  })
  .then((res) => res.json())
    .then((res) => {
      return res;

    }).catch(err => {
      return err;
    })
    return result;
}



module.exports = authCP;