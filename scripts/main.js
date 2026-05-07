$("html").removeClass("light dark").addClass(localStorage.getItem("x-theme") || "dark")

$(".switch-theme").each(function () {
    const theme = localStorage.getItem("x-theme") || "dark";

    $(this).children("input").prop("checked", theme == "dark")
})

$(".faq-head").on("click", function () {
    $(this).parent().toggleClass("active")
    $(this).next().slideToggle(200).css("display", "flex")
})

$(".switch-theme").on("change", "input", function () {
    const theme = localStorage.getItem("x-theme") || "dark";

    if (theme == "light") {
        $("html").removeClass("light").addClass("dark")
        localStorage.setItem("x-theme", "dark")
    } else {
        $("html").removeClass("dark").addClass("light")
        localStorage.setItem("x-theme", "light")
    }

    $(".switch-theme").children("input").prop("checked", (localStorage.getItem("x-theme") || "dark") == "dark")
})

$(".menu-navigation").on("click", "ul>li>.nested>.nav-item-head", function () {
    $(this).parent().toggleClass("active")
    $(this).next().slideToggle(200)
})

$(".header-menu").on("click", function () {
    $("body").toggleClass("menu")
    $(this).toggleClass("active")
    $(".primary-menu").toggleClass("active")
})

$(".x-change").on("click", function () {
    $(".trade-coin-info-content").toggleClass("active")
})

$(".open-dialog").on("click", function () {
    $(`.primary-dialog[data-dialog='${$(this).data("dialog")}']`).addClass("active")
})

$(".open-trade").on("click", function () {
    $(".trade-dialog").addClass("active")
})

$(".dialog-back,.dialog-close").on("click", function () {
    $(this).closest("dialog").removeClass("active")
})

$(".welcome-banners").each(function () {
    const types = {
        xm: {
            slides: 2,
            breakpoints: {
                1: {
                    slidesPerView: 1,
                },
                468: {
                    slidesPerView: 2,
                },
                1152: {
                    slidesPerView: 2,
                },
            }
        },
        default: {
            slides: 4,
            breakpoints: {
                1: {
                    slidesPerView: 1,
                },
                468: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 3,
                },
                1152: {
                    slidesPerView: 4,
                },
            }
        }
    }

    const wrapper = $(this).find(".banners-content").get(0)
    const prev = $(this).find(".banner-prev").get(0);
    const next = $(this).find(".banner-next").get(0);
    const type = types[$(wrapper).data("type") ?? "default"];

    new Swiper(wrapper, {
        slidesPerView: type.slides,
        loop: false,
        a11y: false,
        spaceBetween: 16,
        pagination: {
            el: '.banners-pagination',
            clickable: true,
        },
        navigation: {
            prevEl: prev,
            nextEl: next,
        },
        breakpointsBase: "container",
        breakpoints: type.breakpoints,
    });
});

const unsecuredCopyToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.style.width = "0px"
    textArea.style.height = "0px"
    textArea.style.position = "fixed"
    textArea.style.top = "0"
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
    } catch (err) {
        console.error('Unable to copy to clipboard', err);
    }
    document.body.removeChild(textArea);
}

const copyToClipboard = (content) => {
    if (window.isSecureContext && navigator.clipboard) {
        navigator.clipboard.writeText(content);
    } else {
        unsecuredCopyToClipboard(content);
    }
};

const initDropdown = () => {
    $(".dropdown").each(function () {
        const dropdown = this;
        const value = $(dropdown).children("input");
        const head = $(dropdown).children(".dropdown-head");
        const body = $(dropdown).children(".dropdown-body").children(".dropdown-content");
        const search = $(dropdown).find(".dropdown-search");

        $(head).off("click")
        $(body).off("click", ".item")

        $(dropdown).children(".dropdown-body").on("click", function (e) {
            e.stopPropagation()
        })

        if (search.length > 0) {
            const input = $(search).children("input")
            const lite = $(input).hasClass("x-search");
            const empty = $(body).find(".dropdown-empty");

            if (lite) {
                $(input).on("input", function (e) {
                    let search_text = (e.target.value).trim().toLowerCase();
                    let visible = 0;

                    $(body).children(".item").each(function () {
                        let item_text = $(this).find(".text-base").text().toLowerCase().trim();
                        if (item_text.includes(search_text)) {
                            $(this).show();
                            visible++;
                        } else {
                            $(this).hide();
                        }
                    });

                    visible === 0 ? $(empty).show() : $(empty).hide()
                })
            }
        }

        $(head).on("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            $(".dropdown").not(dropdown).removeClass("active");
            $(dropdown).toggleClass("active");
        });

        $(body).on("click", ".item", function (e) {
            e.preventDefault();

            const option = $(this).attr("option");
            const name = $(this).find(".text-base").text();
            const src = $(this).children("img").attr("src");

            $(body).children(".item.active").removeClass("active")
            $(this).addClass("active");

            $(head).children("p").children("span").text(name);
            $(head).children("img").attr("src", src);
            $(value).val(option);
            $(dropdown).removeClass("active")
        });
    });
}

