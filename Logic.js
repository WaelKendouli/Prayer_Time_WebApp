
const UI = {
    txtCity: document.getElementById('txtCity'),
    btnSearch: document.getElementById('btn_search'),
    countrySelect: document.getElementById('country_select'),
    lbInvalid: document.getElementById('lbInvalid'),
    tbTimes: document.getElementById('tbTimes'),
    LoadingSpiner : document.getElementById('LoadingSpin'),
};

const Main_URL = "https://api.aladhan.com/v1";

function SetError(message)
{
if (!message) {
    UI.lbInvalid.style.display = "none";
    return;
}
UI.lbInvalid.style.display = "flex";
UI.lbInvalid.textContent = message;
}

function setLoading(isLoading)
{
UI.LoadingSpiner.style.display = isLoading===true ? "flex"  : "none" ;
}

function BuildURL(country , city , time) {

    if(!country || !city || !time)
    {
        throw new Error("Missing required parameters");
    }
    if(typeof country !== "string" || typeof city !== "string" || typeof time !== "string" )
    {
            throw new Error("wrong type used in one of the parameters , all of them should be string");
    }

    const url = new URL(`${Main_URL}/timingsByCity/${time}`);
    url.searchParams.set("city", city);
    url.searchParams.set("country", country);

    return url.toString();
}

function Render(data)
{

    const Timing = data.timings;
    UI.tbTimes.innerHTML = "";
    UI.tbTimes.innerHTML = `
    <tr>
        <td>Fajr</td>
        <td>${Timing.Fajr}</td>
      </tr>
      <tr>
        <td>Dhuhr</td>
        <td>${Timing.Dhuhr}</td>
      </tr>
      <tr>
        <td>Asr</td>
        <td>${Timing.Asr}</td>
      </tr>
      <tr>
        <td>Maghrib</td>
        <td>${Timing.Maghrib}</td>
      </tr>
      <tr>
        <td>Isha</td>
        <td>${Timing.Isha}</td>
      </tr>
    `;

    
}

function GetCurrentDate()
{
const today = new Date();
const day = String(today.getDate()).padStart(2, '0');
const month = String(today.getMonth() + 1).padStart(2, '0');
const year = today.getFullYear();
const dateString = `${day}-${month}-${year}`; // "27-08-2026"
return dateString;
}


async function SearchPrayerTime(country , city , time)
{
    SetError("");
    setLoading(true);
    const BaseURL = BuildURL(country, city , time);

    try {
        const res = await fetch(BaseURL);
                if (!res.ok)
                    {
                        setLoading(false);
                        SetError(`HTTP ${res.status} (${res.statusText})`);
                    throw new Error(`HTTP ${res.status} (${res.statusText})`);
                    } 
        const data = await res.json();
        if (data.status === 'OK') {
            Render(data);
        } 
        else
        {
             SetError(`something wrong happend while deserializing the data`);
        }
         setLoading(false);

    }
    catch(e)
    {
        SetError(e.message);
         setLoading(false);
         UI.tbTimes.innerHTML="";
        throw new Error(e.message);
    }
}

UI.btnSearch.addEventListener('click' , () => {
    SearchPrayerTime(UI.countrySelect.value , UI.txtCity.value , GetCurrentDate());
})