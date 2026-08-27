
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

function BulidURL(country , city , time) {

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


async function SearchPrayerTime(country , city , time)
{

}