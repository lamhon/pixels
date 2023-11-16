const Configs = {
    apiURL: "http://127.0.0.1:8888/v1/",

    DEFAULT_CONTENT_TYPE: "application/json",
    // ------
    ACTIVE_TYPE: "00",
    DELETE_TYPE: "01",
    // ------
    INVOICE_CREATED_TYPE: "00",
    INVOICE_DELIVERED_TYPE: "02",
    INVOICE_CANCEL_TYPE: "01",
    // ------
    FORMAT_PHONE_NUMBER: /^\d{9,19}$/,
    FORMAT_HEX_COLOR: /^#([A-Fa-f0-9]{3}){1,2}$/,
    // ------
    TOAST_POSITION_TOP_LEFT: "top-left",
    TOAST_POSITION_TOP_RIGHT: "top-right",
    TOAST_POSITION_TOP_CENTER: "top-center",
    TOAST_POSITION_BOTTOM_LEFT: "bottom-left",
    TOAST_POSITION_BOTTOM_RIGHT: "bottom-right",
    TOAST_POSITION_BOTTOM_CENTER: "bottom-center",

    TOAST_TYPE_INFO: "info",
    TOAST_TYPE_SUCCESS: "success",
    TOAST_TYPE_WARNING: "warn",
    TOAST_TYPE_ERROR: "error",

    TOAST_THEME_LIGHT: "light",
    TOAST_THEME_DARK: "dark",
    TOAST_THEME_COLORED: "colored",

    TOAST_HIDE_PROGRESS_BAR: true,
    TOAST_NOT_HIDE_PROGRESS_BAR: false,

    TOAST_LIMIT_DEFAULT: 1,
    TOAST_CLOSE_ON_CLICK_DEFAULT: true,
    TOAST_PAUSE_ON_FOCUS_LOSS_DEFAULT: true,
    TOAST_DRAGGABLE_DEFAULT: true,
    TOAST_NEWEST_ON_TOP_DEFAULT: false,
    TOAST_PAUSE_ON_HOVER_DEFAULT: true,
    TOAST_RTL_DEFAULT: false,
    TOAST_AUTO_CLOSE_DEFAULT: 5000,
    // ------
    DEFAULT_PAGE_INDEX: 1,
    DEFAULT_PAGE_SIZE: 10,
    // ------
    PHONE_REGION: [
        {
            key: 1,
            value: '+84',
            label: '(+84) Việt Nam'
        },
        {
            key: 2,
            value: '+86',
            label: '(+86) 中国'
        }
    ],
}

Object.freeze(Configs)

export default Configs