$(".trade-coin-body").on("input", ".dropdown-search>.x-search", function (e) {
    const input = this
    const content = $(input).parent().parent();
    const body = $(content).children(".trade-pair-content").children(".trade-pair-body").children(".trade-pair");
    const empty = $(content).find(".dropdown-empty");

    //
    let search_text = (e.target.value).trim().toLowerCase();
    let visible = 0;

    $(body).each(function () {
        let item_text = $(this).find(".text-base").text().toLowerCase().trim();

        if (item_text.includes(search_text)) {
            $(this).show();
            visible++;
        } else {
            $(this).hide();
        }
    });

    visible === 0 ? $(empty).show() : $(empty).hide()
})


$(".x-faq-item-head").on("click", function () {
    $(this).parent().toggleClass("active")
    $(this).next().slideToggle(200)
})

$(".trade-coin-head").on("click", function (e) {
    e.stopPropagation()
    $(".header-user").removeClass("active")
    $(".header-profile").removeClass("active")
    $(this).parent().toggleClass("active")
})

$(".notification-button").on("click", function (e) {
    e.stopPropagation()
    $(".header-profile").removeClass("active")
    $(".trade-coin").removeClass("active")
    $(this).parent().toggleClass("active")
})

$(".header-avatar").on("click", function (e) {
    e.stopPropagation()
    $(".header-user").removeClass("active")
    $(".trade-coin").removeClass("active")
    $(this).parent().toggleClass("active")
})

const getOption = (status, data) => {
    const color = status ? "#4cc063" : "#d84846"

    const maindata = {
        labels: data,
        datasets: [{
            data: data,
            label: "test",
            borderWidth: 1,
            tension: 0.6,
            borderColor: color,
            borderJoinStyle: "round",
            fill: false,
        }]
    }

    const config = {
        type: "line",
        data: maindata,
        options: {
            maintainAspectRatio: false,
            hover: {
                mode: null
            },
            elements: {
                point: {
                    radius: 0
                }
            },
            scales: {
                xAxis: {
                    display: false,
                },
                yAxis: {
                    display: false,
                }
            },
            plugins: {
                tooltip: {
                    enabled: false
                },
                legend: {
                    display: false
                }
            }
        }
    }

    return config
}

$(".line-visual").each(function () {
    const status = $(this).hasClass("up");
    const canvas = $(this).find("canvas");
    const coin = $(canvas).attr("data-coin");

    const getChartData = async () => {
        let data = [];

        try {
            await fetch(`/api/getChart?coin=${coin}`)
                .then(response => response.json())
                .then(json => data.push(...json))

            if (data.length != 0) {
                new Chart(canvas, getOption(status, data));

                $(this).removeClass("chart-load")
            }
        } catch (error) {
            console.log("Something went wrong");
        }
    };

    getChartData()
})

$(".head-tab").each(function () {
    const tab = $(this).attr("tab");
    const head = $(`.head-tab[tab=${tab}]`);
    const content = $(`.body-tab[tab=${tab}]`);
    const active = $(head).find(".tab-item.active").attr("target");

    if (active) {
        $(content).find(`.tab-item[target=${active}]`).addClass("active");
    } else {
        $(head).find(".tab-item").first().addClass("active");
        $(content).find(".tab-item").first().addClass("active");
    };

    $(head.find(".tab-item")).click(function () {
        const target = $(this).attr("target");
        $(head).find(".tab-item").removeClass("active");
        $(this).addClass("active");
        $(content).find(".tab-item").removeClass("active");
        $(content).find(`.tab-item[target=${target}]`).addClass("active");
    });
});

$(".x-switch").on("click", ".item", function () {
    const type = $(this).data("type");

    $(this).parent().children(".item").removeClass("active");
    $(this).addClass("active")

    $(".trade-content-data").attr("data-type", type);
});

$(".trade-preview-var").on("click", ".item", function () {
    const type = $(this).data("var");

    $(this).parent().children(".item").removeClass("active");
    $(this).addClass("active")

    $(".trade-content-data").attr("data-var", type);
});

$(".content-min-switch").on("click", ".item", function () {
    const type = $(this).data("type");

    $(this).parent().children(".item").removeClass("active");
    $(this).addClass("active")

    $(".trade-content-body").attr("data-type", type);
});

initDropdown();

$(document).on("click", function (e) {
    $(".dropdown").removeClass("active")

    if (!e.target.closest(".header-notification")) $(".header-user").removeClass("active")
    if (!e.target.closest(".header-profile-navigation")) $(".header-profile").removeClass("active")
    if (!e.target.closest(".trade-coin-body")) $(".trade-coin").removeClass("active")
});

document.addEventListener('livewire:update', () => {
    initDropdown();
});

$("body").removeAttr("class");
