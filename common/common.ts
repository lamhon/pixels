import { toast } from 'react-toastify'
import Configs from '@/configs/configs'

export function showToast(
    position: string,
    theme: string,
    autoClose: Number | boolean,
    hideProgressBar: boolean,
    limit: Number,
    closeOnClick: boolean,
    pauseOnFocusLoss: boolean,
    draggable: boolean,
    newestOnTop: boolean,
    pauseOnHover: boolean,
    rtl: boolean, // right to left layout
    content: string,
    type: string,
) {
    const objSetting: { [key: string]: any } = {}

    objSetting.position = position
    objSetting.autoClose = autoClose
    objSetting.theme = theme
    objSetting.hideProgressBar = hideProgressBar
    if (autoClose === false) {
        delete objSetting.hideProgressBar
    }
    objSetting.newestOnTop = newestOnTop
    objSetting.closeOnClick = closeOnClick
    objSetting.rtl = rtl
    objSetting.pauseOnFocusLoss = pauseOnFocusLoss
    objSetting.draggable = draggable
    objSetting.pauseOnHover = pauseOnHover
    objSetting.limit = limit

    switch (type) {
        case Configs.TOAST_TYPE_INFO:
            return toast.info(content, objSetting)
        case Configs.TOAST_TYPE_SUCCESS:
            return toast.success(content, objSetting)
        case Configs.TOAST_TYPE_WARNING:
            return toast.warn(content, objSetting)
        case Configs.TOAST_TYPE_ERROR:
            return toast.error(content, objSetting)
        default:
            return toast(content, objSetting)
    }
}

/***
* Params:
*   date1 (date): date time to compare
*   date2 (date): date time to compare
* Return:
*   [int]: 1 (date 1 > date 2)
*          0 (date 1 = date 2)
*          -1 (date 1 < date 2)
*/
export function compareDate(date1: Date, date2: Date) {
    let compareDate1 = date1.toISOString()
    let compareDate2 = date2.toISOString()

    if (compareDate1 > compareDate2) {
        return 1
    } else if (compareDate1 === compareDate2) {
        return 0
    } else {
        return -1
    }
}

/***
* Format date
* @params date(datetime)
* ----
* @return DD/MM/YYYY (string)
*/
export function formatDateVN(date: Date): string {
    // Get day and format number to "dd"
    const day = date.getDate().toString().padStart(2, '0')
    // Get month and format number to "MM"
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    // Get year
    const year = date.getFullYear()

    return `${day}/${month}/${year}`
}

/***
* Format time
* @params date(datetime)
* ----
* @return HH:mm (string)
*/
export function formatTimeVN (date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')

    return `${hours}:${minutes}`
}
