let chartTheme = $(".switch-header>input").is(':checked') ? "Dark" : "Light"

paneProperties_background = chartTheme == "Dark" ? "#11181d" : "#ffffff"

function initChart(pair, locale) {
    var widget = window.tvWidget = new TradingView.widget({
        'autosize': true,
        'fullscreen': false,
        'symbol': pair,
        'interval': '1',
        'container_id': 'chart',
        'style': '1',
        'hide_legend': true,
        'hide_side_toolbar': false,
        'save_image': false,
        'withdateranges': true,
        'enable_publishing': false,
        'library_path': "/charting_library/",
        'enable_features': ["use_localstorage_for_settings"],
        'disabled_features': ["header_symbol_search", "legend_widget", "header_indicators", "header_compare", "header_undo_redo", "header_screenshot"],
        'charts_storage_api_version': '1.1',
        'client_id': 'spot',
        'height': '100%',
        'custom_css_url': 'style.css',
        'theme': chartTheme,
        'overrides': {
            "paneProperties.background": paneProperties_background,
        },
        'datafeed': new Datafeeds.UDFCompatibleDatafeed('/chart', 1000),
        'locale': locale,
        'timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
    });
}

function changeWidgetTheme(theme) {
    window.tvWidget.changeTheme(theme);

    if (theme == 'Dark') {
        window.tvWidget.applyOverrides({
            "paneProperties.background": "#11181d"
        });
    } else {
        window.tvWidget.applyOverrides({
            "paneProperties.background": "#ffffff"
        });
    }
}

$(".switch-theme").on("change", "input", function () {
    const theme = $(this).is(':checked') ? "Dark" : "Light"

    changeWidgetTheme(theme)
})

const formatAmount = (num) => `${Number.parseFloat(num.toFixed(7))}`;