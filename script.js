/**
 * BTC - bitcoin
 * XCH - chia
 * XMR - monero
 */

var cryptoCurrencies = ["bitcoin", "chia", "monero"];

var cryptoTicker = document.querySelector(".crypto-ticker");

fetchCryptosCurrencies();

var top100 = [];

function fetchCryptosCurrencies() {
  var api = "https://api.coingecko.com/api/v3/coins/";
  var uris = cryptoCurrencies.map((c) => api + c + "?localization=false");

  Promise.all(
    uris.map((url) =>
      fetch(url)
        .then(checkStatus) // check the response of our APIs
        .then(parseJSON) // parse it to Json
        .catch((error) => console.log("There was a problem!", error))
    )
  )
    .then((data) => top100.push(...data))
    .then(displauCryptoCurrencies)
    .then(updateTrend);
}

function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

function parseJSON(response) {
  return response.json();
}

function displauCryptoCurrencies() {
  const html = top100
    // .filter(coin => cryptoCurrencies.includes(coin.id))
    .map((coin) => {
      const id = coin.id;
      const name = coin.name;
      const symbol = coin.symbol;
      const rank = coin.rank;
      // const price_usd = coin.price_usd;
      const price_usd = coin.market_data.current_price.usd;
      const price_btc = coin.price_btc;
      const twentyfourh_volume_usd = coin["24h_volume_usd"];
      const market_cap_usd = coin.market_cap_usd;
      const available_supply = coin.available_supply;
      const total_supply = coin.total_supply;
      const max_supply = coin.max_supply;
      // const percent_change_1h = coin.percent_change_1h;
      const percent_change_1h =
        coin.market_data.price_change_percentage_1h_in_currency.usd;
      const percent_change_24h = coin.percent_change_24h;
      const percent_change_7d = coin.percent_change_7d;
      const last_updated = coin.last_updated;
      return `
      <div class="${id}-panel panel">
          <table class="tbl-ticker">
              <tr>
                  <td>
                  <span>${symbol.toUpperCase()}</span>
                  </td>
                  <td>
                      <i class="fa fa-caret-up dir-up"></i>
                      <i class="fa fa-caret-down dir-down"></i>
                  </td>
                  <td>
                      <div class="box">
                          <span class="price" data-percent-change-last-hour="${percent_change_1h}">$ ${price_usd}</span>
                      </div>
                      <div class="percent-change">
                        ${parseFloat(percent_change_1h).toFixed(2)}%
                      </div>
                  </td>
              </tr>
          </table>
      </div>
      `;
    })
    .join("");
  cryptoTicker.innerHTML = html;
}

function updateTrend() {
  var ticker = document.querySelector(".crypto-ticker");
  var panel = ticker.querySelectorAll(".panel");
  var html = Array.prototype.map.call(panel, function (panel) {
    var percentChange1h = panel.querySelector(".price").dataset
      .percentChangeLastHour;
    var trendUp = panel.querySelector(".dir-up");
    var trendDown = panel.querySelector(".dir-down");
    if (percentChange1h < 0) {
      panel.classList.add("price-down");
      panel.classList.remove("price-up");
      trendDown.style.display = "block";
      trendUp.style.display = "none";
    } else if (percentChange1h > 0) {
      panel.classList.add("price-up");
      panel.classList.remove("price-down");
      trendDown.style.display = "none";
      trendUp.style.display = "block";
    }
    return html;
  });
}