// ===== LANGUAGES =====
const langs = {
    af:"Afrikaans", sq:"Albanian", am:"Amharic", ar:"Arabic",
    en:"English", fr:"French", es:"Spanish", de:"German",
    it:"Italian", ru:"Russian", zh:"Chinese", ja:"Japanese",
    ko:"Korean", pt:"Portuguese", tr:"Turkish", hi:"Hindi",
    fa:"Persian", ur:"Urdu"
};

// ===== ELEMENTS =====
const from = document.getElementById("from");
const to = document.getElementById("to");
const input = document.getElementById("input");
const output = document.getElementById("output");

const swapBtn = document.getElementById("swapBtn");
const copyBtn = document.getElementById("copyBtn");
const translateBtn = document.getElementById("translateBtn");
const suggestionsBox = document.getElementById("suggestions");


// ===== INIT LANGUAGES =====
for (let l in langs) {
    from.innerHTML += `<option value="${l}">${langs[l]}</option>`;
    to.innerHTML += `<option value="${l}">${langs[l]}</option>`;
}

from.value = "en";
to.value = "ar";

// ===== FUNCTIONS =====
function swapLang() {
    [from.value, to.value] = [to.value, from.value];
}

async function translateText() {
    const text = input.value.trim();
    if (!text) return alert("اكتب نصًا");
async function checkSpelling(text, lang) {
    suggestionsBox.innerHTML = "";

    if (!text) return;

    try {
        const res = await fetch("https://api.languagetool.org/v2/check", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `text=${encodeURIComponent(text)}&language=${lang}`
        });

        const data = await res.json();

        data.matches.forEach(match => {
            match.replacements.slice(0,3).forEach(rep => {
                const span = document.createElement("span");
                span.textContent = rep.value;
                span.onclick = () => {
                    input.value =
                        input.value.slice(0, match.offset) +
                        rep.value +
                        input.value.slice(match.offset + match.length);
                    suggestionsBox.innerHTML = "";
                };
                suggestionsBox.appendChild(span);
            });
        });

    } catch (e) {
        console.log("Spell check failed");
    }
}

    output.value = "جاري الترجمة...";

    try {
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from.value}|${to.value}`;
        const res = await fetch(url);
        const data = await res.json();
        output.value = data.responseData.translatedText;
    } catch {
        output.value = "❌ فشل الاتصال";
    }
}

function copyText() {
    navigator.clipboard.writeText(output.value);
    alert("تم النسخ ✔");
}

// ===== EVENTS =====
swapBtn.addEventListener("click", swapLang);
translateBtn.addEventListener("click", translateText);
copyBtn.addEventListener("click", copyText);


