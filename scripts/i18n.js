/* ============================================================
   XMV Wallet — i18n (client-side translations)
   ------------------------------------------------------------
   How it works:
   - Each language has a dictionary of { key: "translated text" }.
   - Any HTML element with data-i18n="some.key" gets its text
     replaced with the matching string when the language changes.
   - Choice is persisted in localStorage as "x-lang".
   - Arabic flips the page to RTL automatically.
   - Add new strings: just add the key in every dictionary AND
     put data-i18n="that.key" on the HTML element.
   ============================================================ */

(function () {
    "use strict";

    const STORAGE_KEY = "x-lang";
    const DEFAULT_LANG = "en";
    const RTL_LANGS = ["ar"];

    // ---- Language metadata (used by the dialog list) -------------
    const LANGUAGES = {
        en: { label: "English", native: "English" },
        es: { label: "Spanish", native: "Español" },
        pt: { label: "Portuguese", native: "Português" },
        zh: { label: "Chinese", native: "中文" },
        hi: { label: "Hindi", native: "हिन्दी" },
        ar: { label: "Arabic", native: "العربية" }
    };

    // ---- Dictionaries --------------------------------------------
    // Tip: keys are grouped by area (dialog., nav., etc.)
    // Add more keys as you tag more elements with data-i18n.
    const DICTIONARIES = {
        en: {
            "dialog.language": "Language",
            "dialog.currency": "Currency",
            "nav.trade": "Trade",
            "nav.markets": "Markets",
            "nav.buy_crypto": "Buy crypto",
            "nav.benefits": "Benefits",
            "nav.more": "More",
            "nav.vip": "VIP",
            "nav.referral": "Referral",
            "nav.affiliate": "Affiliate",
            "nav.about": "About Us",
            "nav.blog": "Blog",
            "nav.fee_rate": "Fee Rate",
            "nav.terms": "Terms of service",
            "nav.activity": "Activity",
            "nav.wallets": "Wallets"
        },
        es: {
            "dialog.language": "Idioma",
            "dialog.currency": "Moneda",
            "nav.trade": "Operar",
            "nav.markets": "Mercados",
            "nav.buy_crypto": "Comprar cripto",
            "nav.benefits": "Beneficios",
            "nav.more": "Más",
            "nav.vip": "VIP",
            "nav.referral": "Referidos",
            "nav.affiliate": "Afiliados",
            "nav.about": "Sobre nosotros",
            "nav.blog": "Blog",
            "nav.fee_rate": "Tarifas",
            "nav.terms": "Términos de servicio",
            "nav.activity": "Actividad",
            "nav.wallets": "Carteras"
        },
        pt: {
            "dialog.language": "Idioma",
            "dialog.currency": "Moeda",
            "nav.trade": "Negociar",
            "nav.markets": "Mercados",
            "nav.buy_crypto": "Comprar cripto",
            "nav.benefits": "Benefícios",
            "nav.more": "Mais",
            "nav.vip": "VIP",
            "nav.referral": "Indicação",
            "nav.affiliate": "Afiliados",
            "nav.about": "Sobre nós",
            "nav.blog": "Blog",
            "nav.fee_rate": "Taxas",
            "nav.terms": "Termos de serviço",
            "nav.activity": "Atividade",
            "nav.wallets": "Carteiras"
        },
        zh: {
            "dialog.language": "语言",
            "dialog.currency": "货币",
            "nav.trade": "交易",
            "nav.markets": "市场",
            "nav.buy_crypto": "购买加密货币",
            "nav.benefits": "优惠",
            "nav.more": "更多",
            "nav.vip": "VIP",
            "nav.referral": "推荐",
            "nav.affiliate": "联盟",
            "nav.about": "关于我们",
            "nav.blog": "博客",
            "nav.fee_rate": "费率",
            "nav.terms": "服务条款",
            "nav.activity": "活动",
            "nav.wallets": "钱包"
        },
        hi: {
            "dialog.language": "भाषा",
            "dialog.currency": "मुद्रा",
            "nav.trade": "ट्रेड",
            "nav.markets": "बाज़ार",
            "nav.buy_crypto": "क्रिप्टो खरीदें",
            "nav.benefits": "लाभ",
            "nav.more": "अधिक",
            "nav.vip": "वीआईपी",
            "nav.referral": "रेफरल",
            "nav.affiliate": "एफिलिएट",
            "nav.about": "हमारे बारे में",
            "nav.blog": "ब्लॉग",
            "nav.fee_rate": "शुल्क दर",
            "nav.terms": "सेवा की शर्तें",
            "nav.activity": "गतिविधि",
            "nav.wallets": "वॉलेट"
        },
        ar: {
            "dialog.language": "اللغة",
            "dialog.currency": "العملة",
            "nav.trade": "التداول",
            "nav.markets": "الأسواق",
            "nav.buy_crypto": "شراء العملات الرقمية",
            "nav.benefits": "المزايا",
            "nav.more": "المزيد",
            "nav.vip": "كبار الشخصيات",
            "nav.referral": "الإحالة",
            "nav.affiliate": "الشراكة",
            "nav.about": "من نحن",
            "nav.blog": "المدونة",
            "nav.fee_rate": "الرسوم",
            "nav.terms": "شروط الخدمة",
            "nav.activity": "النشاط",
            "nav.wallets": "المحافظ"
        }
    };

    // ---- Core functions ------------------------------------------
    function getLang() {
        const stored = localStorage.getItem(STORAGE_KEY);
        return DICTIONARIES[stored] ? stored : DEFAULT_LANG;
    }

    function translate(key, lang) {
        const dict = DICTIONARIES[lang] || DICTIONARIES[DEFAULT_LANG];
        // Fallback chain: chosen lang -> English -> the key itself
        return dict[key] || DICTIONARIES[DEFAULT_LANG][key] || key;
    }

    function applyLanguage(lang) {
        // Update every tagged element
        document.querySelectorAll("[data-i18n]").forEach(function (el) {
            const key = el.getAttribute("data-i18n");
            el.textContent = translate(key, lang);
        });

        // <html lang> + RTL direction for Arabic
        document.documentElement.setAttribute("lang", lang);
        document.documentElement.setAttribute(
            "dir",
            RTL_LANGS.indexOf(lang) > -1 ? "rtl" : "ltr"
        );

        // Sync the "active" check mark in the language dialog
        document.querySelectorAll('[data-dialog="lang"] .dialog-body .item').forEach(function (item) {
            if (item.getAttribute("data-lang") === lang) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        });
    }

    function setLanguage(lang) {
        if (!DICTIONARIES[lang]) return;
        localStorage.setItem(STORAGE_KEY, lang);
        applyLanguage(lang);
    }

    // ---- Wire up the language dialog -----------------------------
    function bindDialog() {
        // Use event delegation so it works regardless of when items are added.
        document.addEventListener("click", function (e) {
            const item = e.target.closest('[data-dialog="lang"] .dialog-body .item[data-lang]');
            if (!item) return;

            e.preventDefault();
            const lang = item.getAttribute("data-lang");
            setLanguage(lang);

            // Close the dialog (matches the existing close behaviour in main.js)
            const dlg = item.closest("dialog");
            if (dlg) dlg.classList.remove("active");
        });
    }

    // ---- Boot -----------------------------------------------------
    function boot() {
        bindDialog();
        applyLanguage(getLang());
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", boot);
    } else {
        boot();
    }

    // Expose for debugging / future use from console
    window.XMVi18n = {
        get: getLang,
        set: setLanguage,
        translate: translate,
        languages: LANGUAGES
    };
})();
