# Public Goods for {{pretty_name}}

<details>
  <summary>Endpoints:</summary>
  <br>
  RPC: <a href="{{endpoints.rpc}}">{{endpoints.rpc}}</a><br>
  REST: <a href="{{endpoints.rest}}">{{endpoints.rest}}</a><br>
  GRPC: <a href="{{endpoints.grpc}}">{{endpoints.grpc}}</a>
</details>
<br>
<details>
  <summary>Seed:</summary>
  <code id="seedValue">{{endpoints.seed}}</code>
</details>

<script>
  document.querySelector('summary').onclick = function() {
    const seedText = document.getElementById('seedValue').innerText;
    const tempInput = document.createElement('input');
    tempInput.value = seedText;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    alert('Сид скопирован: ' + seedText);
  };
</script>
