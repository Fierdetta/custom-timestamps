import Settings from "./ui/pages/Settings";
import { storage } from "@vendetta/plugin";
import { after } from "@vendetta/patcher";
import { findByName } from "@vendetta/metro";
import renderTimestamp from "./lib/renderTimestamp";

const RowManager = findByName("RowManager")
let unpatch: () => void;

export default {
    onLoad: () => {
        storage.selected ??= "calendar"
        storage.customFormat ??= "dddd, MMMM Do YYYY, h:mm:ss a"

        unpatch = after("generate", RowManager.prototype, ([row], { message }) => {
            // Return if it's not a message row
            if (row.rowType !== 1) return
            message.timestamp = renderTimestamp(row.message.timestamp, storage.selected)
        })
    },
    onUnload: () => {
        unpatch()
    },
    settings: Settings,
}
