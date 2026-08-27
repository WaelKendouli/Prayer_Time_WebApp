
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