
const UI = {
    txtCity: document.getElementById('txtCity'),

    btnSearch: document.getElementById('btn_search'),

    countrySelect: document.getElementById('country_select'),

    lbInvalid: document.getElementById('lbInvalid'),

    tbTimes: document.getElementById('tbTimes')
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

function BuildURL(country , city , time) {

    if(!country || !city || !time)
    {
        throw new Error("Missing required parameters");
    }
    if(typeof country !== "string" || typeof city !== "string" || typeof time !== "string" )
    {
            throw new Error("wrong type used in one of the parameters , all of them should be string");
    }

let parms = new URL(`timingsByCity/${time}`, Main_URL);
parms.set("city", city);
parms.set("country",country);

return parms.toString();
}

function Render(data)
{

    
}

async function SearchPrayerTime(country , city , time)
{
    SetError("");
    const BaseURL = BuildURL(country, city , time);

    try {
        const res = await fetch(BaseURL);
                if (!res.ok)
                    {
                        SetError(`HTTP ${res.status} (${res.statusText})`);
                    throw new Error(`HTTP ${res.status} (${res.statusText})`);
                    } 
        const data = await res.json();
        if (data.status === 200) {
            
        } 
        else
        {

        }

    }
    catch(e)
    {
        SetError(e.message);
        throw new Error(e.message);
    }
}