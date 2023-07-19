import Settings from "./ui/pages/Settings";
import { storage } from "@vendetta/plugin";
import { after, before } from "@vendetta/patcher";
import { findByName } from "@vendetta/metro";
import renderTimestamp from "./lib/renderTimestamp";

const RowManager = findByName("RowManager")
let patches = [];

export default {
    onLoad: () => {
        storage.selected ??= "calendar"
        storage.customFormat ??= "dddd, MMMM Do YYYY, h:mm:ss a"

        patches.push(before("generate", RowManager.prototype, ([row]) => {
            // Return if it's not a message row
            if (row.rowType !== 1) return
            if (storage.separateMessages) row.isFirst = true
        }))

        patches.push(after("generate", RowManager.prototype, ([row], { message }) => {
            // Return if it's not a message row
            if (row.rowType !== 1) return
            if (message.timestamp) message.timestamp = renderTimestamp(row.message.timestamp, storage.selected)
        }))
    },
    onUnload: () => {
        patches.forEach(unpatch => unpatch())
    },
    settings: Settings,
}
